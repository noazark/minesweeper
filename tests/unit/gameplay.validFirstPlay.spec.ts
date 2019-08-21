import { validFirstPlay } from '../../lib/gameplay'
import { createMap, _, f, b } from './util'

describe('validFirstPlay', () => {
  const matrix = createMap([
    [_, _, b],
    [_, _, _],
    [_, _, f]
  ])

  it('returns true if tile is alone', () => {
    expect(validFirstPlay(matrix, 0)).toBe(true)
  })

  it('returns false if tile has neighboring bombs', () => {
    expect(validFirstPlay(matrix, 1)).toBe(false)
  })

  it('returns false if tile is a bomb', () => {
    expect(validFirstPlay(matrix, 2)).toBe(false)
  })
})
