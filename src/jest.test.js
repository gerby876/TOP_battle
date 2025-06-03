const { Ship } = require("./constructors.js");

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
