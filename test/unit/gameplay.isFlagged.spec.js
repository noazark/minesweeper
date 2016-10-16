import { isFlagged } from '../../lib/gameplay'

describe('isFlagged', function () {
  it('returns true if the tile is masked', function () {
    const tile = { isFlagged: true }
    const matrix = [[tile]]
    expect(isFlagged(matrix, 0, 0)).toBe(true)
  })

  it('returns false if the tile not is masked', function () {
    const tile = { isFlagged: false }
    const matrix = [[tile]]
    expect(isFlagged(matrix, 0, 0)).toBe(false)
  })

  it('returns false if the tile is undefined', function () {
    const matrix = [[]]
    expect(isFlagged(matrix, 0, 0)).toBe(false)
  })
})
