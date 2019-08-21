import { isComplete, createMap, PROPS } from '../../lib/gameplay'

describe('isComplete', () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }
  const o = { ..._, [PROPS.MASK]: false }
  const f = { ..._, [PROPS.FLAG]: true }
  const b = { ..._, [PROPS.BOMB]: true }
  const B = { ..._, [PROPS.FLAG]: true, [PROPS.BOMB]: true }
  const x = { ..._, [PROPS.MASK]: false, [PROPS.BOMB]: true }

  it('returns true if only masked bombs are left', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns true if only masked bombs or flagged bombs are left', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, o, B]
    ])

    expect(isComplete(matrix)).toBe(true)
  })

  it('returns false if any bombs are unmasked', () => {
    const matrix = createMap([
      [o, o, b],
      [o, x, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is incorrectly flagged', () => {
    const matrix = createMap([
      [o, o, b],
      [o, o, o],
      [o, f, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })

  it('returns false if a tile is left masked', () => {
    const matrix = createMap([
      [_, o, b],
      [o, o, o],
      [o, o, o]
    ])

    expect(isComplete(matrix)).toBe(false)
  })
})
