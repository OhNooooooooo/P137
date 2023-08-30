status = "";
getresults = [];
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function setup() {
	canvas = createCanvas(480, 380);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++) {
        document.getElementById("model_status").innerHTML = "Status : Objects Detected";

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text = objects[i].label;
        text(text + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if (objects[i].label == input) {
            yesResult = input + "has been detected.";
            SpeechSynthesisUtterance(yesResult);
            SpeechRecognition.speak(utterThis);
            document.getElementById("object_status").innerHTML = yesResult;
        } else{
            document.getElementById("object_status").innerHTML = '"'+input+'" not found.';
        }
      }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("model_status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").innerText;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(){
    objects = results;
}