import { initializeMap } from '../../lib/gameplay'
import {flatten, times} from 'lodash'

describe('initializeMap', function () {
  it('creates a variable sized minefield', function () {
    expect(flatten(initializeMap(3, 3, 0)).length).toEqual(9)
    expect(flatten(initializeMap(10, 3, 0)).length).toEqual(30)
  })

  it('creates minefiled columns and rows', function () {
    const rowCount = 5
    const columnCount = 3
    const rows = initializeMap(columnCount, rowCount, 0)

    expect(rows.length).toEqual(rowCount)
    rows.forEach((column) => {
      expect(column.length).toEqual(columnCount)
    })
  })

  it('fills the minefield with tiles', function () {
    const rows = initializeMap(1, 1, 0)

    rows.forEach((column) => {
      column.forEach((tile) => {
        expect(tile).toEqual({
          isBomb: false,
          isMasked: true,
          isFlagged: false
        })
      })
    })
  })

  it('places bombs in the minefield', function () {
    const bombCount = 99

    // run several times to ensure the correct bomb count is created
    times(10, () => {
      const field = initializeMap(10, 10, bombCount)
      expect(flatten(field).reduce((total, tile) => total + (tile.isBomb ? 1 : 0), 0)).toEqual(bombCount)
    })
  })
})
