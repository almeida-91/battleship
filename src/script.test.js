import { newGameboard, player } from "./script";

test('create board',()=>{
    let b = newGameboard();
    b.newboard();
    expect(b.board).toStrictEqual([
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0
    ])
})

test('Place ship vertical',()=>{
    let b = newGameboard();
    b.newboard();
    b.placeShip(2,2,3,"vertical");
    expect(b.board[32]).toEqual(expect.objectContaining({"length": 2}))
})

test('Place ship horizontal',()=>{
    let b = newGameboard();
    b.newboard();
    b.placeShip(2,0,0,"horizontal")
    expect(b.board[0]).toEqual(expect.objectContaining({"length": 2}))
})

test('Receive attack miss', ()=>{
    let b = newGameboard();
    b.newboard();
    b.receiveAttack(0,3);
    expect(b.board[30]).toBe('M');
})

test('Receive attack hit', ()=>{
    let b = newGameboard();
    b.newboard();
    b.placeShip(2,0,0,"horizontal")
    b.receiveAttack(0,0);
    expect(b.board[0]).toBe('X');
})

test('Game Over false', ()=>{
    let b = newGameboard();
    b.newboard();
    b.placeShip(2,0,0,"horizontal")
    expect(b.allSunk()).toBe(false);
})

test('Game Over true', ()=>{
    let b = newGameboard();
    b.newboard();
    expect(b.allSunk()).toBe(true);
})

test('Player attack', ()=>{
    let player1 = player();
    player1.name = 'P1';
    let cpu = player();
    cpu.name = 'CPU';
    player1.enemy = cpu;
    cpu.enemy = player1;
    player1.board.newboard();
    cpu.board.newboard();
    cpu.board.placeShip(cpu.ships[0][0].length,0,0,'horizontal');
    player1.attack(0,0);
    expect(cpu.board.board[0]).toBe('X');
})