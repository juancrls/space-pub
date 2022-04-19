let rainVolumeValue = 5;
let oldRainVolumeValue = 5;

let dropElement;
let counter = 100;
let isRaining = false;
let rainButton = document.getElementById("rain-button");
let rainDrops = document.getElementById("rain-container");
let firstRainWindowWidth = window.innerWidth;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const rainPlayer = new Tone.Player({
  url: "../audios/rain_1.mp3",
  loop: true,
  volume: rainVolumeValue,
  fadeIn: 1,
  fadeOut: 1.5,
}).toDestination();

document.querySelector('#rain-volume-input').addEventListener('input', (e) => {
  rainVolumeValue = e.currentTarget.value;
  if(isRaining) {
    let isDecreasing = oldRainVolumeValue > rainVolumeValue;
    if(isDecreasing) {
      stopRain(counter / 2);
    } else {
      if(rainDrops.children.length < 200) {
        counter = rainVolumeValue * 5
        setRainDrops(dropElement);
      }
    }
  }

  rainPlayer.volume.value = rainVolumeValue;
  
  document.querySelector('#rain-volume-output').value = rainVolumeValue;
  oldRainVolumeValue = rainVolumeValue;
}, false)

document.getElementById("rain-button").addEventListener("click", () => {
  if (!isRaining) {

    rainPlayer.volume.value = 5;
    document.querySelector('#rain-volume-output').value = 5;
    document.querySelector('#rain-volume-input').value = 5;

    rainPlayer.start();
  } else {
    rainPlayer.stop();
  }
});

async function stopRain(dropQuantityToRemove = rainDrops.children.length, fadeOut = 10) {
  if(isRaining && dropQuantityToRemove > rainDrops.children.length) {
    return; // avoid the function to run when there's no more rain drops
  }

  for (var i = 0; i < dropQuantityToRemove; i++) {
    if(!rainDrops.lastElementChild) return;

    rainDrops.removeChild(rainDrops.lastElementChild);
    await sleep(fadeOut);
  }
}

rainButton.addEventListener("click", () => {
  if (!isRaining) {
    setRainDrops(dropElement);
    isRaining = true;
  } else {
    stopRain();
    isRaining = false;
  }
});

const setDrop = (d) => {
  d.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  d.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
  d.style.animationDelay = Math.random() * 2 + "s";
};

const setRainDrops = (drop, firstRain = false) => {
  for (let i = 0; i < counter; i++) {
    if (!firstRain) {
      drop = document.createElement("hr");

      setDrop(drop);

      rainDrops.appendChild(drop);
    } else {
      setDrop(drop[i]);
    }
  }
};

window.addEventListener("resize", () => {
  if (window.innerWidth > firstRainWindowWidth && isRaining) {
    setRainDrops(rainDrops.children, true);
  }
});
