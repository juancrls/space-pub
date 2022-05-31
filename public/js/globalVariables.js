let interactionMenu = document.querySelector(".interaction-menu");

import { player, reverb } from "./mainPlayer.js";
import { file } from "./add-song.js";
import {
  doorOpeningSound,
  doorClosingSound,
  lightsOnSound,
  lightsOffSound,
  soundEnteringPub,
} from "./soundEffects.js";

import {
  rAFIsPaused,
  setRAF,
  draw,
  changeWithTime,
  changeLightsWithPitch,
} from "./beatColorChanger.js";

import { dynamicLights, dynamicLightsButton } from "./dynamicLights.js";

import {
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
} from "./lights.js";

import { color, colors, setColor } from "./colors.js";

import {
  bgIsWhite,
  currentBackground,
  backgroundImage,
  changeBackgroundButton,
  menuLateralButton,
  whitebg,
  darkbg,
  setDarkBg,
  setWhiteBg,
  setCurrentBg,
} from "./whiteBackground.js";

import {
  bathroomButton,
  bathroomLight,
  bathroomLightDisplay,
  inBathroom,
  bathroomIsTransitioning,
  bathroomTransition,
  setBathroomLightDisplay,
} from "./bathroom.js";

export {
  // interaction Menu
  interactionMenu,
  // main player
  player,
  reverb,
  file,
  // sound effects
  doorOpeningSound,
  doorClosingSound,
  soundEnteringPub,
  lightsOnSound,
  lightsOffSound,
  // color changer
  rAFIsPaused,
  setRAF,
  draw,
  changeWithTime,
  changeLightsWithPitch,
  // dynamic lights
  dynamicLights,
  dynamicLightsButton,
  // lights
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
  // colors
  color,
  colors,
  setColor,
  // background
  bgIsWhite,
  currentBackground,
  backgroundImage,
  changeBackgroundButton,
  menuLateralButton,
  whitebg,
  darkbg,
  setDarkBg,
  setWhiteBg,
  setCurrentBg,
  // bathroom
  bathroomButton,
  bathroomLight,
  bathroomLightDisplay,
  inBathroom,
  bathroomIsTransitioning,
  bathroomTransition,
  setBathroomLightDisplay,
};