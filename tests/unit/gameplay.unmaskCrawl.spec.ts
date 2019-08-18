import { unmaskCrawl, MASK, FLAG, BOMB } from '../../lib/gameplay'

describe('unmaskCrawl', function () {
  const _ = { [MASK]: true, [FLAG]: false, [BOMB]: false }
  const f = { [MASK]: true, [FLAG]: true, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }

  it('is not pathological', function () {
    const matrix = [
      [_, _, _],
      [_, _, _],
      [_, _, _]
    ]

    expect(unmaskCrawl(matrix, 1, 1).length).toEqual(9)
  })

  it('returns immediately on flagged tile', function () {
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ]
    expect(unmaskCrawl(matrix, 2, 2).length).toEqual(0)
  })

  it('does not return flagged neighbors', function () {
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ]
    expect(unmaskCrawl(matrix, 2, 1)).not.toContainEqual({r: 2, c: 2})
  })

  it('does not repeat previously unmasked neighbors', function () {
    const unmasked = {r: 2, c: 0}
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ]
    expect(unmaskCrawl(matrix, 2, 1, [unmasked])).not.toContainEqual(unmasked)
  })

  it('crawls the whole map if neighbor has no bomb neighbors', function () {
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ]

    expect(unmaskCrawl(matrix, 2, 0)).not.toContainEqual({r: 2, c: 2})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 0, c: 0})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 0, c: 1})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 1, c: 0})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 1, c: 1})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 1, c: 2})
    expect(unmaskCrawl(matrix, 2, 0)).toContainEqual({r: 2, c: 1})
  })

  it('includes bombs if bombs should be unmasked', function () {
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ]

    expect(unmaskCrawl(matrix, 1, 1, [], true)).toContainEqual({r: 0, c: 2})
  })

  it('does not unmask distant bombs', function () {
    const matrix = [
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ]

    expect(unmaskCrawl(matrix, 2, 0, [], true)).not.toContainEqual({r: 0, c: 2})
  })

  it('returns neighbor if it is not a bomb, but neighbor has bombs', function () {
    const matrix = [
      [_, _, _],
      [_, _, _],
      [b, b, b]
    ]

    expect(unmaskCrawl(matrix, 0, 0)).toContainEqual({r: 0, c: 1})
    expect(unmaskCrawl(matrix, 0, 0)).toContainEqual({r: 1, c: 0})
    expect(unmaskCrawl(matrix, 0, 0)).toContainEqual({r: 1, c: 1})
  })
})
