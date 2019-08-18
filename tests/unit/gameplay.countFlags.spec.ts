import { Map, countFlags } from '../../lib/gameplay'


describe('countFlags', function () {
  const _ = {
    isMasked: true,
    isBomb: false,
    isFlagged:  false
  }
  const o = { ..._, isMasked: false }
  const f = { ..._, isFlagged: true }
  const b = { ..._, isBomb: true }

  function expectFlags (expected:number, ...field:Map) {
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
