/*
 * Demo 1: Incremental Game Development
 * Ethan Morelos
 * etmorelo
 * CMPM 121 - Game Development Patterns
 *
 * Demos an incremental game, similar to Cookie Clicker, for the purposes of practicing incremental development of a program.
 */
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
`;

/* **** **** **** ****
 * UPGRADES
 *
 * Upgrade class, array of upgrades
 * **** **** **** ****/

// Upgrade Class: Implements upgrades for the game. Supports upgrades for autoclicker and manual (cursor) clicker. Includes DOM elements to display on document.
class Upgrade {
  // PRIVATE PROPERTIES
  private amount = 0;

  // DOM Elements
  private readonly divDesc = document.createElement("div");
  private readonly divAmount = document.createElement("div");
  private readonly divRate = document.createElement("div");

  constructor(
    private readonly name: string,
    private upgradeKind: string,
    private description: string,
    private cost: number,
    private rate: number,
  ) {
    this.updateDescription();
    this.updateAmount();
    this.updateRate();
  }

  // GETTERS & SETTERS
  get Name() {
    return this.name;
  }

  get UpgradeKind() {
    return this.upgradeKind;
  }

  set UpgradeKind(upgradeKind: string) {
    this.upgradeKind = upgradeKind;
  }

  get Description() {
    return this.description;
  }

  set Description(description: string) {
    this.description = description;
    this.updateDescription();
  }

  get Cost() {
    return this.cost;
  }

  set Cost(cost: number) {
    this.cost = cost;
  }

  get Rate() {
    return this.rate;
  }

  set Rate(rate: number) {
    this.rate = rate;
    this.updateRate();
  }

  get Amount() {
    return this.amount;
  }

  set Amount(amount: number) {
    this.amount = amount;
    this.updateAmount();
  }

  // DOM GETTERS
  get DivDesc() {
    return this.divDesc;
  }

  get DivAmount() {
    return this.divAmount;
  }

  get DivRate() {
    return this.divRate;
  }

  // PRIVATE UI UPDATE METHODS
  private updateDescription() {
    this.divDesc.textContent =
      `[${this.name.toUpperCase()}] ${this.description}`;
  }

  private updateAmount() {
    this.divAmount.textContent = `Number of ${this.name}s: ${this.amount}`;
  }

  private updateRate(rate?: number) {
    this.divRate.textContent = `+${(rate ? rate : this.Rate)} stars/sec`;
  }
}

// Upgrade Array: Available upgrades. First upgrade is a manual (cursor) upgrade, all others are autoclicker upgrades.
const availableUpgrades: Upgrade[] = [
  new Upgrade(
    "Telescope",
    "manual",
    "Each telescope must be manually operated by interns and graduate students to find stars.",
    10,
    1,
  ),
  new Upgrade(
    "Research Center",
    "auto",
    "Research centers are fully funded by taxing the trade of tears of engineering students :)",
    10,
    0.1,
  ),
  new Upgrade(
    "Space Station",
    "auto",
    "Powered by dying stars.",
    100,
    2.0,
  ),
  new Upgrade(
    "Warp Portal",
    "auto",
    "Travel to distant systems to discover new stars!",
    1000,
    50.0,
  ),
  new Upgrade(
    "Void's Eye",
    "auto",
    "Search for new stars in galaxies lightmillenia away.",
    10000,
    500.0,
  ),
  new Upgrade(
    "Starmaker",
    "auto",
    "Synthesize your own stars with this technomagical apparatus. Components must be lubricated with human spinal fluid.",
    500000,
    10000.0,
  ),
];

/* **** **** **** ****
 * GLOBAL VARIABLES
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

// Stars Listener: Specific click listener for main action button. Clicking this button increments stars.
buttonStars.addEventListener("click", () => {
  counterStars += clickIncrement;
  counterElemStars.textContent = counterStars.toFixed(2);
});

// Upgrades Listener: Adds available upgrades to document and adds buttons & click listeners to each upgrade.
for (const upgrade of availableUpgrades) {
  // Add upgrade information to document
  document.body.append(upgrade.DivDesc);
  document.body.append(upgrade.DivAmount);
  document.body.append(upgrade.DivRate);

  // Button for buying upgrade
  const button = document.createElement("button");
  button.innerHTML = `Buy ${upgrade.Name}: ${upgrade.Cost} stars`;
  document.body.append(button);

  document.body.append(
    document.createElement("br"),
    document.createElement("br"),
  );

  // Click listener for upgrade button. Upgrade cost progression: autoclicker=1.5x, manual=1.2x.
  button.addEventListener("click", () => {
    if (counterStars >= upgrade.Cost) {
      counterStars -= upgrade.Cost;
      upgrade.Amount = upgrade.Amount + 1;

      if (upgrade.UpgradeKind === "auto") { // autoclicker upgrades
        upgrade.Cost = upgrade.Cost * 1.5;
        autoclickIncrement += upgrade.Rate;
      } else if (upgrade.UpgradeKind === "manual") { // mouse clicker upgrade
        clickIncrement += upgrade.Rate;
        upgrade.Rate = upgrade.Rate + 1;
        upgrade.Cost = upgrade.Cost * 1.2;
      }

      button.innerHTML = `Buy ${upgrade.Name}: ${upgrade.Cost} stars`;
    }
  });
}

/* **** **** **** ****
 * AUTOCLICKER
 *
 * Autoclick function & related variables
 * **** **** **** ****/
let lastFrameTimeMs: number = 0;
let timeAccumulator: number = 0;

// Autoclicker increments counter by (1) star(s). Accounts for framerate differences.
function autoclick(timestamp: number) {
  // Calculate elapsed time
  const delta = timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  timeAccumulator += delta;

  // Trigger autoclicking action. Adds stars & resets time accumulation.
  while (timeAccumulator >= autoclickDelay) {
    counterStars += autoclickIncrement;

    timeAccumulator -= autoclickDelay;
  }

  // Update DOM elements
  counterElemStars.textContent = counterStars.toFixed(2);
  incrementElemStars.textContent = autoclickIncrement.toFixed(2);

  requestAnimationFrame(autoclick);
}

requestAnimationFrame(autoclick);
