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
}
