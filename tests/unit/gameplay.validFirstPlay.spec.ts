import { validFirstPlay, createMap } from '../../lib/gameplay'

describe('validFirstPlay', () => {
  const _ = { isMasked: true, isFlagged: false, isBomb: false }
  const f = { ..._, isFlagged: true }
  const b = { ..._, isBomb: true }

  const matrix = createMap([
    [_, _, b],
    [_, _, _],
    [_, _, f]
  ])

  it('returns true if tile is alone', () => {
    expect(validFirstPlay(matrix, {r: 0, c: 0})).toBe(true)
  })

  it('returns false if tile has neighboring bombs', () => {
    expect(validFirstPlay(matrix, {r: 0, c: 1})).toBe(false)
  })

  it('returns false if tile is a bomb', () => {
    expect(validFirstPlay(matrix, {r: 0, c: 2})).toBe(false)
  })
})
