import { toggleFlag } from '../../lib/gameplay'

describe('toggleFlag', function () {
  it('sets an unflagged tile as flagged', function () {
    const tile = { isFlagged: false, isMasked: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(true)
    expect(matrix[0][0].isFlagged).toBe(true)
  })

  it('sets an flagged tile as unflagged', function () {
    const tile = { isFlagged: true, isMasked: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0].isFlagged).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', function () {
    const tile = { isFlagged: false, isMasked: false }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0].isFlagged).toBe(false)
  })
})
