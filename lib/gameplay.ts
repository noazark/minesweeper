import {difference, flatten, times, get} from 'lodash'

const HUNK_SIZE = 32

export enum PROPS {
  BOMB = 'bomb',
  FLAG = 'flag',
  MASK = 'mask'
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
  bombs: Uint32Array
  masks: Uint32Array
  flags: Uint32Array
  w: number
  h: number
}

function buildField (w:number, h:number) {
  const map:Map = {
    bombs: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    masks: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    flags: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    w,
    h
  }

  for (let i = 0; i < w*h; i++) {
    setBit(map.masks, i)
    clearBit(map.bombs, i)
    clearBit(map.flags, i)
  }

  return map
}

export function testBit(num:Uint32Array, bit:number) {
  const chunk = Math.floor(bit / HUNK_SIZE)
  const bitPos = bit % HUNK_SIZE
  return ((num[chunk]>>bitPos) % 2 != 0)
}

export function setBit(num:Uint32Array, bit:number) {
  const chunk = Math.floor(bit / HUNK_SIZE)
  const bitPos = bit % HUNK_SIZE
  return num[chunk] = num[chunk] | 1<<bitPos;
}

export function clearBit(num:Uint32Array, bit:number) {
  const chunk = Math.floor(bit / HUNK_SIZE)
  const bitPos = bit % HUNK_SIZE
  return num[chunk] = num[chunk] & ~(1<<bitPos);
}

export function toggleBit(num:Uint32Array, bit:number, val?:boolean){
  if (val != null) {
    return val ? setBit(num, bit) : clearBit(num, bit);
  } else {
    return !testBit(num, bit) ? setBit(num, bit) : clearBit(num, bit);
  }
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

export function isCell (prop:PROPS, el:Cell|undefined) {
  return !!el && get(el, prop)
}

export function countFlags (map:Map) {
  return toArray(map).map((cell) => isCell(PROPS.FLAG, cell) ? 1 : 0).reduce((m:number, n) => m + n, 0)
}

export function createMap (arr: Array<Array<Cell>>):Map {
  const w = arr[0].length
  const h = arr.length

  const map = {
    bombs: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    masks: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    flags: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    w,
    h,
  }

  flatten(arr).forEach((el, i) => {
    if (el[PROPS.BOMB]) setBit(map.bombs, i)
    if (el[PROPS.MASK]) setBit(map.masks, i)
    if (el[PROPS.FLAG]) setBit(map.flags, i)
  })

  return map
}

export function initializeMap (w:number, h:number, bc:number) {
  const map = buildField(w, h)
  const bombs = placeBombs(map, bc)

  bombs.forEach((bomb) => {
    toggle(map, bomb, PROPS.BOMB, true)
  })

  return map
}

export function isComplete (map:Map) {
  return !toArray(map).some((cell) => {
    return !isPlayable(map) || !isCell(PROPS.BOMB, cell) && isCell(PROPS.FLAG, cell) || !isCell(PROPS.BOMB, cell) && isCell(PROPS.MASK, cell)
  })
}

export function isPlayable (map:Map) {
  return !toArray(map).some((cell) => isCell(PROPS.BOMB, cell) && !isCell(PROPS.MASK, cell))
}

export function findBombs (map:Map) {
  return toArray(map).reduce(
    (result:Neighbors, el, i) => {
      if (isCell(PROPS.BOMB, el)) {
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
  if (i > (map.w * map.h) - 1) {
    throw new Error('index is out of range')
  }

  const r = Math.floor(i / map.w)
  const c = i % map.w

  return {r, c}
}

export function pointToIndex(map:Map, p:MapPoint) {
  return (p.r*map.w)+p.c
}

export function toArray (map:Map) {
  const data = []

  for (let i = 0; i < map.w*map.h; i++) {
    data[i] = getCell(map, indexToPoint(map, i))
  }

  return data
}

export function getCell (map:Map, p:MapPoint) {
  if (p.r >= 0 && p.c >= 0  && p.r < map.h && p.c < map.w) {
    const i = pointToIndex(map, p)
    return {
      [PROPS.BOMB]: testBit(map.bombs, i),
      [PROPS.MASK]: testBit(map.masks, i),
      [PROPS.FLAG]: testBit(map.flags, i)
    }
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
  const i = pointToIndex(map, p)

  if (prop === PROPS.FLAG) {
    toggleBit(map.flags, i, val)
    return testBit(map.flags, i)
  } else if (prop === PROPS.MASK) {
    toggleBit(map.masks, i, val)
    return testBit(map.masks, i)
  } else if (prop === PROPS.BOMB) {
    toggleBit(map.bombs, i, val)
    return testBit(map.bombs, i)
  }
}

export function toggleFlag (map:Map, p:MapPoint) {
  const i = pointToIndex(map, p)

  if (testBit(map.masks, i)) {
    toggle(map, p, PROPS.FLAG)
  }

  return testBit(map.flags, i)
}

export function unmask (map:Map, p:MapPoint, um:Neighbors = []) {
  const el = safeGet(map, p)
  if (!isCell(PROPS.FLAG, el)) um.push(p)
  if (isCell(PROPS.BOMB, el) || neighboringBombs(map, p) > 0) return um
  return um.concat(unmaskCrawl(map, p, um))
}

export function unmaskAroundFlags (map:Map, p:MapPoint) {
  const el = safeGet(map, p)
  if (!isCell(PROPS.MASK, el) && neighboringFlags(map, p) >= neighboringBombs(map, p)) {
    return unmaskCrawl(map, p, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (map:Map, p:MapPoint, um:Neighbors = [], unmaskBombs = false):Neighbors {
  const el = safeGet(map, p)

  if (isCell(PROPS.FLAG, el)) return []

  return neighbors(map, p)
    .reduce((memo:Neighbors, pair:MapPoint) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isCell(PROPS.FLAG, safeGet(map, pair)) || previouslyUnmasked) return memo

      const hasBombNeighbors = neighboringBombs(map, pair) > 0
      if (!hasBombNeighbors) return difference(unmask(map, pair, um.concat(memo)), um)

      const isNotBomb = !isCell(PROPS.BOMB, safeGet(map, pair))
      if (unmaskBombs || isNotBomb) return [...memo, pair]

      return memo
    }, [])
}

export function validFirstPlay (map:Map, p:MapPoint) {
  const el = safeGet(map, p)
  return !(neighboringBombs(map, p) > 0) && !isCell(PROPS.BOMB, el)
}
