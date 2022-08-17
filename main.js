"use strict";

try {
  console.log("start");
  const board = new Board();
  board.setConfig({
    samples: 10,
    multiplicationFactor: 2,
  });
  board.draw();
  console.log("r0", r0);
} catch (err) {
  console.log("err: ", err);
}

const alice = new Person("Alice", 23);
alice.sayHello();
console.log("alice: ", alice);

const bob = new Employee("Bob", 34, "Orsys", 2000);
bob.sayHello();
bob.reward(10);
bob.sayHello();
console.log("bob: ", bob);
