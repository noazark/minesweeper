import { unmaskAroundFlags } from '../../lib/gameplay'

describe('unmaskAroundFlags', function () {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const o = { isMasked: false, isFlagged: false, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }

  const matrix = [
    [_, o, b],
    [_, _, o],
    [_, _, f]
  ]

  describe('on unmasked tile w/ equal flags', function () {
    const unmasked = unmaskAroundFlags(matrix, {r: 1, c: 2})

    it('does not unmask flags', function () {
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })

    it('unmasks bombs', function () {
      expect(unmasked).toContainEqual({r: 0, c: 2})
    })

    it('unmasks adjacent titles', function () {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 1})
      expect(unmasked).toContainEqual({r: 2, c: 1})
    })
  })

  describe('on unmasked tile w/ greater than equal flags', function () {
    const matrix = [
      [_, o, b],
      [_, o, _],
      [_, f, f]
    ]
    const unmasked = unmaskAroundFlags(matrix, {r: 1, c: 1})

    it('does not unmask flags', function () {
      expect(unmasked).not.toContainEqual({r: 2, c: 1})
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })

    it('unmasks bombs', function () {
      expect(unmasked).toContainEqual({r: 0, c: 2})
    })

    it('unmasks adjacent titles', function () {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 2})
    })
  })

  describe('on unmasked tile w/ missing flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, {r: 0, c: 1}).length).toEqual(0)
    })
  })

  describe('on unmasked tile w/ zero flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, {r: 2, c: 2}).length).toEqual(0)
    })
  })

  describe('on masked tile w/ equal flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, {r: 1, c: 1}).length).toEqual(0)
    })
  })
})
