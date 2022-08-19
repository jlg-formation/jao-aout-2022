import { Config } from "./interfaces/Config";
import { keys, querySelector, sleep } from "./utils";

const DELAY = 300;

export class Command {
  #config: Config = {
    samples: 0,
    multiplicationFactor: 0,
  };
  #isPlaying = false;
  #callback: ((newConfig: Config) => void) | undefined;
  #subscription: ReturnType<typeof setInterval> | undefined;

  constructor(config: Config) {
    this.config = config;
    this.initActions();
  }

  private get config() {
    return this.#config;
  }

  private set config(val: Config) {
    this.#config = val;
    this.draw();
  }

  private get isPlaying() {
    return this.#isPlaying;
  }

  private set isPlaying(val: boolean) {
    this.#isPlaying = val;
    this.draw();
  }

  subscribe(callback: (newConfig: Config) => void) {
    this.#callback = callback;
  }

  private draw() {
    const array = keys(this.config);

    for (const key of array) {
      const slider = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );

      slider.value = this.config[key] + "";

      const label = querySelector(`div.command label.${key} span`);
      label.innerHTML = this.config[key] + "";
    }

    const button = querySelector("div.command button");
    button.innerHTML = this.isPlaying ? "Pause" : "Play";

    this.#callback?.(this.config);
  }

  private initActions() {
    const array = keys(this.config);
    for (const key of array) {
      const slider = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      slider.addEventListener("input", (event) => {
        const value = +slider.value;
        this.config = { ...this.config, [key]: value };
      });
    }

    this.initButtonAction();
  }

  private initButtonAction() {
    const button = querySelector("div.command button");
    button.addEventListener("click", (event) => {
      console.log("coucou");
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.play() : this.pause();
    });
  }

  private pause() {}

  private async play() {
    while (this.isPlaying) {
      await sleep(DELAY);
      let multiplicationFactor = this.config.multiplicationFactor;
      multiplicationFactor++;
      if (multiplicationFactor > 100) {
        multiplicationFactor = 0;
      }
      this.config = { ...this.config, multiplicationFactor };
    }
  }
}
