import { isValidPoint } from '../../lib/gameplay'
import { createMap, _} from './util'

describe('isValidPoint', () => {
  it('returns the tile for the row and column', () => {
    const matrix = createMap([[_]])
    expect(isValidPoint(matrix, {r: 0, c: 0})).toBeTruthy()
  })

  it('returns undefined if the column does not exist', () => {
    const matrix = createMap([[_]])
    expect(isValidPoint(matrix, {r: 0, c: 1})).toBeFalsy()
  })

  it('returns undefined if the row does not exist', () => {
    const matrix = createMap([[_]])
    expect(isValidPoint(matrix, {r: 1, c: 0})).toBeFalsy()
  })

  it('returns undefined if the tile does not exist', () => {
    const matrix = createMap([[]])
    expect(isValidPoint(matrix, {r: 0, c: 0})).toBeFalsy()
  })
})
