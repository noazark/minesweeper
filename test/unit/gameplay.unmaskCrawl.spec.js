import { unmaskCrawl } from '../../src/gameplay'

describe('unmaskCrawl', function () {
  const o = { isMasked: true, bombCount: 1, isBomb: false }
  const z = { isMasked: true, bombCount: 0, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isBomb: true }

  it('is not pathological', function () {
    const matrix = [
      [z, z, z],
      [z, z, z],
      [z, z, z]
    ]

    expect(unmaskCrawl(matrix, 1, 1).length).toEqual(9)
  })

  it('returns immediately on flagged tile', function () {
    const matrix = [
      [z, o, b],
      [z, o, o],
      [z, z, f]
    ]
    expect(unmaskCrawl(matrix, 2, 2).length).toEqual(0)
  })

  it('does not return flagged neighbors', function () {
    const matrix = [
      [z, o, b],
      [z, o, o],
      [z, z, f]
    ]
    expect(unmaskCrawl(matrix, 2, 1)).not.toContain({r: 2, c: 2})
  })

  it('does not repeat previously unmasked neighbors', function () {
    const unmasked = {r: 2, c: 0}
    const matrix = [
      [z, o, b],
      [z, o, o],
      [z, z, f]
    ]
    expect(unmaskCrawl(matrix, 2, 1, [unmasked])).not.toContain(unmasked)
  })

  it('crawls the whole map if neighbor has no bomb neighbors', function () {
    const matrix = [
      [z, o, b],
      [z, o, o],
      [z, z, f]
    ]

    expect(unmaskCrawl(matrix, 2, 0)).not.toContain({r: 2, c: 2})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 0, c: 0})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 0, c: 1})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 1, c: 0})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 1, c: 1})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 1, c: 2})
    expect(unmaskCrawl(matrix, 2, 0)).toContain({r: 2, c: 1})
  })

  it('includes bombs if bombs should be unmasked', function () {
    const matrix = [
      [z, z, b],
      [z, z, z],
      [z, z, z]
    ]

    expect(unmaskCrawl(matrix, 1, 1, [], true)).toContain({r: 0, c: 2})
  })

  it('does not unmask distant bombs', function () {
    const matrix = [
      [z, z, b],
      [z, z, z],
      [z, z, z]
    ]

    expect(unmaskCrawl(matrix, 2, 0, [], true)).not.toContain({r: 0, c: 2})
  })

  it('returns neighbor if it is not a bomb, but neighbor has bombs', function () {
    const matrix = [
      [z, o, o],
      [o, o, o],
      [b, b, b]
    ]

    expect(unmaskCrawl(matrix, 0, 0)).toContain({r: 0, c: 1})
    expect(unmaskCrawl(matrix, 0, 0)).toContain({r: 1, c: 0})
    expect(unmaskCrawl(matrix, 0, 0)).toContain({r: 1, c: 1})
  })
})
