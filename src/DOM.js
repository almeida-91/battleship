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

    player1.randomizeBoard();
    cpu.randomizeBoard();

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
        currentSpot.classList.add('playerDrag');
        currentSpot.setAttribute('draggable',true);
        currentSpot.setAttribute('id',i);

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
    dragEvents(player);
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
    let newGameButton = document.createElement('button');
    newGameButton.addEventListener('click',startGame);
    newGameButton.textContent = 'New Game';
    gameContainer.innerHTML = '';
    let winText = document.createElement('p');
    winText.textContent = `${player.name} Wins!`;
    gameContainer.appendChild(winText);
    gameContainer.appendChild(newGameButton);
}



function dragEvents(player){
    const draggables = document.querySelectorAll('.playerDrag');
    let currentShip = null;
    let currentIndex = null;
    
    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', ()=>{
            let index = draggable.getAttribute('id');
            currentIndex = index;
            currentShip = player.board.board[index];
        });
    });

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragover', e =>{
            e.preventDefault();
            draggable.classList.add('dragover');
        })
    })

    draggables.forEach(draggable =>{
        draggable.addEventListener('drop', e=>{
            e.preventDefault();
            console.log(currentShip);
            player.removeShip(currentShip);
            let index = draggable.getAttribute('id');
            let coordX = index % 10;
            let coordY = parseInt(index / 10);
            let checkFit = player.board.checkIfFit(currentShip, coordX,coordY, currentShip.orientation)
            if (checkFit == true){
                player.board.placeShip(currentShip, coordX,coordY, currentShip.orientation);
                renderPlayerBoard(player,player.enemy);
            } else {
                coordX = currentIndex % 10;
                coordY = parseInt(currentIndex / 10);
                player.board.placeShip(currentShip, coordX,coordY, currentShip.orientation);
                renderPlayerBoard(player,player.enemy);
            }
        })
    })
}