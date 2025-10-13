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

/* **** **** **** ****
 * UPGRADES
 * **** **** **** ****/
class Upgrade {
  constructor(
    public name: string,
    public upgradeKind: string,
    public cost: number,
    public rate: number,
    public counter: number,
    public buttonElem: HTMLElement,
    public costElem: HTMLElement,
    public counterElem: HTMLElement,
    public rateElem: HTMLElement,
  ) {}

  set setCost(newCost: number) {
    this.cost = newCost;
  }
}

const availableUpgrades: Upgrade[] = [
  new Upgrade(
    "Telescope",
    "manual",
    10,
    1,
    0,
    document.getElementById("buttonTelescopesID")!,
    document.getElementById("costTelescopesID")!,
    document.getElementById("counterTelescopesID")!,
    document.getElementById("incrementTelescopesID")!,
  ),
  new Upgrade(
    "Research Center",
    "auto",
    10,
    0.1,
    0,
    document.getElementById("buttonResearchCentersID")!,
    document.getElementById("costResearchCentersID")!,
    document.getElementById("counterResearchCentersID")!,
    document.getElementById("incrementResearchCentersID")!,
  ),
  new Upgrade(
    "Space Station",
    "auto",
    100,
    2.0,
    0,
    document.getElementById("buttonSpaceStationsID")!,
    document.getElementById("costSpaceStationsID")!,
    document.getElementById("counterSpaceStationsID")!,
    document.getElementById("incrementSpaceStationsID")!,
  ),
  new Upgrade(
    "Warp Portals",
    "auto",
    1000,
    50.0,
    0,
    document.getElementById("buttonWarpPortalsID")!,
    document.getElementById("costWarpPortalsID")!,
    document.getElementById("counterWarpPortalsID")!,
    document.getElementById("incrementWarpPortalsID")!,
  ),
];

/* **** **** **** ****
 * VARIABLES
 * **** **** **** ****/
let counterStars: number = 0;
let clickIncrement: number = 1;
// deno-lint-ignore prefer-const
let autoclickDelay: number = 1000;
let autoclickIncrement: number = 1;

/* **** **** **** ****
 * INITIALIZE STAR ELEMENTS
 * **** **** **** ****/
const buttonStars = document.getElementById("incrementID")!;
const counterElemStars = document.getElementById("counterStarsID")!;
const incrementElemStars = document.getElementById("incrementStarsID")!;

/* **** **** **** ****
 * CLICK LISTENERS FOR BUTTONS
 * **** **** **** ****/
// Stars
buttonStars.addEventListener("click", () => {
  counterStars += clickIncrement;
  counterElemStars.textContent = counterStars.toFixed(2);
});

// Upgrades
for (const upgrade of availableUpgrades) {
  // Initialize cost of upgrades
  upgrade.costElem.textContent = String(upgrade.cost);
  upgrade.rateElem.textContent = String(upgrade.rate);

  // Click listener
  upgrade.buttonElem.addEventListener("click", () => {
    if (counterStars >= upgrade.cost) {
      counterStars -= upgrade.cost;
      upgrade.counterElem.textContent = counterStars.toFixed(2);

      if (upgrade.upgradeKind === "auto") { // for autoclicker upgrades
        autoclickIncrement += upgrade.rate;
        upgrade.setCost = upgrade.cost * 1.5;
      } else if (upgrade.upgradeKind === "manual") { // for mouse clicker upgrades
        clickIncrement += upgrade.rate;
        upgrade.rateElem.textContent = clickIncrement.toFixed(2);
        upgrade.setCost = upgrade.cost * 1.2;
      }

      upgrade.costElem.textContent = upgrade.cost.toFixed(2);
      upgrade.counterElem.textContent = String(++upgrade.counter);
    }
  });
}

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

  counterElemStars.textContent = counterStars.toFixed(2);
  incrementElemStars.textContent = autoclickIncrement.toFixed(2);

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
