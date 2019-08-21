import {difference, times} from 'lodash'

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

export interface Map {
  [PROPS.BOMB]: Uint32Array
  [PROPS.FLAG]: Uint32Array
  [PROPS.MASK]: Uint32Array
  readonly w: number
  readonly h: number
}

/**
 * Creates a new map based on the size and bomb count set.
 *
 * @param w Map width
 * @param h Map height
 * @param bc Number of bombs to place in map.
 */
export function initializeMap (w:number, h:number, bc:number) {
  const map = buildField(w, h)
  const bombs = placeBombs(map, bc)

  bombs.forEach((bomb) => {
    toggle(map, bomb, PROPS.BOMB, true)
  })

  return map
}


export function buildField (w:number, h:number) {
  const map:Map = {
    [PROPS.BOMB]: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    [PROPS.MASK]: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    [PROPS.FLAG]: new Uint32Array(Math.ceil(w*h/HUNK_SIZE)),
    w,
    h
  }

  for (let i = 0; i < w*h; i++) {
    setBit(map[PROPS.MASK], i)
    clearBit(map[PROPS.BOMB], i)
    clearBit(map[PROPS.FLAG], i)
  }

  return map
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

/**
 * Returns `true` if bit is high, `false` if bit is low.
 *
 * @param buff The integer buffer storing the bits
 * @param offset Offset of the bit to test
 */
export function testBit(buff:Uint32Array, offset:number) {
  const chunk = Math.floor(offset / HUNK_SIZE)
  const chunkOffset = offset % HUNK_SIZE
  return ((buff[chunk]>>chunkOffset) % 2 != 0)
}

/**
 * Sets the specified bit in the buffer to high.
 *
 * @param buff The integer buffer storing the bits
 * @param offset Offset of the bit to set high
 */
export function setBit(buff:Uint32Array, offset:number) {
  const chunk = Math.floor(offset / HUNK_SIZE)
  const chunkOffset = offset % HUNK_SIZE
  return buff[chunk] = buff[chunk] | 1<<chunkOffset;
}

/**
 * Sets the specified bit in the buffer to low.
 *
 * @param buff The integer buffer storing the bits
 * @param offset Offset of the bit to set low
 */
export function clearBit(buff:Uint32Array, offset:number) {
  const chunk = Math.floor(offset / HUNK_SIZE)
  const chunkOffset = offset % HUNK_SIZE
  return buff[chunk] = buff[chunk] & ~(1<<chunkOffset);
}

/**
 * Toggles the specified bit between high and low. If a `val` is passed in, the
 * value will be set `true = high` or `false = low`.
 *
 * @param buff The integer buffer storing the bits
 * @param offset Offset of the bit to set low
 */
export function toggleBit(num:Uint32Array, offset:number, val?:boolean){
  if (val != null) {
    return val ? setBit(num, offset) : clearBit(num, offset);
  } else {
    return !testBit(num, offset) ? setBit(num, offset) : clearBit(num, offset);
  }
}

export function toggle (map:Map, p:MapPoint, prop:PROPS, val?:boolean) {
  const i = pointToIndex(map, p)

  toggleBit(map[prop], i, val)
  return testBit(map[prop], i)
}

export function toggleFlag (map:Map, p:MapPoint) {
  const i = pointToIndex(map, p)

  if (testBit(map[PROPS.MASK], i)) {
    toggleBit(map[PROPS.FLAG], i)
  }

  return testBit(map[PROPS.FLAG], i)
}

export function isCell (map:Map, p:MapPoint, prop:PROPS) {
  return testBit(map[prop], pointToIndex(map, p))
}

export function isValidPoint (map:Map, p:MapPoint) {
  return p.r >= 0 && p.c >= 0  && p.r < map.h && p.c < map.w
}

export function isComplete (map:Map) {
  return !times(map.w*map.h, Number).some((i) => {
    return !isPlayable(map) || !isCell(map, indexToPoint(map, i), PROPS.BOMB) && isCell(map, indexToPoint(map, i), PROPS.FLAG) || !isCell(map, indexToPoint(map, i), PROPS.BOMB) && isCell(map, indexToPoint(map, i), PROPS.MASK)
  })
}

export function isPlayable (map:Map) {
  return !times(map.w*map.h, Number).some((i) => isCell(map, indexToPoint(map, i), PROPS.BOMB) && !isCell(map, indexToPoint(map, i), PROPS.MASK))
}

export function find (map:Map, prop:PROPS) {
  return times(map.w*map.h, Number).reduce(
    (result:Neighbors, i) => {
      if (isCell(map, indexToPoint(map, i), prop)) {
        result.push(indexToPoint(map, i))
      }
      return result
    }, []);
}

export function findBombs (map:Map) {
  return find(map, PROPS.BOMB)
}

export function countFlags (map:Map) {
  return find(map, PROPS.FLAG).length
}

/**
 * Converts the index of a cell on a map to it's row and column coordinates.
 *
 * The inverse of `pointToIndex`.
 *
 * @param map
 * @param i
 */
export function indexToPoint(map:Map, i: number) {
  if (i > (map.w * map.h) - 1) {
    throw new Error('index is out of range')
  }

  const r = Math.floor(i / map.w)
  const c = i % map.w

  return {r, c}
}

/**
 * Converts a row and column coordinate pair to an index for a cell on a map.
 *
 * The inverse of `indexToPoint`.
 *
 * @param map
 * @param i
 */
export function pointToIndex(map:Map, p:MapPoint) {
  return (p.r*map.w)+p.c
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

    if (isValidPoint(map, point)) {
      neighbors = [...neighbors, point]
    }

    return neighbors
  }, [])
}

export function countNeighbors (map:Map, p:MapPoint, prop:PROPS) {
  return neighbors(map, p)
    .map((pair) => isCell(map, pair, prop) ? 1 : 0)
    .reduce((m:number, n:number) => m + n, 0)
}

export function unmask (map:Map, p:MapPoint, um:Neighbors = []) {
  if (!isCell(map, p, PROPS.FLAG)) um.push(p)
  if (isCell(map, p, PROPS.BOMB) || countNeighbors(map, p, PROPS.BOMB) > 0) return um
  return um.concat(unmaskCrawl(map, p, um))
}

export function unmaskAroundFlags (map:Map, p:MapPoint) {
  if (!isCell(map, p, PROPS.MASK) && countNeighbors(map, p, PROPS.FLAG) >= countNeighbors(map, p, PROPS.BOMB)) {
    return unmaskCrawl(map, p, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (map:Map, p:MapPoint, um:Neighbors = [], unmaskBombs = false):Neighbors {
  if (isCell(map, p, PROPS.FLAG)) return []

  return neighbors(map, p)
    .reduce((memo:Neighbors, pair:MapPoint) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isCell(map, pair, PROPS.FLAG) || previouslyUnmasked) return memo

      const hasBombNeighbors = countNeighbors(map, pair, PROPS.BOMB) > 0
      if (!hasBombNeighbors) return difference(unmask(map, pair, um.concat(memo)), um)

      const isNotBomb = !isCell(map, pair, PROPS.BOMB)
      if (unmaskBombs || isNotBomb) return [...memo, pair]

      return memo
    }, [])
}

export function validFirstPlay (map:Map, p:MapPoint) {
  return !(countNeighbors(map, p, PROPS.BOMB) > 0) && !isCell(map, p, PROPS.BOMB)
}
