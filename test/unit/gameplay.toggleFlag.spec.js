import { toggleFlag } from '../../src/gameplay'

describe('toggleFlag', function () {
  it('sets an unflagged element as flagged', function () {
    const element = { isFlagged: false }
    const matrix = [[element]]
    expect(toggleFlag(matrix, 0, 0)).toBe(true)
    expect(matrix[0][0].isFlagged).toBe(true)
  })

  it('sets an flagged element as unflagged', function () {
    const element = { isFlagged: true }
    const matrix = [[element]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0].isFlagged).toBe(false)
  })
})
