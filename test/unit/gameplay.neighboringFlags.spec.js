import { neighboringFlags } from '../../src/gameplay'

describe('neighboringFlags', function () {
  const _ = { isFlagged: false }
  const f = { isFlagged: true }

  it('returns the number of flags surrounding an tile', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [f, _, _],
      [_, _, f],
      [_, f, _]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, 1, 1)).toEqual(3)
  })

  it('returns just the flag count of the siblings, not including self', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [_, _, _],
      [_, f, _],
      [f, _, _]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringFlags(matrix, 1, 1)).toEqual(1)
  })
})
