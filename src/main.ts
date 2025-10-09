//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <h1>CMPM 121 Demo 1</h1>
  <button id="increment">⭐</button>
  <div>You have <span id="counter">0</span> stars!</div>
`;

let counter: number = 0;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counterElement.textContent = String(++counter);
});