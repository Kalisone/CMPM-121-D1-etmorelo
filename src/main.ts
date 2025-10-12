import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="incrementID">⭐</button>
  <div>You have <span id="counterStarsID">0</span> stars!</div>
  <button id="buttonTelescopesID">Buy Telescope: <span id="costTelescopesID">X</span> stars</button>
  <div>Number of telescopes: <span id="counterTelescopesID">0</span></div>
  <button id="buttonResearchCentersID">Buy Research Center: <span id="costResearchCentersID">X</span> stars</button>
  <div>Number of research centers: <span id="counterResearchCentersID">0</span></div>
`;

let counterStars: number = 0;

let counterTelescopes: number = 0;
let costTelescopes: number = 10;

let counterResearchCenters: number = 0;
let costResearchCenters: number = 10;

let clickIncrement: number = 1;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
let autoclickIncrement: number = 1;

// BUTTONS

const buttonStars = document.getElementById("incrementID")!;
const counterElemStars = document.getElementById("counterStarsID")!;

const buttonTelescopes = document.getElementById("buttonTelescopesID")!;
const costElemTelescopes = document.getElementById("costTelescopesID")!;
const counterElemTelescopes = document.getElementById("counterTelescopesID")!;

const buttonResearchCenters = document.getElementById(
  "buttonResearchCentersID",
)!;
const costElemResearchCenters = document.getElementById(
  "costResearchCentersID",
)!;
const counterElemResearchCenters = document.getElementById(
  "counterResearchCentersID",
)!;

costElemTelescopes.textContent = String(costTelescopes);
costElemResearchCenters.textContent = String(costResearchCenters);

// Click Listener for Star Button
buttonStars.addEventListener("click", () => {
  counterStars += clickIncrement;
  counterElemStars.textContent = String(Math.round(counterStars));
});

// Click Listener for Telescope Upgrade Button
buttonTelescopes.addEventListener("click", () => {
  if (counterStars >= costTelescopes) {
    clickIncrement++;

    counterStars -= costTelescopes;
    counterElemStars.textContent = String(Math.round(counterStars));

    costTelescopes = costTelescopes * 1.5;
    costElemTelescopes.textContent = String(Math.round(costTelescopes));
    counterElemTelescopes.textContent = String(Math.round(++counterTelescopes));
  }
});

// Click Listener for Research Center Upgrade Button
buttonResearchCenters.addEventListener("click", () => {
  if (counterStars >= costResearchCenters) {
    autoclickIncrement += 0.1;

    counterStars -= costResearchCenters;
    counterElemStars.textContent = String(Math.round(counterStars));

    costResearchCenters = costResearchCenters * 1.1;
    costElemResearchCenters.textContent = String(
      Math.round(costResearchCenters),
    );
    counterElemResearchCenters.textContent = String(
      Math.round(++counterResearchCenters),
    );
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
    counterElemStars.textContent = String(Math.round(counterStars));

    timeAccumulator -= autoclickDelay;
  }

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
