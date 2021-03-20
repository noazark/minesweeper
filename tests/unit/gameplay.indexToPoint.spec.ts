import { offsetToPoint } from '../../lib/gameplay'
import { createMap, _ } from './util'

describe('offsetToPoint', () => {
  const matrix = createMap([
    [_, _, _, _, _],
    [_, _, _, _, _],
    [_, _, _, _, _],
  ])

  it('returns the point for any given offset', () => {
    expect(offsetToPoint(matrix, 0)).toEqual({r: 0, c: 0})
    expect(offsetToPoint(matrix, 1)).toEqual({r: 0, c: 1})
    expect(offsetToPoint(matrix, 2)).toEqual({r: 0, c: 2})
    expect(offsetToPoint(matrix, 3)).toEqual({r: 0, c: 3})
    expect(offsetToPoint(matrix, 4)).toEqual({r: 0, c: 4})
    expect(offsetToPoint(matrix, 5)).toEqual({r: 1, c: 0})
    expect(offsetToPoint(matrix, 6)).toEqual({r: 1, c: 1})
    expect(offsetToPoint(matrix, 7)).toEqual({r: 1, c: 2})
    expect(offsetToPoint(matrix, 8)).toEqual({r: 1, c: 3})
    expect(offsetToPoint(matrix, 9)).toEqual({r: 1, c: 4})
    expect(offsetToPoint(matrix, 10)).toEqual({r: 2, c: 0})
    expect(offsetToPoint(matrix, 11)).toEqual({r: 2, c: 1})
    expect(offsetToPoint(matrix, 12)).toEqual({r: 2, c: 2})
    expect(offsetToPoint(matrix, 13)).toEqual({r: 2, c: 3})
    expect(offsetToPoint(matrix, 14)).toEqual({r: 2, c: 4})
    expect(() => offsetToPoint(matrix, 15)).toThrow()
  })
})
