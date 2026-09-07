import { describe, expect, test } from "vitest";
import { maxProfit } from "../max-profit.js";

function sortCombinations(combinations) {
  return [...combinations].sort((a, b) =>
    `${a.T},${a.P},${a.C}`.localeCompare(`${b.T},${b.P},${b.C}`),
  );
}

describe("maxProfit", () => {
  test("n = 0", () => {
    expect(maxProfit(0)).toEqual({
      profit: 0,
      combinations: [{ T: 0, P: 0, C: 0 }],
    });
  });

  test("n = 7", () => {
    const result = maxProfit(7);

    expect(result.profit).toBe(3000);

    expect(sortCombinations(result.combinations)).toEqual(
      sortCombinations([
        { T: 1, P: 0, C: 0 },
        { T: 0, P: 1, C: 0 },
      ]),
    );
  });
  test("n = 49 returns all optimal combinations", () => {
    const result = maxProfit(49);

    expect(result.profit).toBe(324000);

    expect(sortCombinations(result.combinations)).toEqual(
      sortCombinations([
        { T: 9, P: 0, C: 0 },
        { T: 8, P: 2, C: 0 },
      ]),
    );
  });

  test("n = 9", () => {
    const result = maxProfit(9);

    expect(result.profit).toBe(6000);

    expect(sortCombinations(result.combinations)).toEqual(
      sortCombinations([
        { T: 1, P: 0, C: 0 },
        { T: 0, P: 2, C: 0 },
      ]),
    );
  });

  test("n = 13", () => {
    expect(maxProfit(13)).toEqual({
      profit: 16500,
      combinations: [{ T: 2, P: 0, C: 0 }],
    });
  });
});
