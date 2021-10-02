const btnColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var patternClicked = [];

var gameStarted = false;
var level = 0;

/*=========================*/

$(document).keypress(function (event) {
    if (!gameStarted) {
        nextSequence();
        $("#level-title").text("Level " + level);
        gameStarted = true;
    }
});

$(".btn").on("click", function(){
    var chosenColor = $(this).attr("id");
    patternClicked.push(chosenColor);

    playSound(chosenColor);
    animatePress(chosenColor);

    checkAnswer(patternClicked.length-1);
});

/*=========================*/

function nextSequence() {

    patternClicked = [];

    level++;
    $("#level-title").text("Level " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randChosenColor = btnColors[randNum];
    gamePattern.push(randChosenColor);

    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);
}

/*=========================*/

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#" + currColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
    }, 100);
}

/*=========================*/

function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === patternClicked[currLevel]) {
        console.log("success");

        if (gamePattern.length === patternClicked.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { 
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}