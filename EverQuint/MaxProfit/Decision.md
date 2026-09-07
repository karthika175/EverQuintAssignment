## Problem

Max Profit Problem
Mr. X owns a large strip of land in Mars Land. For the purposes of this problem
assume that he has infinite land capacity. On each parcel of he can choose to
develop it as per his wishes. He can build either Theatres, Pubs or Commercial
Park. Commercial Park can house 6 Commercial Spaces; Theatre has 8
Auditoriums and Pub house only one dance floor.
• A Theatre takes 5 units of time to build and covers 2x1 parcel of land.
• A Pub takes 4 units of time to develop and covers 1x1 parcel of land.
• A Commercial Park takes 10 units of time to build and covers 3x1 parcel
• of land.
Each unit of time that a building is operational, it earns him money.
Establishment Earnings
Theatre $1500
Pub $1000
Commercial Park $2000
He cannot have two properties being developed in parallel in one unit of time.
• After n units of time where n is the input, he earns money based on
which properties have been developed.
• The output should be T for Theatre followed by number developed, P for
Pub followed by number developed and C for Commercial Park followed
by number developed.
Challenge
• Come up with the right mix of properties based on the given input unit of
time (n).

## 1. Assumptions

The statement does not explicitly define a few constraints, so I made the following assumptions:

Land availability

The statement says the land capacity is infinite. Therefore, I assume land area is not a limiting constraint.

Because of this, the 2x1, 1x1, and 3x1 parcel dimensions do not affect the optimization.

Construction

Construction is sequential because:

"He cannot have two properties being developed in parallel in one unit of time."

Therefore, the next building can start only after the previous building's construction is completed.

Revenue timing

I assume revenue starts after construction completes, not during construction.

For example, if n = 8 and a Theatre takes 5 units:

Construction: 0 → 5
Operational:  5 → 8

Profit = (8 - 5) × 1500 = $4500
Building completion

A building that finishes at exactly n contributes no revenue.

finishTime = n
profit = (n - n) × rate = 0

## Constraints and Input Validation

The problem leaves some input constraints ambiguous, so I explicitly define the following valid ranges before implementing the solution.

Input constraints
Total time (n)
n must be a non-negative integer.
n >= 0

n represents the total number of time units available for construction and operation.

Building configuration

Each building must have:

Building parameters are fixed constants defined by the problem statement, so they do not require runtime validation. Only n requires runtime validation.

The default problem configuration is:

Building	Construction Time	Earning / Unit Time
Theatre (T)	5	$1500
Pub (P)	4	$1000
Commercial Park (C)	10	$2000

Therefore:

T: time = 5, earning >= 0
P: time = 4, earning >= 0
C: time = 10, earning >= 0

The construction time must always be a positive integer because a building cannot be constructed in zero or negative time.

Earning must be non-negative because a building with negative revenue would never be beneficial to the objective of maximizing profit.

## Technology decision: 

I chose JavaScript running on Node.js with terminal input because the primary objective is to demonstrate the algorithm and its optimization. The only runtime input required is n; building parameters remain defined by the problem statement.

## Edge Cases
n = 0

No building can be constructed.

T0 P0 C0
Profit = $0
n < constructionTime
That building cannot be completed within the available time and therefore contributes no revenue.

finishTime = n

The building is completed but has no remaining operational time:

profit = (n - finishTime) × earningRate = 0

- **Zero-profit tie:** If constructing a building produces exactly $0 additional profit, the implementation prefers building nothing because `bestProfit` starts at `0` and choices are updated only when `totalProfit > bestProfit`.
- **Positive-profit tie:** If multiple building choices produce the same positive maximum profit, the first maximum encountered is retained.

### Multiple optimal solutions

The problem can have more than one optimal combination.

For example, when n = 7:

Theatre:
(7 - 5) × 1500 = $3000

Pub:
(7 - 4) × 1000 = $3000

Therefore, both are valid optimal solutions:

T1 P0 C0
T0 P1 C0

Since the problem statement does not specify a tie-breaking rule, the implementation is allowed to return any one of the optimal combinations.

The DP comparison uses the maximum profit. If two choices produce the same maximum profit, the implementation retains the first maximum encountered.

### Large n

Brute force becomes expensive because the number of possible construction sequences grows rapidly.

This motivates using dynamic programming to avoid recalculating the same currentTime states.

## Initial Approach — Brute Force

My first thought process was to handle the problem using brute force.

At every point in time, I consider all possible buildings that can still be completed.

For example:

              Start (0)
             /    |    \
            T     P     C
           / \   / \    ...
          ...

Each choice creates another possible sequence.

For every sequence, I calculate the total profit and keep the maximum.

## Limitation of Brute Force

The number of possible construction sequences grows rapidly as n increases.

The problem is not the three choices themselves; the problem is the number of decisions that can be made over time.

Therefore, brute force becomes inefficient for large n.

More importantly, I noticed that different sequences can reach the same currentTime.

For example:
```text
T → P
5 + 4 = 9

P → T
4 + 5 = 9
```
Both sequences reach:

currentTime = 9

From time 9, the available future decisions are exactly the same.

This indicates overlapping subproblems.

## Final Decision — Dynamic Programming

Based on the repeated currentTime states, I decided to use Dynamic Programming with memoization.

DP State

I define:

dp[t] = maximum additional profit possible starting from time t

The important decision here is that currentTime is sufficient state information.

I do not need to remember the complete sequence used to reach t.

Why?

Once I know:

currentTime = t

the remaining available time is:

n - t

and the future building choices depend only on that remaining time.

## Why Memoization?

The brute-force solution already contains the correct decision logic.

I am not changing the decisions.

I am only avoiding recalculating the same state.

For example:

T → P → ...
P → T → ...

Both can reach:

time = 9

Without memoization:

solve(9)
solve(9)

With memoization:

solve(9) → calculate once
solve(9) → reuse result

Therefore, the DP solution is an optimization of the brute-force decision tree.

## Alternative Considered — Bottom-Up DP

A bottom-up/tabulation solution is also possible.

Instead of recursively calculating:

solve(0)

I can build the DP table from the end of the timeline toward 0.

This has the same overall complexity:

Time:  O(n)
Space: O(n)

I prefer top-down memoization initially because it follows naturally from the brute-force solution and makes the transition from brute force → DP easier to reason about.


## Testing Decision — Vitest

I chose Vitest to test the core `maxProfit()` function independently from terminal input and output.

The algorithm is implemented as a pure JavaScript function, so it can be imported directly into the test file without requiring a terminal or browser environment.

The tests focus on the critical expected scenarios from the problem statement:

- n = 0
- n = 7
- n = 9
- n = 13
- n = 20

Each test verifies both the maximum profit and the corresponding T/P/C building counts.

I intentionally keep the tests focused on the business logic rather than testing `readline` or console output, since those are input/output concerns rather than part of the optimization algorithm.

## Coin Change / Unbounded Knapsack Connection

I noticed that the problem has a structure similar to Coin Change / Unbounded Knapsack:

Building construction time → item cost
n                       → total capacity/time
Repeated buildings      → unlimited item selection

However, I did not treat this as a standard Coin Change problem.

The important difference is that the building's profit depends on when it finishes:

profit = remainingTime × earningRate

Therefore, I use currentTime as the DP state instead of directly treating each building as having a fixed value.


## Clarification — All Optimal Combinations

The original problem statement does not explicitly specify whether to return one optimal combination or all optimal combinations. I initially assumed that returning any one valid optimal combination was sufficient.

After clarification from the reviewer, I updated the implementation to return all unique combinations that achieve the maximum profit.

## Why Map instead of an Array?

Array: simpler and easy to iterate, but duplicate combinations need to be checked manually.
Map: slightly more memory overhead, but provides a direct way to deduplicate combinations using a unique key.

Since the clarified requirement specifically asks for all unique optimal combinations, I chose Map because deduplication is explicit and straightforward.
