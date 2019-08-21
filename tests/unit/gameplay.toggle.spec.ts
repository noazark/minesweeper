import { toggle, createMap, PROPS, getCell, isCell } from '../../lib/gameplay'

describe('toggle', () => {
  const t = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false }

  it('toggles a tile property between true and false', () => {
    const matrix = createMap([
      [t],
    ])
    const p = {r: 0, c: 0}
    const prop = PROPS.MASK

    expect(toggle(matrix, p, prop)).toBeFalsy()
    expect(isCell(prop, getCell(matrix, p))).toBeFalsy()

    expect(toggle(matrix, p, prop)).toBeTruthy()
    expect(isCell(prop, getCell(matrix, p))).toBeTruthy()
  })

  it('can set a tile property explicitly', () => {
    const matrix = createMap([
      [t, t],
    ])
    const p = {r: 0, c: 0}
    const prop = PROPS.MASK

    expect(toggle(matrix, p, prop, true)).toBeTruthy()
    expect(isCell(prop, getCell(matrix, p))).toBeTruthy()

    expect(toggle(matrix, p, prop, true)).toBeTruthy()
    expect(isCell(prop, getCell(matrix, p))).toBeTruthy()

    expect(toggle(matrix, p, prop, false)).toBeFalsy()
    expect(isCell(prop, getCell(matrix, p))).toBeFalsy()

    expect(toggle(matrix, p, prop, false)).toBeFalsy()
    expect(isCell(prop, getCell(matrix, p))).toBeFalsy()
  })
})
