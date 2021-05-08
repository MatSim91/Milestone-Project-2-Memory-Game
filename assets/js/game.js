/*--- Declared Variables ----*/ 

let iconList = document.getElementsByClassName("icon");
let icons = [...iconList];

const board = document.getElementById("icons-board");

let actions = 0;
let counter = document.querySelector(".actions");
const trophies = document.querySelectorAll(".fa-trophy");

let sameColor = document.getElementsByClassName("equal");
let trophiesList = document.querySelectorAll(".trophies li");

let closeModalPopup = document.querySelector(".close-button-2");
let gamePopup = document.getElementById("game-popup");
var flippedColors = [];

var content = document.getElementsByTagName("body")[0];
var actionsLight = document.querySelector(".actions");
var timerLight = document.querySelector(".timer");
var restartLight = document.querySelector(".restart");
var headerLight = document.querySelector(".memory-title");
var boardLight = document.querySelector(".board");
var iconLight = document.querySelector(".icon");
var themeSwitch = document.getElementById("theme-switch");

/*--- Randomize the icons ---*/

function randomize(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*--- Initialises the game board and displays all the icons reset timer and actions ---*/
function initialiseGameBoard() {
    flippedColors = [];
    icons = randomize(icons);
    board.innerHTML = "";
    for (var i = 0; i < icons.length; i++) {
        icons[i].classList.remove("display", "flip", "equal", "off");
        board.appendChild(icons[i]);
    }
}

function startTrophies() {
    for (var i = 0; i < trophies.length; i++) {
        trophies[i].style.color = "#FFD700";
        trophies[i].style.visibility = "visible";
    }
}

function initScore() {
    actions = 0;
    counter.innerHTML = actions;
}

function initTimer() {
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function startMemory() {
    initialiseGameBoard();
    initScore();
    startTrophies();
    initTimer();
}

/*--- Toggle classes to flip and display the icons ---*/
var showColor = function() {
    this.classList.toggle("flip");
    this.classList.toggle("display");
    this.classList.toggle("off");
};

/*--- Function to check if flipped icons are the same or different ---*/
function colorMatch() {
    flippedColors.push(this);
    var len = flippedColors.length;
    if (len === 2) {
        actionsCounter();
        if (flippedColors[0].value === flippedColors[1].value) {
            same();
        } else {
            different();
        }
    }
}

/*--- Adding classes when icons are the same ---*/
function same() {
    flippedColors[0].classList.add("equal", "off");
    flippedColors[1].classList.add("equal", "off");
    flippedColors[0].classList.remove("display", "flip", "no-event");
    flippedColors[1].classList.remove("display", "flip", "no-event");
    flippedColors = [];
}

/*--- Adding classes when icons are different ---*/
function different() {
    flippedColors[0].classList.add("different");
    flippedColors[1].classList.add("different");
    deactivate();
    setTimeout(function() {
        flippedColors[0].classList.remove("display", "flip", "no-event", "different");
        flippedColors[1].classList.remove("display", "flip", "no-event", "different");
        activate();
        flippedColors = [];
    }, 1100);
}

function deactivate() {
    Array.prototype.filter.call(icons, function(icon) {
        icon.classList.add("off");
    });
}

function activate() {
    Array.prototype.filter.call(icons, function(icon) {
        icon.classList.remove("off");
        for (var i = 0; i < sameColor.length; i++) {
            sameColor[i].classList.add("off");
        }
    });
}

function updateRatings() {
    if (actions > 10 && actions < 14) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                trophies[i].style.visibility = "collapse";
            }
        }
    } else if (actions > 15) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                trophies[i].style.visibility = "collapse";
            }
        }
    }
}

/*--- Move counter display, start timer and 3 trophies rating ---*/
function actionsCounter() {
    actions++;
    counter.innerHTML = actions;
    if (actions == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    updateRatings();
}

/*--- Game Timer ---*/
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

/*--- Game finished modal pop-up ---*/
function gameFinish() {
    if (sameColor.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        gamePopup.classList.add("display");
        var trophyRating = document.querySelector(".trophies").innerHTML;
        document.getElementById("finalMove").innerHTML = actions;
        document.getElementById("trophyRating").innerHTML = trophyRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    }
}

function closeModal() {
    closeModalPopup.addEventListener("click", function() {
        gamePopup.classList.remove("display");
        startMemory();
    });
}

function runMemoryGame() {
    gamePopup.classList.remove("display");
    startMemory();
}

/*--- For loop adding Event Listener ---*/
document.body.onload = (function() {
    startMemory();
    for (var i = 0; i < icons.length; i++) {
        icon = icons[i];
        icon.addEventListener("click", showColor);
        icon.addEventListener("click", colorMatch);
        icon.addEventListener("click", gameFinish);
    }
})();

/*--- Change theme on toggle button click ---*/

themeSwitch.addEventListener("click", function(){
    themeSwitch.classList.toggle("active");
    content.classList.toggle("light-theme");
    actionsLight.classList.toggle("actions-light");
    timerLight.classList.toggle("timer-light");
    restartLight.classList.toggle("restart-light");
    headerLight.classList.toggle("h1-light");
    boardLight.classList.toggle("board-light");
    iconLight.classList.toggle("icon-light");
})