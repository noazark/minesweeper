import { isPlayable, createMap, PROPS } from '../../lib/gameplay'

describe('isPlayable', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const o = { ..._, [PROPS.MASK]: false }
  const b = { ..._, [PROPS.BOMB]: true }
  const x = { ..._, [PROPS.MASK]: false, [PROPS.BOMB]: true }
  const I = { ..._, [PROPS.MASK]: false, [PROPS.FLAG]: true, [PROPS.BOMB]: true }

  it('returns true if no bombs are unmasked', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, o, o]
    ])

    expect(isPlayable(matrix)).toBe(true)
  })

  it('returns true if no bombs are unmasked or unflagged', () => {
    const matrix = createMap([
      [o, o, I],
      [b, o, o],
      [o, o, o]
    ])

    expect(isPlayable(matrix)).toBe(false)
  })

  it('returns false if a bomb is exposed', () => {
    const matrix = createMap([
      [o, o, x],
      [b, o, o],
      [o, o, o]
    ])

    expect(isPlayable(matrix)).toBe(false)
  })
})
