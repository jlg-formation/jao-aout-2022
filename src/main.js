import { Board } from "./Board.js";
import { Command } from "./Command.js";

try {
  console.log("start");
  const board = new Board();
  const initialConfig = {
    samples: 10,
    multiplicationFactor: 2,
  };
  board.setConfig(initialConfig);
  board.draw();

  const command = new Command(initialConfig);
  command.subscribe((newConfig) => {
    board.setConfig(newConfig);
    board.redraw();
  });
} catch (err) {
  console.log("err: ", err);
}
