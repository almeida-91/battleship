export function newShip(length){
    return {

        length : length,
        hitAreas : [],
        Sunk : false,
        start : [],
        orientation : null,

        hit : function (coords){
            this.hitAreas.push(coords);
            this.isSunk();
        },

        isSunk : function (){
            return (this.hitAreas.length == this.length) ? this.sunk = true : this.sunk =false;
        }

    }
}

export function newGameboard(){
    return {
        board :[],

        newboard : function(){
            return this.board = new Array(100).fill(0);
            },

        placeShip : function(ship, coordx, coordy, orientation){
            let currentShip = newShip(ship.length);
            currentShip.start.push(coordx);
            currentShip.start.push(coordy);
            currentShip.orientation = orientation;
            if (orientation == 'vertical'){
                for (let i = 0 ; i < ship.length ; i++){
                    this.board[(coordy+i)*10+coordx] = currentShip;
                }
            } else {
                for (let i = 0 ; i < ship.length ; i++){
                    this.board[coordy*10+coordx+i] = currentShip;
                }
            }
            return this.board;
        },

        receiveAttack : function (coordx,coordy){
            let target = this.board[coordy*10+coordx];
            let coords = coordy*10+coordx;
            if (target != 0 && typeof target != 'object' ) return null;
            if (target == 0){
                this.board[coords] = 'M';
            } else {
                target.hit(coords);
                this.board[coords] = 'X';
            }
            return target;
        },

        allSunk : function (){
            let aliveShips = []
            for (let i = 0 ; i < this.board.length ; i++){
                if (typeof this.board[i] == 'object'){
                    aliveShips.push(this.board[i]);
                }
            }
            return (aliveShips.length == 0) ? true : false;
        },

        checkIfFit(ship,coordX,coordY,orientation){
            let coords = coordX+(coordY*10);
            if (orientation == 'vertical'){
                if (coordY*10+ship.length*10 >100) return false;
                for ( let i = 0 ; i < ship.length ; i++){
                    if (typeof (this.board[coords+(i*10)]) == 'object') return false;
                }
            } else if (orientation == 'horizontal'){
                if (coordX+ship.length > 10) return false;
                for (let i = 0 ; i < ship.length ; i++){
                    if (typeof (this.board[coordX+i])== 'object' || 
                        typeof (this.board[coordX+i+coordY*10]) == 'object') return false;
                }
            }
            return true;
        }
    }
}

export function player(name) {
    return {
        name : name,
        enemy : null,
        board : newGameboard(),
        ships : [[newShip(5),1],
                [newShip(4),1],
                [newShip(3),1],
                [newShip(3),1],
                [newShip(2),1]],

        attack : function(coordX,coordY){
            this.enemy.board.receiveAttack(coordX,coordY);
        },
        autoPlay : function(){
            let coordX = parseInt(Math.random()*10);
            let coordY = parseInt(Math.random()*10);
            let coords = coordY*10 + coordX;
            let target = this.enemy.board.board[coords];
            if (target != 0 && typeof target != 'object' ) this.autoPlay();
            if (typeof target == 'object' ){
                this.enemy.board.receiveAttack(coordX,coordY);
                this.autoTargetNearby(coordX,coordY);
            };
            if (target != 'M'){
                this.enemy.board.receiveAttack(coordX,coordY);
            } 
        },
        removeShip : function(ship){
            for (let i = 0 ; i < this.board.board.length ; i++){
                if( this.board.board[i]!= 0){
                    if (this.board.board[i].start[0]===ship.start[0]
                        && this.board.board[i].start[1]===ship.start[1]) this.board.board[i] = 0;
                    }
            }
        },

        randomizeBoard : function(){
            while (this.ships.length>0){
                let currentShip = this.ships.shift();

                for ( let i = 0 ; i < currentShip[1] ; i++){
                    let coordX = parseInt(Math.random()*10);
                    let coordY = parseInt(Math.random()*10);
                    let result = parseInt(Math.random()*2);
                    if (result == 1){
                        result = 'vertical';
                    } else {
                        result = 'horizontal';
                    }
                    if (this.board.checkIfFit(currentShip[0],coordX,coordY,result)==true){
                        this.board.placeShip(currentShip[0],coordX,coordY,result);
                    } else {
                        i--;
                    }
                }
            }
        },
        
        autoTargetNearby : function(coordX,coordY){
            let direction = parseInt(Math.random()*2); 
            // 0 = hor | 1 = ver
            let newCoordX = coordX;
            let newCoordY = coordY;

            // horizontal nearby
            if (direction == 0){
                if (coordX+1 > 10){        
                    newCoordX = coordX - 1;
                } else if (coordX-1 < 0){
                    newCoordX = coordX + 1;
                } else { 
                    // no border left or right of current coords
                    direction = parseInt(Math.random()*2); 
                    // 0 = left | 1 = right
                    if (direction == 0){
                        newCoordX = coordX - 1;
                    } else {
                        newCoordX = coordX + 1;
                    }
                }

            // vertical nearby
            } else {
                if (coordY+1 > 10){
                    newCoordY = coordY-1;
                } else if (coordY-1 < 0){
                    newCoordY = coordY+1;
                } else {
                    direction = parseInt(Math.random()*2); 
                    // 0 = up | 1 = down
                    if (direction == 0){
                        newCoordY = coordY-1;
                    } else {
                        newCoordY = coordY+1;
                    }
                }
            }
            let target = this.enemy.board.board[newCoordX+(newCoordY*10)];
            if (typeof target == 'object' ){
                this.enemy.board.receiveAttack(newCoordX,newCoordY);
                this.autoTargetNearby(newCoordX,newCoordY);
            } else if(target == 'X' || target == 'M') {
                this.autoTargetNearby(newCoordX,newCoordY);
            } else {
                this.enemy.board.receiveAttack(newCoordX,newCoordY);
            }
        }
    }
}
