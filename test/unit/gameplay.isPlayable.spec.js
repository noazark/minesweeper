import { isPlayable, FLAG, MASK, BOMB } from '../../lib/gameplay'

describe('isPlayable', function () {
  const o = { [MASK]: false, [FLAG]: false, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }
  const B = { [MASK]: false, [FLAG]: true, [BOMB]: true }
  const x = { [MASK]: false, [FLAG]: false, [BOMB]: true }

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
