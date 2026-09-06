# Water Tank Problem — Decision Record

## 1. Problem

Given block heights, calculate the units of water that can be stored between the blocks.

The assessment asks for:

- A frontend solution
- Vanilla JavaScript
- HTML/CSS
- SVG preferred for visualization
- Code shared through a Git repository

Example:

```text
Input:  [0,4,0,0,0,6,0,6,4,0]

Output: 18 Units
```

## 2. Assumptions

I interpreted the actual input as an array of non-negative block heights, because the example is an array and the trapping-water calculation requires the height of every block.

For the UI, I made the following assumptions:

Number of blocks can be selected by the user.
- The UI supports 2 to 50 blocks.
- Block heights are represented as integer units.
- The SVG is used to set the block heights.
- Clicking a block column at a particular Y-axis unit sets that block's height.
- A minimum of 3 blocks is required to actually trap water.
- The algorithm itself is not restricted to the UI's visual height limit.

### Height Limitation

The UI currently supports block heights from **0 to 9 units**.

This is a UI/visualization limitation caused by the fixed SVG height and scale. It is not a limitation of the trapping-water algorithm itself.

I chose a fixed range to keep the unit grid and click-based interaction simple and readable. Supporting larger heights would require dynamically scaling or resizing the SVG.
## 3. Algorithm Decision
I chose the two-pointer approach.

The solution maintains:

left
right
leftMax
rightMax

Instead of calculating the tallest block on both sides for every position, the algorithm maintains the maximum boundary discovered so far.

This gives:

Time:  O(n)
Space: O(1)

The implementation additionally creates a water[] array because the UI needs the amount of water at each position to render the result.

Therefore, the algorithm's working space is O(1), while the returned visualization data requires O(n) space.

## 4. Algorithm Alternatives Considered

I considered three approaches.

### 4.1 Brute Force

For every position, scan all blocks on the left and right to find the maximum boundaries.
```text
Time:  O(n²)
Space: O(1)
```
This is easy to understand, but it repeatedly calculates the same maximum values.

I did not choose it because there is no reason to accept O(n²) when the problem can be solved in O(n).

### 4.2 Prefix/Suffix Maximum Arrays

Precompute:

leftMax[]
rightMax[]

Then calculate the water at every position.
```text
Time:  O(n)
Space: O(n)
```
This is a good intermediate solution and was useful for understanding the problem.

However, it stores maximum values for every position even though the final algorithm does not need all of them at the same time.

I therefore did not use this as the final implementation.

### 4.3 Two Pointers — Final Choice

The two-pointer approach keeps only:

leftMax
rightMax

instead of maintaining two arrays.
```text
Time:  O(n)
Space: O(1)
```
This gives the same linear time complexity as the prefix/suffix approach while reducing auxiliary space.

Therefore this is the final algorithm used in the application.

## 5. Why the Two-Pointer Decision?

The input size in the UI is relatively small, so the main reason for choosing two pointers is not that the application would fail with O(n) space.

If:

height[left] <= height[right]

then the right side already provides a boundary at least as high as the current left block.

Therefore, the amount of water at the current left position can be determined using leftMax.

Similarly, if:

height[left] > height[right]

the right side can be resolved using rightMax.

This allows each block to be processed once instead of repeatedly scanning the array.

The reason is that the two-pointer solution is the more optimal formulation of the problem:
```text
Brute Force
O(n²), O(1)

      ↓

Prefix/Suffix
O(n), O(n)

      ↓

Two Pointers
O(n), O(1)
```
It removes unnecessary stored information while keeping the time complexity linear.

The tradeoff is that the two-pointer logic is less immediately obvious than the prefix/suffix solution. It requires understanding why the smaller current boundary can be safely resolved.

I considered that tradeoff acceptable because the algorithm remains small and explainable.

The detailed reasoning and examples are documented separately in `Approach.md`.

## 6. Frontend Architecture Decision

I separated the application into three responsibilities:
```text
app.js
   |
   +---- manages UI state and events
   |
   v
BusinessLogic.js
   |
   +---- calculates trapped water
   |
   v
SVGRenderer.js
        |
        +---- renders blocks, grid, axes and water

```

app.js
Responsible for:

- reading the number of blocks
- maintaining the current heights array
- handling user interaction
- calling the business logic
- passing the result to the renderer

BusinessLogic.js
Responsible only for calculating:

- Calculating trapped water
- Returning total water
- Returning water at each position

It does not know about:

DOM
SVG
buttons
CSS
browser events


SVGRenderer.js
Responsible for:

- drawing the grid
- drawing X and Y axes
- drawing blocks
- showing block heights
- converting SVG clicks into heights
- drawing the trapped water

This separation allows the calculation logic to remain independent of the UI.

## 7. Why I Separated the Business Logic

I could have implemented everything in one JavaScript file.

That would be shorter, but it would mix:

algorithm
DOM manipulation
event handling
rendering

The separation makes the algorithm independently testable.

It also means the rendering approach can change without changing the trapping-water algorithm.

For example:
```text
SVG renderer
     ↓
could later be replaced by
     ↓
Table renderer
```
without changing the core calculation.

This separation was intentional.

## 8. Visualization Decision — SVG

I chose SVG because the assessment explicitly prefers SVG.
SVG allows each block and water section to be represented as an individual element.

It also makes it straightforward to:

- draw grid lines
- show X/Y axes
- display block heights
- identify individual blocks
- handle click coordinates
- render the calculated water

## 9. Why I Did Not Use a Table

A table would have been simpler.

However, a table mainly represents the numerical result.

the problem itself is about the physical relationship between block heights and the water between them.

Therefore SVG was a better fit.

A table could still be added later if numerical debugging or accessibility required it.

## 10. Input Interaction Decision

I did not create a separate HTML input field for every block height.

Instead:
- User selects the number of blocks.
- SVG generates the blocks.
- User clicks on a block column at the required height.
- The Y-coordinate is converted into an integer unit.
- The corresponding value in heights[] is updated.
- The SVG is rendered again.

## 11. Why I Chose Click Instead of Dragging

Drag-and-drop would provide a richer interaction.

However, it would introduce additional implementation complexity:

- pointer down
- pointer movement
- pointer capture
- pointer release
- handling movement between columns
- continuous updates

Therefore I chose click-to-set-height because it provides the required functionality with less UI complexity.

### Tradeoff

The UI is less interactive than a drag-based editor.

A user cannot smoothly resize a block.

That is an intentional tradeoff.

## 12. Accessibility

Accessibility was considered while designing the UI.

The block count input uses a semantic label and provides accessible validation feedback when an invalid value is entered.

The SVG block columns are given accessible labels and can receive keyboard focus.

However, coordinate-based SVG interaction has limitations for keyboard and assistive-technology users. For a production application where accessibility is a primary requirement, I would provide an alternative semantic input method, such as individual numeric inputs or a table representation, for editing block heights.

This keeps the current assessment UI visually interactive while acknowledging the accessibility tradeoff of SVG-based interaction.

## 13. UI Limitations

The current UI has some deliberate limitations.

Maximum visual height

The SVG currently represents heights from:

0 to 9 units

This is a visualization limitation caused by the fixed SVG scale.

It does not limit the underlying algorithm.

A larger maximum could be supported by making the SVG height or scale dynamic.

Maximum number of blocks the UI supports:
```text
2 to 50 blocks
```

This was chosen to keep the visualization usable.

The algorithm itself does not require this limitation.

Horizontal scrolling

With many blocks, the SVG becomes wider than the available viewport.

I prefer horizontal scrolling over shrinking all blocks.

Shrinking the blocks would make the individual unit positions harder to click accurately.

Integer heights

The UI uses integer heights:

0, 1, 2, 3, ...

It does not support decimal heights.

This keeps the interaction aligned with the visual unit grid and makes the result easier to understand.

The algorithm itself could support decimal values if the UI were changed.

## 14. Input Validation

The number of blocks is validated before generating the SVG.

The UI accepts only integer values between 2 and 50.

Invalid values such as values below 2, values above 50, decimal values, or non-numeric values are rejected and the user is shown an error message.

The input is also marked with `aria-invalid` so that the validation state is exposed to assistive technologies.

The HTML `min` and `max` attributes provide browser-level guidance, while JavaScript validation ensures the application logic does not rely only on browser validation.

## 15. Responsive Design

The UI is designed to remain usable on smaller screens.

The input and result sections switch to a single-column layout on smaller viewports.

The SVG visualization keeps the block dimensions readable instead of shrinking all blocks to fit the screen. When there are many blocks, the SVG container supports horizontal scrolling.

This was chosen because maintaining a consistent block size makes the unit grid and click-based height selection easier to understand and use.

Responsive behavior is handled at the presentation layer and does not affect the underlying algorithm or data representation.

## Testing Decision — Vitest

I chose Vitest for testing the business logic because the water-trapping algorithm is implemented as a standalone JavaScript module and does not depend on the DOM.

Vitest provides a lightweight way to verify the algorithm independently from the UI and allows the critical edge cases to be covered without introducing browser-based testing complexity.

The tests focus on the most important scenarios such as:

* Inputs with fewer than three blocks
* No trapped water
* Typical trapping patterns
* Multiple water pockets
* Boundary blocks
* Correct total and per-position water values

I intentionally keep the tests focused on the business logic rather than testing SVG rendering, since rendering behavior is primarily a browser/UI concern.


## 16. What I Would Change If Requirements Changed

If the requirement changed from a small assessment application to a production visualization tool, I would reconsider some decisions.

For example:

If very large inputs were required

I would consider:
- dynamic rendering
- virtualization
- Canvas
- more efficient DOM updates
- If rich editing were required

I would consider:
- drag-to-resize
- keyboard controls
- undo/redo
- If accessibility were a major requirement

I would add:
- keyboard-based height editing
- ARIA labels
- a table representation as an alternative to the visual SVG
- If only the total water amount were required

The water[] array would not be necessary.

The two-pointer algorithm could calculate only:

total

with true O(1) auxiliary space.

In this assessment, I return water[] because the frontend needs the amount of water at each position to visualize the result.

## 17. AI and Internet Usage

I used AI assistance and internet/reference material while working on this assessment.

I used them as development and learning aids for:

understanding the trapping-rain-water problem
comparing possible algorithmic approaches
validating complexity
checking JavaScript/SVG implementation details
resolving implementation issues during development

The final decisions around:

choosing the two-pointer approach
the UI interaction
SVG representation
separation between application, business logic and renderer
assumptions
limitations
tradeoffs

were made for this implementation based on the assessment requirements.

I am explicitly mentioning this rather than presenting the implementation as entirely written without external assistance.