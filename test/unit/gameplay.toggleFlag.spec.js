import { toggleFlag, FLAG, MASK } from '../../lib/gameplay'

describe('toggleFlag', function () {
  it('sets an unflagged tile as flagged', function () {
    const tile = { [FLAG]: false, [MASK]: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(true)
    expect(matrix[0][0][FLAG]).toBe(true)
  })

  it('sets an flagged tile as unflagged', function () {
    const tile = { [FLAG]: true, [MASK]: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0][FLAG]).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', function () {
    const tile = { [FLAG]: false, [MASK]: false }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0][FLAG]).toBe(false)
  })
})
