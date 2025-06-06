const { Ship, Gameboard, Player } = require("./constructors.js");

test(`newship`, () => {
  const testship = new Ship(3);
  expect(testship.length).toBe(3);
  expect(testship.hits).toBe(0);
  expect(testship.sunk).toBe("no");
});

test(`hitship`, () => {
  const testship = new Ship(3);
  testship.hit();
  testship.hit();
  expect(testship.hits).toBe(2);
});

test(`hitship`, () => {
  const testship = new Ship(2);
  testship.hit();
  testship.hit();
  expect(testship.sunk).toBe("yes");
});

test(`placeship`, () => {
  const board = new Gameboard();
  board.placeShip("carrier", "a1", "a5");
  expect(board.carrier[1]).toBe(970);
  expect(board.carrier[2]).toBe(974);
});

test(`placeship1`, () => {
  const board = new Gameboard();
  board.placeShip("carrier", "a5", "a1");
  expect(board.carrier[1]).toBe(970);
  expect(board.carrier[2]).toBe(974);
  expect(board.shipyard[0][0]).toBe(970);
  expect(board.shipyard[4][0]).toBe(974);
});

test(`placeship2`, () => {
  const board = new Gameboard();
  board.placeShip("carrier", "a2", "e2");
  expect(board.carrier[1]).toBe(971);
  expect(board.carrier[2]).toBe(1011);
  expect(board.shipyard[0][0]).toBe(971);
  expect(board.shipyard[4][0]).toBe(1011);
});

test(`shipsize`, () => {
  const board = new Gameboard();
  expect(board.carrier[0].length).toBe(5);
  expect(board.battleship[0].length).toBe(4);
  expect(board.destroyer[0].length).toBe(3);
  expect(board.patrolboat[0].length).toBe(2);
});

test(`attackship`, () => {
  const board = new Gameboard();
  board.placeShip("carrier", "a5", "a1");
  board.receiveAttack("a1");
  expect(board.carrier[0].hits).toBe(1);
});

test(`attackship`, () => {
  const board = new Gameboard();
  board.placeShip("carrier", "a5", "a1");
  board.receiveAttack("a1");
  expect(board.shots[0]).toBe(970);
  expect(board.receiveAttack("b1")).toBe("miss");
});
