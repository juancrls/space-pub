import { setRAF, draw, changeWithTime } from "./globalVariables.js"

let dynamicLights = true;
let dynamicLightsButton = document.querySelector('#dynamicLights');

dynamicLightsButton.addEventListener('click', () => {
  if (dynamicLights) {
    dynamicLightsButton.innerHTML = "Enable dynamic lights"
    dynamicLights = false;
    setRAF(true);
  } else {
    dynamicLightsButton.innerHTML = "Disable dynamic lights"

    dynamicLights = true;
    setRAF(false);
    changeWithTime()

    draw();
  }
})

export { dynamicLights, dynamicLightsButton }