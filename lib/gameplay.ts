import {difference, flatten, times, get} from 'lodash'

export const BOMB = 'isBomb'
export const FLAG = 'isFlagged'
export const MASK = 'isMasked'

interface Neighbor {
  r: number,
  c: number
}

type Neighbors = Array<Neighbor>

interface Cell {
  isBomb: boolean,
  isMasked: boolean,
  isFlagged: boolean
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

function count (prop:string, map:Map, r:number, c:number):number {
  return neighbors(map, r, c).map((pair) => get(map[pair.r][pair.c], prop) ? 1 : 0).reduce((m:number, n:number) => m + n, 0)
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

export function isTile (prop:string, el:Cell|undefined) {
  return !!el && get(el, prop)
}

export function countFlags (map:Map) {
  return flatten(map).map((tile) => isTile(FLAG, tile) ? 1 : 0).reduce((m:number, n) => m + n, 0)
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
    return !isPlayable(map) || !isTile(BOMB, tile) && isTile(FLAG, tile) || !isTile(BOMB, tile) && isTile(MASK, tile)
  })
}

export function isPlayable (map:Map) {
  return !flatten(map).some((tile) => isTile(BOMB, tile) && !isTile(MASK, tile))
}

export function findBombs (map:Map):Neighbors {
  return flatten(map.reduce(
    (result:Neighbors, row, r) =>
      [
        ...result,
        ...row.reduce(
          (result:Neighbors, col, c) => {
            if (isTile(BOMB, col)) {
              result.push({ r, c })
            }
            return result
          },
        [])
      ],
    []));
}

export function neighboringBombs (map:Map, r:number, c:number) {
  return count(BOMB, map, r, c)
}

export function neighboringFlags (map:Map, r:number, c:number) {
  return count(FLAG, map, r, c)
}

export function neighbors (map:Map, r:number, c:number):Neighbors {
  /* eslint-disable standard/array-bracket-even-spacing */
  const neighbors = [
    [-1, -1], [-1, 0], [-1, +1],
    [ 0, -1], /* me */ [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]
  ]
  /* eslint-enable standard/array-bracket-even-spacing */

  return neighbors.reduce((neighbors:Neighbors, neighbor) => {
    const [rd, cd] = neighbor

    if (safeGet(map, r + rd, c + cd)) {
      neighbors.push({r: r + rd, c: c + cd})
    }

    return neighbors
  }, [])
}

export function safeGet (map:Map, r:number, c:number) {
  if (map[r] != null && map[r][c] != null) return map[r][c]
}

export function toggleFlag (map:Map, r:number, c:number) {
  const el = map[r][c]
  if (isTile(MASK, el)) {
    el.isFlagged = !isTile(FLAG, el)
  }
  return el.isFlagged
}

export function unmask (map:Map, r:number, c:number, um:Neighbors = []) {
  const el = safeGet(map, r, c)
  if (!isTile(FLAG, el)) um.push({r, c})
  if (isTile(BOMB, el) || neighboringBombs(map, r, c) > 0) return um
  return um.concat(unmaskCrawl(map, r, c, um))
}

export function unmaskAroundFlags (map:Map, r:number, c:number) {
  const el = safeGet(map, r, c)
  if (!isTile(MASK, el) && neighboringFlags(map, r, c) >= neighboringBombs(map, r, c)) {
    return unmaskCrawl(map, r, c, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (map:Map, r:number, c:number, um:Neighbors = [], unmaskBombs = false):Neighbors {
  const el = safeGet(map, r, c)

  if (isTile(FLAG, el)) return []

  return neighbors(map, r, c)
    .reduce((memo:Neighbors, pair:Neighbor) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isTile(FLAG, safeGet(map, pair.r, pair.c)) || previouslyUnmasked) return memo

      const hasBombNeighbors = neighboringBombs(map, pair.r, pair.c) > 0
      if (!hasBombNeighbors) return difference(unmask(map, pair.r, pair.c, um.concat(memo)), um)

      const isNotBomb = !isTile(BOMB, safeGet(map, pair.r, pair.c))
      if (unmaskBombs || isNotBomb) return memo.concat([{r: pair.r, c: pair.c}])

      return memo
    }, [])
}

export function validFirstPlay (map:Map, r:number, c:number) {
  const el = safeGet(map, r, c)
  return !(neighboringBombs(map, r, c) > 0) && !isTile(BOMB, el)
}
