import readline from "readline";

const buildings = [
  { type: "T", constructionTime: 5, earningRate: 1500 },
  { type: "P", constructionTime: 4, earningRate: 1000 },
  { type: "C", constructionTime: 10, earningRate: 2000 },
];

function addCombination(map, combination) {
  const key = `${combination.T},${combination.P},${combination.C}`;

  map.set(key, combination);
}
export function maxProfit(n) {
  const dp = new Array(n + 1);

function solve(currentTime) {
  if (dp[currentTime] !== undefined) {
    return dp[currentTime];
  }

  let bestProfit = 0;

  const combinations = new Map();

  addCombination(combinations, {
    T: 0,
    P: 0,
    C: 0,
  });

  for (const building of buildings) {
    const finishTime =
      currentTime + building.constructionTime;

    if (finishTime >= n) {
      continue;
    }

    const currentProfit =
      (n - finishTime) * building.earningRate;

    const result = solve(finishTime);

    const totalProfit =
      currentProfit + result.profit;

    const newCombinations =
      result.combinations.map((combo) => ({
        ...combo,
        [building.type]:
          combo[building.type] + 1,
      }));

    if (totalProfit > bestProfit) {
      bestProfit = totalProfit;
      combinations.clear();

      for (const combo of newCombinations) {
        addCombination(combinations, combo);
      }
    } else if (totalProfit === bestProfit) {
      for (const combo of newCombinations) {
        addCombination(combinations, combo);
      }
    }
  }

  dp[currentTime] = {
    profit: bestProfit,
    combinations: Array.from(combinations.values()),
  };

  return dp[currentTime];
}

  const result = solve(0);

  return {
    profit: result.profit,
    combinations: result.combinations,
  };
}

/**
 * Read n from terminal.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter total time (n): ", (input) => {
  const n = Number(input.trim());

  // Input validation
  if (!Number.isInteger(n) || n < 0) {
    console.error("Invalid input. n must be a non-negative integer.");
    rl.close();
    return;
  }

  const result = maxProfit(n);

  console.log("\nMax Earnings:", result.profit);
  console.log("Valid Combinations:");
  let combination=result.combinations
  for (let i=0;i<result.combinations.length;i++) {
    console.log(
      `${i+1}: T: ${combination[i].T}, P: ${combination[i].P}, C: ${combination[i].C}`,
    );
  }
  rl.close();
});
