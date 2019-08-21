import { isCell, toggleFlag, createMap, PROPS } from '../../lib/gameplay'

describe('toggleFlag', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

  it('sets an unflagged tile as flagged', () => {
    const tile = { ..._ }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(true)
    expect(isCell(matrix, {r:0, c:0}, PROPS.FLAG)).toBe(true)
  })

  it('sets an flagged tile as unflagged', () => {
    const tile = { ..._, [PROPS.FLAG]: true }
    const matrix = createMap([[tile]])

    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(false)
    expect(isCell(matrix, {r:0, c:0}, PROPS.FLAG)).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', () => {
    const tile = { ..._, [PROPS.MASK]: false }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, {r: 0, c: 0})).toBe(false)
    expect(isCell(matrix, {r:0, c:0}, PROPS.FLAG)).toBe(false)
  })
})
