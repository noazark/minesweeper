import { unmask } from '../../src/gameplay'

describe('unmask', function () {
  const o = { isMasked: true, bombCount: 1, isBomb: false }
  const z = { isMasked: true, bombCount: 0, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isBomb: true }

  const matrix = [
    [z, o, b],
    [z, o, o],
    [z, z, f]
  ]

  it('is not pathological', function () {
    const matrix = [
      [z, z, z],
      [z, z, z],
      [z, z, z]
    ]

    expect(unmask(matrix, 1, 1).length).toEqual(9)
  })

  describe('zero adjacent bombs', function () {
    const unmasked = unmask(matrix, 2, 1)

    it('result includes self', function () {
      expect(unmasked).toContain({r: 2, c: 1})
    })

    it('result does not include bombs', function () {
      expect(unmasked).not.toContain({r: 0, c: 2})
    })

    it('result includes all adjacent tiles', function () {
      expect(unmasked).toContain({r: 1, c: 0})
      expect(unmasked).toContain({r: 1, c: 1})
      expect(unmasked).toContain({r: 1, c: 2})
      expect(unmasked).toContain({r: 2, c: 0})
    })

    it('result includes all siblings with 0 neighboring bombs', function () {
      expect(unmasked).toContain({r: 0, c: 0})
      expect(unmasked).toContain({r: 1, c: 0})
      expect(unmasked).toContain({r: 2, c: 0})
    })

    it('does not unmask flagged tiles', function () {
      expect(unmasked).not.toContain({r: 2, c: 2})
    })
  })

  describe('with adjacent bombs', function () {
    const unmasked = unmask(matrix, 0, 1)

    it('result only includes self', function () {
      expect(unmasked).toContain({r: 0, c: 1})
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('bomb', function () {
    const unmasked = unmask(matrix, 0, 1)

    it('result only includes self', function () {
      expect(unmasked).toContain({r: 0, c: 1})
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('flag', function () {
    const unmasked = unmask(matrix, 2, 2)

    it('result is empty', function () {
      expect(unmasked.length).toEqual(0)
    })
  })
})
