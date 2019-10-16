import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function createArrayFromInt(range) {
  var x = [];
  for (var i = 1; i <= range; i++) {
    x.push(i);
  }
  return x;
}

const MIN_WIDTH = 10;
const MAX_WIDTH = 80;

function App() {
  const [refresh, setRefresh] = useState(false);
  const refreshState = () => setRefresh(!refresh);

  const [radius, setRadius] = useState(2);
  const [lines, setLines] = useState(3);
  const [words, setWords] = useState(2);
  const [height, setHeight] = useState(12);
  const [spacing, setSpacing] = useState(4);

  function createRow(rowNum) {
    var lastWidth = 0;
    var totalWidth = 0;
    const rects = createArrayFromInt(words).map((x, i) => {
      const currentWidth = getRandom(MIN_WIDTH, MAX_WIDTH);
      totalWidth += lastWidth;
      lastWidth = currentWidth;

      return (
        <rect
          x={totalWidth + i * spacing}
          y={height * rowNum + spacing * rowNum}
          fill="#ddd"
          width={currentWidth}
          height={height}
          rx={radius}
        />
      );
    });

    return rects;
  }

  const rects = createArrayFromInt(lines).map((row, index) => {
    return (
      <g key={index}>
        {createRow(index).map(rect => (
          <>{rect}</>
        ))}
      </g>
    );
  });

  return (
    <div className="App">
      <div>
        <label>Radius: </label>
        <input
          id="radius"
          type="range"
          min={0}
          max={height / 2}
          step={1}
          onChange={e => setRadius(e.target.value)}
          value={radius}
        />
        {radius}
      </div>
      <div>
        <label>Max Words per line: </label>
        <input
          id="words"
          type="range"
          min={0}
          max={8}
          step={1}
          onChange={e => setWords(e.target.value)}
          value={words}
        />
        {words}
      </div>
      <div>
        <label>Lines</label>
        <input
          id="lines"
          type="range"
          min={0}
          max={10}
          step={1}
          onChange={e => setLines(e.target.value)}
          value={lines}
        />
        {lines}
      </div>
      <div>
        <label>Height: </label>
        <input
          id="words"
          type="range"
          min={4}
          max={20}
          step={1}
          onChange={e => setHeight(e.target.value)}
          value={height}
        />
        {height}
      </div>
      <div>
        <label>Spacing: </label>
        <input
          id="spacing"
          type="range"
          min={4}
          max={20}
          step={1}
          onChange={e => setSpacing(e.target.value)}
          value={spacing}
        />
        {spacing}
      </div>
      <button onClick={refreshState}>Refresh</button>

      <div style={{ margin: "4rem" }} />

      <svg
        width={MAX_WIDTH * (words + 1) + spacing * (words + 1)}
        height={height * lines + spacing * lines}
      >
        {rects.map((rect, index) => (
          <>{rect}</>
        ))}
      </svg>
    </div>
  );
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + min)) + min;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
