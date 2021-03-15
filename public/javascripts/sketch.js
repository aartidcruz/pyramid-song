

let song, amp, colour, fft;
let volHistory = [];
let bassHistory = [];
let colHistory = ['red'];

fft = new p5.FFT();

function preload() {
  song = loadSound('music/pyramid_song.mp3');
  getAudioContext().resume();
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  let vol = amp.getLevel();
  volHistory.push(vol);

  let spectrum = fft.analyze();
  let bass, lowMid, mid, highMid, treble;

  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

  bass = fft.getEnergy("bass");
  bassHistory.push(bass);

  console.log(bassHistory)

  let bins=[bass,lowMid,mid,highMid,treble];

  if (vol > 0.2) {
    colHistory.push('red');
  } else if (vol < 0.2) {
    colHistory.push('yellow');
  }

  for (let x = 0; x < volHistory.length; x++) {
    noStroke()

    let y = map(volHistory[x], 0, 1, height, 0);
    let map_bass = map(bassHistory[x], 0, 255, 0, 255);

    // change colour based on amplitude
    // let colourMap = map(colHistory[], 0, 255, 0, 255);
    // fill(colHistory[x])
    // console.log(colHistory[x])


    ellipse(x, y, y/80, y/80);
    ellipse(x, map_bass, map_bass/80, map_bass/80);
    // rect(x, y, x/90, y/90);
    // point(x, y);
  }
  // console.log(vol)
}

// Chrome 70 will require user gestures required to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}



// < --------------------------------- >
