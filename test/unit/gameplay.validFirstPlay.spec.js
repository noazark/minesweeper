import { validFirstPlay, MASK, FLAG, BOMB } from '../../lib/gameplay'

describe('validFirstPlay', function () {
  const _ = { [MASK]: true, [FLAG]: false, [BOMB]: false }
  const f = { [MASK]: true, [FLAG]: true, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }

  const matrix = [
    [_, _, b],
    [_, _, _],
    [_, _, f]
  ]

  it('returns true if tile is alone', function () {
    expect(validFirstPlay(matrix, 0, 0)).toBe(true)
  })

  it('returns false if tile has neighboring bombs', function () {
    expect(validFirstPlay(matrix, 0, 1)).toBe(false)
  })

  it('returns false if tile is a bomb', function () {
    expect(validFirstPlay(matrix, 0, 2)).toBe(false)
  })
})
