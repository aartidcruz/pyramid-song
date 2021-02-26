let yoff = 0.0; // 2nd dimension of perlin noise

function preload(){
  sound = loadSound('music/pyramid_song.mp3');
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.mouseClicked(toggleSound);
  amplitude = new p5.Amplitude();
}

function draw() {
  background(225, 224);
  textAlign(CENTER);
  text('tap to play', width/2, 20);

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, 200);
  ellipse(size+10, yoff, size, size);
  yoff += size*0.01;

  for(let i = 0; i < width; i+=10){
    line(0, i, size, size);
  }


  // // We are going to draw a polygon out of the wave points
  // beginShape();
  //
  // let xoff = 0; // Option #1: 2D Noise
  // // let xoff = yoff; // Option #2: 1D Noise
  //
  // // Iterate over horizontal pixels
  // for (let x = 0; x <= width; x += 10) {
  //   // Calculate a y value according to noise, map to
  //
  //   // Option #1: 2D Noise
  //   // let y = map(noise(xoff, yoff), 0, 1, 200, 300);
  //   let y = map(xoff, size*yoff, 0, 1, 200, 300);
  //
  //   // Option #2: 1D Noise
  //   // let y = map(noise(xoff), 0, 1, 200,300);
  //
  //   // Set the vertex
  //   vertex(size, size);
  //   // Increment x dimension for noise
  //   xoff += 0.05;
  // }
  // // increment y dimension for noise
  // yoff += 0.01;
  // vertex(width, height);
  // vertex(0, height);
  // endShape(CLOSE);

}

function toggleSound(){
  if (sound.isPlaying()) {
    sound.stop();
  } else {
    sound.play();
  }
}




// < --------------------------------- >
