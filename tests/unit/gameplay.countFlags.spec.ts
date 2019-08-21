import { createMap, Map, countFlags, PROPS } from '../../lib/gameplay'


describe('countFlags', () => {
  const _ = {
    [PROPS.MASK]: true,
    [PROPS.BOMB]: false,
    [PROPS.FLAG]:  false
  }
  const o = { ..._, [PROPS.MASK]: false }
  const f = { ..._, [PROPS.FLAG]: true }
  const b = { ..._, [PROPS.BOMB]: true }

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
