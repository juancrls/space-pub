import { interactionMenu, changeLightsWithPitch, inBathroom, bathroomLight, bathroomLightDisplay, setBathroomLightDisplay } from "./globalVariables.js"

let leftLight = document.getElementById("svg-left-light");
let rightLight = document.getElementById("svg-right-light");
let leftLightDisplay = "block";
let rightLightDisplay = "block";
let lights = true;

let disableLightsButton = document.getElementById("disableLights");

disableLightsButton.addEventListener("click", () => {
  lights = !lights;

  if (!lights) {
    interactionMenu.style.border = `5px solid black`;
    disableLightsButton.innerHTML = "Enable lights";

    leftLightDisplay = "none";
    rightLightDisplay = "none";
    setBathroomLightDisplay("none");
  } else {
    disableLightsButton.innerHTML = "Disable lights";
    changeLightsWithPitch(); // if the user change the playback rate while the lights are disabled, this line will adjust the lights based on playback rate when the lights are turned on again

    if (inBathroom) {
      setBathroomLightDisplay("block");
    } else {
      leftLightDisplay = "block";
      rightLightDisplay = "block";
    }
  }

  leftLight.style.display = leftLightDisplay;
  rightLight.style.display = rightLightDisplay;
  bathroomLight.style.display = bathroomLightDisplay;
});

const setLeftLight = (value) => leftLight = value;
const setRightLight = (value) => rightLight = value;
const setLeftLightDisplay = (value) => leftLightDisplay = value;
const setRightLightDisplay = (value) => rightLightDisplay = value;

export {
  leftLight,
  rightLight,
  leftLightDisplay,
  rightLightDisplay,
  lights,
  disableLightsButton,
  setLeftLight,
  setRightLight,
  setLeftLightDisplay,
  setRightLightDisplay,
};