import { isPlayable } from '../../lib/gameplay'

describe('isPlayable', function () {
  const o = { isMasked: false, isFlagged: false, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }
  const B = { isMasked: false, isFlagged: true, isBomb: true }
  const x = { isMasked: false, isFlagged: false, isBomb: true }

  it('returns true if no bombs are unmasked', function () {
    const matrix = [
      [o, o, b],
      [o, o, o],
      [o, o, o]
    ]

    expect(isPlayable(matrix)).toBe(true)
  })

  it('returns true if no bombs are unmasked or unflagged', function () {
    const matrix = [
      [o, o, B],
      [b, o, o],
      [o, o, o]
    ]

    expect(isPlayable(matrix)).toBe(false)
  })

  it('returns false if a bomb is exposed', function () {
    const matrix = [
      [o, o, x],
      [b, o, o],
      [o, o, o]
    ]

    expect(isPlayable(matrix)).toBe(false)
  })
})
