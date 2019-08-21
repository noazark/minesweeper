import { isCell, PROPS } from '../../lib/gameplay'
import { createMap, _ } from './util'

describe('isCell', () => {
  it('returns true if the cell is masked', () => {
    const map = createMap([[{ ..._, [PROPS.BOMB]: true }]])
    expect(isCell(map, {r:0, c:0}, PROPS.BOMB)).toBe(true)
  })

  it('returns false if the cell not is masked', () => {
    const map = createMap([[{ ..._ }]])
    expect(isCell(map, {r:0, c:0}, PROPS.BOMB)).toBe(false)
  })

  it('returns false if the cell is undefined', () => {
    const map = createMap([[]])
    expect(isCell(map, {r:0, c:0}, PROPS.BOMB)).toBe(false)
  })
})
