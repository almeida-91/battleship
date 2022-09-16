import { player } from "./script.js";

const startButton = document.getElementsByTagName('button')[0];
const randomButton = document.getElementsByTagName('button')[1];

let gameContainer = document.getElementById('gameContainer');

startButton.addEventListener('click',startGame);
//randomButton.addEventListener('click',randomize);

function startGame(){
    let player1 = player();
    player1.name = "P1";
    player1.board.newboard();

    let cpu = player();
    cpu.name = "CPU";
    cpu.board.newboard();

        /* For testing  */
        /* player1.board.placeShip(4,0,0,'vertical');
        player1.board.placeShip(3,1,0,'vertical');
        player1.board.placeShip(3,2,0,'vertical');
        player1.board.placeShip(2,3,0,'vertical');
        player1.board.placeShip(2,4,0,'vertical');
        player1.board.placeShip(2,5,0,'vertical');
        player1.board.placeShip(1,6,0,'vertical');
        player1.board.placeShip(1,7,0,'vertical');
        player1.board.placeShip(1,8,0,'vertical');
        player1.board.placeShip(1,9,0,'vertical'); */
        player1.randomizeBoard();

        /* cpu.board.placeShip(4,0,0,'vertical');
        cpu.board.placeShip(3,1,0,'vertical');
        cpu.board.placeShip(3,2,0,'vertical');
        cpu.board.placeShip(2,3,0,'vertical');
        cpu.board.placeShip(2,4,0,'vertical');
        cpu.board.placeShip(2,5,0,'vertical');
        cpu.board.placeShip(1,6,0,'vertical');
        cpu.board.placeShip(1,7,0,'vertical');
        cpu.board.placeShip(1,8,0,'vertical');
        cpu.board.placeShip(1,9,0,'vertical'); */
        cpu.randomizeBoard();
        /* Test end     */

    player1.enemy = cpu;
    cpu.enemy = player1;
    renderPlayerBoard(player1,cpu);
}

function renderPlayerBoard(player,cpu){
    if (isGameOver(player,cpu) == true){
        return;
    }
    gameContainer.innerHTML = '';
    let playerBoard = document.createElement('div');
    playerBoard.classList.add('board');
    for (let i = 0 ; i < player.board.board.length ; i++){
        let renderSpot = player.board.board[i];
        let currentSpot = document.createElement('div');
        currentSpot.setAttribute('draggable',true);
        if (renderSpot == 'M'){
            currentSpot.style.backgroundColor = 'cornflowerblue';
        } else if (renderSpot == 'X'){
            currentSpot.style.backgroundColor = 'red';
        } else if (typeof renderSpot == 'object'){
            currentSpot.style.backgroundColor = 'blue';
        }
        playerBoard.appendChild(currentSpot);
    }
    gameContainer.appendChild(playerBoard);
    renderEnemyBoard(cpu,player);
}

function renderEnemyBoard(enemy,player){
    let enemyBoard = document.createElement('div');
    enemyBoard.classList.add('board');
    for (let i = 0 ; i < enemy.board.board.length ; i++){
        let renderSpot = enemy.board.board[i];
        let currentSpot = document.createElement('div');
        if (renderSpot == 'M'){
            currentSpot.style.backgroundColor = 'cornflowerblue';
        } else if (renderSpot == 'X'){
            currentSpot.style.backgroundColor = 'red';
        } else {
            currentSpot.classList.add('target');
            addTarget(currentSpot,i,player,enemy);
        }
        enemyBoard.appendChild(currentSpot);
    }
    gameContainer.appendChild(enemyBoard);
}

function addTarget(zone, index,player,cpu){
    zone.addEventListener('click',()=>{
        let coordX = index%10;
        let coordY = parseInt(index/10);
        player.attack(coordX,coordY);
        if (cpu.board.board[index] == 'M'){
            cpuTurn(cpu);
        }
        renderPlayerBoard(player,cpu);
    })
}

function cpuTurn(cpu){
    cpu.autoPlay();
}

function isGameOver(player,cpu){
    if (player.board.allSunk()==true){
        showWinner(cpu);
        return true;
    } else if (cpu.board.allSunk()==true){
        showWinner(player);
        return true;
    }
    return false;
}

function showWinner(player){
    gameContainer.innerHTML = '';
    let winText = document.createElement('p');
    winText.textContent = `${player.name} Wins!`;
    gameContainer.appendChild(winText);
    gameContainer.appendChild(startButton);
}