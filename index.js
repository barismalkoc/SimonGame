// async function recursion(arr) {
//     if (arr.length == 0) return;
//     await timeout(1000);
//     console.log(arr.pop());
//     return recursion(arr);
// }


// await recursion([1, 2, 3]);
// const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 4;


document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("level-title").innerHTML = "Level : " + level;
        started = true;
        nextLevel();
    }
})

function nextLevel() {
    level++;
    document.getElementById("level-title").innerHTML = "Level : " + level;
    gamePattern = randomColourList();
    delay(gamePattern);
    console.log(gamePattern)

}


function delay(gamePattern) {
    setTimeout(function () {
        var gameColour = gamePattern.pop();
        makeRandomColourAnimation(gameColour)
        
        if (gamePattern.length > 0) {
            delay(gamePattern);
        }
    }, 1000
    )
}

function makeRandomColourAnimation(gameColour) {

        console.log(gameColour);
        $("#" + gameColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gameColour); 
    
}

function randomNumber() {

    return Math.floor(Math.random() * buttonColours.length);

}

function randomColourList() {

    gamePattern = [];
    for (var i = 0; i < level; i++) {
        gamePattern.push(buttonColours[randomNumber()]);
    }
    // console.log(gamePattern);
    return gamePattern;

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

