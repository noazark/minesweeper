import { getCell, PROPS } from '../../lib/gameplay'
import { createMap, _ } from './util'

describe('getCell', () => {
  const a = { ..._, [PROPS.FLAG]: true }
  const b = { ..._, [PROPS.BOMB]: true }

  const matrix = createMap([
    [a, _, _, _, _],
    [_, _, _, _, b],
    [_, _, _, _, _],
  ])

  it('returns the tile for the row and column', () => {
    expect(getCell(matrix, {r: 0, c: 0})).toEqual(a)
    expect(getCell(matrix, {r: 1, c: 4})).toEqual(b)
  })

  it('throws if the column does not exist', () => {
    expect(() => getCell(matrix, {r: 0, c: 5})).toThrow()
  })

  it('throws if the row does not exist', () => {
    expect(() => getCell(matrix, {r: 3, c: 0})).toThrow()
  })

  it('throws if the tile does not exist', () => {
    const matrix = createMap([[]])
    expect(() => getCell(matrix, {r: 0, c: 0})).toThrow()
  })
})
