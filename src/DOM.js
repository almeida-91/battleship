import { player } from "./script.js";

const startButton = document.getElementsByTagName('button')[0];
const resetButton = document.getElementsByTagName('button')[1];
let gameContainer = document.getElementById('gameContainer');

startButton.addEventListener('click',startGame);

function startGame(){
    let player1 = player();
    player1.name = "P1";
    player1.board.newboard();

    let cpu = player();
    cpu.name = "CPU";
    cpu.board.newboard();

    player1.enemy = cpu;
    cpu.enemy = player1;
    renderGame(player1);
    renderEnemyGame(cpu);
}

function renderGame(player){
    let playerBoard = document.createElement('div');
    playerBoard.classList.add('board');
    for (let i = 0 ; i < player.board.board.length ; i++){
        let renderSpot = player.board.board[i];
        let currentSpot = document.createElement('div');
        if (renderSpot == 'M'){
            currentSpot.innerHTML = ".";
        } else if (renderSpot == 'X'){
            currentSpot.innerHTML = "X";
        } else if (typeof renderSpot == 'object'){
            currentSpot.style.backgroundColor = 'blue';
        }
        playerBoard.appendChild(currentSpot);
    }
    gameContainer.appendChild(playerBoard);
}

function renderEnemyGame(enemy){
    let enemyBoard = document.createElement('div');
    enemyBoard.classList.add('board');
    for (let i = 0 ; i < enemy.board.board.length ; i++){
        let renderSpot = enemy.board.board[i];
        let currentSpot = document.createElement('div');
        if (renderSpot == 'M'){
            currentSpot.innerHTML = ".";
        } else if (renderSpot == 'X'){
        currentSpot.innerHTML = "X";
        }
        enemyBoard.appendChild(currentSpot);
    }
    gameContainer.appendChild(enemyBoard);
}