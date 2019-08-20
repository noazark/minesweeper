import { getCell } from '../../lib/gameplay'

describe('getCell', function () {
  const tile = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }

  it('returns the tile for the row and column', function () {
    const matrix = [[tile]]
    expect(getCell(matrix, {r: 0, c: 0})).toBe(tile)
  })

  it('throws if the column does not exist', function () {
    const matrix = [[tile]]
    expect(() => getCell(matrix, {r: 0, c: 1})).toThrow()
  })

  it('throws if the row does not exist', function () {
    const matrix = [[tile]]
    expect(() => getCell(matrix, {r: 1, c: 0})).toThrow()
  })

  it('throws if the tile does not exist', function () {
    const matrix = [[]]
    expect(() => getCell(matrix, {r: 0, c: 0})).toThrow()
  })
})
