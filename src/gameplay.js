import difference from 'lodash/difference'

function count (prop, m, r, c) {
  return siblings(m, r, c).map((pair) => m[pair.r][pair.c][prop] ? 1 : 0).reduce((m, n) => m + n, 0)
}

function is (prop, m, r, c) {
  const el = safeGet(m, r, c)
  return !!el && el[prop]
}

export function countFlags (m, r, c) {
  return count('isFlagged', m, r, c)
}

export function countBombs (m, r, c) {
  return count('isBomb', m, r, c)
}

// TODO: test
export function initializeMap (w, h, bc) {
  const m = []

  for (let r = 0; r < w; r++) {
    m[r] = []
    for (let c = 0; c < h; c++) {
      m[r][c] = {
        isBomb: false,
        isMasked: true,
        isFlagged: false
      }
    }
  }

  for (let b = 0; b < bc; b++) {
    let r = Math.floor(Math.random() * w)
    let c = Math.floor(Math.random() * h)

    while (countBombs(m, r, c) !== 0) {
      r = Math.floor(Math.random() * w)
      c = Math.floor(Math.random() * h)
    }

    m[r][c].isBomb = true
  }

  return m
}

export function isBomb (m, r, c) {
  return is('isBomb', m, r, c)
}

export function isFlagged (m, r, c) {
  return is('isFlagged', m, r, c)
}

export function isMasked (m, r, c) {
  return is('isMasked', m, r, c)
}

export function safeGet (m, r, c) {
  if (m[r] != null && m[r][c] != null) return m[r][c]
}

export function siblings (m, r, c, iteratee) {
  /* eslint-disable standard/array-bracket-even-spacing */
  const siblings = [
    [-1, -1], [-1, 0], [-1, +1],
    [ 0, -1], /* me */ [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]
  ]
  /* eslint-enable standard/array-bracket-even-spacing */

  return siblings.reduce((siblings, sibling) => {
    const [rd, cd] = sibling

    if (safeGet(m, r + rd, c + cd)) {
      siblings.push({r: r + rd, c: c + cd})
    }

    return siblings
  }, [])
}

export function toggleFlag (m, r, c) {
  const el = m[r][c]
  el.isFlagged = !el.isFlagged
  return el.isFlagged
}

export function unmask (m, r, c, um = []) {
  if (!isFlagged(m, r, c)) um.push({r, c})
  if (isBomb(m, r, c) || countBombs(m, r, c) > 0) return um
  return um.concat(unmaskCrawl(m, r, c, um))
}

export function unmaskAroundFlags (m, r, c) {
  if (!isMasked(m, r, c) && countFlags(m, r, c) >= countBombs(m, r, c)) {
    return unmaskCrawl(m, r, c, [], true)
  } else {
    return []
  }
}

export function unmaskCrawl (m, r, c, um = [], unmaskBombs = false) {
  if (isFlagged(m, r, c)) return []

  return siblings(m, r, c)
    .reduce((memo, pair) => {
      const previouslyUnmasked = um.concat(memo).some((pair0) => pair0.r === pair.r && pair0.c === pair.c)
      if (isFlagged(m, pair.r, pair.c) || previouslyUnmasked) return memo

      const hasBombNeighbors = countBombs(m, pair.r, pair.c) > 0
      if (!hasBombNeighbors) return difference(unmask(m, pair.r, pair.c, um.concat(memo)), um)

      const isNotBomb = !isBomb(m, pair.r, pair.c)
      if (unmaskBombs || isNotBomb) return memo.concat([{r: pair.r, c: pair.c}])

      return memo
    }, [])
}
