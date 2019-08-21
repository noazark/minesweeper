import { neighboringBombs, createMap, PROPS } from '../../lib/gameplay'

describe('neighboringBombs', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const b = { ..._, [PROPS.BOMB]: true }

  it('returns the number of flags surrounding an tile', () => {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = createMap([
      [b, _, b],
      [_, _, _],
      [_, _, b]
    ])
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringBombs(matrix, {r: 1, c: 1})).toEqual(3)
    expect(neighboringBombs(matrix, {r: 0, c: 1})).toEqual(2)
    expect(neighboringBombs(matrix, {r: 2, c: 1})).toEqual(1)
    expect(neighboringBombs(matrix, {r: 2, c: 0})).toEqual(0)
  })

  it('returns just the flag count of the siblings, not including self', () => {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = createMap([
      [_, _, _],
      [_, b, _],
      [b, _, _]
    ])
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringBombs(matrix, {r: 1, c: 1})).toEqual(1)
  })
})
