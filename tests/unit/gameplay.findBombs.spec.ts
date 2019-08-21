import { findBombs } from '../../lib/gameplay'
import { createMap, _, b } from './util'

describe('findBombs', () => {

  it('returns all bomb coords', () => {
    const matrix = createMap([
      [_, _, b],
      [_, b, _],
      [b, _, _]
    ])

    expect(findBombs(matrix)).toEqual([
      {r: 0, c: 2},
      {r: 1, c: 1},
      {r: 2, c: 0}
    ])
  })
})
