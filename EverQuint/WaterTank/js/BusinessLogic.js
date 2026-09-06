export function trapWater(heights) {
  const n = heights.length;

  if (n < 3) {
    return {
      total: 0,
      water: new Array(n).fill(0)
    };
  }

  let left = 0;
  let right = n - 1;

  let leftMax = 0;
  let rightMax = 0;

  let total = 0;

  const water = new Array(n).fill(0);

  while (left < right) {

    if (heights[left] <= heights[right]) {

      // Current left block is the smaller boundary.
      // Right side is guaranteed to have a boundary
      // at least as high as heights[left].

      if (heights[left] >= leftMax) {

        leftMax = heights[left];

      } else {

        water[left] =
          leftMax - heights[left];

        total += water[left];
      }

      left++;

    } else {

      // Current right block is the smaller boundary.
      // Left side is guaranteed to have a boundary
      // at least as high as heights[right].

      if (heights[right] >= rightMax) {

        rightMax = heights[right];

      } else {

        water[right] =
          rightMax - heights[right];

        total += water[right];
      }

      right--;
    }
  }

  return {
    total,
    water
  };
}