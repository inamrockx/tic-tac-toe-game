const boxes = document.querySelectorAll(".box");
const turn_values = document.querySelectorAll(".box p");
const turn_preview = document.querySelector(".turns_preview");
const victoryImage = document.querySelector(".victory-img");
const resultImg = document.querySelector(".victory-img img"); 
const resultText = document.querySelector(".victory-img p");
const resetBtn = document.querySelector(".reset-btn");

let turn = "X";
let isGameOver = false;
let moveCount = 0; 

// winning conditions 
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];


boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleTurn(index));
});

// Reset button
resetBtn.addEventListener("click", resetGame);


function handleTurn(index) {
  
  if (isGameOver || turn_values[index].innerHTML !== "") return;


  turn_values[index].innerHTML = turn;
  moveCount++;


  checkWin();

  if (!isGameOver) {
    turn = turn === "X" ? "O" : "X";
    turn_preview.innerHTML = `It's ${turn} turn`;
  }
}

// 4. Check for Wins , draw
function checkWin() {
  for (let condition of winConditions) {
    let [a, b, c] = condition;

    if (
      turn_values[a].innerHTML !== "" &&
      turn_values[a].innerHTML === turn_values[b].innerHTML &&
      turn_values[a].innerHTML === turn_values[c].innerHTML
    ) {
      isGameOver = true;
      
      let winColor = turn === "X" ? "rgb(0 140 83 / 58%)" : "#af4eb28f";
      boxes[a].style.background = winColor;
      boxes[b].style.background = winColor;
      boxes[c].style.background = winColor;

      showResult(`${turn} Wins!`, "./assets/victory.gif");
      return; 
    }
  }

  if (moveCount === 9 && !isGameOver) {
    isGameOver = true;
    showResult("It's a Draw!", "./assets/draw.gif");
  }
}

// to show the ending image and text
function showResult(message, gifSrc) {
  resultText.innerHTML = message;
  resultImg.src = gifSrc;
  victoryImage.classList.add("show");
}

// 6. Reset the game
function resetGame() {
  turn = "X";
  isGameOver = false;
  moveCount = 0;
  turn_preview.innerHTML = `It's ${turn} turn`;
  victoryImage.classList.remove("show");
  resultImg.src = "";

  // Clear all boxes
  boxes.forEach(box => {
    box.style.background = "white";
    box.querySelector("p").innerHTML = "";
  });
}