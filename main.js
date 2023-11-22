scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

song = ""

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet está inicializado");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
	      leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video, 0, 0 ,600, 600);
if(scoreRightWrist>0.2){
    fill("#FF0000")
    stroke("#FF00FF");
    circle(rightWristX,rightWristY,20);
    
    if (rightWristX >0 && rightWristX <=100) {
document.getElementById("speed").innerHTML = "speed = 2.5x"
        song.rate(2.5)
    } else if(rightWristX >100 && rightWristX <=200) {
        document.getElementById("speed").innerHTML = "speed = 5x"
        song.rate(5)   
    } else if(rightWristX >200 && rightWristX <=300){
        document.getElementById("speed").innerHTML = "speed = 10x"
        song.rate(10)
    }else if(rightWristX >200 && rightWristX <=300){
        document.getElementById("speed").innerHTML = "speed = 20x"
        song.rate(20)
    }
else if(rightWristX >200 && rightWristX <=300){
    document.getElementById("speed").innerHTML = "speed = 40x"
    song.rate(40)
}
}
if(scoreLeftWrist>0.2){
    fill("#00FF00")
    stroke("#FF00FF");
    circle(leftWristX,leftWristY,20);
    soso = (floor(Number(leftWristY)*2))/1000
    document.getElementById("volume").innerHTML = soso;
}
}


function play(){
    song.play();
    song.setVolume(1);
}
