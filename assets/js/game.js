/*--- Based on Sandra Israel Tutorial ---*/

/*--- Declared Variables ---*/

let card = document.getElementsByClassName("card");
let cards = [...card];

const deck = document.getElementById("card-deck")

var openedCards = [];

/*--- Toggle classes to open and show the cards ---*/

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/*--- Function to Shuffle the cards ---*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*--- Function to run the game ---*/ 

document.body.onload = runGame();

function runGame(){
    
    openedCards = [];

    
    cards = shuffle(cards);
    
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "diasbled");
    }

/*--- For loop adding Event Listener ---*/

for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
};