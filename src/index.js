const { Ship, Gameboard, Player } = require("./constructors.js");

const player1 = new Player("Me");
const player2 = new Player("Computer");

player1.board.placeShip("carrier", "a1", "a5");
player1.board.placeShip("battleship", "b1", "b4");
player1.board.placeShip("destroyer", "c1", "c3");
player1.board.placeShip("submarine", "d1", "d3");
player1.board.placeShip("patrolboat", "e1", "e2");
console.log(player1.board);

player2.board.placeShip("carrier", "a1", "e1");
player2.board.placeShip("battleship", "b2", "e2");
player2.board.placeShip("destroyer", "c3", "e3");
player2.board.placeShip("submarine", "c4", "e4");
player2.board.placeShip("patrolboat", "d5", "e5");
console.log(player2.board);
