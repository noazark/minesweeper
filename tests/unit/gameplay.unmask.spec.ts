import { unmask, pointToIndex } from '../../lib/gameplay'
import { createMap, _, f, b } from './util'

describe('unmask', () => {
  const matrix = createMap([
    [_, _, b],
    [_, _, _],
    [_, _, f]
  ])

  it('is not pathological', () => {
    const matrix = createMap([
      [_, _, _],
      [_, _, _],
      [_, _, _]
    ])

    expect(unmask(matrix, 4).length).toEqual(9)
  })

  describe('zero adjacent bombs', () => {
    const unmasked = unmask(matrix, 7)

    it('result includes self', () => {
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 2, c: 1}))
    })

    it('result does not include bombs', () => {
      expect(unmasked).not.toContainEqual(pointToIndex(matrix, {r: 0, c: 2}))
    })

    it('result includes all adjacent tiles', () => {
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 1, c: 0}))
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 1, c: 1}))
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 1, c: 2}))
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 2, c: 0}))
    })

    it('result includes all siblings with 0 neighboring bombs', () => {
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 0, c: 0}))
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 1, c: 0}))
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 2, c: 0}))
    })

    it('does not unmask flagged tiles', () => {
      expect(unmasked).not.toContainEqual(pointToIndex(matrix, {r: 2, c: 2}))
    })
  })

  describe('with adjacent bombs', () => {
    const unmasked = unmask(matrix, 1)

    it('result only includes self', () => {
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 0, c: 1}))
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('bomb', () => {
    const unmasked = unmask(matrix, 1)

    it('result only includes self', () => {
      expect(unmasked).toContainEqual(pointToIndex(matrix, {r: 0, c: 1}))
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('flag', () => {
    const unmasked = unmask(matrix, 8)

    it('result is empty', () => {
      expect(unmasked.length).toEqual(0)
    })
  })
})
