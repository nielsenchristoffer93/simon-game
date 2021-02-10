
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameHasStarted = false;

var level = 1;

// Choose a random color and add to gamePattern.
function nextSequence(){

  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);

  console.log(randomNumber);
  console.log(randomChosenColour);

}

// Detect button clicked.
$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);


  console.log(userClickedPattern);
});

// Play sound based on the color (name) of the button.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate clicked button.
function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

// Detect if any key on keyboard has been pressed.
$(document).keydown(function(){
  if(!gameHasStarted)
  {
    nextSequence();
    gameHasStarted = true;
  }
});

// Check users answers compared to the gamePattern
function checkAnswer(currentLevel){

  console.log("userClickedPattern: " + userClickedPattern[currentLevel]);
  console.log("gamePattern: " + gamePattern[currentLevel]);
  console.log("level: " + currentLevel);

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("Success");

    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    gameOver();
    console.log("Wrong");
  }
}

function gameOver(){
  playSound("wrong");
  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver(){
  level = 1;
  gamePattern = [];
  gameHasStarted = false;
}
