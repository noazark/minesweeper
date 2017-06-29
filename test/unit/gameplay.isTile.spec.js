import { isTile, safeGet, BOMB } from '../../lib/gameplay'

describe('isTile', function () {
  it('returns true if the tile is masked', function () {
    const tile = { [BOMB]: true }
    expect(isTile(BOMB, tile)).toBe(true)
  })

  it('returns false if the tile not is masked', function () {
    const tile = { [BOMB]: false }
    expect(isTile(BOMB, tile)).toBe(false)
  })

  it('returns false if the tile is undefined', function () {
    const matrix = [[]]
    const el = safeGet(matrix, 0, 0)
    expect(isTile(BOMB, el)).toBe(false)
  })
})
