import hitShip from "./images/hitship.png";
import missed from "./images/missed.png";
import carrierimg from "./images/carrier.png";
import { Player } from "./constructors";
let player1;
let player2;

const halves = (function () {
  const body = document.querySelector("body");
  for (let x = 1; x < 3; x++) {
    const play = document.createElement("div");
    play.classList.add(`player${x}`);
    body.appendChild(play);
  }
  const newmatch = document.getElementById("mainmenu");
  const p1 = document.querySelector(".playername");
  const submit = document.querySelector(".submit");

  newmatch.showModal();
  submit.addEventListener("click", () => {
    if (
      p1.value == "" ||
      p1.value == "Computer" ||
      document.querySelector(`input[name=difficulty]:checked`) == null
    ) {
      return;
    }
    player1 = new Player(p1.value, true);
    player2 = new Player(
      "Computer",
      false,
      document.querySelector(`input[name=difficulty]:checked`).id
    );
    player1.createBoard(player1, player2);
    player2.createBoard(player1, player2);
    player1.board.placeShip("carrier", "a1", "a5");
    player1.board.placeShip("battleship", "b1", "b4");
    player1.board.placeShip("destroyer", "c1", "c3");
    player1.board.placeShip("submarine", "d1", "d3");
    player1.board.placeShip("patrolboat", "e1", "e2");

    player2.board.placeShip("carrier", "a1", "e1");
    player2.board.placeShip("battleship", "a2", "d2");
    player2.board.placeShip("destroyer", "c3", "e3");
    player2.board.placeShip("submarine", "c4", "e4");
    player2.board.placeShip("patrolboat", "d5", "e5");
    newmatch.close();
  });

  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    if (document.querySelector(".player1").childElementCount < 1) {
      return;
    } else {
      newmatch.close();
    }
  });
})();

const displayBoard = function (player1, player2, player) {
  let x;
  if (player !== "Computer") {
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
    score.id = `score${x}`;
    score.textContent = 0;
    head.appendChild(score);

    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = player1.name;
    head.appendChild(name);
  } else {
    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = "Computer";
    head.appendChild(name);

    const score = document.createElement("div");
    score.id = `score${x}`;
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
    for (let z = 0; z < 10; z++) {
      const button = document.createElement("div");
      button.id = String.fromCharCode(y) + z + x;
      button.addEventListener("click", () => {
        let space = String.fromCharCode(y) + z;
        turn(player1, player2, player, space);
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
  carrier.addEventListener("click", () => {
    carrier.style.backgroundColor = "Blue";
    console.log(squares);
    document.body.style.cursor = `url(${carrierimg}), crosshair`;
  });
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

const turn = function (player1, player2, player, space) {
  if (player1.game == false || player2.game == false) {
    return;
  }
  let button;
  let result;
  if (changeturn(player1, player2, player, space) == false) {
    return;
  }
  if (player == player1.name) {
    result = player1.board.receiveAttack(space);
    button = document.getElementById(space + 1);
  } else {
    result = player2.board.receiveAttack(space);
    button = document.getElementById(space + 2);
  }

  if (result == "hit") {
    const img = document.createElement("img");
    img.src = hitShip;
    button.appendChild(img);
    button.style.backgroundColor = "red";
  } else {
    const img = document.createElement("img");
    img.src = missed;
    button.appendChild(img);
    button.style.backgroundColor = "blue";
  }

  if (player1.board.allSunk() == true) {
    player2.addScore(2);
    player1.game = false;
    player2.game = false;
  } else if (player2.board.allSunk() == true) {
    player1.addScore(1);
    player1.game = false;
    player2.game = false;
  }
  if (player2.name == "Computer" && player2.active == true) {
    computerTurn(player1, player2);
  }
};

const changeturn = function (player1, player2, name, space) {
  let tmp = space.split("");
  let y = tmp[0].toLowerCase(0).charCodeAt(0) + tmp[1];
  if (
    (player1.active == true && player1.name == name) ||
    (player2.active == true && player2.name == name)
  ) {
    return false;
  }
  if (player1.active == true) {
    if (player2.board.shots.includes(y)) {
      return false;
    }
    player1.active = false;
    player2.active = true;
  } else {
    if (player1.board.shots.includes(y)) {
      return false;
    }
    player2.active = false;
    player1.active = true;
  }
};

const computerTurn = function (player) {
  let x = Math.floor(Math.random() * (107 - 97) + 97);
  let y = Math.floor(Math.random() * (10 - 0) + 0);
  let shot = x.toString() + y.toString();
  while (player.board.shots.includes(shot)) {
    x = Math.floor(Math.random() * (107 - 97) + 97);
    y = Math.floor(Math.random() * (10 - 0) + 0);
    shot = x.toString() + y.toString();
  }
  shot = String.fromCharCode(x).toUpperCase() + y;
  document.getElementById(`${shot + 1}`).click();
};

export { displayBoard };
