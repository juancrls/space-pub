Tone.start();

if (Tone.context.state !== 'running') {
  Tone.context.resume();
}

let player = new Tone.Player({
  "mute": false,
  "volume": -10,
  "reverse": false,
  "fadeOut": 0.5,
  "playbackRate": document.querySelector('#playback-rate-output').value,
}).toDestination()

let reverb = new Tone.Reverb({
  "wet": 1,
  "decay": 2,
  "preDelay": 0.01
}).toDestination();

export { player, reverb }