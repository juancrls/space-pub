import { player, lights, interactionMenu, color, colors, inBathroom, bathroomLight, bathroomLightDisplay, leftLight, leftLightDisplay, rightLight, rightLightDisplay } from "./globalVariables.js"

let isRunning = false;
let rAFIsPaused = true;

const setRAF = (status) => rAFIsPaused = status;

let fftSize = 256;
let analyser = new Tone.Analyser("fft", fftSize)
player.connect(analyser)

const draw = () => {
  if (rAFIsPaused || !dynamicLights) return;
  requestAnimationFrame(draw);

  let dataArray = analyser.getValue();
  let sum = dataArray.reduce((a, b) => a + b + 118, 0);
  let avg = (sum / dataArray.length) || 0;


  let d = (player.detune / 100) * 7; // percentage needed to increase avg calc
  let max = Math.max(...dataArray) + 100
  if (player.detune > 0) {
    max += (max / 100) * d
  }

  // if (max > 69) {
  if ((max > avg * 2)) {
    if (!isRunning) colorChanger();
  }
}

let b = 0;
let nextB;

const changeWithTime = () => {
  function delay() {
    setTimeout(function() {
      if (rAFIsPaused || !dynamicLights) return; // talvez nem precise desse if
      nextB = b
      while (nextB == b) nextB = Math.floor(Math.random() * 5); // to avoid the same color twice
      b = nextB
      if (!rAFIsPaused) delay();
    }, 100)
  }
  delay();
}

const changeLightsWithPitch = () => {
  if (!lights || player.state == "stopped") return;

  interactionMenu.style.border = `5px solid rgb(${colors[b][0][0] - color}, ${colors[b][0][1] - color}, ${colors[b][0][2] - color})`
  if (inBathroom) {
    bathroomLight.style = ` background: 
      linear-gradient(73deg, transparent 100%, white 100%), 
      linear-gradient(54deg, transparent 100%, white 100%),
      linear-gradient(3deg, transparent 30% , rgb(${colors[b][0][0] - color}, ${colors[b][0][1] - color}, ${colors[b][0][2] - color}), rgb(${colors[b][1][0]}, ${colors[b][1][1]}, ${colors[b][1][2]}));">
      display: ${bathroomLightDisplay}`
  } else {
    leftLight.style = ` background: 
      linear-gradient(70deg, transparent 41.75%, white 34.5%), 
      linear-gradient(15deg, transparent 63.5%, white 5%),
      linear-gradient(360deg, transparent 32% , rgb(${colors[b][0][0] - color}, ${colors[b][0][1] - color}, ${colors[b][0][2] - color}), rgb(${colors[b][1][0]}, ${colors[b][1][1]}, ${colors[b][1][2]}));
      display: ${leftLightDisplay}`

    rightLight.style = ` background: 
      linear-gradient(-53.1deg, transparent 60%, white 20.5%), 
      linear-gradient(-41deg, transparent 49.6%, white 0%),
      linear-gradient(15deg, transparent 42% , rgb(${colors[b][0][0] - color}, ${colors[b][0][1] - color}, ${colors[b][0][2] - color}), rgb(${colors[b][1][0]}, ${colors[b][1][1]}, ${colors[b][1][2]}));
      display: ${rightLightDisplay}`
  }
}

const colorChanger = () => {

  isRunning = true;

  changeLightsWithPitch();

  /* 
    @idea: instead of changing the lights for every high frequency detected,
    change the light when the high frequency isn't detected for more than 10ms
  
    @idea: add a bass boost on the audio only for the analyser, but keep the song normal in the toDestination();
    */
  function delay() { // @ will set the light change frequency -> @idea: adjust the delay based on the BPM
    setTimeout(() => isRunning = false, 200 / player.playbackRate);
  }
  delay();
}

export { rAFIsPaused, setRAF, draw, changeWithTime, colorChanger, changeLightsWithPitch }