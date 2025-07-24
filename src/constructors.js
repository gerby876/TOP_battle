import { displayBoard } from "./display.js";

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = "no";
  }

  hit = function () {
    this.hits = this.hits + 1;
    this.isSunk();
  };

  isSunk = function () {
    if (this.hits === this.length) {
      this.sunk = "yes";
    }
  };
}

class Gameboard {
  constructor() {
    this.carrier = [new Ship(5), ,];
    this.battleship = [new Ship(4), ,];
    this.destroyer = [new Ship(3), ,];
    this.submarine = [new Ship(3), ,];
    this.patrolboat = [new Ship(2), ,];
    this.shipyard = [];
    this.shots = [];
  }

  placeShip = function (type, x, y) {
    let tmpx = x.split("");
    let tmpy = y.split("");
    if (tmpx[0] !== tmpy[0] && tmpx[1] !== tmpy[1]) {
      return;
    }
    x = Number(tmpx[0].charCodeAt(0) + tmpx[1]);
    y = Number(tmpy[0].charCodeAt(0) + tmpy[1]);

    if (x > y) {
      let tmp = y;
      y = x;
      x = tmp;
    }

    if (tmpx[0] == tmpy[0]) {
      for (let z = 0; z < this.shipyard.length - 1; z++) {
        if (this.shipyard[z].includes(x + z)) {
          return;
        }
      }
      for (let z = 0; z < Math.floor(y - x) + 1; z++) {
        this.shipyard.push([x + z, type]);
      }
    } else {
      for (let z = 0; z < this.shipyard.length - 1; z++) {
        for (let a = 0; a < (y - x) / 10 + 1; a++) {
          if (this.shipyard[z].includes(x + a * 10)) {
            return;
          }
        }
      }
      for (let z = 0; z < (y - x) / 10 + 1; z++) {
        this.shipyard.push([x + z * 10, type]);
      }
    }
    if (type == "carrier") {
      this.carrier[1] = x;
      this.carrier[2] = y;
    }
    if (type == "battleship") {
      this.battleship[1] = x;
      this.battleship[2] = y;
    }
    if (type == "destroyer") {
      this.destroyer[1] = x;
      this.destroyer[2] = y;
    }
    if (type == "submarine") {
      this.submarine[1] = x;
      this.submarine[2] = y;
    }
    if (type == "patrolboat") {
      this.patrolboat[1] = x;
      this.patrolboat[2] = y;
    }
  };

  allSunk = function () {
    if (
      this.carrier[0].sunk == "yes" &&
      this.battleship[0].sunk == "yes" &&
      this.destroyer[0].sunk == "yes" &&
      this.submarine[0].sunk == "yes" &&
      this.patrolboat[0].sunk == "yes"
    ) {
      return true;
    }
    return false;
  };

  receiveAttack = function (x) {
    let tmpx = x.split("");
    x = tmpx[0].toLowerCase(0).charCodeAt(0) + tmpx[1];
    this.shots.push(x);
    for (let z = 0; z < this.shipyard.length; z++) {
      if (this.shipyard[z][0] == x) {
        if (this.shipyard[z][1] == "carrier") {
          this.carrier[0].hit();
          this.allSunk();
          return "hit";
        } else if (this.shipyard[z][1] == "battleship") {
          this.battleship[0].hit();
          this.allSunk();
          return "hit";
        } else if (this.shipyard[z][1] == "destroyer") {
          this.destroyer[0].hit();
          this.allSunk();
          return "hit";
        } else if (this.shipyard[z][1] == "submarine") {
          this.submarine[0].hit();
          this.allSunk();
          return "hit";
        } else {
          this.patrolboat[0].hit();
          this.allSunk();
          return "hit";
        }
      }
    }
    return "miss";
  };
}

class Player {
  constructor(name, active, difficulty) {
    this.name = name;
    this.board = new Gameboard();
    this.active = active;
    this.score = 0;
    this.game = true;
    this.difficulty = difficulty;
  }

  createBoard = function (player1, player2) {
    displayBoard(player1, player2, this.name);
  };

  addScore = function (x) {
    const display = document.getElementById(`score${x}`);
    this.score = this.score + 1;
    display.textContent = this.score;
  };
}

export { Player };
