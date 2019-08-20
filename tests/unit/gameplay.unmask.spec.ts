import { unmask} from '../../lib/gameplay'

describe('unmask', function () {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }

  const matrix = [
    [_, _, b],
    [_, _, _],
    [_, _, f]
  ]

  it('is not pathological', function () {
    const matrix = [
      [_, _, _],
      [_, _, _],
      [_, _, _]
    ]

    expect(unmask(matrix, 1, 1).length).toEqual(9)
  })

  describe('zero adjacent bombs', function () {
    const unmasked = unmask(matrix, 2, 1)

    it('result includes self', function () {
      expect(unmasked).toContainEqual({r: 2, c: 1})
    })

    it('result does not include bombs', function () {
      expect(unmasked).not.toContainEqual({r: 0, c: 2})
    })

    it('result includes all adjacent tiles', function () {
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 2})
      expect(unmasked).toContainEqual({r: 2, c: 0})
    })

    it('result includes all siblings with 0 neighboring bombs', function () {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 2, c: 0})
    })

    it('does not unmask flagged tiles', function () {
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })
  })

  describe('with adjacent bombs', function () {
    const unmasked = unmask(matrix, 0, 1)

    it('result only includes self', function () {
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('bomb', function () {
    const unmasked = unmask(matrix, 0, 1)

    it('result only includes self', function () {
      expect(unmasked).toContainEqual({r: 0, c: 1})
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
