let origBoard;
const humanPlayer = 'O';
const aiPlayer = 'X';

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];

const cells = document.querySelectorAll('.cell');

const startGame = () => {
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

const turnClick = (square) => {
    turn(square.target.id, humanPlayer);
}

const turn = (squareId, player) => {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem > -1))) {
            gameWon = {index: index, player: player};
            break;
        }
    }

    return gameWon;
}

const gameOver = (gameWon) => {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.background = gameWon.player === humanPlayer ? "blue" : "red";
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
}
startGame();