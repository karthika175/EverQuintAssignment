const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const BAR_WIDTH = 40;
const GAP = 10;
const SCALE = 30;

const GROUND_Y = 280;
const MAX_HEIGHT = 9;

const SIDE_PADDING = 20;
const LABEL_HEIGHT = 20;


function createRect(
  x,
  y,
  width,
  height,
  className
) {
  const rect = document.createElementNS(SVG_NAMESPACE,"rect");

  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  rect.setAttribute("class", className);

  return rect;
}


function createText(
  x,
  y,
  text,
  className
) {
  const element = document.createElementNS(SVG_NAMESPACE,"text");

  element.setAttribute("x", x);
  element.setAttribute("y", y);
  element.setAttribute("class", className);
  element.setAttribute("text-anchor", "middle");

  element.textContent = text;

  return element;
}


function createGrid(svg) {

  for (let unit = 0; unit <= MAX_HEIGHT; unit++) {

    const y = GROUND_Y - unit * SCALE;

    const line =
      document.createElementNS(
        SVG_NAMESPACE,
        "line"
      );

    line.setAttribute("x1", SIDE_PADDING);
    line.setAttribute("x2", svg.viewBox.baseVal.width - SIDE_PADDING);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("class", "grid-line");

    svg.appendChild(line);


    const label =
      createText(
        10,
        y + 4,
        unit,
        "unit-label"
      );

    svg.appendChild(label);
  }
}


function createAxes(svg, blockCount) {

  const width =
    SIDE_PADDING +
    blockCount * (BAR_WIDTH + GAP);

  // Y axis
  const yAxis =
    document.createElementNS(
      SVG_NAMESPACE,
      "line"
    );

  yAxis.setAttribute("x1", SIDE_PADDING);
  yAxis.setAttribute("x2", SIDE_PADDING);
  yAxis.setAttribute("y1", GROUND_Y - MAX_HEIGHT * SCALE);
  yAxis.setAttribute("y2", GROUND_Y);
  yAxis.setAttribute("class", "axis");

  svg.appendChild(yAxis);


  // X axis
  const xAxis =
    document.createElementNS(
      SVG_NAMESPACE,
      "line"
    );

  xAxis.setAttribute("x1", SIDE_PADDING);
  xAxis.setAttribute("x2", width);
  xAxis.setAttribute("y1", GROUND_Y);
  xAxis.setAttribute("y2", GROUND_Y);
  xAxis.setAttribute("class", "axis");

  svg.appendChild(xAxis);


  // X-axis block numbers
  for (let i = 0; i < blockCount; i++) {

    const x =
      SIDE_PADDING +
      i * (BAR_WIDTH + GAP) +
      BAR_WIDTH / 2;

    const label =
      createText(
        x,
        GROUND_Y + LABEL_HEIGHT,
        i + 1,
        "x-label"
      );

    svg.appendChild(label);
  }
}


function getHeightFromClick(svg, event) {

  const point =
    svg.createSVGPoint();

  point.x = event.clientX;
  point.y = event.clientY;

  const svgPoint =
    point.matrixTransform(
      svg.getScreenCTM().inverse()
    );

  const distanceFromGround =
    GROUND_Y - svgPoint.y;

  let height =
    Math.round(
      distanceFromGround / SCALE
    );

  height =
    Math.max(
      0,
      Math.min(
        MAX_HEIGHT,
        height
      )
    );

  return height;
}


function createHeightLabel(
  x,
  barY,
  height
) {

  return createText(
    x + BAR_WIDTH / 2,
    barY - 5,
    height,
    "height-label"
  );
}


export function renderInput(
  svg,
  heights,
  onHeightChange
) {

  svg.innerHTML = "";

  const width =
    SIDE_PADDING +
    heights.length * (BAR_WIDTH + GAP) +
    SIDE_PADDING;

  svg.setAttribute(
    "viewBox",
    `0 0 ${width} 320`
  );

  svg.setAttribute(
    "width",
    width
  );


  createGrid(svg);

  createAxes(
    svg,
    heights.length
  );


  heights.forEach(
    (height, index) => {

      const x =
        SIDE_PADDING +
        index * (BAR_WIDTH + GAP);

      const barHeight =
        height * SCALE;

      const barY =
        GROUND_Y - barHeight;


      // Entire column is clickable
      const clickArea =
        createRect(
          x,
          0,
          BAR_WIDTH,
          GROUND_Y,
          "click-area"
        );

      clickArea.setAttribute("tabindex", "0");
      clickArea.setAttribute("role", "button");
      clickArea.setAttribute(
        "aria-label",
        `Block ${index + 1}, current height ${height}. Click to set height.`
      );
      clickArea.addEventListener(
        "click",
        (event) => {

          const newHeight =
            getHeightFromClick(
              svg,
              event
            );

          onHeightChange(
            index,
            newHeight
          );
        }
      );

      clickArea.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

           const newHeight = height + 1;

            if (newHeight <= MAX_HEIGHT) {
              onHeightChange(index, newHeight);
            }
        }
      }
    );
      svg.appendChild(
        clickArea
      );


      // Actual bar
      const bar =
        createRect(
          x,
          barY,
          BAR_WIDTH,
          barHeight,
          "bar"
        );

      bar.setAttribute(
        "pointer-events",
        "none"
      );

      svg.appendChild(bar);


      // Current height
      if (height > 0) {

        const label =
          createHeightLabel(
            x,
            barY,
            height
          );

        label.setAttribute(
          "pointer-events",
          "none"
        );

        svg.appendChild(label);
      }
    }
  );
}


export function renderResult(
  svg,
  heights,
  water
) {

  svg.innerHTML = "";

  const width =
    SIDE_PADDING +
    heights.length * (BAR_WIDTH + GAP) +
    SIDE_PADDING;

  svg.setAttribute(
    "viewBox",
    `0 0 ${width} 320`
  );

  svg.setAttribute(
    "width",
    width
  );


  createGrid(svg);

  createAxes(
    svg,
    heights.length
  );


  heights.forEach(
    (height, index) => {

      const x =
        SIDE_PADDING +
        index * (BAR_WIDTH + GAP);

      const barHeight =
        height * SCALE;

      const barY =
        GROUND_Y - barHeight;


      // Bar
      const bar =
        createRect(
          x,
          barY,
          BAR_WIDTH,
          barHeight,
          "bar"
        );

      svg.appendChild(bar);


      // Height label
      if (height > 0) {

        const label =
          createHeightLabel(
            x,
            barY,
            height
          );

        label.setAttribute(
          "pointer-events",
          "none"
        );

        svg.appendChild(label);
      }


      // Water
      const waterHeight =
        water[index] * SCALE;

      if (waterHeight > 0) {

        const waterY =
          barY - waterHeight;

        const waterRect =
          createRect(
            x,
            waterY,
            BAR_WIDTH,
            waterHeight,
            "water"
          );

        svg.appendChild(
          waterRect
        );
      }
    }
  );
}