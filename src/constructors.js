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
    x = tmpx[0].charCodeAt(0) * 10 + (tmpx[1] - 1);
    y = tmpy[0].charCodeAt(0) * 10 + (tmpy[1] - 1);
    if (x > y) {
      let tmp = y;
      y = x;
      x = tmp;
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
    if (tmpx[0] == tmpy[0]) {
      for (let z = 0; z < Math.floor((y - x) / 10) + 1; z++) {
        this.shipyard.push([x + z * 10, type]);
      }
    } else {
      for (let z = 0; z < y - x + 1; z++) {
        this.shipyard.push([x + z, type]);
      }
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
      return "All sank";
    }
    return "Some left";
  };

  receiveAttack = function (x) {
    let tmpx = x.split("");
    x = tmpx[0].charCodeAt(0) * 10 + (tmpx[1] - 1);
    this.shots.push(x);
    for (let z = 0; z < this.shipyard.length; z++) {
      if (this.shipyard[z][0] == x) {
        if (this.shipyard[z][1] == "carrier") {
          this.carrier[0].hit();
        } else if (this.shipyard[z][1] == "battleship") {
          this.battleship[0].hit();
        } else if (this.shipyard[z][1] == "destroyer") {
          this.destroyer[0].hit();
        } else if (this.shipyard[z][1] == "submarine") {
          this.submarine[0].hit();
        } else {
          this.patrolboat[0].hit();
        }
        this.allSunk();
        return "hit";
      } else {
        return "miss";
      }
    }
  };
}

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }
}

module.exports = { Ship, Gameboard, Player };
