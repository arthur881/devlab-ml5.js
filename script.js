let mobilenet;
let video;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.imageClassifier('MobliNet');
    
}
function draw() {
    image(video, 0, 0);
}
