import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="increment">⭐</button>
  <div>You've discovered <span id="counterStars">0</span> stars!</div>
  <button id="upgradeOne">Buy telescope</button>
  <div>Number of telescopes: <span id="counterTelescopes">0</span></div>
`;

let counterStars: number = 0;
let counterTelescopes: number = 0;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
// deno-lint-ignore prefer-const
let autoclickIncrement: number = 1;

// BUTTONS

const buttonStars = document.getElementById("increment")!;
const counterElemStars = document.getElementById("counterStars")!;
const buttonTelescopes = document.getElementById("upgradeOne")!;
const counterElemTelescopes = document.getElementById("couterTelescopes")!;

// Click Listener for Button
buttonStars.addEventListener("click", () => {
  counterElemStars.textContent = String(++counterStars);
});

buttonTelescopes.addEventListener("click", () => {
  if (counterStars >= 10) {
    counterElemTelescopes.textContent = String(++counterTelescopes);
  }
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
    counterStars += autoclickIncrement;
    counterElemStars.textContent = String(counterStars);

    timeAccumulator -= autoclickDelay;
  }

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
