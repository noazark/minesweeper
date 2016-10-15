import { isBomb } from '../../src/gameplay'

describe('isBomb', function () {
  it('returns true if the tile is masked', function () {
    const tile = { isBomb: true }
    const matrix = [[tile]]
    expect(isBomb(matrix, 0, 0)).toBe(true)
  })

  it('returns false if the tile not is masked', function () {
    const tile = { isBomb: false }
    const matrix = [[tile]]
    expect(isBomb(matrix, 0, 0)).toBe(false)
  })

  it('returns false if the tile is undefined', function () {
    const matrix = [[]]
    expect(isBomb(matrix, 0, 0)).toBe(false)
  })
})
