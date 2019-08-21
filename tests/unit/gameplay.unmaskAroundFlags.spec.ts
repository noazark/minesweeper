import { unmaskAroundFlags } from '../../lib/gameplay'
import { createMap, _, f, o, b } from './util'

describe('unmaskAroundFlags', () => {
  const matrix = createMap([
    [_, o, b],
    [_, _, o],
    [_, _, f]
  ])

  describe('on unmasked tile w/ equal flags', () => {
    const unmasked = unmaskAroundFlags(matrix, {r: 1, c: 2})

    it('does not unmask flags', () => {
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })

    it('unmasks bombs', () => {
      expect(unmasked).toContainEqual({r: 0, c: 2})
    })

    it('unmasks adjacent titles', () => {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 1})
      expect(unmasked).toContainEqual({r: 2, c: 1})
    })
  })

  describe('on unmasked tile w/ greater than equal flags', () => {
    const matrix = createMap([
      [_, o, b],
      [_, o, _],
      [_, f, f]
    ])
    const unmasked = unmaskAroundFlags(matrix, {r: 1, c: 1})

    it('does not unmask flags', () => {
      expect(unmasked).not.toContainEqual({r: 2, c: 1})
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })

    it('unmasks bombs', () => {
      expect(unmasked).toContainEqual({r: 0, c: 2})
    })

    it('unmasks adjacent titles', () => {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 2})
    })
  })

  describe('on unmasked tile w/ missing flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, {r: 0, c: 1}).length).toEqual(0)
    })
  })

  describe('on unmasked tile w/ zero flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, {r: 2, c: 2}).length).toEqual(0)
    })
  })

  describe('on masked tile w/ equal flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, {r: 1, c: 1}).length).toEqual(0)
    })
  })
})
