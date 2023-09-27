const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
  { name: "1", image: "pic_lesson6/A1.png" },
  { name: "2", image: "pic_lesson6/A2.png" },
  { name: "3", image: "pic_lesson6/A3.png" },
  { name: "4", image: "pic_lesson6/A4.png" },
  { name: "5", image: "pic_lesson6/A5.png" },
  { name: "6", image: "pic_lesson6/A6.png" },
  { name: "7", image: "pic_lesson6/A7.png" },
  { name: "8", image: "pic_lesson6/A8.png" },
  { name: "9", image: "pic_lesson6/A9.png" },
  { name: "1", image: "pic_lesson6/A10.png" },
  { name: "2", image: "pic_lesson6/A11.png" },
  { name: "3", image: "pic_lesson6/A12.png" },
  { name: "4", image: "pic_lesson6/A13.png" },
  { name: "5", image: "pic_lesson6/A14.png" },
  { name: "6", image: "pic_lesson6/A15.png" },
  { name: "7", image: "pic_lesson6/A16.png" },
  { name: "8", image: "pic_lesson6/A17.png" },
  { name: "9", image: "pic_lesson6/A18.png" },
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = () => {
    const shuffledItems = items.sort(() => Math.random() - 0.5);
    const selectedItems = shuffledItems.slice(0, 18);
  
    // Duplicate selectedItems to create pairs
    const cardValues = [...selectedItems];
  
    return cardValues;
  };

  const matrixGenerator = (cardValues, rows = 3, cols = 6) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues];
    // Simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < rows * cols; i++) {
      // Create Cards
      gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
          <div class="card-before">?</div>
          <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
          </div>
        </div>`;
    }
    // Grid
    gameContainer.style.gridTemplateColumns = `repeat(${cols}, auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `
                <a href="https://bamwaranya.github.io/Home-lessonAccess/" target="_blank">
                  <h4>Moves: ${movesCount}  <br> Times: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}  </h4>
                </a>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
 
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
