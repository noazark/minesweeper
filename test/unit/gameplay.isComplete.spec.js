import { isComplete, FLAG, MASK, BOMB } from '../../lib/gameplay'

describe('isComplete', function () {
  const _ = { [MASK]: true, [FLAG]: false, [BOMB]: false }
  const o = { [MASK]: false, [FLAG]: false, [BOMB]: false }
  const f = { [MASK]: true, [FLAG]: true, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }
  const B = { [MASK]: true, [FLAG]: true, [BOMB]: true }
  const x = { [MASK]: false, [FLAG]: false, [BOMB]: true }

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
