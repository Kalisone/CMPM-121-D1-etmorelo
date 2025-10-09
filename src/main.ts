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

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

// Click Listener for Button
button.addEventListener("click", () => {
  counterElement.textContent = String(++counter);
});

// "Autoclicker" Counter increments by (1) star(s) every (1) second(s)
setInterval(() => {
  counter += autoclickIncrement;
  counterElement.innerHTML = String(counter);
}, autoclickDelay);
