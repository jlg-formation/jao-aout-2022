try {
  console.log("start");
  const board = new Board();
  board.setConfig({
    samples: 10,
    multiplicationFactor: 2,
  });
  board.draw();
} catch (err) {
  console.log("err: ", err);
}
