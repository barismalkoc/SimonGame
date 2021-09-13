const buttonColourOptions = ["red", "blue", "green", "yellow"];
let currentLevel = 1;
let isGameFinished = false;
let gamePattern = [];
let counter = 0;

document.addEventListener("keypress", function () {
    setGameBoard();
    addOnClicks();
})

const setGameBoard = async () => {
    const levelTitle = document.getElementById("level-title");
    levelTitle.innerHTML = "Level : " + currentLevel;
    setGameColours()
    let fakeGamePattern = [...gamePattern]
    await recursion(fakeGamePattern);
    return gamePattern;

}

const setGameColours = () => {

    for (let i = 0; i < currentLevel; i++) {
        gamePattern[i] = buttonColourOptions[Math.floor(Math.random() * buttonColourOptions.length)];
    }


}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
async function recursion(arr) {
    if (arr.length == 0) return;
    await timeout(1000);
    makeAnimation(arr.shift());
    return recursion(arr);
}


const checkRules = (clickedValue) => {

    if (clickedValue === gamePattern[counter]) {
        counter++;
        if (counter === currentLevel) {
            nextLevel();
        }
    } else {

        gameOver();
    }

}

const gameOver = () => {

    alert("Kazanamadınız Level : " + currentLevel);
    currentLevel = 1;
    gamePattern = [];
    counter = 0;
    setGameBoard();

}

const nextLevel = () => {
    counter = 0;
    currentLevel++;
    setGameBoard();
}

const addOnClicks = () => {
    for (let i = 0; i < 4; i++) {
        let currentButton = document.getElementsByClassName("btn")[i];
        currentButton.addEventListener("click", function (e) {
            checkRules(e.target.classList[1]);

        })
    }
}

const makeAnimation = (generatedColour) => {

    $("#" + generatedColour).fadeIn(100).fadeOut(100).fadeIn(100);
    getAudio(generatedColour);
}

const getAudio = (move) => {
    var audio = new Audio("sounds/" + move + ".mp3");
    audio.play();
}