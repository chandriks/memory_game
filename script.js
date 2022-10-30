const gameContainer = document.getElementById("game");
let cardClickedArr = [];
let cardsFlipped = 0;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    //give it a class attribute for the matching, deafault is false
    newDiv.setAttribute("match", "false");

    //give it a class attribute for the click, deafault is false
    newDiv.setAttribute("clicked", "false");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  
  if ((event.target.getAttribute("match") === "false") || (event.target.getAttribute("clicked") !== "true")) {

    if (cardClickedArr.length === 0){ // For the first card
      event.target.setAttribute("clicked", "true"); // setting an attribute which indicates card selection
      event.target.style.backgroundColor = event.target.getAttribute("class");
      cardClickedArr.push(event.target);

    } 
    else if (cardClickedArr.length === 1) { // For the second card 
      cardClickedArr.push(event.target);
    
      if (matchingCards(cardClickedArr)) { //check if cards are matching
           // set background equal to attricute 
        event.target.style.backgroundColor = event.target.getAttribute("class");
        event.target.setAttribute("match", "true");
        cardClickedArr[0].removeEventListener("click", handleCardClick);
        cardClickedArr[1].removeEventListener("click", handleCardClick);
        cardClickedArr = []; // empty the array if match found
        cardsFlipped += 2;
        
       
        setTimeout(function () {
        if (cardsFlipped === COLORS.length) {
          alert("Game Over!");
        };
      }, 700);
    
    }
    else { // cards selected are not a match
      event.target.style.backgroundColor = event.target.getAttribute("class");
      // unclick the first card
      cardClickedArr[0].setAttribute("clicked", "false");
      event.target.setAttribute("match", "false");
      // Empty the selcted cards array and flip the cards back
      setTimeout(function () {
        cardClickedArr[0].style.backgroundColor = "white";
        cardClickedArr[1].style.backgroundColor = "white";
        cardClickedArr[0].setAttribute("clicked", "false");
        cardClickedArr[1].setAttribute("clicked", "false");
        cardClickedArr = [];
    }, 500);
  }
  }
   }
}

function matchingCards(cArr) {
  
  if (cArr[0].getAttribute("class")=== cArr[1].getAttribute("class")&& (cArr[1].getAttribute("clicked") !== "true") ){
    cArr[0].setAttribute("match", "true");
    cArr[1].setAttribute("match", "true");
    return true;
  }
  else {
    return false;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */