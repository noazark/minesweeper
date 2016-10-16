import { isComplete } from '../../src/gameplay'

describe('isComplete', function () {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const o = { isMasked: false, isFlagged: false, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }
  const B = { isMasked: true, isFlagged: true, isBomb: true }
  const x = { isMasked: false, isFlagged: false, isBomb: true }

  it('returns true if only masked bombs are left', function () {
    const matrix = [
      [o, o, b],
      [o, o, o],
      [o, o, o]
    ]

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns true if only masked bombs or flagged bombs are left', function () {
    const matrix = [
      [o, o, b],
      [o, o, o],
      [o, o, B]
    ]

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns false if any bombs are unmasked', function () {
    const matrix = [
      [o, o, b],
      [o, x, o],
      [o, o, o]
    ]

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is incorrectly flagged', function () {
    const matrix = [
      [o, o, b],
      [o, o, o],
      [o, f, o]
    ]

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is left masked', function () {
    const matrix = [
      [_, o, b],
      [o, o, o],
      [o, o, o]
    ]

    expect(isComplete(matrix)).toBe(false)
  })
})
