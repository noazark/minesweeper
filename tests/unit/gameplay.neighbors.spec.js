import { neighbors } from '../../lib/gameplay'

describe('neighbors', function () {
  const _ = 1
  /* eslint-disable standard/array-bracket-even-spacing */
  const matrix = [
    [_, _, _],
    [_, _, _],
    [_, _, _]
  ]
  /* eslint-enable standard/array-bracket-even-spacing */

  it('itterates over all adjacent tiles', function () {
    const iterated = neighbors(matrix, 1, 1)
    expect(iterated).toContainEqual({r: 0, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 1})
    expect(iterated).toContainEqual({r: 0, c: 2})
    expect(iterated).toContainEqual({r: 1, c: 0})
    expect(iterated).not.toContainEqual({r: 1, c: 1})
    expect(iterated).toContainEqual({r: 1, c: 2})
    expect(iterated).toContainEqual({r: 2, c: 0})
    expect(iterated).toContainEqual({r: 2, c: 1})
    expect(iterated).toContainEqual({r: 2, c: 2})
  })

  it('itterates over all adjacent tiles on corners', function () {
    const iterated = neighbors(matrix, 0, 0)
    expect(iterated).not.toContainEqual({r: 0, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 1})
    expect(iterated).toContainEqual({r: 1, c: 0})
    expect(iterated).toContainEqual({r: 1, c: 1})
  })

  it('itterates over all adjacent tiles on sides', function () {
    const iterated = neighbors(matrix, 1, 0)
    expect(iterated).toContainEqual({r: 0, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 1})
    expect(iterated).not.toContainEqual({r: 1, c: 0})
    expect(iterated).toContainEqual({r: 1, c: 1})
    expect(iterated).toContainEqual({r: 2, c: 0})
    expect(iterated).toContainEqual({r: 2, c: 1})
  })
})
