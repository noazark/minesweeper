import { isTile, safeGet, PROPS, createMap } from '../../lib/gameplay'

describe('isTile', function () {
  const _ = {
    isMasked: false,
    isBomb: false,
    isFlagged:  false
  }

  it('returns true if the tile is masked', function () {
    const tile = { ..._, isBomb: true }
    expect(isTile(PROPS.BOMB, tile)).toBe(true)
  })

  it('returns false if the tile not is masked', function () {
    const tile = { ..._ }
    expect(isTile(PROPS.BOMB, tile)).toBe(false)
  })

  it('returns false if the tile is undefined', function () {
    const matrix = createMap([[]])
    const el = safeGet(matrix, {r: 0, c: 0})
    expect(isTile(PROPS.BOMB, el)).toBe(false)
  })
})
