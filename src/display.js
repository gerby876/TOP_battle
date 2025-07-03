import hitShip from "./images/hitship.png";
import missed from "./images/missed.png";
import carrierimg from "./images/carrier.png";
import battleshipimg from "./images/battleship.png";
import destroyerimg from "./images/destroyer.png";
import submarineimg from "./images/sub.png";
import patrolimg from "./images/patrol.png";
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
  squares.id = "squares";
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

  const carrier = document.createElement("img");
  carrier.classList.add("carrier");
  carrier.src = carrierimg;
  carrier.draggable = true;
  ships.appendChild(carrier);

  const battleship = document.createElement("img");
  battleship.classList.add("battleship");
  battleship.src = battleshipimg;
  battleship.draggable = true;
  ships.appendChild(battleship);

  const destroyer = document.createElement("img");
  destroyer.classList.add("destroyer");
  destroyer.src = destroyerimg;
  destroyer.draggable = true;
  ships.appendChild(destroyer);

  const submarine = document.createElement("img");
  submarine.classList.add("submarine");
  submarine.src = submarineimg;
  submarine.draggable = true;
  ships.appendChild(submarine);

  const patrolboat = document.createElement("img");
  patrolboat.classList.add("patrolboat");
  patrolboat.src = patrolimg;
  patrolboat.draggable = true;
  ships.appendChild(patrolboat);

  if (x == 1) {
    carrier.classList.add("draggable");
    battleship.classList.add("draggable");
    destroyer.classList.add("draggable");
    submarine.classList.add("draggable");
    patrolboat.classList.add("draggable");

    const draggables = document.querySelectorAll(".draggable");
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", (ev) => {
        console.log(draggable.classList[0]);
        const placed = document.querySelectorAll(".placement");
        placed.forEach((element) => {
          element.classList.add("placed");
          element.classList.remove("placement");
        });
        if (draggable.classList[0] == "carrier") {
          let center = document.elementFromPoint(ev.clientX, ev.clientY);
          if (center.id.charAt(0) == "A" || center.id.charAt(0) == "B") {
            center = document.getElementById(
              "C" +
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
                "1"
            );
          } else if (center.id.charAt(0) == "J" || center.id.charAt(0) == "I") {
            center = document.getElementById(
              "H" +
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
                "1"
            );
          }
          let position = center.getBoundingClientRect();
          let img = new Image();
          img.src = carrierimg;
          showShip(img, position);
        }
        draggable.classList.remove("dragging");
      });
    });

    squares.addEventListener("dragover", (ev) => {
      const draggable = document.querySelector(".dragging");
      squares.style.backgroundColor = "red";
      let point = document.elementFromPoint(ev.clientX, ev.clientY);

      const placed = document.querySelectorAll(".placement");
      placed.forEach((element) => {
        element.classList.remove("placement");
      });
      if (draggable.classList.contains("carrier")) {
        if (point.id.charAt(0) == "A" || point.id.charAt(0) == "B") {
          point = document.getElementById(
            "C" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        } else if (point.id.charAt(0) == "J" || point.id.charAt(0) == "I") {
          point = document.getElementById(
            "H" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        }
        point.classList.add("placement");
        for (let y = 1; y < 3; y++) {
          let temp = point.id.charCodeAt(0) + y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
        for (let y = 1; y < 3; y++) {
          let temp = point.id.charCodeAt(0) - y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
      }

      if (draggable.classList.contains("battleship")) {
        if (point.id.charAt(0) == "A") {
          point = document.getElementById(
            "B" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        } else if (point.id.charAt(0) == "J" || point.id.charAt(0) == "I") {
          point = document.getElementById(
            "H" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        }
        point.classList.add("placement");
        for (let y = 1; y < 3; y++) {
          let temp = point.id.charCodeAt(0) + y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
        for (let y = 1; y < 2; y++) {
          let temp = point.id.charCodeAt(0) - y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
      }

      if (
        draggable.classList.contains("destroyer") ||
        draggable.classList.contains("submarine")
      ) {
        if (point.id.charAt(0) == "A") {
          point = document.getElementById(
            "B" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        } else if (point.id.charAt(0) == "J") {
          point = document.getElementById(
            "I" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        }
        point.classList.add("placement");
        for (let y = 1; y < 2; y++) {
          let temp = point.id.charCodeAt(0) + y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
        for (let y = 1; y < 2; y++) {
          let temp = point.id.charCodeAt(0) - y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
      }

      if (draggable.classList.contains("patrolboat")) {
        if (point.id.charAt(0) == "A") {
          point = document.getElementById(
            "B" +
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(1) +
              "1"
          );
        }
        point.classList.add("placement");
        for (let y = 1; y < 2; y++) {
          let temp = point.id.charCodeAt(0) - y;
          let spot = document.getElementById(
            String.fromCharCode(temp) + point.id.charAt(1) + point.id.charAt(2)
          );
          spot.classList.add("placement");
        }
      }
    });
  }
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

const showShip = (img, position) => {
  let body = document.querySelector("body");
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  img.id = "placedimage";
  canvas.height = position.height * 5;
  canvas.width = position.width;
  ctx.drawImage(img, 0, 0, position.width - 2, (position.height - 2) * 5);
  body.appendChild(canvas);
  canvas.style.left = position.left + 1 + "px";
  canvas.style.top =
    position.top - (position.bottom - position.top) * 2 + 4 + "px";

  console.log(position);
  console.log(position.height);
  console.log(position.height * 5);
  console.log(canvas.height);
};

export { displayBoard };
