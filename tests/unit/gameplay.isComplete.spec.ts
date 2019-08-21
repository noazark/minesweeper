import { isComplete, createMap } from '../../lib/gameplay'

describe('isComplete', () => {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const o = { ..._, isMasked: false }
  const f = { ..._, isFlagged: true }
  const b = { ..._, isBomb: true }
  const B = { ..._, isFlagged: true, isBomb: true }
  const x = { ..._, isMasked: false, isBomb: true }

  it('returns true if only masked bombs are left', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns true if only masked bombs or flagged bombs are left', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, o, B]
    ])

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns false if any bombs are unmasked', () => {
    const matrix = createMap([
      [o, o, b],
      [o, x, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is incorrectly flagged', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, f, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is left masked', () => {
    const matrix = createMap([
      [_, o, b],
      [o, o, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })
})
