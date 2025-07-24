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

    player2.board.placeShip("carrier", "a0", "e0");
    player2.board.placeShip("battleship", "a1", "d1");
    player2.board.placeShip("destroyer", "c2", "e2");
    player2.board.placeShip("submarine", "c3", "e3");
    player2.board.placeShip("patrolboat", "a9", "b9");
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

  const carrierdiv = document.createElement("div");
  ships.appendChild(carrierdiv);

  const carrierimgdiv = document.createElement("div");
  carrierimgdiv.classList.add("carrierimg");
  carrierdiv.appendChild(carrierimgdiv);

  const carrier = document.createElement("img");
  carrier.classList.add("carrier");
  carrier.src = carrierimg;
  carrier.draggable = true;
  carrierimgdiv.appendChild(carrier);

  const battlediv = document.createElement("div");
  ships.appendChild(battlediv);

  const battleimgdiv = document.createElement("div");
  battleimgdiv.classList.add("battleimg");
  battlediv.appendChild(battleimgdiv);

  const battleship = document.createElement("img");
  battleship.classList.add("battleship");
  battleship.src = battleshipimg;
  battleship.draggable = true;
  battleimgdiv.appendChild(battleship);

  const destroyerdiv = document.createElement("div");
  ships.appendChild(destroyerdiv);

  const destroyerimgdiv = document.createElement("div");
  destroyerimgdiv.classList.add("destroyerimg");
  destroyerdiv.appendChild(destroyerimgdiv);

  const destroyer = document.createElement("img");
  destroyer.classList.add("destroyer");
  destroyer.src = destroyerimg;
  destroyer.draggable = true;
  destroyerimgdiv.appendChild(destroyer);

  const subdiv = document.createElement("div");
  ships.appendChild(subdiv);

  const subimgdiv = document.createElement("div");
  subimgdiv.classList.add("subimg");
  subdiv.appendChild(subimgdiv);

  const submarine = document.createElement("img");
  submarine.classList.add("submarine");
  submarine.src = submarineimg;
  submarine.draggable = true;
  subimgdiv.appendChild(submarine);

  const patroldiv = document.createElement("div");
  ships.appendChild(patroldiv);

  const patrolimgdiv = document.createElement("div");
  patrolimgdiv.classList.add("patrolimg");
  patroldiv.appendChild(patrolimgdiv);

  const patrolboat = document.createElement("img");
  patrolboat.classList.add("patrolboat");
  patrolboat.src = patrolimg;
  patrolboat.draggable = true;
  patrolimgdiv.appendChild(patrolboat);

  if (x == 1) {
    const carrierButtons = document.createElement("div");
    carrierButtons.classList.add("carrierbuttons");
    carrierdiv.appendChild(carrierButtons);

    const carrierVertical = document.createElement("input");
    carrierVertical.type = "radio";
    carrierVertical.name = "carrierdirection";
    carrierVertical.value = "vertical";
    carrierVertical.id = "carriervertical";
    carrierButtons.appendChild(carrierVertical);

    const carrierVLabel = document.createElement("label");
    carrierVLabel.htmlFor = "carriervertical";
    carrierVLabel.textContent = "Vertical";
    carrierButtons.appendChild(carrierVLabel);

    const carrierHorizontal = document.createElement("input");
    carrierHorizontal.type = "radio";
    carrierHorizontal.name = "carrierdirection";
    carrierHorizontal.value = "horizontal";
    carrierHorizontal.id = "carrierhorizontal";
    carrierButtons.appendChild(carrierHorizontal);

    const carrierHLabel = document.createElement("label");
    carrierHLabel.htmlFor = "carrierhorizontal";
    carrierHLabel.textContent = "Horizontal";
    carrierButtons.appendChild(carrierHLabel);

    const battleshipButtons = document.createElement("div");
    battleshipButtons.classList.add("battleshipbuttons");
    battlediv.appendChild(battleshipButtons);

    const battleshipVertical = document.createElement("input");
    battleshipVertical.type = "radio";
    battleshipVertical.name = "battleshipdirection";
    battleshipVertical.value = "vertical";
    battleshipVertical.id = "battleshipvertical";
    battleshipButtons.appendChild(battleshipVertical);

    const battleshipVLabel = document.createElement("label");
    battleshipVLabel.htmlFor = "battleshipvertical";
    battleshipVLabel.textContent = "Vertical";
    battleshipButtons.appendChild(battleshipVLabel);

    const battleshipHorizontal = document.createElement("input");
    battleshipHorizontal.type = "radio";
    battleshipHorizontal.name = "battleshipdirection";
    battleshipHorizontal.value = "horizontal";
    battleshipHorizontal.id = "battleshiphorizontal";
    battleshipButtons.appendChild(battleshipHorizontal);

    const battleshipHLabel = document.createElement("label");
    battleshipHLabel.htmlFor = "battleshiphorizontal";
    battleshipHLabel.textContent = "Horizontal";
    battleshipButtons.appendChild(battleshipHLabel);

    const destroyerButtons = document.createElement("div");
    destroyerButtons.classList.add("destroyerbuttons");
    destroyerdiv.appendChild(destroyerButtons);

    const destroyerVertical = document.createElement("input");
    destroyerVertical.type = "radio";
    destroyerVertical.name = "destroyerdirection";
    destroyerVertical.value = "vertical";
    destroyerVertical.id = "destroyervertical";
    destroyerButtons.appendChild(destroyerVertical);

    const destroyerVLabel = document.createElement("label");
    destroyerVLabel.htmlFor = "destroyervertical";
    destroyerVLabel.textContent = "Vertical";
    destroyerButtons.appendChild(destroyerVLabel);

    const destroyerHorizontal = document.createElement("input");
    destroyerHorizontal.type = "radio";
    destroyerHorizontal.name = "destroyerdirection";
    destroyerHorizontal.value = "horizontal";
    destroyerHorizontal.id = "destroyerhorizontal";
    destroyerButtons.appendChild(destroyerHorizontal);

    const destroyerHLabel = document.createElement("label");
    destroyerHLabel.htmlFor = "destroyerhorizontal";
    destroyerHLabel.textContent = "Horizontal";
    destroyerButtons.appendChild(destroyerHLabel);

    const subButtons = document.createElement("div");
    subButtons.classList.add("subbuttons");
    subdiv.appendChild(subButtons);

    const subVertical = document.createElement("input");
    subVertical.type = "radio";
    subVertical.name = "subdirection";
    subVertical.value = "vertical";
    subVertical.id = "subvertical";
    subButtons.appendChild(subVertical);

    const subVLabel = document.createElement("label");
    subVLabel.htmlFor = "subvertical";
    subVLabel.textContent = "Vertical";
    subButtons.appendChild(subVLabel);

    const subHorizontal = document.createElement("input");
    subHorizontal.type = "radio";
    subHorizontal.name = "subdirection";
    subHorizontal.value = "horizontal";
    subHorizontal.id = "subhorizontal";
    subButtons.appendChild(subHorizontal);

    const subHLabel = document.createElement("label");
    subHLabel.htmlFor = "subhorizontal";
    subHLabel.textContent = "Horizontal";
    subButtons.appendChild(subHLabel);

    const patrolButtons = document.createElement("div");
    patrolButtons.classList.add("patrolbuttons");
    patroldiv.appendChild(patrolButtons);

    const patrolVertical = document.createElement("input");
    patrolVertical.type = "radio";
    patrolVertical.name = "patroldirection";
    patrolVertical.value = "vertical";
    patrolVertical.id = "patrolvertical";
    patrolButtons.appendChild(patrolVertical);

    const patrolVLabel = document.createElement("label");
    patrolVLabel.htmlFor = "patrolvertical";
    patrolVLabel.textContent = "Vertical";
    patrolButtons.appendChild(patrolVLabel);

    const patrolHorizontal = document.createElement("input");
    patrolHorizontal.type = "radio";
    patrolHorizontal.name = "patroldirection";
    patrolHorizontal.value = "horizontal";
    patrolHorizontal.id = "patrolhorizontal";
    patrolButtons.appendChild(patrolHorizontal);

    const patrolHLabel = document.createElement("label");
    patrolHLabel.htmlFor = "patrolhorizontal";
    patrolHLabel.textContent = "Horizontal";
    patrolButtons.appendChild(patrolHLabel);

    carrier.classList.add("draggable");
    battleship.classList.add("draggable");
    destroyer.classList.add("draggable");
    submarine.classList.add("draggable");
    patrolboat.classList.add("draggable");

    const draggables = document.querySelectorAll(".draggable");
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        if (draggable.classList.contains("carrier")) {
          document.getElementsByName("carrierdirection").forEach((element) => {
            if (element.checked) {
              draggable.classList.add(`${element.value}`);
            }
          });
        } else if (draggable.classList.contains("destroyer")) {
          document
            .getElementsByName("destroyerdirection")
            .forEach((element) => {
              if (element.checked) {
                draggable.classList.add(`${element.value}`);
              }
            });
        } else if (draggable.classList.contains("submarine")) {
          document.getElementsByName("subdirection").forEach((element) => {
            if (element.checked) {
              draggable.classList.add(`${element.value}`);
            }
          });
        } else if (draggable.classList.contains("patrolboat")) {
          document.getElementsByName("patroldirection").forEach((element) => {
            if (element.checked) {
              draggable.classList.add(`${element.value}`);
            }
          });
        } else if (draggable.classList.contains("battleship")) {
          document
            .getElementsByName("battleshipdirection")
            .forEach((element) => {
              if (element.checked) {
                draggable.classList.add(`${element.value}`);
              }
            });
        }
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", (ev) => {
        const placed = document.querySelectorAll(".placement");
        if (
          document
            .elementFromPoint(ev.clientX, ev.clientY)
            .classList.contains("placement") == false
        ) {
          placed.forEach((element) => {
            element.classList.remove("placement");
          });
          draggable.classList.remove("dragging");
          if (draggable.classList.contains("vertical")) {
            draggable.classList.remove("vertical");
          } else if (draggable.classList.contains("horizontal")) {
            draggable.classList.remove("horizontal");
          }
          return;
        }
        let overlap = false;
        placed.forEach((element) => {
          for (let x = 0; x < player1.board.shipyard.length; x++) {
            if (
              player1.board.shipyard[x][0] ==
                element.id.toLowerCase(0).charCodeAt(0) +
                  element.id.charAt(1) ||
              player1.board.shipyard[x][1] == draggable.classList[0]
            ) {
              placed.forEach((element) => {
                element.classList.remove("placement");
              });
              overlap = true;
              return;
            }
          }
        });
        if (overlap == false) {
          placed.forEach((element) => {
            element.classList.add("placed");
            element.classList.remove("placement");
          });
        }
        if (draggable.classList.contains("vertical") && overlap == false) {
          if (draggable.classList[0] == "carrier") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(0) == "A" || center.id.charAt(0) == "B") {
              center = document.getElementById(
                "C" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            } else if (
              center.id.charAt(0) == "J" ||
              center.id.charAt(0) == "I"
            ) {
              center = document.getElementById(
                "H" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = carrierimg;
            showShip(img, position, draggable.classList[0]);
            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) - 2) +
              Number(center.id.charAt(1));
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) + 2) +
              Number(center.id.charAt(1));
            player1.board.placeShip("carrier", pos1, pos2);
          } else if (draggable.classList[0] == "battleship") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(0) == "A") {
              center = document.getElementById(
                "B" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            } else if (
              center.id.charAt(0) == "J" ||
              center.id.charAt(0) == "I"
            ) {
              center = document.getElementById(
                "H" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = battleshipimg;
            showShip(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) - 1) +
              Number(center.id.charAt(1));
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) + 2) +
              Number(center.id.charAt(1));

            player1.board.placeShip("battleship", pos1, pos2);
          } else if (
            draggable.classList[0] == "submarine" ||
            draggable.classList[0] == "destroyer"
          ) {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(0) == "A") {
              center = document.getElementById(
                "B" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            } else if (center.id.charAt(0) == "J") {
              center = document.getElementById(
                "I" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            let type;
            if (draggable.classList[0] == "submarine") {
              img.src = submarineimg;
              type = "submarine";
            } else if (draggable.classList[0] == "destroyer") {
              img.src = destroyerimg;
              type = "destroyer";
            }

            showShip(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) - 1) +
              Number(center.id.charAt(1));
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) + 1) +
              Number(center.id.charAt(1));
            player1.board.placeShip(type, pos1, pos2);
          } else if (draggable.classList[0] == "patrolboat") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(0) == "A") {
              center = document.getElementById(
                "B" +
                  document
                    .elementFromPoint(ev.clientX, ev.clientY)
                    .id.charAt(1) +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = patrolimg;
            showShip(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0) - 1) +
              Number(center.id.charAt(1));
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              Number(center.id.charAt(1));
            player1.board.placeShip("patrolboat", pos1, pos2);
          }
        } else if (
          draggable.classList.contains("horizontal") &&
          overlap == false
        ) {
          if (draggable.classList[0] == "carrier") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(1) == "0" || center.id.charAt(1) == "1") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "2" +
                  "1"
              );
            } else if (
              center.id.charAt(1) == "8" ||
              center.id.charAt(1) == "9"
            ) {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "7" +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = carrierimg;
            showShipH(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              Number(center.id.charAt(1) - 2);
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              (Number(center.id.charAt(1)) + 2);
            player1.board.placeShip("carrier", pos1, pos2);
          } else if (draggable.classList[0] == "battleship") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(1) == "0" || center.id.charAt(1) == "1") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "2" +
                  "1"
              );
            } else if (center.id.charAt(1) == "9") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "8" +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = battleshipimg;
            showShipH(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              (Number(center.id.charAt(1)) - 2);
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              (Number(center.id.charAt(1)) + 1);
            console.log(pos1, pos2);
            player1.board.placeShip("battleship", pos1, pos2);
          } else if (
            draggable.classList[0] == "submarine" ||
            draggable.classList[0] == "destroyer"
          ) {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(1) == "0") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "1" +
                  "1"
              );
            } else if (center.id.charAt(1) == "9") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "8" +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            let type;
            if (draggable.classList[0] == "submarine") {
              img.src = submarineimg;
              type = "submarine";
            } else if (draggable.classList[0] == "destroyer") {
              img.src = destroyerimg;
              type = "destroyer";
            }

            showShipH(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              Number(center.id.charAt(1) - 1);
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              (Number(center.id.charAt(1)) + 1);

            player1.board.placeShip(type, pos1, pos2);
          } else if (draggable.classList[0] == "patrolboat") {
            let center = document.elementFromPoint(ev.clientX, ev.clientY);
            if (center.id.charAt(1) == "0") {
              center = document.getElementById(
                document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                  "1" +
                  "1"
              );
            }
            let position = center.getBoundingClientRect();
            let img = new Image();
            img.src = patrolimg;
            showShipH(img, position, draggable.classList[0]);

            let pos1 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              Number(center.id.charAt(1) - 1);
            let pos2 =
              String.fromCharCode(center.id.toLowerCase(0).charCodeAt(0)) +
              Number(center.id.charAt(1));

            player1.board.placeShip("patrolboat", pos1, pos2);
          }
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
      if (draggable.classList.contains("vertical")) {
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
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
            );
            spot.classList.add("placement");
          }
          for (let y = 1; y < 3; y++) {
            let temp = point.id.charCodeAt(0) - y;
            let spot = document.getElementById(
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
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
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
            );
            spot.classList.add("placement");
          }
          for (let y = 1; y < 2; y++) {
            let temp = point.id.charCodeAt(0) - y;
            let spot = document.getElementById(
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
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
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
            );
            spot.classList.add("placement");
          }
          for (let y = 1; y < 2; y++) {
            let temp = point.id.charCodeAt(0) - y;
            let spot = document.getElementById(
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
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
              String.fromCharCode(temp) +
                point.id.charAt(1) +
                point.id.charAt(2)
            );
            spot.classList.add("placement");
          }
        }
      } else if (draggable.classList.contains("horizontal")) {
        if (draggable.classList.contains("carrier")) {
          if (point.id.charAt(1) == "0" || point.id.charAt(1) == "1") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "2" +
                "1"
            );
          } else if (point.id.charAt(1) == "8" || point.id.charAt(1) == "9") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "7" +
                "1"
            );
          }
          point.classList.add("placement");
          for (let y = 1; y < 3; y++) {
            let temp = Number(point.id.charAt(1)) + y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
          for (let y = 1; y < 3; y++) {
            let temp = Number(point.id.charAt(1)) - y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
        } else if (draggable.classList.contains("battleship")) {
          if (point.id.charAt(1) == "0" || point.id.charAt(1) == "1") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "2" +
                "1"
            );
          } else if (point.id.charAt(1) == "9") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "8" +
                "1"
            );
          }
          point.classList.add("placement");
          for (let y = 1; y < 2; y++) {
            let temp = Number(point.id.charAt(1)) + y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
          for (let y = 1; y < 3; y++) {
            let temp = Number(point.id.charAt(1)) - y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
        } else if (
          draggable.classList.contains("submarine") ||
          draggable.classList.contains("destroyer")
        ) {
          if (point.id.charAt(1) == "0") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "1" +
                "1"
            );
          } else if (point.id.charAt(1) == "9") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "8" +
                "1"
            );
          }
          point.classList.add("placement");
          for (let y = 1; y < 2; y++) {
            let temp = Number(point.id.charAt(1)) + y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
          for (let y = 1; y < 2; y++) {
            let temp = Number(point.id.charAt(1)) - y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
        } else if (draggable.classList.contains("patrolboat")) {
          if (point.id.charAt(1) == "0") {
            point = document.getElementById(
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
                "1" +
                "1"
            );
          }
          point.classList.add("placement");
          for (let y = 1; y < 2; y++) {
            let temp = Number(point.id.charAt(1)) - y;
            let spot =
              document.elementFromPoint(ev.clientX, ev.clientY).id.charAt(0) +
              temp +
              "1";
            document.getElementById(spot).classList.add("placement");
          }
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

const showShip = (img, position, type) => {
  if (type == "carrier") {
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
  } else if (type == "battleship") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.height * 4;
    canvas.width = position.width;
    ctx.drawImage(img, 0, 0, position.width - 2, (position.height - 2) * 4);
    body.appendChild(canvas);
    canvas.style.left = position.left + 1 + "px";
    canvas.style.top =
      position.top - (position.bottom - position.top) * 2 + 4 + "px";
  } else if (type == "submarine" || type == "destroyer") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.height * 3;
    canvas.width = position.width;
    ctx.drawImage(img, 0, 0, position.width - 2, (position.height - 2) * 3);
    body.appendChild(canvas);
    canvas.style.left = position.left + 1 + "px";
    canvas.style.top =
      position.top - (position.bottom - position.top) + 3 + "px";
  } else if (type == "patrolboat") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.height * 2;
    canvas.width = position.width;
    ctx.drawImage(img, 0, 0, position.width - 2, (position.height - 2) * 2);
    body.appendChild(canvas);
    canvas.style.left = position.left + 1 + "px";
    canvas.style.top = position.top + 1 + "px";
  }
};

const showShipH = (img, position, type) => {
  if (type == "carrier") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.width * 5;
    canvas.width = position.height;
    ctx.drawImage(img, 0, 0, position.height, (position.width - 2) * 5);
    body.appendChild(canvas);
    canvas.style.left = position.left + 8 + "px";
    canvas.style.top =
      position.top - (position.bottom - position.top) * 3 - 2 + "px";
    canvas.classList.add("horizontal");
    console.log(position.left);
  } else if (type == "battleship") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.width * 4;
    canvas.width = position.height;
    ctx.drawImage(img, 0, 0, position.height - 2, (position.width - 2) * 4);
    body.appendChild(canvas);
    canvas.style.left =
      position.left - (position.right - position.left) / 2 + 10 + "px";
    canvas.style.top =
      position.top - (position.bottom - position.top) * 2 - 19 + "px";
    canvas.classList.add("horizontal");
  } else if (type == "submarine" || type == "destroyer") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.width * 3;
    canvas.width = position.height;
    ctx.drawImage(img, 0, 0, position.height - 2, (position.width - 2) * 3);
    body.appendChild(canvas);
    canvas.style.left = position.left + 9 + "px";
    canvas.style.top =
      position.top - (position.bottom - position.top) - 36 + "px";
    canvas.classList.add("horizontal");
  } else if (type == "patrolboat") {
    let body = document.querySelector("body");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    img.id = "placedimage";
    canvas.height = position.width * 2;
    canvas.width = position.height;
    ctx.drawImage(img, 0, 0, position.height - 2, (position.width - 2) * 2);
    body.appendChild(canvas);
    canvas.style.left =
      position.left - (position.right - position.left) / 2 + 10 + "px";
    canvas.style.top =
      position.top + (position.top - position.bottom) + 6 + "px";
    canvas.classList.add("horizontal");
  }
};

export { displayBoard };
