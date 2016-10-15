function count (m, r, c, prop) {
  return siblings(m, r, c).map((pair) => m[pair.r][pair.c][prop] ? 1 : 0).reduce((m, n) => m + n, 0)
}

export function countFlags (m, r, c) {
  return count(m, r, c, 'isFlagged')
}

export function countBombs (m, r, c) {
  return count(m, r, c, 'isBomb')
}

// TODO: test
export function initializeMap (w, h, bc) {
  const m = []

  for (let r = 0; r < w; r++) {
    m[r] = []
    for (let c = 0; c < h; c++) {
      m[r][c] = {
        bombCount: 0,
        isBomb: false,
        isMasked: true,
        isFlagged: false
      }
    }
  }

  for (let b = 0; b < bc; b++) {
    let r = Math.floor(Math.random() * w)
    let c = Math.floor(Math.random() * h)

    while (m[r][c].bombCount !== 0) {
      r = Math.floor(Math.random() * w)
      c = Math.floor(Math.random() * h)
    }

    m[r][c].isBomb = true
  }

  for (let r = 0; r < w; r++) {
    for (let c = 0; c < h; c++) {
      siblings(m, r, c).map((pair) => {
        const v = m[pair.r][pair.c]
        if (v.isBomb) m[r][c].bombCount++
      })
    }
  }

  return m
}

export function isMasked (m, r, c) {
  const el = safeGet(m, r, c)
  return !!el && el.isMasked
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
  const el = m[r][c]
  if (!el.isFlagged) um.push({r, c})
  if (el.isBomb || el.bombCount > 0) return um
  return unmaskCrawl(m, r, c, um)
}

export function unmaskAroundFlags (m, r, c) {
  const flagCount = countFlags(m, r, c)
  if (!isMasked(m, r, c) && flagCount === m[r][c].bombCount) {
    return unmaskCrawl(m, r, c, [], true)
  } else {
    return []
  }
}

// TODO: test
export function unmaskCrawl (m, r, c, um = [], unmaskBombs = false) {
  if (m[r][c].isFlagged) return um

  return siblings(m, r, c).reduce((memo, pair) => {
    const previouslyUnmasked = memo.some((el) => el.r === pair.r && el.c === pair.c)
    const v = m[pair.r][pair.c]
    if (v && v.isFlagged || previouslyUnmasked) return memo
    else if (v && v.bombCount === 0 && !previouslyUnmasked) return memo.concat(unmask(m, pair.r, pair.c, um))
    else if (v && (unmaskBombs || !v.isBomb) && v.bombCount && !previouslyUnmasked) return memo.concat([{r: pair.r, c: pair.c}])
    else return memo
  }, um)
}
