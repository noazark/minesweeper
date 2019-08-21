import { neighbors, createMap } from '../../lib/gameplay'

describe('neighbors', function () {
  const _ = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }
  /* eslint-disable standard/array-bracket-even-spacing */
  const matrix = createMap([
    [_, _, _],
    [_, _, _],
    [_, _, _]
  ])
  /* eslint-enable standard/array-bracket-even-spacing */

  it('iterates over all adjacent tiles', function () {
    const iterated = neighbors(matrix, {r: 1, c: 1})
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

  it('iterates over all adjacent tiles on corners', function () {
    const iterated = neighbors(matrix, {r: 0, c: 0})
    expect(iterated).not.toContainEqual({r: 0, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 1})
    expect(iterated).toContainEqual({r: 1, c: 0})
    expect(iterated).toContainEqual({r: 1, c: 1})
  })

  it('iterates over all adjacent tiles on sides', function () {
    const iterated = neighbors(matrix, {r: 1, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 0})
    expect(iterated).toContainEqual({r: 0, c: 1})
    expect(iterated).not.toContainEqual({r: 1, c: 0})
    expect(iterated).toContainEqual({r: 1, c: 1})
    expect(iterated).toContainEqual({r: 2, c: 0})
    expect(iterated).toContainEqual({r: 2, c: 1})
  })
})
