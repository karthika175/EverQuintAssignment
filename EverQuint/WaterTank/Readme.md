## water tank

### Problem constraint
Block heights are non-negative integers.
Number of blocks: 2–50
Block height: 0–9
The leftmost and rightmost blocks cannot hold water because they do not have boundaries on both sides.
For each position, look for the tallest wall anywhere to its left and anywhere to its right
The shorter of those two determines the water level. Subtract the current block's height to get the water stored at that position.

## UI Flow
1. Select the number of blocks.
2. Click Generate Blocks.
3. Click each block at the required height.
4. Click Compute Water.
5. View the trapped water and total result.

## Constraints
1. Number of blocks: 2–50
2. Block height: 0–9
3. Block heights are non-negative integers.

## How to Run

Open the project through a local HTTP server because the application uses JavaScript modules.

1. Using VS Code Live Server
2. Open the project in VS Code.
3. Install the Live Server extension.
4. Open index.html.
5. Right-click → Open with Live Server.

## Run tests

Install dependencies:

npm install

Run the test suite:

npm test

Run tests in watch mode:

npm run test:watch
Testing

The core water-trapping logic is separated from the UI, making it independently testable.

Vitest is used to test the critical business-logic scenarios, including:

Empty/small input
No trapped water
Typical trapping cases
Multiple water pockets
Boundary bars
Correct total water and per-position water values

The tests focus on the algorithm rather than testing SVG rendering or browser-specific UI behavior.

## Tradeoff:
why svg not table?
I considered a table because it would be simpler and more accessible for data entry. I chose SVG because the core problem is spatial—the relationship between block heights and trapped water is much easier to understand visually. I still keep the underlying heights as plain data and separate the algorithm from the rendering layer.

### Svg limitation: 
accessibility and semantic representation is not so good as compared to the table html elements and not as easy to implement
But visual represenation and user interaction by drag and drop are execellent here. So, I am choosing svg

## Responsive Design

The UI adapts to smaller screens.

Input and result sections switch to a single-column layout on smaller screens.
The SVG visualization supports horizontal scrolling when the number of blocks exceeds the available screen width.

## Accessibility

The block count input uses a semantic label and provides accessible validation feedback.

The SVG blocks are given accessible labels and keyboard focus support. Since coordinate-based SVG interaction has accessibility limitations, a production version could provide a semantic alternative such as numeric inputs or a table for editing block heights.

## SVG Representation

I chose SVG instead of a table because the problem is spatial: the relationship between block heights and trapped water is easier to understand visually.

A table would provide better semantic and accessibility characteristics, but SVG provides a better visual representation and simpler interaction for this use case.

The underlying block heights remain plain JavaScript data, while the algorithm is separated from the SVG rendering logic.

## Project Structure
water-tank/
├── index.html
├── style.css
├── js/
│   ├── app.js
│   ├── BusinessLogic.js
│   └── SVGRenderer.js
├── Approach.md
├── Decision.md
└── ReadMe.md
└──tests/
    └── BusinessLogic.test.js
└──package.json
└──package-lock.json

## Responsibilities
app.js — UI state and user interactions
BusinessLogic.js — trapped-water calculation
SVGRenderer.js — SVG visualization

## Documentation

`Approach.md` — problem-solving process and algorithm evolution
`Decision.md` Record — assumptions, design decisions, tradeoffs, and implementation choices
AI and Internet Usage

AI assistance and internet/reference material were used during development for learning, comparing approaches, validating implementation ideas, and resolving implementation issues.
