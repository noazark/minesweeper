import { isValidPoint, createMap, PROPS } from '../../lib/gameplay'

describe('isValidPoint', () => {
  const tile = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

  it('returns the tile for the row and column', () => {
    const matrix = createMap([[tile]])
    expect(isValidPoint(matrix, {r: 0, c: 0})).toBeTruthy()
  })

  it('returns undefined if the column does not exist', () => {
    const matrix = createMap([[tile]])
    expect(isValidPoint(matrix, {r: 0, c: 1})).toBeFalsy()
  })

  it('returns undefined if the row does not exist', () => {
    const matrix = createMap([[tile]])
    expect(isValidPoint(matrix, {r: 1, c: 0})).toBeFalsy()
  })

  it('returns undefined if the tile does not exist', () => {
    const matrix = createMap([[]])
    expect(isValidPoint(matrix, {r: 0, c: 0})).toBeFalsy()
  })
})
