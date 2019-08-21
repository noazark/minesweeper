import { unmask, createMap, PROPS} from '../../lib/gameplay'

describe('unmask', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const f = { ..._, [PROPS.FLAG]: true }
  const b = { ..._, [PROPS.BOMB]: true }

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

    expect(unmask(matrix, {r: 1, c: 1}).length).toEqual(9)
  })

  describe('zero adjacent bombs', () => {
    const unmasked = unmask(matrix, {r: 2, c: 1})

    it('result includes self', () => {
      expect(unmasked).toContainEqual({r: 2, c: 1})
    })

    it('result does not include bombs', () => {
      expect(unmasked).not.toContainEqual({r: 0, c: 2})
    })

    it('result includes all adjacent tiles', () => {
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 1})
      expect(unmasked).toContainEqual({r: 1, c: 2})
      expect(unmasked).toContainEqual({r: 2, c: 0})
    })

    it('result includes all siblings with 0 neighboring bombs', () => {
      expect(unmasked).toContainEqual({r: 0, c: 0})
      expect(unmasked).toContainEqual({r: 1, c: 0})
      expect(unmasked).toContainEqual({r: 2, c: 0})
    })

    it('does not unmask flagged tiles', () => {
      expect(unmasked).not.toContainEqual({r: 2, c: 2})
    })
  })

  describe('with adjacent bombs', () => {
    const unmasked = unmask(matrix, {r: 0, c: 1})

    it('result only includes self', () => {
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('bomb', () => {
    const unmasked = unmask(matrix, {r: 0, c: 1})

    it('result only includes self', () => {
      expect(unmasked).toContainEqual({r: 0, c: 1})
      expect(unmasked.length).toEqual(1)
    })
  })

  describe('flag', () => {
    const unmasked = unmask(matrix, {r: 2, c: 2})

    it('result is empty', () => {
      expect(unmasked.length).toEqual(0)
    })
  })
})
