import { loadSongs } from './main-room.js'

let buffer, customSongPlayer = "banana";
let customSongPlayButton = document.querySelector(".custom-song-play-button");
let customSongStopButton = document.querySelector(".custom-song-stop-button");
let fileName;

let songDiv = document.querySelector(".added-song");
let songName = document.getElementById("song-name");
let addSongButton = document.querySelector(".add-song");

if (customSongPlayButton) {
  customSongPlayButton.onclick = function() {
    customSongPlayer.play();
  };

}

if (customSongStopButton) {
  customSongStopButton.onclick = function() {
    customSongPlayer.stop();
  };
}

audio_file.onchange = function() {
  let files = this.files;
  let file = URL.createObjectURL(files[0]);

  fileName = files[0].name;
  addSongButton.innerHTML = "Loading...";

  buffer = new Tone.Buffer({
    url: file,
    onload: loaded,
  });
};

const loaded = () => {
  console.log('1', customSongPlayer);

  songDiv.classList.remove("none");
  songDiv.classList.add("block");
  songName.innerHTML = fileName;
  addSongButton.innerHTML = "Add a custom song";

  customSongPlayer = new Tone.Player(buffer).toDestination();
  console.log(fileName)
  loadSongs(buffer);
};

export { customSongPlayer };