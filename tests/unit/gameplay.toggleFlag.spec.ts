import { isCell, toggleFlag, PROPS } from '../../lib/gameplay'
import { createMap, _ } from './util'

describe('toggleFlag', () => {
  it('sets an unflagged tile as flagged', () => {
    const tile = { ..._ }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, 0)).toBe(true)
    expect(isCell(matrix, 0, PROPS.FLAG)).toBe(true)
  })

  it('sets an flagged tile as unflagged', () => {
    const tile = { ..._, [PROPS.FLAG]: true }
    const matrix = createMap([[tile]])

    expect(toggleFlag(matrix, 0)).toBe(false)
    expect(isCell(matrix, 0, PROPS.FLAG)).toBe(false)
  })

  it('cannot set an unmasked tile as flagged', () => {
    const tile = { ..._, [PROPS.MASK]: false }
    const matrix = createMap([[tile]])
    expect(toggleFlag(matrix, 0)).toBe(false)
    expect(isCell(matrix, 0, PROPS.FLAG)).toBe(false)
  })
})
