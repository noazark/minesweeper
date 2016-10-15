import { isMasked } from '../../src/gameplay'

describe('isMasked', function () {
  it('returns true if the tile is masked', function () {
    const tile = { isMasked: true }
    const matrix = [[tile]]
    expect(isMasked(matrix, 0, 0)).toBe(true)
  })

  it('returns false if the tile not is masked', function () {
    const tile = { isMasked: false }
    const matrix = [[tile]]
    expect(isMasked(matrix, 0, 0)).toBe(false)
  })

  it('returns false if the tile is undefined', function () {
    const matrix = [[]]
    expect(isMasked(matrix, 0, 0)).toBe(false)
  })
})
