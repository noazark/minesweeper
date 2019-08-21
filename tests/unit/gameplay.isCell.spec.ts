import { isCell, PROPS, createMap } from '../../lib/gameplay'

describe('isCell', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

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
