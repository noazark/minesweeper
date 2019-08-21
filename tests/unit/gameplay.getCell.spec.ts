import { getCell, createMap, PROPS } from '../../lib/gameplay'

describe('getCell', () => {
  const t = {
    [PROPS.MASK]: true,
    [PROPS.BOMB]: false,
    [PROPS.FLAG]:  false
  }
  const a = { ...t, [PROPS.FLAG]: true }
  const b = { ...t, [PROPS.BOMB]: true }

  const matrix = createMap([
    [a, t, t, t, t],
    [t, t, t, t, b],
    [t, t, t, t, t],
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
