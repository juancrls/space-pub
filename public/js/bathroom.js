import {
  player,
  reverb,
  lights,
  leftLight,
  leftLightDisplay,
  rightLight,
  rightLightDisplay,
  currentBackground,
  whitebg,
  darkbg,
  bgIsWhite,
  soundEnteringPub,
  doorOpeningSound,
  doorClosingSound,
  setDarkBg,
  setWhiteBg,
  setLeftLightDisplay,
  setRightLightDisplay,
  setCurrentBg,
} from "./globalVariables.js";

let bathroomLight = document.getElementById("bathroom-light");
let bathroomLightDisplay = "none";
let inBathroom = false;
let bathroomIsTransitioning = false;

const setBathroomLightDisplay = (value) => bathroomLightDisplay = value;

let bathroomTransition = document.getElementById("bathroom-transition");
let bathroomButton = document.getElementById("bathroom-door");
let lateralButton = document.querySelector(".lateral-menu-button");

const enterBathroom = (firstVisit = false) => {
  if (!firstVisit) {
    bathroomTransition.classList.add("elementToFadeInAndOut");
    setTimeout(() => {
      doorOpeningSound.start();
    }, 500);
  } else {

    // setTimeout(() => {
    //   soundEnteringPub.start(); @@ needs to implement a button to create a user 
    // interaction and start the audiocontext
    // }, 1000);
  }


  if (firstVisit) {
    setTimeout(() => {
      bathroomTransition.style.opacity = "0";
      bathroomTransition.classList.add("elementToFadeInAndOut");

      lateralButton.style.opacity = "100%";
    }, 3000)
  } else {
    setTimeout(() => {
      inBathroom = true;

      setWhiteBg("../images/bathroom.jpg");
      setDarkBg("../images/bathroom-night.jpg");
      setCurrentBg("../images/bathroom-night.jpg");

      if (bgIsWhite) setCurrentBg(whitebg)
      backgroundImage.src = currentBackground;

      if (lights) {
        setBathroomLightDisplay("block");
        setLeftLightDisplay("none");
        setRightLightDisplay("none");

        leftLight.style.display = leftLightDisplay;
        rightLight.style.display = rightLightDisplay;
        bathroomLight.style.display = bathroomLightDisplay;
      }

      player.connect(reverb);
    }, 1500);
    bathroomButton.innerHTML = "Leave Bathroom";
  }

  setTimeout(() => {
    bathroomTransition.classList.remove("elementToFadeInAndOut");
    bathroomIsTransitioning = false;
  }, 3000);
}


enterBathroom(true);

const leaveBathroom = () => {
  bathroomTransition.classList.add("elementToFadeInAndOut");

  setTimeout(() => {
    doorClosingSound.start();
  }, 500);

  setTimeout(() => {
    inBathroom = false;
    setWhiteBg("../images/cafe.png");
    setDarkBg("../images/cafe-night.png");

    if (bgIsWhite) {
      backgroundImage.src = whitebg;
      setCurrentBg(whitebg)
    } else {
      setCurrentBg(darkbg)
      backgroundImage.src = darkbg;
    }

    if (lights) {
      setBathroomLightDisplay("none");
      setLeftLightDisplay("block");
      setRightLightDisplay("block");

      leftLight.style.display = leftLightDisplay;
      rightLight.style.display = rightLightDisplay;
      bathroomLight.style.display = bathroomLightDisplay;
    }

    player.disconnect(reverb);
  }, 1500);

  setTimeout(() => {
    bathroomButton.innerHTML = "Enter Bathroom";
    bathroomTransition.classList.remove("elementToFadeInAndOut");
    bathroomIsTransitioning = false;
  }, 3000);
}

bathroomButton.addEventListener("click", () => {
  if (bathroomIsTransitioning) return;
  bathroomIsTransitioning = true;

  if (!inBathroom) {
    enterBathroom();
  } else {
    leaveBathroom();
  }
});

export {
  bathroomButton,
  bathroomLight,
  bathroomLightDisplay,
  inBathroom,
  bathroomIsTransitioning,
  bathroomTransition,
  setBathroomLightDisplay,
}