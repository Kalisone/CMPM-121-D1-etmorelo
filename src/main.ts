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
 * **** **** **** ****/
class Upgrade {
  private name: string;
  private upgradeKind: string;
  private description: string;
  private cost: number;
  private rate: number;
  private amount = 0;
  private divDesc = document.createElement("div");
  private divAmount = document.createElement("div");
  private divRate = document.createElement("div");

  constructor(
    name: string,
    upgradeKind: string,
    description: string,
    cost: number,
    rate: number,
  ) {
    this.name = name;
    this.upgradeKind = upgradeKind;
    this.description = description;
    this.cost = cost;
    this.rate = rate;
    this.updateDescription();
    this.updateAmount();
    this.updateRate();
  }

  updateDescription() {
    this.divDesc.textContent =
      `[${this.name.toUpperCase()}] ${this.description}`;
  }

  updateAmount() {
    this.divAmount.textContent = `Number of ${this.name}s: ${this.amount}`;
  }

  updateRate(rate?: number) {
    this.divRate.textContent = `+${(rate ? rate : this.Rate)} stars/sec`;
  }

  get Name() {
    return this.name;
  }

  set Name(name: string) {
    this.name = name;
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
  }

  get Amount() {
    return this.amount;
  }

  set Amount(amount: number) {
    this.amount = amount;
  }

  get DivDesc() {
    return this.divDesc;
  }

  get DivCounter() {
    return this.divAmount;
  }

  get DivRate() {
    return this.divRate;
  }
}

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

for (const upgrade of availableUpgrades) {
  document.body.append(upgrade.DivDesc);
  document.body.append(upgrade.DivCounter);
  document.body.append(upgrade.DivRate);

  const button = document.createElement("button");
  button.innerHTML = `Buy ${upgrade.Name}: ${upgrade.Cost} stars`;
  document.body.append(button);

  document.body.append(
    document.createElement("br"),
    document.createElement("br"),
  );

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

        upgrade.updateRate();
      }

      upgrade.updateAmount();
      button.innerHTML = `Buy ${upgrade.Name}: ${upgrade.Cost} stars`;
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
