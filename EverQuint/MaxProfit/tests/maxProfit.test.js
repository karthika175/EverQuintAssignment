import { describe, expect, test } from "vitest";
import { maxProfit } from "../max-profit.js";

describe("maxProfit", () => {
    test("n = 0", () => {
        expect(maxProfit(0)).toEqual({
            profit: 0,
            counts: {
                T: 0,
                P: 0,
                C: 0
            }
        });
    });

    test("n = 7", () => {
        expect(maxProfit(7)).toEqual({
            profit: 3000,
            counts: {
                T: 1,
                P: 0,
                C: 0
            }
        });
    });

    test("n = 9", () => {
        expect(maxProfit(9)).toEqual({
            profit: 6000,
            counts: {
                T: 1,
                P: 0,
                C: 0
            }
        });
    });

    test("n = 13", () => {
        expect(maxProfit(13)).toEqual({
            profit: 16500,
            counts: {
                T: 2,
                P: 0,
                C: 0
            }
        });
    });

    test("n = 20", () => {
        expect(maxProfit(20)).toEqual({
            profit: 46000,
            counts: {
                T: 3,
                P: 1,
                C: 0
            }
        });
    });
});