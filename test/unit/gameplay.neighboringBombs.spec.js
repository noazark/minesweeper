import { neighboringBombs, BOMB } from '../../lib/gameplay'

describe('neighboringBombs', function () {
  const _ = { [BOMB]: false }
  const b = { [BOMB]: true }

  it('returns the number of flags surrounding an tile', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [b, _, b],
      [_, _, _],
      [_, _, b]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringBombs(matrix, 1, 1)).toEqual(3)
    expect(neighboringBombs(matrix, 0, 1)).toEqual(2)
    expect(neighboringBombs(matrix, 2, 1)).toEqual(1)
    expect(neighboringBombs(matrix, 2, 0)).toEqual(0)
  })

  it('returns just the flag count of the siblings, not including self', function () {
    /* eslint-disable standard/array-bracket-even-spacing */
    const matrix = [
      [_, _, _],
      [_, b, _],
      [b, _, _]
    ]
    /* eslint-enable standard/array-bracket-even-spacing */

    expect(neighboringBombs(matrix, 1, 1)).toEqual(1)
  })
})
