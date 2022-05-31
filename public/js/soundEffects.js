let doorOpeningSound = new Tone.Player("../audios/door-opening.mp3").toDestination();
let doorClosingSound = new Tone.Player("../audios/door-closing.mp3").toDestination();

let lightsOnSound = new Tone.Player("../audios/lightswitchon.mp3").toDestination();
let lightsOffSound = new Tone.Player("../audios/lightswitchoff.mp3").toDestination();

let soundEnteringPub = new Tone.Player("../audios/soundEnteringPub.mp3").toDestination();

export { doorOpeningSound, doorClosingSound, lightsOnSound, lightsOffSound, soundEnteringPub }