import {difference, flatten, times, get} from 'lodash'

export enum PROPS {
  BOMB = 'isBomb',
  FLAG = 'isFlagged',
  MASK = 'isMasked'
}

interface MapPoint {
  r: number,
  c: number
}

type Neighbors = Array<MapPoint>

interface Cell {
  [PROPS.BOMB]: boolean,
  [PROPS.FLAG]: boolean,
  [PROPS.MASK]: boolean
}

export interface Map {
  data: Array<Cell>
  w: number
  h: number
}

function buildField (w:number, h:number) {
  const map:Map = {
    data: [],
    w,
    h
  }
  for (let i = 0; i < w*h; i++) {
    map.data[i] = {
      isBomb: false,
      isMasked: true,
      isFlagged: false
    }
  }

  return map
}

function countNeighbors (map:Map, p:MapPoint, prop:PROPS) {
  return neighbors(map, p)
    .map((pair) => get(getCell(map, pair), prop) ? 1 : 0)
    .reduce((m:number, n:number) => m + n, 0)
}

function placeBombs (map:Map, bc:number) {
  const {w, h} = map
  const bombs:Neighbors = []

  times(bc, () => {
    let r:number, c:number

    do {
      r = Math.floor(Math.random() * h)
      c = Math.floor(Math.random() * w)
    } while (bombs.some((bomb) => bomb.r === r && bomb.c === c))

    bombs.push({r, c})
  })

  return bombs
}

export function isTile (prop:PROPS, el:Cell|undefined) {
  return !!el && get(el, prop)
}

export function countFlags (map:Map) {
  return toArray(map).map((tile) => isTile(PROPS.FLAG, tile) ? 1 : 0).reduce((m:number, n) => m + n, 0)
}

export function createMap (arr: Array<Array<Cell>>):Map {
  return {
    data: flatten(arr),
    w: arr[0].length,
    h: arr.length
  }
}

export function initializeMap (w:number, h:number, bc:number) {
  const map = buildField(w, h)
  const bombs = placeBombs(map, bc)

  bombs.forEach((bomb) => {
    getCell(map, bomb).isBomb = true
  })

  return map
}

export function isComplete (map:Map) {
  return !toArray(map).some((tile) => {
    return !isPlayable(map) || !isTile(PROPS.BOMB, tile) && isTile(PROPS.FLAG, tile) || !isTile(PROPS.BOMB, tile) && isTile(PROPS.MASK, tile)
  })
}

export function isPlayable (map:Map) {
  return !toArray(map).some((tile) => isTile(PROPS.BOMB, tile) && !isTile(PROPS.MASK, tile))
}

export function findBombs (map:Map) {
  return toArray(map).reduce(
    (result:Neighbors, el, i) => {
      if (isTile(PROPS.BOMB, el)) {
        result.push(indexToPoint(map, i))
      }
      return result
    }, []);
}

export function neighboringBombs (map:Map, p:MapPoint) {
  return countNeighbors(map, p, PROPS.BOMB)
}

export function neighboringFlags (map:Map, p:MapPoint) {
  return countNeighbors(map, p, PROPS.FLAG)
}

export function neighbors (map:Map, p:MapPoint) {
  /* eslint-disable standard/array-bracket-even-spacing */
  const neighbors = [
    [-1, -1], [-1, 0], [-1, +1],
    [ 0, -1], /* me */ [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]
  ]
  /* eslint-enable standard/array-bracket-even-spacing */

  return neighbors.reduce((neighbors:Neighbors, neighbor) => {
    const [rd, cd] = neighbor
    const point = {r: p.r + rd, c: p.c + cd}

    if (safeGet(map, point)) {
      neighbors = [...neighbors, point]
    }

    return neighbors
  }, [])
}

export function indexToPoint(map:Map, i: number) {
  if (i > toArray(map).length - 1) {
    throw new Error('index is out of range')
  }

  const r = Math.floor(i / map.w)
  const c = i % map.w

  return {r, c}
}

export function toArray (map:Map) {
  return [...map.data]
}

export function getCell (map:Map, p:MapPoint) {
  if (p.r >= 0 && p.c >= 0  && p.r < map.h && p.c < map.w) {
    return toArray(map)[(p.r*map.w)+p.c]
  } else {
    throw new Error('requested cell does not exist')
  }
}

export function safeGet (map:Map, p:MapPoint) {
  try {
    return getCell(map, p)
  } catch (e) {
    if (e.message === 'requested cell does not exist') {
      return undefined
    }
  }
}

export function toggle (map:Map, p:MapPoint, prop:PROPS, val?:boolean) {
  const el = getCell(map, p)
  const newVal = val != null ? val : !isTile(prop, el)
  el[prop] = newVal
  return newVal
}

export function toggleFlag (map:Map, p:MapPoint) {
  const el = getCell(map, p)
  if (isTile(PROPS.MASK, el)) {
    el.isFlagged = !isTile(PROPS.FLAG, el)
  }
  return el.isFlagged
}

export function unmask (map:Map, p:MapPoint, um:Neighbors = []) {
  const el = safeGet(map, p)
  if (!isTile(PROPS.FLAG, el)) um.push(p)
  if (isTile(PROPS.BOMB, el) || neighboringBombs(map, p) > 0) return um
  return um.concat(unmaskCrawl(map, p, um))
}

export function unmaskAroundFlags (map:Map, p:MapPoint) {
  const el = safeGet(map, p)
  if (!isTile(PROPS.MASK, el) && neighboringFlags(map, p) >= neighboringBombs(map, p)) {
    return unmaskCrawl(map, p, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (map:Map, p:MapPoint, um:Neighbors = [], unmaskBombs = false):Neighbors {
  const el = safeGet(map, p)

  if (isTile(PROPS.FLAG, el)) return []

  return neighbors(map, p)
    .reduce((memo:Neighbors, pair:MapPoint) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isTile(PROPS.FLAG, safeGet(map, pair)) || previouslyUnmasked) return memo

      const hasBombNeighbors = neighboringBombs(map, pair) > 0
      if (!hasBombNeighbors) return difference(unmask(map, pair, um.concat(memo)), um)

      const isNotBomb = !isTile(PROPS.BOMB, safeGet(map, pair))
      if (unmaskBombs || isNotBomb) return [...memo, pair]

      return memo
    }, [])
}

export function validFirstPlay (map:Map, p:MapPoint) {
  const el = safeGet(map, p)
  return !(neighboringBombs(map, p) > 0) && !isTile(PROPS.BOMB, el)
}
