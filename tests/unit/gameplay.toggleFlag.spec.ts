import { getCell, toggleFlag, createMap } from '../../lib/gameplay'

describe('toggleFlag', function () {
  const _ = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }

  it('sets an unflagged tile as flagged', function () {
    const tile = { ..._, isMasked: true }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(true)
    expect(getCell(matrix, {r: 0, c: 0}).isFlagged).toBe(true)
  })

  it('sets an flagged tile as unflagged', function () {
    const tile = { ..._, isFlagged: true, isMasked: true }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(false)
    expect(getCell(matrix, {r: 0, c: 0}).isFlagged).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', function () {
    const tile = { ..._ }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(false)
    expect(getCell(matrix, {r: 0, c: 0}).isFlagged).toBe(false)
  })
})
