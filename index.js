const resetElement = document.querySelector(".reset");
const playersTurn = document.querySelector(".playersTurn");
const divResultElement = document.querySelector(".div-result");
const containerElement = document.querySelector(".container");

let board = ["", "", "", "", "", "", "", "", ""];
const winningChances = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [2,5,8],
  [1,4,7]
]

playGame();

// player 1's move : X
function player1(index){
  if(board[index] !== "O" && board[index] === ""){
    board[index] = "X";
    updateBoard();
  }
  else{
    alert("Invalid Move");
  }
}

// player 2's move : O
function player2(index){
  if(board[index] !== "X" && board[index] === ""){
    board[index] = "O";
    updateBoard();
  }
  else{
    alert("Invalid Move");
  }
}

// update board everytime a move is played for each cell : 
function updateBoard(){
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.innerHTML = board[index];
  })
}

// Play game : 
let p2Turn = false;
function playGame(){
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener('click', () => {
      
      if(!p2Turn) {
        player1(index);
        checkWinner();
        p2Turn = true;
        playersTurn.innerHTML = "Player 2's turn : O";
      }
      else{
        player2(index);
        checkWinner();
        p2Turn = false;
        playersTurn.innerHTML = "Player 1's turn : X";
      }
    })
  })
}

function checkWinner(){
  let roundWon = false;
  for(let i = 0; i < winningChances.length; i++){
    const chance = winningChances[i];
    const cell1 = board[chance[0]];
    const cell2 = board[chance[1]];
    const cell3 = board[chance[2]];

    if(cell1 === "" || cell2 === "" || cell3 === "") continue;

    if(cell1 === cell2 && cell2 === cell3){
      roundWon = true;
      break;
    }
  }

  if(roundWon){
    divResultElement.innerHTML = `
      <p class="result">You won !</p>
      <button class="play-again">Play Again</button>
    `;
    containerElement.classList.add("blur");

    playAgain();
  }
  else if(!board.includes("")){
    divResultElement.innerHTML = `
      <p class="result">Draw !</p>
      <button class="play-again">Play Again</button>
    `;
    containerElement.classList.add("blur");
    
    playAgain();
  }
}

// reset the board : 
resetElement.addEventListener('click', () => {
  reset();
})

function reset(){
  playersTurn.innerHTML = "Player 1's turn : X";
  board = ["", "", "", "", "", "", "", "", ""];
  updateBoard();
  p2Turn = false;
}

// play again :
function playAgain(){
  document.querySelector(".play-again").addEventListener('click', () => {
    divResultElement.innerHTML = ``;
    containerElement.classList.remove("blur");
    reset();
  })
}
  