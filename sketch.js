var ball;
var database;
var position;
var ballPosition;
function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballPosition = database.ref('ball/position');
    ballPosition.on("value", readDatabase, debugError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(+5,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
   database.ref('ball/position').set({
    'x':position.x + x,
    'y':position.y + y
  });
  
}

function readDatabase(data){
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}

function debugError(){
  console.log("ERROR IN DATABASE!");
}