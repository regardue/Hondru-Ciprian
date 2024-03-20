// let game = [
// [0,1,2],
// [3,4,5],
// [6,7,8]]

let gameBoard = document.getElementById("gameBoard");
let square0 = document.getElementById("square0");
let square1 = document.getElementById("square1");
let square2 = document.getElementById("square2");
let square3 = document.getElementById("square3");
let square4 = document.getElementById("square4");
let square5 = document.getElementById("square5");
let square6 = document.getElementById("square6");
let square7 = document.getElementById("square7");
let square8 = document.getElementById("square8");
let game = [
  [square0, square1, square2],
  [square3, square4, square5],
  [square6, square7, square8],
];

for (let element of game) {
  for (let element2 of element) {
    element2.addEventListener("click", move);
  }
}

function move(e) {
  e.target.style.backgroundColor = "red";
  computerMove();
}

function generateRandomNumber() {
  let random = Math.floor(Math.random() * 10);
  if (random != 0) {
    random = random - 1;
  }
  return random;
}

function computerMove() {
  let randomIndex;
  let selectedSquare;
  //   for (i = 0; i < 9; i++) {
  //     randomIndex = generateRandomNumber();
  //     selectedSquare = document.querySelectorAll(".cell")[randomIndex];
  while (true) {
    randomIndex = generateRandomNumber();
    selectedSquare = document.querySelectorAll(".cell")[randomIndex];
    if (
      !(selectedSquare.style.backgroundColor === "green" ||selectedSquare.style.backgroundColor === "red")
    ) {
      selectedSquare.style.backgroundColor = "green";
      console.log(randomIndex)
      break;
    }
  }
  winnerCheck();
}

// }

// let winner = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// function winnerCheck(){
//     let [a,b,c] = combinations;
//     for(let combinations of winner){

//         if(combinations == winner){
//             alert("you won")
//         }
//         else{
//         alert("game over")
//         }
//     }
// }

// function move(index){
//     if(!gameActive || boardState[index] !=='') return;
// }

function winnerCheck() {
    for (let element of game){
        if(element[0].style.backgroundColor == element[1].style.backgroundColor && 
            element[1].style.backgroundColor == element[2].style.backgroundColor){
                alert("game over")
            }
    }
    for(i=0;i<3;i++){
        if(game[i][i].style.backgroundColor == game[i][i+3].style.backgroundColor && 
            game[i][i+3].style.backgroundColor == game[i][i+6].style.backgroundColor)
            alert("game over")
    }
    if(game[0].style.backgroundColor == game[4].style.backgroundColor &&
        game[4].style.backgroundColor == game[8].style.backgroundColor){
            alert("game over")
        }
        else if(game[2].style.backgroundColor == game[4].style.backgroundColor &&
            game[4].style.backgroundColor == game[6].style.backgroundColor){
                alert("game over")
            }
}
