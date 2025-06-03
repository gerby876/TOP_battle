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

module.exports = { Ship };
