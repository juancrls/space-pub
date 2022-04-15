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
  volume: 5,
  fadeIn: 1,
  fadeOut: 1.5,
}).toDestination();

document.getElementById("rain-button").addEventListener("click", () => {
  if (!isRaining) {
    rainPlayer.start();
  } else {
    rainPlayer.stop();
  }
});

rainButton.addEventListener("click", () => {
  if (!isRaining) {
    setRainDrops(dropElement);
    isRaining = true;
  } else {
    async function stopRain() {
      for (var i = 0; i < counter; i++) {
        rainDrops.removeChild(rainDrops.lastElementChild);
        await sleep(10);
      }
    }
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
