import { countNeighbors, PROPS } from "../../lib/gameplay";
import { createMap, _, b } from "./util";

describe("countNeighbors bombs", () => {
  it("returns the number of flags surrounding an tile", () => {
    /* eslint-disable array-bracket-spacing */
    const matrix = createMap([
      [b, _, b],
      [_, _, _],
      [_, _, b],
    ]);
    /* eslint-enable array-bracket-spacing */

    expect(countNeighbors(matrix, 4, PROPS.BOMB)).toEqual(3);
    expect(countNeighbors(matrix, 1, PROPS.BOMB)).toEqual(2);
    expect(countNeighbors(matrix, 7, PROPS.BOMB)).toEqual(1);
    expect(countNeighbors(matrix, 6, PROPS.BOMB)).toEqual(0);
  });

  it("returns just the flag count of the siblings, not including self", () => {
    /* eslint-disable array-bracket-spacing */
    const matrix = createMap([
      [_, _, _],
      [_, b, _],
      [b, _, _],
    ]);
    /* eslint-enable array-bracket-spacing */

    expect(countNeighbors(matrix, 4, PROPS.BOMB)).toEqual(1);
  });
});

describe("countNeighbors flags", () => {
  const _ = { [PROPS.MASK]: true, [PROPS.FLAG]: false, [PROPS.BOMB]: false };
  const f = { ..._, [PROPS.FLAG]: true };

  it("returns the number of flags surrounding an tile", () => {
    /* eslint-disable array-bracket-spacing */
    const matrix = createMap([
      [f, _, _],
      [_, _, f],
      [_, f, _],
    ]);
    /* eslint-enable array-bracket-spacing */

    expect(countNeighbors(matrix, 4, PROPS.FLAG)).toEqual(3);
  });

  it("returns just the flag count of the siblings, not including self", () => {
    /* eslint-disable array-bracket-spacing */
    const matrix = createMap([
      [_, _, _],
      [_, f, _],
      [f, _, _],
    ]);
    /* eslint-enable array-bracket-spacing */

    expect(countNeighbors(matrix, 4, PROPS.FLAG)).toEqual(1);
  });
});
