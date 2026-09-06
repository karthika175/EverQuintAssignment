import { trapWater } from "./BusinessLogic.js";

import {
  renderInput,
  renderResult
} from "./SVGRenderer.js";


const initialHeights = [
  0, 4, 0, 0, 0, 6, 0, 6, 4, 0
];

let heights = [...initialHeights];


const blockCountInput =
  document.getElementById("blockCount");

const generateButton =
  document.getElementById("generateButton");

const inputSvg =
  document.getElementById("inputTank");

const resultSvg =
  document.getElementById("resultTank");

const computeButton =
  document.getElementById("computeButton");

const resultElement =
  document.getElementById("result");

const errorElement =
  document.getElementById("blockCountError");


function handleHeightChange(index, newHeight) {

  heights[index] = newHeight;

  renderInput(
    inputSvg,
    heights,
    handleHeightChange
  );

  resultSvg.innerHTML = "";
  resultElement.textContent = "";
}

function generateBlocks(n) {

  heights = Array.from(
    { length: n },
    (_, index) =>
      initialHeights[index] ?? 0
  );

  renderInput(
    inputSvg,
    heights,
    handleHeightChange
  );

  resultSvg.innerHTML = "";
  resultElement.textContent = "";
}

// Initial blocks
generateBlocks(10);


generateButton.addEventListener("click", () => {

  const n = Number(blockCountInput.value);

  if (!Number.isInteger(n) || n < 2 || n > 50) {

  errorElement.textContent =
    "Number of blocks must be between 2 and 50.";

    blockCountInput.setAttribute(
        "aria-invalid",
        "true"
    );

    return;
  }
  errorElement.textContent = "";

  blockCountInput.setAttribute(
      "aria-invalid",
      "false"
  );
  generateBlocks(n);
});


computeButton.addEventListener("click", () => {

  if (heights.length < 2) {
    return;
  }

  const result = trapWater(heights);

  renderResult(
    resultSvg,
    heights,
    result.water
  );

  resultElement.textContent =
    `Trapped Water: ${result.total} units`;
});