import { findBombs, BOMB } from '../../lib/gameplay'

describe('findBombs', function () {
  const _ = { [BOMB]: false }
  const b = { [BOMB]: true }

  it('returns all bomb coords', function () {
    const matrix = [
      [_, _, b],
      [_, b, _],
      [b, _, _]
    ]

    expect(findBombs(matrix)).toEqual([
      {r: 0, c: 2},
      {r: 1, c: 1},
      {r: 2, c: 0}
    ])
  })
})
