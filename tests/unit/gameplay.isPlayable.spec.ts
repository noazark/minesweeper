import { isPlayable, createMap } from '../../lib/gameplay'

describe('isPlayable', () => {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const o = { ..._, isMasked: false }
  const b = { ..._, isBomb: true }
  const B = { ..._, isMasked: false, isFlagged: true, isBomb: true }
  const x = { ..._, isMasked: false, isBomb: true }

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
      [o, o, B],
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
