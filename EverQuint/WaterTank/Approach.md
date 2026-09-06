water tank

left most and right most bar can never hold the water. we can store water in the middle bar

For each position, look for the tallest wall anywhere to its left and anywhere to its right
The shorter of those two determines the water level. Subtract the current block's height to get the water stored at that position.



this is the mental idea. 

ok now, I am thinking about the brute force to determine the above

example: [2,0,2]
maxleft=2
maxright=2
so waterlevel=min(maxleft, maxright)
heigh of the 1st index is 0
1st index can hold = waterlevel-0
so output = 2

example:[1,2,3]
output is 0
example [3,2,1]
output is 0 

for each position i=1 to n-2:
    //find tallest block on the left
    leftMax=arr[i]
    for j=0 to j<i
        leftMax=max(leftMax,arr[j])
    //find tallest block on the right
    rightMax=arr[i]
    for j=i+1 to j<n
        rightMax=Max(rightMax,arr[j])

    waterLevel = min(leftMax, rightMax)
    waterAtCurrent = waterLevel - arr[i]
    total += waterAtCurrent


complexity:
Time:  O(n²)
Space: O(1)


optimal solution:

instead of computing left max and right max everytime pre compute it
example:

arr=[0,4,0,0,0,6,0,6,4,0]
leftMax =[0,4,4,4,4,6,6,6,6,6]
//reverse
rightMax=[6,6,6,6,6,6,6,6,4,0]

after this use the same approach to find the water can hold for this bar height

computation:
for i=1 to n-1
result = result+(min(leftMax[i],rightMax[i])-arr[i])

result=0
i=1
result=0+(min(4, 6)-4) =0

i=2
result=0+(min(4, 6)-0) =4

i=3
result=4+min(4, 6) - 0 =8

i=4
result=8+min(4, 6) - 0 = 12

i=5
result=12+min(6, 6) - 6 = 12

i=6

result=12+min(6, 6) - 0 = 18

i=7
result = 18 + (min(6, 6) - 6)= 18

i=8
result = 18 + (min(6, 4) - 4)= 18

i=9
result = 18 + (min(6, 0) - 0)= 18
so result =18


complexity:
Time:  O(n)
Space: O(n)


two pointer approach:

I want to avoid calculating:

leftMax array 
rightMax array
for every index.

Instead keep two pointers:
left  starts at 0
right  starts at n - 1

2 pointers leftMax, rightMax

If the current left height is smaller than or equal to the current right height, the current left position can be resolved using leftMax, because the right boundary is guaranteed to be at least as high as the current left height.

```text
left = 0
right = n - 1
leftMax = 0
rightMax = 0
total = 0

while left < right:

    if arr[left] <= arr[right]:

        if arr[left] >= leftMax:
            leftMax = arr[left]
        else:
            total += leftMax - arr[left]

        left++

    else:

        if arr[right] >= rightMax:
            rightMax = arr[right]
        else:
            total += rightMax - arr[right]

        right--
```
complexity:
Time  = O(n)
Space = O(1)


My Approach:
Initially I would solve it by scanning left and right for every bar, which is O(n²). Then I noticed I'm repeatedly calculating the same left and right max, so I can precompute them and reduce it to O(n), but that costs O(n) space. Finally, I can avoid those arrays using two pointers and maintain only maxLeft and maxRight, giving O(n) time and O(1) space.


