import { countFlags } from '../../src/gameplay'

describe('countFlags', function () {
  const y = { isFlagged: true }
  const n = { isFlagged: false }

  it('returns the number of flags surrounding an tile', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [y, n, n],
      [n, n, y],
      [n, y, n]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(countFlags(matrix, 1, 1)).toEqual(3)
  })

  it('returns just the flag count of the siblings, not including self', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [n, n, n],
      [n, y, n],
      [y, n, n]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(countFlags(matrix, 1, 1)).toEqual(1)
  })
})
