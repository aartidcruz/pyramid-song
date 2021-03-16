let song, amp, colour, fft, record;
let volHistory = [];
let bassHistory = [];
let lowMidHistory = [];
let midHistory = [];
let highMidHistory = [];
let trebleHistory = [];
let noiseScale=0.001;
let colHistory = ['red'];

fft = new p5.FFT();

function preload() {
  song = loadSound('music/pyramid_song.mp3');
  getAudioContext().resume();
}

function setup() {
  createCanvas(5000, 1000)
  song.play();
  // song.jump(190)
  amp = new p5.Amplitude();
  fft.setInput(song);
}

function draw() {
  background(255, 255, 255, SVG);
  let vol = amp.getLevel();
  volHistory.push(vol);

  if (record == true) {
    save("mySVG.svg"); // give file name
    record = false;
  }

  let spectrum = fft.analyze();
  let bass, lowMid, mid, highMid, treble;

  // Map Bass
  bass = fft.getEnergy("bass");
  bassHistory.push(bass);

  // Map lowMid
  lowMid = fft.getEnergy("lowMid");
  lowMidHistory.push(lowMid);

  // Map Mid
  mid = fft.getEnergy("mid");
  midHistory.push(mid);

  // Map High Mid
  highMid = fft.getEnergy("highMid");
  highMidHistory.push(highMid);

  // Map Treble
  treble = fft.getEnergy("treble");
  trebleHistory.push(treble);


  let bins=[bass,lowMid,mid,highMid,treble];

  // save SVG

  if (vol > 0.2) {
    colHistory.push('red');
  } else if (vol < 0.2) {
    colHistory.push('yellow');
  }

  for (let x = 0; x < volHistory.length; x++) {
    noStroke()

    let y = map(volHistory[x], 0, 1, height, 0);
    let noiseVal = noise((bassHistory[x])*noiseScale, bassHistory[x]*noiseScale);
    console.log(noiseVal)
    let map_bass = (map(bassHistory[x], 0, 300, 0, height));
    let map_treble = map(trebleHistory[x], 0, 150, height, 0);

    let map_highmid = map(highMidHistory[x], 0, 255, height, 0);
    let map_lowMid = (map(lowMidHistory[x], 0, 255, height, 0));
    let map_mid = (map(midHistory[x], 0, 255, height, 0));

    // change colour based on amplitude
    // let colourMap = map(colHistory[], 0, 255, 0, 255);
    fill(0, 0, 0)
    // console.log(colHistory[x])


    ellipse(x, y, y/80, y/80);
    ellipse(x, map_treble-100, map_treble/80, map_treble/80);
    // fill(255, 255, 255, 80)
    // ellipse(x, map_bass, map_bass/90, (map_bass/90)*noiseVal);
    // ellipse(x+5, map_bass+5, map_bass/90, (map_bass/90)*noiseVal);
    // ellipse(x-5, map_bass-5, map_bass/90, (map_bass/90)*noiseVal);
    // ellipse(x-10, map_bass+10, map_bass/90, (map_bass/90)*noiseVal);
    // ellipse(x+10, map_bass-10, map_bass/90, (map_bass/90)*noiseVal);
    // console.log(map_treble)
    // // fill(255, 255, 255, 100)
    //
    // ellipse(x, map_lowMid, map_lowMid/20, (map_lowMid/20)*noiseVal);
    // ellipse(x, map_mid, map_mid/50, map_mid/50);
    // ellipse(x, map_highmid, map_highmid/50, map_highmid/50);
    // rect(x, y, x/90, y/90);
    // point(x, y);
  }
}

// Chrome 70 will require user gestures required to enable web audio api
// Click on the web page to start audio
function touchStarted() {
  getAudioContext().resume();
}


function mousePressed() {
  record = true;
}
