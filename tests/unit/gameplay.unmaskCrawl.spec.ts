import { unmaskCrawl, pointToIndex } from '../../lib/gameplay'
import { createMap, _, f, b } from './util'

describe('unmaskCrawl', () => {
  it('is not pathological', () => {
    const matrix = createMap([
      [_, _, _],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, 4).length).toEqual(9)
  })

  it('returns immediately on flagged tile', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    expect(unmaskCrawl(matrix, 8).length).toEqual(0)
  })

  it('does not return flagged neighbors', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    const unmasked = pointToIndex(matrix, {r: 2, c: 2})
    expect(unmaskCrawl(matrix, 7)).not.toContainEqual(unmasked)
  })

  it('does not repeat previously unmasked neighbors', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    const unmasked = pointToIndex(matrix, {r: 2, c: 0})
    expect(unmaskCrawl(matrix, 7, [unmasked])).not.toContainEqual(unmasked)
  })

  it('crawls the whole map if neighbor has no bomb neighbors', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])

    const plan = unmaskCrawl(matrix, 6)

    expect(plan).not.toContainEqual(pointToIndex(matrix, {r: 2, c: 2}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 0, c: 0}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 0, c: 1}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 1, c: 0}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 1, c: 1}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 1, c: 2}))
    expect(plan).toContainEqual(pointToIndex(matrix, {r: 2, c: 1}))
  })

  it('includes bombs if bombs should be unmasked', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, 4, [], true)).toContainEqual(pointToIndex(matrix, {r: 0, c: 2}))
  })

  it('does not unmask distant bombs', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, 6, [], true)).not.toContainEqual(pointToIndex(matrix, {r: 0, c: 2}))
  })

  it('returns neighbor if it is not a bomb, but neighbor has bombs', () => {
    const matrix = createMap([
      [_, _, _],
      [_, _, _],
      [b, b, b]
    ])

    expect(unmaskCrawl(matrix, 0)).toContainEqual(pointToIndex(matrix, {r: 0, c: 1}))
    expect(unmaskCrawl(matrix, 0)).toContainEqual(pointToIndex(matrix, {r: 1, c: 0}))
    expect(unmaskCrawl(matrix, 0)).toContainEqual(pointToIndex(matrix, {r: 1, c: 1}))
  })
})
