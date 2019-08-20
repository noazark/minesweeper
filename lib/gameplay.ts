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

export type Map = Array<Row>
type Row = Array<Cell>

function buildField (w:number, h:number):Map {
  const map:Map = []
  for (let r = 0; r < h; r++) {
    map[r] = []
    for (let c = 0; c < w; c++) {
      map[r][c] = {
        isBomb: false,
        isMasked: true,
        isFlagged: false
      }
    }
  }

  return map
}

function count (map:Map, p:MapPoint, prop:PROPS):number {
  return neighbors(map, p).map((pair) => get(safeGet(map, pair), prop) ? 1 : 0).reduce((m:number, n:number) => m + n, 0)
}

function placeBombs (map:Map, bc:number) {
  const w = map[0].length
  const h = map.length
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
  return flatten(map).map((tile) => isTile(PROPS.FLAG, tile) ? 1 : 0).reduce((m:number, n) => m + n, 0)
}

export function initializeMap (w:number, h:number, bc:number):Map {
  const m = buildField(w, h)
  const bombs = placeBombs(m, bc)

  bombs.forEach((bomb) => {
    m[bomb.r][bomb.c].isBomb = true
  })

  return m
}

export function isComplete (map:Map) {
  return !flatten(map).some((tile) => {
    return !isPlayable(map) || !isTile(PROPS.BOMB, tile) && isTile(PROPS.FLAG, tile) || !isTile(PROPS.BOMB, tile) && isTile(PROPS.MASK, tile)
  })
}

export function isPlayable (map:Map) {
  return !flatten(map).some((tile) => isTile(PROPS.BOMB, tile) && !isTile(PROPS.MASK, tile))
}

export function findBombs (map:Map):Neighbors {
  return flatten(map.reduce(
    (result:Neighbors, row, r) =>
      [
        ...result,
        ...row.reduce(
          (result:Neighbors, col, c) => {
            if (isTile(PROPS.BOMB, col)) {
              result.push({ r, c })
            }
            return result
          },
        [])
      ],
    []));
}

export function neighboringBombs (map:Map, p:MapPoint) {
  return count(map, p, PROPS.BOMB)
}

export function neighboringFlags (map:Map, p:MapPoint) {
  return count(map, p, PROPS.FLAG)
}

export function neighbors (map:Map, p:MapPoint):Neighbors {
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
      neighbors.push(point)
    }

    return neighbors
  }, [])
}

export function getCell (map:Map, p:MapPoint) {
  if (p.r >= 0 && p.c >= 0  && p.r < map.length && p.c < map[0].length) {
    return map[p.r][p.c]
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
