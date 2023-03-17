import { expect, describe, it } from 'vitest'
import { unmaskAroundFlags, pointToOffset } from '../../lib/gameplay'
import { createMap, _, f, o, b } from './util'

describe('unmaskAroundFlags', () => {
  const matrix = createMap([
    [_, o, b],
    [_, _, o],
    [_, _, f]
  ])

  describe('on unmasked tile w/ equal flags', () => {
    const unmasked = unmaskAroundFlags(matrix, 5)

    it('does not unmask flags', () => {
      expect(unmasked).not.toContainEqual(pointToOffset(matrix, { r: 2, c: 2 }))
    })

    it('unmasks bombs', () => {
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 2 }))
    })

    it('unmasks adjacent titles', () => {
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 0 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 1 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 1, c: 0 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 1, c: 1 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 2, c: 1 }))
    })
  })

  describe('on unmasked tile w/ greater than equal flags', () => {
    const matrix = createMap([
      [_, o, b],
      [_, o, _],
      [_, f, f]
    ])
    const unmasked = unmaskAroundFlags(matrix, 4)

    it('does not unmask flags', () => {
      expect(unmasked).not.toContainEqual(pointToOffset(matrix, { r: 2, c: 1 }))
      expect(unmasked).not.toContainEqual(pointToOffset(matrix, { r: 2, c: 2 }))
    })

    it('unmasks bombs', () => {
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 2 }))
    })

    it('unmasks adjacent titles', () => {
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 0 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 0, c: 1 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 1, c: 0 }))
      expect(unmasked).toContainEqual(pointToOffset(matrix, { r: 1, c: 2 }))
    })
  })

  describe('on unmasked tile w/ missing flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, 1).length).toEqual(0)
    })
  })

  describe('on unmasked tile w/ zero flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, 8).length).toEqual(0)
    })
  })

  describe('on masked tile w/ equal flags', () => {
    it('unmasks nothing', () => {
      expect(unmaskAroundFlags(matrix, 4).length).toEqual(0)
    })
  })
})
