import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="incrementID">⭐</button>

  <div>You have <span id="counterStarsID">0</span> stars!</div>
  <div>Getting <span id="incrementStarsID">1.00</span> stars per second.</div>
  
  <button id="buttonTelescopesID">Buy Telescope: <span id="costTelescopesID">X</span> stars</button>
  <div>Number of Telescopes: <span id="counterTelescopesID">0</span></div>
  
  <button id="buttonResearchCentersID">Buy Research Center: <span id="costResearchCentersID">X</span> stars</button>
  <div>Number of Research Centers: <span id="counterResearchCentersID">0</span></div>

  <button id="buttonSpaceStationsID">Buy Space Station: <span id="costSpaceStationsID">X</span> stars</button>
  <div>Number of Space Stations: <span id="counterSpaceStationsID">0</span></div>

  <button id="buttonWarpPortalsID">Buy Warp Portal: <span id="costWarpPortalsID">X</span> stars</button>
  <div>Number of Warp Portals: <span id="counterWarpPortalsID">0</span></div>
`;

let counterStars: number = 0;

let counterTelescopes: number = 0;
let costTelescopes: number = 10;

let counterResearchCenters: number = 0;
let costResearchCenters: number = 10;

let counterSpaceStations: number = 0;
let costSpaceStations: number = 100;

let counterWarpPortals: number = 0;
let costWarpPortals: number = 1000;

let clickIncrement: number = 1;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
let autoclickIncrement: number = 1;

// BUTTONS

const buttonStars = document.getElementById("incrementID")!;
const counterElemStars = document.getElementById("counterStarsID")!;
const incrementElemStars = document.getElementById("incrementStarsID")!;

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

const buttonSpaceStations = document.getElementById("buttonSpaceStationsID")!;
const costElemSpaceStations = document.getElementById("costSpaceStationsID")!;
const counterElemSpaceStations = document.getElementById(
  "counterSpaceStations",
)!;

const buttonWarpPortals = document.getElementById("buttonWarpPortalsID")!;
const costElemWarpPortals = document.getElementById("costWarpPortalsID")!;
const counterElemWarpPortals = document.getElementById("counterWarpPortalsID")!;

costElemTelescopes.textContent = String(costTelescopes);
costElemResearchCenters.textContent = String(costResearchCenters);
costElemSpaceStations.textContent = String(costSpaceStations);
costElemWarpPortals.textContent = String(costWarpPortals);

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

    costTelescopes *= 1.5;
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

    costResearchCenters *= 1.1;
    costElemResearchCenters.textContent = String(
      Math.round(costResearchCenters),
    );
    counterElemResearchCenters.textContent = String(
      Math.round(++counterResearchCenters),
    );
  }
});

// Click Listener for Space Stations Upgrade Button
buttonSpaceStations.addEventListener("click", () => {
  if (counterStars >= costSpaceStations) {
    autoclickIncrement += 2.0;

    counterStars -= costSpaceStations;
    counterElemStars.textContent = String(Math.round(counterStars));

    costSpaceStations *= 1.2;
    costElemSpaceStations.textContent = String(Math.round(costSpaceStations));
    counterElemSpaceStations.textContent = String(
      Math.round(++counterSpaceStations),
    );
  }
});

// Click Listener for Warp Portals Upgrade Button
buttonWarpPortals.addEventListener("click", () => {
  if (counterStars >= costWarpPortals) {
    autoclickIncrement += 50.0;

    counterStars -= costWarpPortals;
    counterElemStars.textContent = String(Math.round(counterStars));

    costWarpPortals *= 1.2;
    costElemWarpPortals.textContent = String(Math.round(costWarpPortals));
    counterElemWarpPortals.textContent = String(
      Math.round(++counterWarpPortals),
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

    timeAccumulator -= autoclickDelay;
  }

  counterElemStars.textContent = String(Math.round(counterStars));
  incrementElemStars.textContent = autoclickIncrement.toFixed(2);

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
