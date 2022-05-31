import { lightsOnSound, lightsOffSound } from "./globalVariables.js"

let bgIsWhite;
let currentBackground = "../images/cafe-night.png";

let backgroundImage = document.querySelector('#backgroundImage');
let changeBackgroundButton = document.querySelector('#changeBackground');

let menuLateralButton = document.querySelector('.lateral-menu-button');
let whitebg = "../images/cafe.png";
let darkbg = "../images/cafe-night.png";

const setDarkBg = (value) => darkbg = value;
const setWhiteBg = (value) => whitebg = value;
const setCurrentBg = (value) => currentBackground = value;

changeBackgroundButton.addEventListener('click', () => {

  if (currentBackground == darkbg) {
    lightsOnSound.start();

    menuLateralButton.style.filter = "invert(0)";
    currentBackground = whitebg;
    changeBackgroundButton.innerHTML = "Dark Background"
    backgroundImage.src = currentBackground;
    bgIsWhite = true;
  } else {
    lightsOffSound.start();
    menuLateralButton.style.filter = "invert(1)";
    currentBackground = darkbg;
    changeBackgroundButton.innerHTML = "White Background"
    backgroundImage.src = darkbg
    bgIsWhite = false;
  }
})

export {
  bgIsWhite,
  currentBackground,
  backgroundImage,
  changeBackgroundButton,
  menuLateralButton,
  whitebg,
  darkbg,
  setDarkBg,
  setWhiteBg,
  setCurrentBg
}