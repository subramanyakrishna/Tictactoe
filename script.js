let board;
const Human = 'o';
const Robot = 'x';
const winning_combinaion=[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6], 
    [3,4,5],
    [6,7,8]
];

const cells = document.querySelectorAll(".cell");
startDGame();
function startDGame(){
    const winmessage = document.getElementById("winning-message");
    winmessage.classList.remove("my-class");
    board = Array.from(Array(9).keys());
    cells.forEach(cell=>{
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.addEventListener('click',Clicked,false);
    })
    
}

function Clicked(CellClicked){
    Show(CellClicked.target.id,Human);
}

function Show(CellId,player){
    board[CellId] = player;
    const Selected = document.getElementById(CellId);
    if ((!Selected.classList.contains("o"))&& (player == 'o')){
        Selected.classList.add("o");
    } else if((!Selected.classList.contains("x"))&&(player == 'x')) {
        Selected.classList.add("x");
    }
    // let gameWon = checkWinning(board,player);
    // if(gameWon) gameOver(gameWon);
}

// function checkWinning(board,player){
//     let plays = board.reduce((a,e,i)=>
//     )
// }