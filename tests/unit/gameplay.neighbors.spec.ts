import { neighbors, pointToOffset } from '../../lib/gameplay'
import { createMap, _ } from './util'

describe('neighbors', () => {
  /* eslint-disable standard/array-bracket-even-spacing */
  const matrix = createMap([
    [_, _, _],
    [_, _, _],
    [_, _, _]
  ])
  /* eslint-enable standard/array-bracket-even-spacing */

  it('iterates over all adjacent tiles', () => {
    const iterated = neighbors(matrix, 4)
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 1}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 2}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 1, c: 0}))
    expect(iterated).not.toContainEqual(pointToOffset(matrix, {r: 1, c: 1}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 1, c: 2}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 2, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 2, c: 1}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 2, c: 2}))
  })

  it('iterates over all adjacent tiles on corners', () => {
    const iterated = neighbors(matrix, 0)
    expect(iterated).not.toContainEqual(pointToOffset(matrix, {r: 0, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 1}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 1, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 1, c: 1}))
  })

  it('iterates over all adjacent tiles on sides', () => {
    const iterated = neighbors(matrix, 3)
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 0, c: 1}))
    expect(iterated).not.toContainEqual(pointToOffset(matrix, {r: 1, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 1, c: 1}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 2, c: 0}))
    expect(iterated).toContainEqual(pointToOffset(matrix, {r: 2, c: 1}))
  })
})
