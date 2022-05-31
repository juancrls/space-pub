import {
  player,
  reverb,
  file,
  setRAF,
  draw,
  changeWithTime,
} from './globalVariables.js'

document.querySelector('.song-volume-slider').addEventListener('input', (e) => player.volume.value = Number(e.currentTarget.value));

let playButton = document.querySelectorAll('.start-song');
let currentSong;

playButton.forEach(async(song) => {
  song.addEventListener('click', async() => {
    let mp3 = song.classList.contains('custom-song') ? file : `../audios/music/${song.nextElementSibling.id}.mp3`

    if (player.state == 'stopped') {
      setRAF(false);
      changeWithTime()
      draw();

      song.classList.remove('fa-play');
      song.classList.add('fa-pause');

      currentSong = song;
      mp3 = song.classList.contains('custom-song') ? file : `../audios/music/${song.nextElementSibling.id}.mp3`

      await player.load(mp3);

      Tone.start();
      player.start();
    } else {
      if (song == currentSong) { // if the pause event is for the current song

        setRAF(true);

        player.connect(reverb)
        player.stop()
        song.classList.remove('fa-pause');
        song.classList.add('fa-play');

        await sleep(1300);
        player.disconnect(reverb)
          // @@ talvez esteja inutilizada pela falta do transport
      } else { // if isn't, will reset the icons and play the requested song
        currentSong.classList.remove('fa-pause');
        currentSong.classList.add('fa-play');

        song.classList.remove('fa-play');
        song.classList.add('fa-pause');
        mp3 = song.classList.contains('custom-song') ? file : `../audios/music/${song.nextElementSibling.id}.mp3`

        player.stop();
        player.connect(reverb)

        await player.load(mp3);
        player.disconnect(reverb)
        player.start()

        currentSong = song;
      }
    }
  })
})