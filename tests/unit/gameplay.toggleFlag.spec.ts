import { toggleFlag, FLAG } from '../../lib/gameplay'

describe('toggleFlag', function () {
  const _ = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }

  it('sets an unflagged tile as flagged', function () {
    const tile = { ..._, isMasked: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(true)
    expect(matrix[0][0][FLAG]).toBe(true)
  })

  it('sets an flagged tile as unflagged', function () {
    const tile = { ..._, isFlagged: true, isMasked: true }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0][FLAG]).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', function () {
    const tile = { ..._ }
    const matrix = [[tile]]
    expect(toggleFlag(matrix, 0, 0)).toBe(false)
    expect(matrix[0][0][FLAG]).toBe(false)
  })
})
