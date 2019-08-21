import { isCell, safeGet, PROPS, createMap } from '../../lib/gameplay'

describe('isCell', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

  it('returns true if the tile is masked', () => {
    const tile = { ..._, [PROPS.BOMB]: true }
    expect(isCell(PROPS.BOMB, tile)).toBe(true)
  })

  it('returns false if the tile not is masked', () => {
    const tile = { ..._ }
    expect(isCell(PROPS.BOMB, tile)).toBe(false)
  })

  it('returns false if the tile is undefined', () => {
    const matrix = createMap([[]])
    const el = safeGet(matrix, {r: 0, c: 0})
    expect(isCell(PROPS.BOMB, el)).toBe(false)
  })
})
