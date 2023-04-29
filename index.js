const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked(){
  // cellIndex variable is created to store the index of the cell that is clicked with the help of "this". So that we can know which cell is clicked.
  const cellIndex = this.getAttribute("cellIndex"); 
  // cellIndex inside getAttribute function is the id of the current cell that is being clicked. Refer from index.html file. Here local variable named cellIndex stores the value of the index of the cell using getAttribute function.

  //NOW, we will check whether the particular index(cellIndex) within our options array is empty or not. Then only we can update the cell otherwise not :::
  if(options[cellIndex] != "" || !running){
    return;
  }

  //if not returned, then we will update cell by invoking updateCell() function by passing arguments to it ::
  updateCell(this, cellIndex);
  checkWinner(); // we need to keep checking the winner after each update.

}
function updateCell(cell, index){
  options[index] = currentPlayer; // we are just updating the options placeholder so that it does remain empty even after a cell getting clicked.
  cell.textContent = currentPlayer; // we update innerHTML of the cell with currentPlayer, i.e X;
}
function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X"; //Here, we are update the cell alternatively with "X" and "O". If first chance is of "X" then second chance will be given to "O".
  statusText.textContent = `${currentPlayer}'s turn`; // updating the status text with whose turn is next to write on the cell.
}
function checkWinner(){
  let roundWon = false;

  // NOW, we will iterate over all the winConditions. 
  for(let i = 0; i < winConditions.length; i++){
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    // if any of the cellindex is still empty then we will continue to check for the rest.
    if(cellA == "" || cellB == "" || cellC == ""){
      continue;
    }
    if(cellA == cellB && cellB == cellC){
      roundWon = true;
      break;
    }
  }

  // if cells match then we will display the currentPlayer as the winner. and will stop the running of the game by making it false.
  if(roundWon){
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  // and if no spaces left then it's a DRAW : 
  // we can check that using "includes()" function.
  else if(!options.includes("")){
    statusText.textContent = `Draw!`;
    running = false;
  }
  else{ // and if spaces left and no one's wins then we can keep changing player and game continues : 
    changePlayer();
  }
}
function restartGame(){
  currentPlayer = "X"; // player is set to beginning player.

  //all placeholders are made empty
  options = ["","","","","","","","",""];
  statusText.textContent = `${currentPlayer}'s turn`;

  // each cell's text content is changed to empty cells.
  cells.forEach(cell => cell.textContent = "");

  // it is made true to be able to start the game again if want to.
  running = true;
}