import "./style.css";

/* **** **** **** ****
 * HTML DOCUMENT
 * **** **** **** ****/
document.body.innerHTML = `
  <h1>Starfinder</h1>
  <hr>

  <button id="incrementID">⭐</button>
  <br><br>

  <div>You have <span id="counterStarsID">0</span> stars!</div>
  <div>Getting <span id="incrementStarsID">1.00</span> stars per second.</div>
  <br>

  <button id="buttonTelescopesID">Buy Telescope: <span id="costTelescopesID">X</span> stars</button>
  <div>Number of Telescopes: <span id="counterTelescopesID">0</span></div>
  <div>+<span id="incrementTelescopesID">1</span> stars/click</div>
  <br>
  
  <button id="buttonResearchCentersID">Buy Research Center: <span id="costResearchCentersID">X</span> stars</button>
  <div>Number of Research Centers: <span id="counterResearchCentersID">0</span></div>
  <div>+<span id="incrementResearchCentersID">X</span> stars/sec</div>
  <br>

  <button id="buttonSpaceStationsID">Buy Space Station: <span id="costSpaceStationsID">X</span> stars</button>
  <div>Number of Space Stations: <span id="counterSpaceStationsID">0</span></div>
  <div>+<span id="incrementSpaceStationsID">X</span> stars/sec</div>
  <br>

  <button id="buttonWarpPortalsID">Buy Warp Portal: <span id="costWarpPortalsID">X</span> stars</button>
  <div>Number of Warp Portals: <span id="counterWarpPortalsID">0</span></div>
  <div>+<span id="incrementWarpPortalsID">X</span> stars/sec</div>
  <br>
`;

interface Item {
  name: string;
  cost: number;
  rate: number;
  counter: number;
  buttonElem: HTMLElement;
  costElem: HTMLElement;
  counterElem: HTMLElement;
  rateElem: HTMLElement;
}

const availableItems: Item[] = [
  {
    name: "Research Center",
    cost: 10,
    rate: 0.1,
    counter: 0,
    buttonElem: document.getElementById("buttonResearchCentersID")!,
    costElem: document.getElementById("costResearchCentersID")!,
    counterElem: document.getElementById("counterResearchCentersID")!,
    rateElem: document.getElementById("incrementResearchCentersID")!,
  },
  {
    name: "Space Station",
    cost: 100,
    rate: 2.0,
    counter: 0,
    buttonElem: document.getElementById("buttonSpaceStationsID")!,
    costElem: document.getElementById("costSpaceStationsID")!,
    counterElem: document.getElementById("counterSpaceStationsID")!,
    rateElem: document.getElementById("incrementSpaceStationsID")!,
  },
];

/* **** **** **** ****
 * VARIABLES
 * **** **** **** ****/

let counterStars: number = 0;

let counterTelescopes: number = 0;
let costTelescopes: number = 10;
/*
let counterResearchCenters: number = 0;
let costResearchCenters: number = 10;
const incrementResearchCenters = 0.1;

let counterSpaceStations: number = 0;
let costSpaceStations: number = 100;
const incrementSpaceStations = 2.0;
*/
let counterWarpPortals: number = 0;
let costWarpPortals: number = 1000;
const incrementWarpPortals = 50.0;

let clickIncrement: number = 1;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
let autoclickIncrement: number = 1;

/* **** **** **** ****
 * BUTTONS
 * **** **** **** ****/

// Stars
const buttonStars = document.getElementById("incrementID")!;
const counterElemStars = document.getElementById("counterStarsID")!;
const incrementElemStars = document.getElementById("incrementStarsID")!;

// Telescopes Upgrade
const buttonTelescopes = document.getElementById("buttonTelescopesID")!;
const costElemTelescopes = document.getElementById("costTelescopesID")!;
const counterElemTelescopes = document.getElementById("counterTelescopesID")!;
const incrementElemTelescopes = document.getElementById(
  "incrementTelescopesID",
)!;
/*
// Research Centers Upgrade
const buttonResearchCenters = document.getElementById(
  "buttonResearchCentersID",
)!;
const costElemResearchCenters = document.getElementById(
  "costResearchCentersID",
)!;
const counterElemResearchCenters = document.getElementById(
  "counterResearchCentersID",
)!;
const incrementElemResearchCenters = document.getElementById(
  "incrementResearchCentersID",
)!;

// Space Stations Upgrade
const buttonSpaceStations = document.getElementById("buttonSpaceStationsID")!;
const costElemSpaceStations = document.getElementById("costSpaceStationsID")!;
const counterElemSpaceStations = document.getElementById(
  "counterSpaceStationsID",
)!;
const incrementElemSpaceStations = document.getElementById(
  "incrementSpaceStationsID",
)!;
*/
// Warp Portals Upgrade
const buttonWarpPortals = document.getElementById("buttonWarpPortalsID")!;
const costElemWarpPortals = document.getElementById("costWarpPortalsID")!;
const counterElemWarpPortals = document.getElementById("counterWarpPortalsID")!;
const incrementElemWarpPortals = document.getElementById(
  "incrementWarpPortalsID",
)!;

/* **** **** **** ****
 * INITIALIZE COSTS OF UPGRADES
 * **** **** **** ****/
costElemTelescopes.textContent = String(costTelescopes);
/*
costElemResearchCenters.textContent = String(costResearchCenters);
incrementElemResearchCenters.textContent = String(incrementResearchCenters);

costElemSpaceStations.textContent = String(costSpaceStations);
incrementElemSpaceStations.textContent = String(incrementSpaceStations);
*/
costElemWarpPortals.textContent = String(costWarpPortals);
incrementElemWarpPortals.textContent = String(incrementWarpPortals);

for (const item of availableItems) {
  item.costElem.textContent = String(item.cost);
  item.rateElem.textContent = String(item.rate);
}

/* **** **** **** ****
 * CLICK LISTENERS FOR BUTTONS
 * **** **** **** ****/

// Stars
buttonStars.addEventListener("click", () => {
  counterStars += clickIncrement;
  counterElemStars.textContent = String(Math.round(counterStars));
});

// Telescopes Upgrade
buttonTelescopes.addEventListener("click", () => {
  if (counterStars >= costTelescopes) {
    incrementElemTelescopes.textContent = String(++clickIncrement);

    counterStars -= costTelescopes;
    counterElemStars.textContent = String(Math.round(counterStars));

    costTelescopes *= 1.5;
    costElemTelescopes.textContent = String(Math.round(costTelescopes));
    counterElemTelescopes.textContent = String(++counterTelescopes);
  }
});
/*
// Research Centers Upgrade
buttonResearchCenters.addEventListener("click", () => {
  if (counterStars >= costResearchCenters) {
    autoclickIncrement += incrementResearchCenters;

    counterStars -= costResearchCenters;
    counterElemStars.textContent = String(Math.round(counterStars));

    costResearchCenters *= 1.1;
    costElemResearchCenters.textContent = String(
      Math.round(costResearchCenters),
    );
    counterElemResearchCenters.textContent = String(++counterResearchCenters);
  }
});

// Space Stations Upgrade
buttonSpaceStations.addEventListener("click", () => {
  if (counterStars >= costSpaceStations) {
    autoclickIncrement += incrementSpaceStations;

    counterStars -= costSpaceStations;
    counterElemStars.textContent = String(Math.round(counterStars));

    costSpaceStations *= 1.2;
    costElemSpaceStations.textContent = String(Math.round(costSpaceStations));
    counterElemSpaceStations.textContent = String(++counterSpaceStations);
  }
});
*/
for (const item of availableItems) {
  if (counterStars >= item.cost) {
    autoclickIncrement += item.rate;

    counterStars -= item.cost;
    item.counterElem.textContent = String(counterStars);

    item.cost *= 1.2;
    item.costElem.textContent = String(item.cost);
    item.counterElem.textContent = String(++item.counter);
  }
}
// Warp Portals Upgrade
buttonWarpPortals.addEventListener("click", () => {
  if (counterStars >= costWarpPortals) {
    autoclickIncrement += incrementWarpPortals;

    counterStars -= costWarpPortals;
    counterElemStars.textContent = String(Math.round(counterStars));

    costWarpPortals *= 1.2;
    costElemWarpPortals.textContent = String(Math.round(costWarpPortals));
    counterElemWarpPortals.textContent = String(++counterWarpPortals);
  }
});

/* **** **** **** ****
 * AUTOCLICKER
 * **** **** **** ****/

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
