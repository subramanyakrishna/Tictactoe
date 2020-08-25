let originalBoard;
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
    originalBoard = Array.from(Array(9).keys());
    cells.forEach(cell=>{
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.addEventListener('click',Clicked,false);
    })
    
}

function Clicked(CellClicked){
    Show(CellClicked.target.id,Human);
    console.log(CellClicked.target.id)
}

function Show(CellId,player){
    originalBoard[CellId] = player;
    const Selected = document.getElementById(CellId);
    if ((!Selected.classList.contains("o"))&& (player == 'o')){
        Selected.classList.add("o");
    } else if((!Selected.classList.contains("x"))&&(player == 'x')) {
        Selected.classList.add("x");
    }
    let gameWon = checkWhoWon(originalBoard,player);
    if(gameWon) gameOver(gameWon);
}

function checkWhoWon(board,player){
    let plays = board.reduce((a,e,i)=>
    (e===player) ? a.concat(i):a,[])
    let gameWon = null;
    for(let [index,win] of winning_combinaion.entries()){
        if(win.every(element=>plays.indexOf(elem>-1)))
    }

}
