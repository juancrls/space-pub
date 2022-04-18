let reverb = new Tone.Reverb({
	"wet": 1,
	"decay": 2,
	"preDelay": 0.01
}).toDestination();

let mp3 = "../audios/good-day.mp3";

let player = new Tone.Player({
  "playbackRate": document.querySelector('#playback-rate-output').value,
}).toDestination() // como trocar a url do player?

let detuneColor = 0;

let dynamicLights = true;
let dynamicLightsButton = document.querySelector('#dynamicLights');

dynamicLightsButton.addEventListener('click', () => {
  if(dynamicLights) {
    dynamicLightsButton.innerHTML = "Enable dynamic lights"
    dynamicLights = false;
    rAFIsPaused = true;
  } else {
    console.log('test')
    dynamicLightsButton.innerHTML = "Disable dynamic lights"
    
    dynamicLights = true;
    rAFIsPaused = false;
    changeWithTime()
    
    draw();
  }
})

let currentBackground = 'dark';
let backgroundImage = document.querySelector('#backgroundImage');
let changeBackgroundButton = document.querySelector('#changeBackground');

changeBackgroundButton.addEventListener('click', () => {
  if(currentBackground == 'dark') {
    currentBackground = 'white'
    changeBackgroundButton.innerHTML = "Dark Background"
    backgroundImage.src = "../images/cafe.png"
  } else {
    currentBackground = 'dark'
    changeBackgroundButton.innerHTML = "White Background"
    backgroundImage.src = "../images/cafe-night.png"
  }
})

let playButton = document.querySelectorAll('.start-song');
let isPlaying = false;
let rAFIsPaused = true;

player.sync().start();

let currentSong;

playButton.forEach(song => {
  song.addEventListener('click', () => {
    if(!isPlaying) {
      
      isPlaying = true;
      rAFIsPaused = false;
      changeWithTime()
      draw();
      
      let buffer = new Tone.Buffer(mp3, () => {
        player.buffer = buffer;

        Tone.start();
        Tone.Transport.start();
        currentSong = song;
    
        song.classList.remove('fa-play');
        song.classList.add('fa-pause');
      });
      
    } else {
      if(song !== currentSong) {
        currentSong.classList.remove('fa-pause');
        currentSong.classList.add('fa-play'); 

        song.classList.remove('fa-play');
        song.classList.add('fa-pause'); 

        mp3 = '../audios/nikes.mp3' // deixar dinamico
        player.stop();
        player.restart()

        let buffer = new Tone.Buffer(mp3, () => {
          player.buffer = buffer;
          
          player.start();
          Tone.start();
          Tone.Transport.start();
          currentSong = song;
        });

      } else {
        isPlaying = false;
        rAFIsPaused = true;
        
        Tone.Transport.fadeIn = 0.1;
        Tone.Transport.fadeOut = 0.1;
        player.fadeIn = 0.1;
        player.fadeOut = 0.1;

        Tone.Transport.stop(1);
    
        song.classList.remove('fa-pause');
        song.classList.add('fa-play');
      }
    }
  })
})

// playButton.addEventListener('click', () => {
//   if(!isPlaying) {

//     isPlaying = true;
//     rAFIsPaused = false;
//     changeWithTime()
//     draw();
  
//     Tone.start();
//     Tone.Transport.start();

//     playButton.classList.remove('fa-play');
//     playButton.classList.add('fa-pause');

//   } else {
//     isPlaying = false;
//     rAFIsPaused = true;
//     Tone.Transport.stop();

//     playButton.classList.remove('fa-pause');
//     playButton.classList.add('fa-play');
//   }
// })



let playbackRateValue = 1;
let inputDetuneValue = 0; // that var is created to avoid activateDynamicPitch function to overlay the input value
let detuneValue = 0;

const activateDynamicPitch = () => {
  if(dynamicPitch.checked) {    
    if(playbackRateValue < 1) {
      detuneValue = ((Number(playbackRateValue) - 1) * 0.12) * 20000;
    } else {
      detuneValue = ((Number(playbackRateValue) - 1) * 0.12) * 10000;
    }
  }
  return detuneValue;
}

// PLAYBACK RATE
document.querySelector('#playback-rate-input').addEventListener('input', (e) => {
  playbackRateValue = e.currentTarget.value; // saves playback rate value inside the global var playbackRateValue;
  document.querySelector('#playback-rate-output').value = playbackRateValue; // modifies the number aside the input bar;

  if(dynamicPitchCheckbox.checked) {
    player.detune = Math.floor(activateDynamicPitch());
    detuneColor = player.detune / -20;
    changeLightsWithPitch()
  }

  player.playbackRate = playbackRateValue;
}, false)

// PITCH
document.querySelector('#pitch-input').addEventListener('input', (e) => {
  let val = e.currentTarget.value;
  document.querySelector('#pitch-output').value = val;

  inputDetuneValue = val * 100;
  player.detune = inputDetuneValue;
  detuneColor = player.detune / -20;
  changeLightsWithPitch()
  
}, false)

// CHECKBOX
let dynamicPitchCheckbox = document.getElementById('dynamicPitch');
dynamicPitchCheckbox.addEventListener('click', () => {
  detuneColor = player.detune / -20;
  changeLightsWithPitch()

  if(dynamicPitchCheckbox.checked) {
    player.detune = Math.floor(activateDynamicPitch()); // makes detune value relative to playback rat) e
    document.querySelector('#pitch-adjust-div').style.display = 'none'
  } else {
    player.detune = inputDetuneValue;
    document.querySelector('#pitch-adjust-div').style.display = 'block'
  }
});

// BATHROOM
let inBathroom = false;

let bathroomButton = document.getElementById('bathroom-door');
bathroomButton.addEventListener('click', () => {
  
  if(!inBathroom) {
    console.log('...entering');
    
    setTimeout(() => {
      player.connect(reverb);
      bathroomButton.innerHTML = 'Leave Bathroom';
    }, 2000);
    
    inBathroom = true;
  } else {
    console.log('...leaving');
    
    setTimeout(() => {
      player.disconnect(reverb);
      bathroomButton.innerHTML = 'Enter Bathroom';
    }, 2000);

    inBathroom = false; 
  }
});

let fftSize = 256;
let analyser = new Tone.Analyser("fft", fftSize)
player.connect(analyser)

let leftLight = document.getElementById("svg-left-light");
let rightLight = document.getElementById("svg-right-light");

const colors = [
  [[135, 55, 135], [95, 0, 119]],
  [[95, 70, 36], [138, 110, 0]],
  [[0, 140, 255], [17, 39, 143]],
  [[95, 36, 95], [138, 0, 56]],
  [[0, 255, 126], [0, 255, 41]],
]

const draw = () => {
  if(rAFIsPaused || !dynamicLights) return;
  requestAnimationFrame(draw);
  
  let dataArray = analyser.getValue();
  let sum = dataArray.reduce((a, b) => a + b + 118, 0);
  let avg = (sum / dataArray.length) || 0;

  
  let d = (player.detune / 100) * 7; // percentage needed to increase avg calc
  let max = Math.max(...dataArray) + 100
  if(player.detune > 0) {
    max += (max/100) * d
  }

  if (max > 69) { // (max > avg * 2)
    if(!isRunning) colorChanger();
  }
}


let isRunning = false;
let b = 0;

const changeWithTime = () => {
  function delay() {  
    setTimeout(function() {  
      b = 0; // resolve o bug dele botar uma cor ao mexer no input com o disable, mas fixa na cor vermelha
      if(rAFIsPaused || !dynamicLights) return; // talvez nem precise desse if
      let nextB = b
      while(nextB == b) nextB = Math.floor(Math.random() * 5); // to avoid the same color twice
      b = nextB
      if (!rAFIsPaused) delay();
    }, 100)
  }
  delay(); 
}

const colorChanger = () => {
  isRunning = true;

  changeLightsWithPitch();

  function delay() {  
    setTimeout(() => isRunning = false, 400 / player.playbackRate);
  }
  delay();
}

const changeLightsWithPitch = () => {
  leftLight.style = ` background: 
  linear-gradient(70deg, transparent 41.75%, white 34.5%), 
  linear-gradient(15deg, transparent 63.5%, white 5%),
  linear-gradient(360deg, transparent 32% , rgb(${colors[b][0][0] - detuneColor}, ${colors[b][0][1] - detuneColor}, ${colors[b][0][2] - detuneColor}), rgb(${colors[b][1][0] - detuneColor}, ${colors[b][1][1] - detuneColor}, ${colors[b][1][2] - detuneColor}));`

  rightLight.style = ` background: 
  linear-gradient(-53.1deg, transparent 60%, white 20.5%), 
  linear-gradient(-41deg, transparent 49.6%, white 0%),
  linear-gradient(15deg, transparent 42% , rgb(${colors[b][0][0] - detuneColor}, ${colors[b][0][1] - detuneColor}, ${colors[b][0][2] - detuneColor}), rgb(${colors[b][1][0] - detuneColor}, ${colors[b][1][1] - detuneColor}, ${colors[b][1][2] - detuneColor}));`
}