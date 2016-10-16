import { countFlags } from '../../lib/gameplay'

describe('countFlags', function () {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const o = { isMasked: false, isFlagged: false, isBomb: false }
  const f = { isMasked: true, isFlagged: true, isBomb: false }
  const b = { isMasked: true, isFlagged: false, isBomb: true }

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
