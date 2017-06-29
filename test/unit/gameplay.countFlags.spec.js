import { countFlags, MASK, FLAG, BOMB } from '../../lib/gameplay'

describe('countFlags', function () {
  const _ = { [MASK]: true, [FLAG]: false, [BOMB]: false }
  const o = { [MASK]: false, [FLAG]: false, [BOMB]: false }
  const f = { [MASK]: true, [FLAG]: true, [BOMB]: false }
  const b = { [MASK]: true, [FLAG]: false, [BOMB]: true }

  function expectFlags (expected, ...field) {
    expect(countFlags([...field])).toEqual(expected)
  }

  it('returns the number of flags on the field', function () {
    expectFlags(3,
      [f, o, b],
      [f, f, o],
      [o, o, o]
    )

    expectFlags(1,
      [_, o, f],
      [_, _, o],
      [o, o, o]
    )

    expectFlags(9,
      [f, f, f],
      [f, f, f],
      [f, f, f]
    )
  })
})
