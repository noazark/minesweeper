import { findBombs, createMap, PROPS } from '../../lib/gameplay'

describe('findBombs', () => {
  const _ = {
    [PROPS.MASK]: true,
    [PROPS.BOMB]: false,
    [PROPS.FLAG]:  false
  }
  const b = { ..._, [PROPS.BOMB]: true }

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
