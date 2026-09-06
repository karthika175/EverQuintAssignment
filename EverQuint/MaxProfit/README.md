## Implementation decisions
Runtime: Node.js
Input: terminal
Runtime input: only n
Building configuration: fixed from the problem statement
Algorithm: top-down DP + memoization
State: currentTime
Memo: maximum additional profit for each currentTime
Choice tracking: remember which building produced the maximum so we can output T/P/C
Invalid n: reject anything other than a non-negative integer
Tie: any optimal solution is acceptable; we'll keep the first maximum encountered.
Testing: Vitest is used to test the core maxProfit business logic independently from terminal input/output.

## Design Separation

The implementation separates the terminal input from the core algorithm:
```text
Terminal Input
      ↓
Input Validation
      ↓
maxProfit(n)
      ↓
DP + Memoization
      ↓
Choice Reconstruction
      ↓
T/P/C Output
```
This keeps the algorithm independent of the input mechanism and makes it reusable with another interface if required.

## Approach Documentation

The reasoning and evolution of the solution are documented separately:

### Approach.md 
    — detailed problem-solving approach, brute force exploration, DP state, transition, memoization, complexity, and alternative approaches.
### decision.md 
    — assumptions, constraints, edge cases, technology choices, and implementation decisions.

## Structure
MaxProfit/
├── max-profit.js
├── tests/
│   └── maxProfit.test.js
├── package.json
├── tests.md
├── Approach.md
├── Decision.md
└── README.md

## How to Run

The application uses Node.js and requires no external packages.

From the project directory:

```bash
node max-profit.js