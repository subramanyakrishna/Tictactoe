let originalBoard;
const HUMAN = 'o';
const ROBOT = 'x';
var i = 0;
var j = 0;
let wonornot = false;
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

//Starting the game 
function startDGame(){
    originalBoard=[];
    wonornot = false;
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
        if (i == j) {
            i = i + 1;
            Show(CellClicked.target.id,HUMAN);
            if(!wonornot) { setTimeout(() => { 

                j = j + 1;
                Show(bestSpot(),ROBOT); 
            
            }, 500);
        }

        
        
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
function checkWinningForMinMax(board,player){
    let plays = board.reduce((accumulator,curcell,indexofCell)=>(curcell===player)? accumulator.concat(indexofCell):accumulator,[]);
    let gameWon = null;
    for(let [index,win] of WINNING_COMBINATION.entries()){
        if(win.every(element=>(plays.indexOf(element)>-1))){
            gameWon = { index: index, player : player} 
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of WINNING_COMBINATION[gameWon.index]){
        document.getElementById(index).style.backgroundColor="red";
    }
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',Clicked,false);
    }
    declareWinner(gameWon.player==HUMAN?"You Win":"You Lose");
}
function emptySquares(){
    return originalBoard.filter( s => typeof s =='number');
}
function bestSpot(){
    return minimax(originalBoard, ROBOT).index;
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

function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWinningForMinMax(newBoard, HUMAN)) {
		return {score: -10};
	} else if (checkWinningForMinMax(newBoard, ROBOT)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == ROBOT) {
			var result = minimax(newBoard, HUMAN);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, ROBOT);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === ROBOT) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}