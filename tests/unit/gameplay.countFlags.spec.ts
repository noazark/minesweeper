import { createMap, Map, countFlags } from '../../lib/gameplay'


describe('countFlags', () => {
  const _ = {
    isMasked: true,
    isBomb: false,
    isFlagged:  false
  }
  const o = { ..._, isMasked: false }
  const f = { ..._, isFlagged: true }
  const b = { ..._, isBomb: true }

  function expectFlags (expected:number, map:Map) {
    expect(countFlags(map)).toEqual(expected)
  }

  it('returns the number of flags on the field', () => {
    expectFlags(3, createMap([
      [f, o, b],
      [f, f, o],
      [o, o, o]
    ]))

    expectFlags(1, createMap([
      [_, o, f],
      [_, _, o],
      [o, o, o]
    ]))

    expectFlags(9, createMap([
      [f, f, f],
      [f, f, f],
      [f, f, f]
    ]))
  })
})
