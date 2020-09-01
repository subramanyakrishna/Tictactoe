let originalBoard;
const FirstPlayer = 'o';
const SecondPlayer = 'x';
let wonornot = false;
let PlayerDecide = 1;
//different winning combination
const WINNING_COMBINATION=[
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6], 
    [3,4,5],
    [6,7,8]
];
//selecting all cells 
let cells = document.querySelectorAll(".cell");
startDGame();
int 
//Starting the game 
function startDGame(){
    originalBoard=[];
    wonornot = false;
    PlayerDecide=1;
    const winmessage = document.getElementById("winning-message");
    winmessage.classList.remove("show-winning-message");
    originalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cells.forEach(cell=>{
        cell.classList.remove("x");
        cell.classList.remove("o");
        //adding event listener to the every cells
        cell.addEventListener('click',Clicked,false);
        cell.style.backgroundColor="rgb(5,255,185)";
    });
}
//Displaying the o when it is clicked by human player
function Clicked(CellClicked){ 
    if (typeof originalBoard[CellClicked.target.id]=='number'){
        if(PlayerDecide%2==1) {
            Show(CellClicked.target.id,FirstPlayer);
            PlayerDecide=PlayerDecide+1;
    }
        else { 
            Show(CellClicked.target.id,SecondPlayer);
            PlayerDecide=PlayerDecide+1;
        }
    }
}
//show fuction 
function Show(CellId,player){

    originalBoard[CellId] = player;

    const Selected = document.getElementById(CellId);
    if ((!Selected.classList.contains("o"))&& (player == 'o')){
        Selected.classList.add("o");
    } else if((!Selected.classList.contains("x"))&&(player == 'x')) {
        Selected.classList.add("x");
    }
    let gameWon = checkWinning(originalBoard,player);
    if(gameWon){ 
        wonornot = true;
        gameOver(gameWon); 
    }
}

function checkWinning(board,player){
    let plays = board.reduce((accumulator,curcell,indexofCell)=>(curcell===player)? accumulator.concat(indexofCell):accumulator,[]);
    let gameWon = null;
    for(let [index,win] of WINNING_COMBINATION.entries()){
        if(win.every(element=>(plays.indexOf(element)>-1))){
            gameWon = { index: index, player : player} 
            break;
        }
    }
    if(!gameWon) CheckTie();
    return gameWon;
}


function gameOver(gameWon){

    for(let index of WINNING_COMBINATION[gameWon.index]){
        document.getElementById(index).style.backgroundColor="red";
    }
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',Clicked,false);
    }
    declareWinner(gameWon.player==FirstPlayer?"First Player Won":"Second Player Won");
}

function emptySquares(){
    return originalBoard.filter( s => typeof s =='number');
}

function CheckTie(){
    if(emptySquares().length==0){
        for (let i = 0; i< cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',Clicked,false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function declareWinner(who){
    let winmessage = document.getElementById("winning-message");
    winmessage.classList.add("show-winning-message");
    document.getElementById("winning-message-text").innerText=who;
}

