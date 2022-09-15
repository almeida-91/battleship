export function newShip(length){
    return {

        length : length,
        hitAreas : [],
        Sunk : false,

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

        placeShip : function(length, coordx, coordy, orientation){
            let currentShip = newShip(length);
            if (orientation == 'vertical'){
                for (let i = 0 ; i < currentShip.length ; i++){
                    this.board[(coordy+i)*10+coordx] = currentShip;
                }
            } else {
                for (let i = 0 ; i < currentShip.length ; i++){
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
        }
    }
}

export function player(name) {
    return {
        name : name,
        enemy : null,
        board : newGameboard(),
        ships : [[newShip(4),1],
                [newShip(3),2],
                [newShip(2),3],
                [newShip(1),4]],
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
                this.autoPlay();
            };
            if (target != 'M'){
                this.enemy.board.receiveAttack(coordX,coordY);
            } 
            
        },
    }
}
