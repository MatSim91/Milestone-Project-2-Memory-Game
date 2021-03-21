/*--- Based on Sandra Israel Tutorial ---*/

/*--- Declared Variables ---*/

let card = document.getElementsByClassName("card");
let cards = [...card];

/*--- Toggle classes to open and show the cards ---*/

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/*--- For loop adding Event Listener ---*/

for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
};