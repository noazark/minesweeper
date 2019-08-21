import { toggle, PROPS, isCell } from '../../lib/gameplay'
import { createMap, _} from './util'

describe('toggle', () => {
  it('toggles a tile property between true and false', () => {
    const matrix = createMap([
      [_],
    ])
    const offset = 0
    const prop = PROPS.MASK

    expect(toggle(matrix, offset, prop)).toBeFalsy()
    expect(isCell(matrix, offset, prop)).toBeFalsy()

    expect(toggle(matrix, offset, prop)).toBeTruthy()
    expect(isCell(matrix, offset, prop)).toBeTruthy()
  })

  it('can set a tile property explicitly', () => {
    const matrix = createMap([
      [_, _],
    ])
    const offset = 0
    const prop = PROPS.MASK

    expect(toggle(matrix, offset, prop, true)).toBeTruthy()
    expect(isCell(matrix, offset, prop)).toBeTruthy()

    expect(toggle(matrix, offset, prop, true)).toBeTruthy()
    expect(isCell(matrix, offset, prop)).toBeTruthy()

    expect(toggle(matrix, offset, prop, false)).toBeFalsy()
    expect(isCell(matrix, offset, prop)).toBeFalsy()

    expect(toggle(matrix, offset, prop, false)).toBeFalsy()
    expect(isCell(matrix, offset, prop)).toBeFalsy()
  })
})
