import { isPlayable } from '../../lib/gameplay'
import { createMap, _, o, b, x, I } from './util'

describe('isPlayable', () => {
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
