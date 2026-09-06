const readline = require("readline");

const buildings = [
    { type: "T", constructionTime: 5, earningRate: 1500 },
    { type: "P", constructionTime: 4, earningRate: 1000 },
    { type: "C", constructionTime: 10, earningRate: 2000 }
];

export function maxProfit(n) {
    const dp = new Array(n + 1);
    const choice = new Array(n + 1);

    function solve(currentTime) {
        if (dp[currentTime] !== undefined) {
            return dp[currentTime];
        }

        let bestProfit = 0;
        let bestBuilding = null;

        for (const building of buildings) {
            const finishTime =
                currentTime + building.constructionTime;

            if (finishTime > n) {
                continue;
            }

            const currentProfit = (n - finishTime) * building.earningRate;

            const totalProfit = currentProfit + solve(finishTime);

            if (totalProfit > bestProfit) {
                bestProfit = totalProfit;
                bestBuilding = building;
            }
        }

        dp[currentTime] = bestProfit;
        choice[currentTime] = bestBuilding;

        return bestProfit;
    }

    const profit = solve(0);

    const counts = {
        T: 0,
        P: 0,
        C: 0
    };

    let currentTime = 0;

    while (choice[currentTime]) {
        const building = choice[currentTime];

        counts[building.type]++;

        currentTime += building.constructionTime;
    }

    return {
        profit,
        counts
    };
}

/**
 * Read n from terminal.
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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

    console.log("\nMaximum Profit:", `$${result.profit}`);

    console.log(
        `Optimal Mix: T${result.counts.T} P${result.counts.P} C${result.counts.C}`
    );

    rl.close();
});