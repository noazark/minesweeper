import difference from 'lodash/difference'
import flatten from 'lodash/flatten'
import times from 'lodash/times'

export const BOMB = 'isBomb'
export const FLAG = 'isFlagged'
export const MASK = 'isMasked'

function buildField (w, h) {
  const m = []
  for (let r = 0; r < h; r++) {
    m[r] = []
    for (let c = 0; c < w; c++) {
      m[r][c] = {
        [BOMB]: false,
        [MASK]: true,
        [FLAG]: false
      }
    }
  }

  return m
}

function count (prop, m, r, c) {
  return neighbors(m, r, c).map((pair) => m[pair.r][pair.c][prop] ? 1 : 0).reduce((m, n) => m + n, 0)
}

function placeBombs (m, bc) {
  const w = m[0].length
  const h = m.length
  const bombs = []

  times(bc, () => {
    let r, c

    do {
      r = Math.floor(Math.random() * h)
      c = Math.floor(Math.random() * w)
    } while (bombs.some((bomb) => bomb.r === r && bomb.c === c))

    bombs.push({r, c})
  })

  return bombs
}

export function isTile (prop, el) {
  return !!el && el[prop]
}

export function countFlags (m) {
  return flatten(m).map((tile) => isTile(FLAG, tile) ? 1 : 0).reduce((m, n) => m + n, 0)
}

export function initializeMap (w, h, bc) {
  const m = buildField(w, h)
  const bombs = placeBombs(m, bc)

  bombs.forEach((bomb) => {
    m[bomb.r][bomb.c][BOMB] = true
  })

  return m
}

export function isComplete (m) {
  return !flatten(m).some((tile) => {
    return !isPlayable(m) || !isTile(BOMB, tile) && isTile(FLAG, tile) || !isTile(BOMB, tile) && isTile(MASK, tile)
  })
}

export function isPlayable (m) {
  return !flatten(m).some((tile) => isTile(BOMB, tile) && !isTile(MASK, tile))
}

export function findBombs (m) {
  return m.reduce((result, row, r) => result.concat(row.reduce((result, col, c) => {
    if (isTile(BOMB, col)) {
      result.push({ r, c })
    }
    return result
  }, [])), [])
}

export function neighboringBombs (m, r, c) {
  return count(BOMB, m, r, c)
}

export function neighboringFlags (m, r, c) {
  return count(FLAG, m, r, c)
}

export function neighbors (m, r, c) {
  /* eslint-disable standard/array-bracket-even-spacing */
  const neighbors = [
    [-1, -1], [-1, 0], [-1, +1],
    [ 0, -1], /* me */ [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]
  ]
  /* eslint-enable standard/array-bracket-even-spacing */

  return neighbors.reduce((neighbors, neighbor) => {
    const [rd, cd] = neighbor

    if (safeGet(m, r + rd, c + cd)) {
      neighbors.push({r: r + rd, c: c + cd})
    }

    return neighbors
  }, [])
}

export function safeGet (m, r, c) {
  if (m[r] != null && m[r][c] != null) return m[r][c]
}

export function toggleFlag (m, r, c) {
  const el = m[r][c]
  if (isTile(MASK, el)) {
    el.isFlagged = !isTile(FLAG, el)
  }
  return el.isFlagged
}

export function unmask (m, r, c, um = []) {
  const el = safeGet(m, r, c)
  if (!isTile(FLAG, el)) um.push({r, c})
  if (isTile(BOMB, el) || neighboringBombs(m, r, c) > 0) return um
  return um.concat(unmaskCrawl(m, r, c, um))
}

export function unmaskAroundFlags (m, r, c) {
  const el = safeGet(m, r, c)
  if (!isTile(MASK, el) && neighboringFlags(m, r, c) >= neighboringBombs(m, r, c)) {
    return unmaskCrawl(m, r, c, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (m, r, c, um = [], unmaskBombs = false) {
  const el = safeGet(m, r, c)

  if (isTile(FLAG, el)) return []

  return neighbors(m, r, c)
    .reduce((memo, pair) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isTile(FLAG, pair) || previouslyUnmasked) return memo

      const hasBombNeighbors = neighboringBombs(m, pair.r, pair.c) > 0
      if (!hasBombNeighbors) return difference(unmask(m, pair.r, pair.c, um.concat(memo)), um)

      const isNotBomb = !isTile(BOMB, pair)
      if (unmaskBombs || isNotBomb) return memo.concat([{r: pair.r, c: pair.c}])

      return memo
    }, [])
}

export function validFirstPlay (m, r, c) {
  const el = safeGet(m, r, c)
  return !neighboringBombs(m, r, c) > 0 && !isTile(BOMB, el)
}
