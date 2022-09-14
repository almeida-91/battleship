import { newGameboard } from "./script";

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
    expect(b.receiveAttack(0,3)).toBe('M');
})

test('Receive attack hit', ()=>{
    let b = newGameboard();
    b.newboard();
    b.placeShip(2,0,0,"horizontal")
    expect(b.receiveAttack(0,0)).toStrictEqual([0]);
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