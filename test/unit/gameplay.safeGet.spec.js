import { safeGet } from '../../lib/gameplay'

describe('safeGet', function () {
  it('returns the tile for the row and column', function () {
    const tile = {}
    const matrix = [[tile]]
    expect(safeGet(matrix, 0, 0)).toBe(tile)
  })

  it('returns undefined if the column does not exist', function () {
    const tile = {}
    const matrix = [[tile]]
    expect(safeGet(matrix, 0, 1)).toBeUndefined()
  })

  it('returns undefined if the row does not exist', function () {
    const tile = {}
    const matrix = [[tile]]
    expect(safeGet(matrix, 1, 0)).toBeUndefined()
  })

  it('returns undefined if the tile does not exist', function () {
    const matrix = [[]]
    expect(safeGet(matrix, 0, 0)).toBeUndefined()
  })
})
