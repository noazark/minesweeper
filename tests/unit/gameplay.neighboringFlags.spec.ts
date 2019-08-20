import { neighboringFlags } from '../../lib/gameplay'

describe('neighboringFlags', function () {
  const _ = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }
  const f = { ..._, isFlagged: true }

  it('returns the number of flags surrounding an tile', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [f, _, _],
      [_, _, f],
      [_, f, _]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, {r: 1, c: 1})).toEqual(3)
  })

  it('returns just the flag count of the siblings, not including self', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [_, _, _],
      [_, f, _],
      [f, _, _]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, {r: 1, c: 1})).toEqual(1)
  })
})
