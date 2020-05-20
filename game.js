const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

// Handle Game start on any key presses
$(document).keypress(function() {
    if (!gameStart) {
        gameStart = true;
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }
});

// Handle button clicks by user
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).toggleClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).toggleClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").toggleClass("game-over");
        setTimeout(function() {
            $("body").toggleClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}
