import { initializeMap, toArray } from '../../lib/gameplay'
import { times } from 'lodash'

describe('initializeMap', () => {
  it('creates a variable sized minefield', () => {
    expect(toArray(initializeMap(3, 3, 0)).length).toEqual(9)
    expect(toArray(initializeMap(10, 3, 0)).length).toEqual(30)
  })

  it('fills the minefield with tiles', () => {
    const map = initializeMap(1, 1, 0)

    toArray(map).forEach((el) => {
      expect(el).toEqual({
        isBomb: false,
        isMasked: true,
        isFlagged: false
      })
    })
  })

  it('places bombs in the minefield', () => {
    const bombCount = 99

    // run several times to ensure the correct bomb count is created
    times(10, () => {
      const map = initializeMap(10, 10, bombCount)
      expect(toArray(map).reduce((total, tile) => total + (tile.isBomb ? 1 : 0), 0)).toEqual(bombCount)
    })
  })
})
