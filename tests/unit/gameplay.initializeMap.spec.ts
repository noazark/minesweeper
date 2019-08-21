import { initializeMap } from '../../lib/gameplay'
import {flatten, times} from 'lodash'

describe('initializeMap', function () {
  it('creates a variable sized minefield', function () {
    expect(initializeMap(3, 3, 0).data.length).toEqual(9)
    expect(initializeMap(10, 3, 0).data.length).toEqual(30)
  })

  it('fills the minefield with tiles', function () {
    const map = initializeMap(1, 1, 0)

    map.data.forEach((el) => {
      expect(el).toEqual({
        isBomb: false,
        isMasked: true,
        isFlagged: false
      })
    })
  })

  it('places bombs in the minefield', function () {
    const bombCount = 99

    // run several times to ensure the correct bomb count is created
    times(10, () => {
      const map = initializeMap(10, 10, bombCount)
      expect(map.data.reduce((total, tile) => total + (tile.isBomb ? 1 : 0), 0)).toEqual(bombCount)
    })
  })
})
