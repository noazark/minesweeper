import { safeGet, createMap, PROPS } from '../../lib/gameplay'

describe('safeGet', () => {
  const tile = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

  it('returns the tile for the row and column', () => {
    const matrix = createMap([[tile]])
    expect(safeGet(matrix, {r: 0, c: 0})).toEqual(tile)
  })

  it('returns undefined if the column does not exist', () => {
    const matrix = createMap([[tile]])
    expect(safeGet(matrix, {r: 0, c: 1})).toBeUndefined()
  })

  it('returns undefined if the row does not exist', () => {
    const matrix = createMap([[tile]])
    expect(safeGet(matrix, {r: 1, c: 0})).toBeUndefined()
  })

  it('returns undefined if the tile does not exist', () => {
    const matrix = createMap([[]])
    expect(safeGet(matrix, {r: 0, c: 0})).toBeUndefined()
  })
})
