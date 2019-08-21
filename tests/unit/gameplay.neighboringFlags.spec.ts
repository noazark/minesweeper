import { neighboringFlags, createMap, PROPS } from '../../lib/gameplay'

describe('neighboringFlags', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const f = { ..._, [PROPS.FLAG]: true }

  it('returns the number of flags surrounding an tile', () => {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = createMap([
      [f, _, _],
      [_, _, f],
      [_, f, _]
    ])
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, {r: 1, c: 1})).toEqual(3)
  })

  it('returns just the flag count of the siblings, not including self', () => {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = createMap([
      [_, _, _],
      [_, f, _],
      [f, _, _]
    ])
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, {r: 1, c: 1})).toEqual(1)
  })
})
