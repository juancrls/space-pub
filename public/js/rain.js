let rainVolumeValue = 5;
let oldRainVolumeValue = 5;

let dropElement;
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

let differentRains = document.querySelectorAll(".different-rain");

differentRains.forEach(rainBtn => {
  rainBtn.addEventListener("click", async() => {
    await rainPlayer.load(`../audios/rain_${rainBtn.id}.mp3`)

    if (isRaining) {
      rainPlayer.stop();
      rainPlayer.start();
    }

  })
})

const setDrop = (d) => {
  d.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  d.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
  d.style.animationDelay = Math.random() * 2 + "s";
};

const setRainDrops = (drop, firstRain = false, dropQuantity) => {
  for (let i = 0; i < dropQuantity; i++) {
    if (!firstRain) {
      drop = document.createElement("hr");
      setDrop(drop);
      rainDrops.appendChild(drop);
    } else setDrop(drop[i]);
  }
};

async function stopRain(dropQuantityToRemove = rainDrops.children.length, fadeOut = 10) {
  if (isRaining && rainDrops.children.length <= 20) return; // avoid the function to run when there's no more rain drops

  for (var i = 0; i < dropQuantityToRemove; i++) {
    if (!rainDrops.lastElementChild) return;
    rainDrops.removeChild(rainDrops.lastElementChild);
    if (!isRaining) {
      await sleep(fadeOut);
    }
  }
}

document.querySelector('#rain-volume-input').addEventListener('input', (e) => {
  rainVolumeValue = e.currentTarget.value;
  if (isRaining) {
    let isDecreasing = Number(oldRainVolumeValue) > Number(rainVolumeValue);
    if (isDecreasing) {
      if (rainDrops.children.length <= (oldRainVolumeValue - rainVolumeValue) * 20) return;
      stopRain((oldRainVolumeValue - rainVolumeValue) * 20);
    } else {
      setRainDrops(dropElement, false, 20);
    }
  }
  rainPlayer.volume.value = rainVolumeValue;
  oldRainVolumeValue = rainVolumeValue;
}, false)

document.getElementById("rain-button").addEventListener("click", () => {
  if (!isRaining) {
    rainPlayer.volume.value = 5;
    document.querySelector('#rain-volume-input').value = 5;
    rainPlayer.start();
  } else rainPlayer.stop();
});

rainButton.addEventListener("click", () => {
  if (!isRaining) {
    isRaining = true;
    setRainDrops(dropElement, false, rainVolumeValue * 20);
  } else {
    rainVolumeValue = 5;
    isRaining = false;
    stopRain();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > firstRainWindowWidth && isRaining) setRainDrops(rainDrops.children, true);
});