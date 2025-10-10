import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="increment">⭐</button>
  <div>You have <span id="counter">0</span> stars!</div>
`;

let counter: number = 0;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
// deno-lint-ignore prefer-const
let autoclickIncrement: number = 1;

// BUTTON

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

// Click Listener for Button
button.addEventListener("click", () => {
  counterElement.textContent = String(++counter);
});

// AUTOCLICKER

let lastFrameTimeMs: number = 0;
let timeAccumulator: number = 0;

// Autoclicker increments counter by (1) star(s)
function autoclick(timestamp: number) {
  const delta = timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  timeAccumulator += delta;

	while (timeAccumulator >= autoclickDelay) {
    counter += autoclickIncrement;
    counterElement.innerHTML = String(counter);

    timeAccumulator -= autoclickDelay;
  }

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
