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

  it('defaults bomb count to 20% of map size', () => {
    expect(findBombs(initializeMap(10, 10)).length).toEqual(20)
    expect(findBombs(initializeMap(31, 21)).length).toEqual(130)
    expect(findBombs(initializeMap(255, 127)).length).toEqual(6477)
  })

  it('throws an error if the map is invalid', () => {
    expect(() => initializeMap(10, 10, 100)).toThrow()
    expect(() => initializeMap(20, 14, 814)).toThrow()
    expect(() => initializeMap(2, 7, -1)).toThrow()
  })
})
