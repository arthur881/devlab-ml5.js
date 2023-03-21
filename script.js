<<<<<<< HEAD
let faceapi;
let detections = [];

let video;
let canvas;

function setup(){
    canvas = createCanvas(480, 360);
    canvas.id('canvas');
    video = createCapture(VIDEO);
    video.id('video');
    video.size(width, height);

    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptions: false,
        minConfiendence: 0.5
    };

    faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady(){
    faceapi.detect(gotFaces);
}

function gotFaces(error, result){
    if(error){
        console.log(error);
        return
    }

    detections = result;
    console.log(detections);
    faceapi.detect(gotFaces);
}
function draw(){
    clear();
    drawBoxes(detections);
    drawLandmarks(detections);

    
}
function drawBoxes(detections){
    if(detections.length > 0){
        for(f = 0; f < detections.length; f++){
            

            let {_x, _y, _width, _height} = detections[0].alignedRect._box;

            stroke(44, 169, 225);
            strokeWeight(1);
            noFill();
            rect(_x, _y, _width, _height);
        }
    }
}

function drawLandmarks(detections){
    if(detections.length > 0){
        for(f = 0; f < detections.length; f++){
            let points = detections[f].landmarks.positions;
            for(let i = 0; i < points.length; i++){
                stroke(44, 169, 225);
                strokeWeight(3);
                point(points[i]._x, points[i]._y);
            }
        }
    }
=======
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
>>>>>>> 5371d38af6ec5630fc46eba29e704fdc9edfb339
}
