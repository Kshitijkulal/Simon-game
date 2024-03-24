let startToToggle = false;
let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
$(document).keypress((event) => {
  console.log(event.key);
  if (!startToToggle) {
    nextSequence();
    startToToggle = true;
  }
});
$(".btn").on("click", function handler(params) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $(`.${userChosenColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${userChosenColour}`).removeClass("pressed");
  }, 100);
  sounds(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (
    gamePattern[currentLevel] === userClickedPattern[currentLevel]
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    sounds("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    level = 0;
    startToToggle = false;
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  flashAni(`.${gamePattern[gamePattern.length - 1]}`);
  sounds(gamePattern[gamePattern.length - 1]);
}
function flashAni(params) {
  $(params).fadeOut(100).fadeIn(100);
}
function sounds(params) {
  let audio = new Audio(`sounds/${params}.mp3`);
  audio.play();
}
