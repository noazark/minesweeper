import { validFirstPlay } from '../../src/gameplay'

describe('validFirstPlay', function () {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }

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
