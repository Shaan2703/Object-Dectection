img = "";
status = "";
objects = [];

function preload() {
    img=loadImage("dog_cat.jpg");
}
function setup() {
  canvas =   createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetection = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("modelLoaded is instialized");
    status = true;
    


}

function gotResult(error,Results) {
    if (error) {
        console.error(error);
    }

    {
        console.log(Results);
        objects = Results;
    }
}



function draw() {
    image(video,0,0,380,380);

    if (status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetection.detect(video , gotResult );
        for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number").innerHTML = "Numbers of Object Dectected are = "+objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15 );
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        }
    }

}