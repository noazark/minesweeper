import { initializeMap, findBombs } from '../../lib/gameplay'
import { times } from 'lodash'

describe('initializeMap', () => {
  it('places bombs in the minefield', () => {
    const bombCount = 99

    // run several times to ensure the correct bomb count is created
    times(10, () => {
      const map = initializeMap(10, 10, bombCount)
      expect(findBombs(map).length).toEqual(bombCount)
    })
  })
})
