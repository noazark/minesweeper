import { flatten } from 'lodash'
import {
  Map,
  buildField,
  toggleBit,
  PROPS
} from '../../lib/gameplay'

export interface Cell {
  [PROPS.BOMB]: boolean,
  [PROPS.FLAG]: boolean,
  [PROPS.MASK]: boolean
}

/**
 * Creates a map from a 2D array.
 *
 * Example:
 * ```
 * const t = {
 *   bomb: false,
 *   mask: true,
 *   flag: false
 * }
 * createMap([
 *   [t, t],
 *   [t, t]
 * ])
 * ```
 *
 * @param arr A 2D array containing cell objects. It is assumed that all child
 *            arrays are the same length.
 */
export function createMap (arr: Array<Array<Cell>>):Map {
  const w = arr[0].length
  const h = arr.length

  const map = buildField(w, h)

  flatten(arr).forEach((el, i) => {
    toggleBit(map[PROPS.BOMB], i, el[PROPS.BOMB])
    toggleBit(map[PROPS.MASK], i, el[PROPS.MASK])
    toggleBit(map[PROPS.FLAG], i, el[PROPS.FLAG])
  })

  return map
}

export const _ = Object.freeze({
  [PROPS.MASK]: true,
  [PROPS.BOMB]: false,
  [PROPS.FLAG]: false
})
export const o = Object.freeze({ ..._, [PROPS.MASK]: false })
export const f = Object.freeze({ ..._, [PROPS.FLAG]: true })
export const b = Object.freeze({ ..._, [PROPS.BOMB]: true })
export const B = Object.freeze({ ..._, [PROPS.FLAG]: true, [PROPS.BOMB]: true })
export const x = Object.freeze({ ..._, [PROPS.MASK]: false, [PROPS.BOMB]: true })
export const I = Object.freeze({ ..._, [PROPS.MASK]: false, [PROPS.FLAG]: true, [PROPS.BOMB]: true })