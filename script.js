/*
let faceapi;
let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  //video.hide();
  faceapi = ml5.faceApi(video, { withLandmarks: true, withExpressions: false }, modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
  // Draw the detected faces onto the canvas
  background(0);
  image(video, 0, 0, width, height);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(4);
  result.forEach(face => {
    const { x, y, width, height } = face.detection.box;
    rect(x, y, width, height);
  });
}

*/



let mobilenet;
let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture({ video: true });
  video.hide();
  background(0);
  mobilenet = ml5.imageClassifier('MobileNet', video, modelLoaded);
  frameRate(10);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
  image(video, 0, 0);
  mobilenet.classify(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  //console.log(results);
  // Draw the classification results onto the canvas
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text(results[0].label, width/2, height - 20);
}
