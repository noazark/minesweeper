import { unmaskAroundFlags, MASK, FLAG, BOMB } from '../../lib/gameplay'

describe('unmaskAroundFlags', function () {
  const _ = { [MASK]: true, [FLAG]: false, [BOMB]: false }
  const o = { [MASK]: false, [FLAG]: false, [BOMB]: false }
  const f = { [MASK]: true, [FLAG]: true, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }

  const matrix = [
    [_, o, b],
    [_, _, o],
    [_, _, f]
  ]

  describe('on unmasked tile w/ equal flags', function () {
    const unmasked = unmaskAroundFlags(matrix, 1, 2)

    it('does not unmask flags', function () {
      expect(unmasked).not.toContain({r: 2, c: 2})
    })

    it('unmasks bombs', function () {
      expect(unmasked).toContain({r: 0, c: 2})
    })

    it('unmasks adjacent titles', function () {
      expect(unmasked).toContain({r: 0, c: 0})
      expect(unmasked).toContain({r: 0, c: 1})
      expect(unmasked).toContain({r: 1, c: 0})
      expect(unmasked).toContain({r: 1, c: 1})
      expect(unmasked).toContain({r: 2, c: 1})
    })
  })

  describe('on unmasked tile w/ greater than equal flags', function () {
    const matrix = [
      [_, o, b, b],
      [_, o, _, _],
      [_, f, f, _]
    ]
    const unmasked = unmaskAroundFlags(matrix, 1, 1)

    it('does not unmask flags', function () {
      expect(unmasked).not.toContain({r: 2, c: 1})
      expect(unmasked).not.toContain({r: 2, c: 2})
    })

    it('unmasks bombs', function () {
      expect(unmasked).toContain({r: 0, c: 2})
    })
    
    it('does not unmask distant bombs', function () {
      expect(unmasked).not.toContain({r: 0, c: 3})
    })

    it('unmasks adjacent titles', function () {
      expect(unmasked).toContain({r: 0, c: 0})
      expect(unmasked).toContain({r: 0, c: 1})
      expect(unmasked).toContain({r: 1, c: 0})
      expect(unmasked).toContain({r: 1, c: 2})
      expect(unmasked).toContain({r: 1, c: 3})
    })
  })

  describe('on unmasked tile w/ missing flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, 0, 1).length).toEqual(0)
    })
  })

  describe('on unmasked tile w/ zero flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, 2, 2).length).toEqual(0)
    })
  })

  describe('on masked tile w/ equal flags', function () {
    it('unmasks nothing', function () {
      expect(unmaskAroundFlags(matrix, 1, 1).length).toEqual(0)
    })
  })
})
