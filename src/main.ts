import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="incrementID">⭐</button>
  <div>You have <span id="counterStarsID">0</span> stars!</div>
  <button id="buttonTelescopesID">Buy telescope: <span id="costTelescopesID">X</span> stars</button>
  <div>Number of telescopes: <span id="counterTelescopesID">0</span></div>
`;

let counterStars: number = 0;

let counterTelescopes: number = 0;
let costTelescopes: number = 10;

let counterResearchCenters: number = 0;
let costResearchCenters: number = 100;

let clickIncrement: number = 1;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
// deno-lint-ignore prefer-const
let autoclickIncrement: number = 1;

// BUTTONS

const buttonStars = document.getElementById("incrementID")!;
const counterElemStars = document.getElementById("counterStarsID")!;
const buttonTelescopes = document.getElementById("buttonTelescopesID")!;
const costElemTelescopes = document.getElementById("costTelescopesID")!;
const counterElemTelescopes = document.getElementById("counterTelescopesID")!;
const buttonResearchCenters = document.getElementById(
  "buttonResearchCenterID",
)!;
const costElemResearchCenters = document.getElementById(
  "costResearchCenterID",
)!;
const counterElemResearchCenters = document.getElementById(
  "counterResearchCenterID",
)!;

costElemTelescopes.textContent = String(costTelescopes);

// Click Listener for Star Button
buttonStars.addEventListener("click", () => {
  counterStars += clickIncrement;
  counterElemStars.textContent = String(counterStars);
});

// Click Listener for Telescope Upgrade Button
buttonTelescopes.addEventListener("click", () => {
  if (counterStars >= costTelescopes) {
    clickIncrement = Math.floor(clickIncrement * 1.1);

    counterStars -= costTelescopes;
    counterElemStars.textContent = String(counterStars);

    costTelescopes = Math.floor(costTelescopes * 1.5);
    costElemTelescopes.textContent = String(costTelescopes);
    counterElemTelescopes.textContent = String(++counterTelescopes);
  }
});

// Click Listener for Research Center Upgrade Button
buttonResearchCenters.addEventListener("click", () => {
  if (counterStars >= costResearchCenters) {
    clickIncrement = Math.floor(clickIncrement * 2.0);

    counterStars -= costResearchCenters;
    counterElemStars.textContent = String(counterStars);

    costResearchCenters = Math.floor(costResearchCenters * 1.5);
    costElemResearchCenters.textContent = String(costResearchCenters);
    counterElemResearchCenters.textContent = String(++counterResearchCenters);
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
