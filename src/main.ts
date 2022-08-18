import { Board } from "./Board";
import { Command } from "./Command";
import { Config } from "./interfaces/Config";

try {
  console.log("start");
  const board = new Board();
  const initialConfig: Config = {
    samples: 10,
    multiplicationFactor: 2,
  };
  board.setConfig(initialConfig);
  board.draw();

  const command = new Command(initialConfig);
  command.subscribe((newConfig: Config) => {
    board.setConfig(newConfig);
    board.redraw();
  });
} catch (err) {
  console.log("err: ", err);
}
