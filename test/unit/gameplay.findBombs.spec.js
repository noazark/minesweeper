import { findBombs } from '../../src/gameplay'

describe('findBombs', function () {
  const _ = { isBomb: false }
  const b = { isBomb: true }

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
