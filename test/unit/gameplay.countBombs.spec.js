import { countBombs } from '../../src/gameplay'

describe('countBombs', function () {
  const y = { isBomb: true }
  const n = { isBomb: false }

  it('returns the number of flags surrounding an tile', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [y, n, y],
      [n, n, n],
      [n, n, y]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(countBombs(matrix, 1, 1)).toEqual(3)
    expect(countBombs(matrix, 0, 1)).toEqual(2)
    expect(countBombs(matrix, 2, 1)).toEqual(1)
    expect(countBombs(matrix, 2, 0)).toEqual(0)
  })

  it('returns just the flag count of the siblings, not including self', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [n, n, n],
      [n, y, n],
      [y, n, n]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(countBombs(matrix, 1, 1)).toEqual(1)
  })
})
