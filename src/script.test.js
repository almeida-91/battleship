import { b } from "./script";

test('create board',()=>{
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
    b.placeShip(2,2,3,"vertical");
    expect(b.board[32]).toEqual(expect.objectContaining({"length": 2}))
})

test('Place ship horizontal',()=>{
    b.placeShip(2,0,0,"horizontal")
    expect(b.board[0]).toEqual(expect.objectContaining({"length": 2}))
})

test('Receive attack miss', ()=>{
    expect(b.receiveAttack(0,3)).toBe('M');
})

test('Receive attack hit', ()=>{
    expect(b.receiveAttack(0,0)).toStrictEqual([0]);
})

test('Game Over false', ()=>{
    expect(b.allSunk()).toBe(false);
})

test('Game Over true', ()=>{
    b.newboard();
    expect(b.allSunk()).toBe(true);
})