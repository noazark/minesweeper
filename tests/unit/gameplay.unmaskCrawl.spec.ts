import { unmaskCrawl, createMap, PROPS } from '../../lib/gameplay'

describe('unmaskCrawl', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const f = { ..._, [PROPS.FLAG]: true }
  const b = { ..._, [PROPS.BOMB]: true }

  it('is not pathological', () => {
    const matrix = createMap([
      [_, _, _],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, {r: 1, c: 1}).length).toEqual(9)
  })

  it('returns immediately on flagged tile', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    expect(unmaskCrawl(matrix, {r: 2, c: 2}).length).toEqual(0)
  })

  it('does not return flagged neighbors', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    expect(unmaskCrawl(matrix, {r: 2, c: 1})).not.toContainEqual({r: 2, c: 2})
  })

  it('does not repeat previously unmasked neighbors', () => {
    const unmasked = {r: 2, c: 0}
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])
    expect(unmaskCrawl(matrix, {r: 2, c: 1}, [unmasked])).not.toContainEqual(unmasked)
  })

  it('crawls the whole map if neighbor has no bomb neighbors', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, f]
    ])

    expect(unmaskCrawl(matrix, {r: 2, c: 0})).not.toContainEqual({r: 2, c: 2})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 0, c: 0})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 0, c: 1})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 1, c: 0})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 1, c: 1})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 1, c: 2})
    expect(unmaskCrawl(matrix, {r: 2, c: 0})).toContainEqual({r: 2, c: 1})
  })

  it('includes bombs if bombs should be unmasked', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, {r: 1, c: 1}, [], true)).toContainEqual({r: 0, c: 2})
  })

  it('does not unmask distant bombs', () => {
    const matrix = createMap([
      [_, _, b],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmaskCrawl(matrix, {r: 2, c: 0}, [], true)).not.toContainEqual({r: 0, c: 2})
  })

  it('returns neighbor if it is not a bomb, but neighbor has bombs', () => {
    const matrix = createMap([
      [_, _, _],
      [_, _, _],
      [b, b, b]
    ])

    expect(unmaskCrawl(matrix, {r: 0, c: 0})).toContainEqual({r: 0, c: 1})
    expect(unmaskCrawl(matrix, {r: 0, c: 0})).toContainEqual({r: 1, c: 0})
    expect(unmaskCrawl(matrix, {r: 0, c: 0})).toContainEqual({r: 1, c: 1})
  })
})
