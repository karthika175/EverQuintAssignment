## Max Profit Problem — Approach
### Understanding the Problem

The goal is to find the combination of Theatres (T), Pubs (P), and Commercial Parks (C) that produces the maximum revenue after n units of time.

The important observation is that a building does not have a fixed total profit.

Its profit depends on when construction finishes.

For a building completed at finishTime:

profit = (n - finishTime) × earningRate

Therefore, the order in which buildings are constructed matters.

For example:

T → P
P → T

Both contain one Theatre and one Pub, but they finish at different times, so their individual earnings are different.

## brute force

Let's take:
n = 9

We have:

Theatre (T) → takes 5, earns 1500 per remaining unit
Pub (P)     → takes 4, earns 1000 per remaining unit
Commercial (C) → takes 10, earns 2000 per remaining unit

Since C itself takes 10 > 9, C can never be completed, so we only need T and P.

Try every possible sequence of buildings that can be constructed within 9 units, calculate its profit, and choose the best one

### Explore the possibilities

| Sequence | Profit |
| -------- | -----: |
| `T`      |  $6000 |
| `P`      |  $5000 |
| `T → P`  |  $6000 | T finishes at 5 → 4 × 1500 = 6000; P finishes at 9 → 0
| `P → T`  |  $5000 | P finishes at 4 → 5 × 1000 = 5000; T finishes at 9 → 0

Maximum:

$6000

#### So one optimal answer is: T1 P0 C0

But here's the REALLY important part

Notice something interesting:

For T → P:

T finishes at 5 → earns 4 × 1500
P finishes at 9 → earns 0

So building that Pub doesn't improve the answer at all.

That's something brute force naturally discovers.

You're not asking:

"What mathematical formula solves this?"

You're asking:

"What are all the decisions I can make, and what happens after each decision?"

I am literally exploring a decision tree

## Limitation of Brute force

The brute force also considers choices that consume the remaining construction time without increasing the final profit.

Suppose n becomes 100.

Now the number of possible sequences becomes huge

So the brute-force tree is really:

                         time 0
                    /       |       \
                   T        P        C
                 t=5      t=4      t=10
                /   \     /  \      /   \
               T     P   T    P    T     P
             t=10   t=9 t=9  t=8  t=15  t=14
              ...

If two different paths reach the same currentTime, why am I solving the remaining problem twice?

I store:

dp[t] = best additional profit possible
        when current construction time is t

Brute force:

Explore every sequence
→ repeatedly solve the same remaining-time problem

DP:

Explore choices
→ remember the answer for each `currentTime`
→ reuse it

## Better approach
DP removes that repeated work

We store:

dp[t] = maximum additional profit possible
        starting from construction time t

Once dp[t] is calculated, every path that reaches the same currentTime = t can reuse that result because the remaining decisions depend only on t, not on how we reached it.

Complexity
Brute force:

Roughly O(3^k), where k is the maximum number of buildings that can fit within n.

DP:

n possible time states × 3 choices

O(3n) = O(n)

Space:

O(n)

That's the main reason DP is better.

I'd use top-down DP + memoization first because it maps almost directly to the brute-force thinking.

Example 
n=13

```text
finishTime = currentTime + building.time

profit = (n - finishTime) * building.rate

total = profit + solve(finishTime)
```

Start:

solve(0)

Try Theatre:

finish = 0 + 5 = 5
profit = (13 - 5) × 1500
       = 12000

total = 12000 + solve(5)

Now:

solve(5)

Try Theatre again:

finish = 10

profit = (13 - 10) × 1500
       = 4500

total = 4500 + solve(10)

At solve(10):

T → finish 15 
P → finish 14 
C → finish 20 

Therefore:

solve(10) = 0

So:

solve(5) = 4500

And:

solve(0)
T = 12000 + 4500
  = 16500

Now solve(0) also tries Pub:

P:
finish = 4

profit = (13 - 4) × 1000 = 9000

total = 9000 + solve(4)

solve(4) can try:

T → finish 9
P → finish 8

The DP evaluates those possibilities and eventually compares everything.

The maximum remains:

16500

Therefore:

T2 P0 C0

T2 P0 C0 — build two Theatres, no Pubs, no Commercial Parks.

BRUTE FORCE
Try every possible building sequence.
Problem: repeated calculation of the same remaining-time state.
Complexity: exponential.

              ↓

DP / MEMOIZATION
State: dp[t] = maximum additional profit from time t.
Transition: try T/P/C and move to t + constructionTime.
Memoize each t.
Complexity: O(n) time, O(n) space.

              ↓

TABULATION
Same recurrence, but calculate dp[] bottom-up.
No recursion; O(n) time, O(n) space.


The reason the state is sufficient is that once currentTime is known, the future possibilities and remaining time are independent of the sequence used to reach that time.

I initially recognized this as having a similar structure to the Coin Change / Unbounded Knapsack family: each building has a "cost" (construction time), and I can choose a building repeatedly while staying within a total limit (n).

However, this problem needs a modification because a building's reward depends on when it finishes. Therefore, instead of assigning a fixed value to each "coin", I calculate:

profit = remainingTime × earningRate

and use currentTime as the DP state.