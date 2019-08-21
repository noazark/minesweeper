import { indexToPoint, createMap } from '../../lib/gameplay'

describe('indexToPoint', () => {
  const t = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }

  const matrix = createMap([
    [t, t, t, t, t],
    [t, t, t, t, t],
    [t, t, t, t, t],
  ])

  it('returns the point for any given index', () => {
    expect(indexToPoint(matrix, 0)).toEqual({r: 0, c: 0})
    expect(indexToPoint(matrix, 1)).toEqual({r: 0, c: 1})
    expect(indexToPoint(matrix, 2)).toEqual({r: 0, c: 2})
    expect(indexToPoint(matrix, 3)).toEqual({r: 0, c: 3})
    expect(indexToPoint(matrix, 4)).toEqual({r: 0, c: 4})
    expect(indexToPoint(matrix, 5)).toEqual({r: 1, c: 0})
    expect(indexToPoint(matrix, 6)).toEqual({r: 1, c: 1})
    expect(indexToPoint(matrix, 7)).toEqual({r: 1, c: 2})
    expect(indexToPoint(matrix, 8)).toEqual({r: 1, c: 3})
    expect(indexToPoint(matrix, 9)).toEqual({r: 1, c: 4})
    expect(indexToPoint(matrix, 10)).toEqual({r: 2, c: 0})
    expect(indexToPoint(matrix, 11)).toEqual({r: 2, c: 1})
    expect(indexToPoint(matrix, 12)).toEqual({r: 2, c: 2})
    expect(indexToPoint(matrix, 13)).toEqual({r: 2, c: 3})
    expect(indexToPoint(matrix, 14)).toEqual({r: 2, c: 4})
    expect(() => indexToPoint(matrix, 15)).toThrow()
  })
})
