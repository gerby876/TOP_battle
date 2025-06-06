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

  fireShot = function (x) {
    let tmpx = x.split("");
    x = tmpx[0].charCodeAt(0) * 10 + (tmpx[1] - 1);
    if (this.board.shots.includes(x)) {
      console.log("Shot here already");
      return;
    } else {
      this.board.receiveAttack(x);
    }
  };

  createBoard = function () {
    let x;
    if (this.name !== "Computer") {
      x = 1;
    } else {
      x = 2;
    }

    const play = document.querySelector(`.player${x}`);

    const head = document.createElement("div");
    head.classList.add("header");
    play.appendChild(head);

    if (x == 1) {
      const score = document.createElement("div");
      score.classList.add(`score${x}`);
      score.textContent = 0;
      head.appendChild(score);

      const name = document.createElement("div");
      name.classList.add("name");
      name.textContent = this.name;
      head.appendChild(name);
    } else {
      const name = document.createElement("div");
      name.classList.add("name");
      name.textContent = "Computer";
      head.appendChild(name);

      const score = document.createElement("div");
      score.classList.add(`score${x}`);
      score.textContent = 0;
      head.appendChild(score);
    }

    const board = document.createElement("div");
    board.classList.add("board");
    play.appendChild(board);

    const rows = document.createElement("div");
    rows.classList.add("rows");
    board.appendChild(rows);

    const squares = document.createElement("div");
    squares.classList.add("squares");
    board.appendChild(squares);

    for (let y = 74; y > 64; y--) {
      const label = document.createElement("div");
      label.textContent = String.fromCharCode(y);
      for (let z = 1; z < 11; z++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(y) + z;
        button.addEventListener("click", () => {
          this.fireShot(String.fromCharCode(y) + z);
        });
        squares.appendChild(button);
      }
      rows.appendChild(label);
    }

    const columns = document.createElement("div");
    columns.classList.add("columns");
    board.appendChild(columns);

    for (let y = 1; y < 11; y++) {
      const label = document.createElement("div");
      label.textContent = y;
      columns.appendChild(label);
    }

    const shipyard = document.createElement("div");
    shipyard.classList.add("shipyard");
    play.appendChild(shipyard);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = "Shipyard";
    shipyard.appendChild(title);

    const ships = document.createElement("div");
    ships.classList.add("ships");
    shipyard.appendChild(ships);

    const carrier = document.createElement("div");
    carrier.classList.add("carrier");
    carrier.textContent = "Carrier";
    ships.appendChild(carrier);

    const battleship = document.createElement("div");
    battleship.classList.add("battleship");
    battleship.textContent = "Battleship";
    ships.appendChild(battleship);

    const destroyer = document.createElement("div");
    destroyer.classList.add("destroyer");
    destroyer.textContent = "Destroyer";
    ships.appendChild(destroyer);

    const submarine = document.createElement("div");
    submarine.classList.add("submarine");
    submarine.textContent = "Submarine";
    ships.appendChild(submarine);

    const patrolboat = document.createElement("div");
    patrolboat.classList.add("patrolboat");
    patrolboat.textContent = "Patrolboat";
    ships.appendChild(patrolboat);
  };
}

module.exports = { Ship, Gameboard, Player };
