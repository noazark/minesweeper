import { getCell, createMap } from '../../lib/gameplay'

describe('getCell', function () {
  const t = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }
  const a = {...t}
  const b = {...t}

  const matrix = createMap([
    [a, t, t, t, t],
    [t, t, t, t, b],
    [t, t, t, t, t],
  ])

  it('returns the tile for the row and column', function () {
    expect(getCell(matrix, {r: 0, c: 0})).toBe(a)
    expect(getCell(matrix, {r: 1, c: 4})).toBe(b)
  })

  it('throws if the column does not exist', function () {
    expect(() => getCell(matrix, {r: 0, c: 5})).toThrow()
  })

  it('throws if the row does not exist', function () {
    expect(() => getCell(matrix, {r: 3, c: 0})).toThrow()
  })

  it('throws if the tile does not exist', function () {
    const matrix = createMap([[]])
    expect(() => getCell(matrix, {r: 0, c: 0})).toThrow()
  })
})
