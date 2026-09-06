import { describe, expect, it } from "vitest";
import { trapWater } from "../js/BusinessLogic.js";

describe("trapWater", () => {

  it("should calculate trapped water for a typical input", () => {
    const heights = [
      0, 4, 0, 0, 0, 6, 0, 6, 4, 0
    ];

    const result = trapWater(heights);

    expect(result.total).toBe(18);

    expect(result.water).toEqual([
      0, 0, 4, 4, 4, 0, 6, 0, 0, 0
    ]);
  });


  it("should return zero when there are fewer than three blocks", () => {
    expect(trapWater([1, 2])).toEqual({
      total: 0,
      water: [0, 0]
    });
  });


  it("should return zero when water cannot be trapped", () => {
    expect(trapWater([1, 2, 3])).toEqual({
      total: 0,
      water: [0, 0, 0]
    });

    expect(trapWater([3, 2, 1])).toEqual({
      total: 0,
      water: [0, 0, 0]
    });
  });


  it("should calculate water between equal-height boundaries", () => {
    const result = trapWater([2, 0, 2]);

    expect(result.total).toBe(2);

    expect(result.water).toEqual([0, 2, 0]);
  });


  it("should not trap water at the first and last blocks", () => {
    const result = trapWater([3, 0, 2]);

    expect(result.water[0]).toBe(0);
    expect(result.water[2]).toBe(0);
    expect(result.total).toBe(2);
  });

});