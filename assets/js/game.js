/*--- Declared Variables ----*/ 

let cardList = document.getElementsByClassName("card");
let cards = [...cardList];

const deck = document.getElementById("card-deck");

let actions = 0;
let counter = document.querySelector(".actions");
const trophies = document.querySelectorAll(".fa-trophy");

let matchedCard = document.getElementsByClassName("match");
let trophiesList = document.querySelectorAll(".trophies li");

let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1");
var openedCards = [];

/*--- Randomize the cards ---*/

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

/*--- Initialises the game board and shows all the cards reset timer and actions ---*/
function initialiseGameBoard() {
    openedCards = [];
    cards = randomize(cards);
    deck.innerHTML = "";
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("show", "open", "match", "disabled");
        deck.appendChild(cards[i]);
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

/*--- Toggle classes to open and show the cards ---*/
var showColor = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/*--- Function to check if opened cards match or unmatch ---*/
function colorMatch() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].value === openedCards[1].value) {
            matched();
        } else {
            unmatched();
        }
    }
}

/*--- Adding classes when cards match ---*/
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

/*--- Adding classes when cards don't match ---*/
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add("disabled");
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

function updateRatings() {
    if (actions > 8 && actions < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                trophies[i].style.visibility = "collapse";
            }
        }
    } else if (actions > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                trophies[i].style.visibility = "collapse";
            }
        }
    }
}

/*--- Move counter display, start timer and 3 trophies rating ---*/
function moveCounter() {
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
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");
        var trophyRating = document.querySelector(".trophies").innerHTML;
        document.getElementById("finalMove").innerHTML = actions;
        document.getElementById("trophyRating").innerHTML = trophyRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closeModal();
    }
}

function closeModal() {
    closeicon.addEventListener("click", function() {
        modal.classList.remove("show");
        startMemory();
    });
}

function runMemoryGame() {
    modal.classList.remove("show");
    startMemory();
}

/*--- For loop adding Event Listener ---*/
document.body.onload = (function() {
    startMemory();
    for (var i = 0; i < cards.length; i++) {
        card = cards[i];
        card.addEventListener("click", showColor);
        card.addEventListener("click", colorMatch);
        card.addEventListener("click", gameFinish);
    }
})();