import { player, changeLightsWithPitch, setColor } from "./globalVariables.js"

let playbackRateValue = 1;
document.querySelector('#playback-rate-input').addEventListener('input', (e) => {
  playbackRateValue = e.currentTarget.value; // saves playback rate value inside the global var playbackRateValue;
  document.querySelector('#playback-rate-output').value = playbackRateValue; // modifies the number aside the input bar;
  player.playbackRate = playbackRateValue;

  if (playbackRateValue < 1) {
    setColor(((Number(playbackRateValue - 1) * 0.12) * 20000) / -15)
  } else {
    setColor(((Number(playbackRateValue - 1) * 0.12) * 10000) / -15)
  }
  changeLightsWithPitch();
}, false)