export function newShip(length){
    return {

        length : length,
        hitAreas : [],
        Sunk : false,

        hit : function (coords){
            this.hitAreas.push(coords);
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
            if (target == 0){
                target = 'M';
            } else {
                target.hit(coords);
                return target.hitAreas;
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

export let b = newGameboard();
b.newboard();
