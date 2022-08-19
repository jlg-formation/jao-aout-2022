import { Config } from "./interfaces/Config";
import { querySelector } from "./utils";

const DELAY = 300;

export class Command {
  callback: ((newConfig: Config) => void) | undefined;
  config: Config;
  isPlaying = false;
  subscription: ReturnType<typeof setInterval> | undefined;

  constructor(config: Config) {
    this.config = config;
    this.draw();
    this.initActions();
  }

  draw() {
    const array = Object.keys(this.config) as (keyof Config)[];

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

    this.callback?.(this.config);
  }

  initActions() {
    const array = Object.keys(this.config) as (keyof Config)[];
    for (const key of array) {
      const slider = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      slider.addEventListener("input", (event) => {
        const value = +slider.value;

        this.config[key] = value;
        this.draw();
      });
    }

    this.initButtonAction();
  }

  initButtonAction() {
    const button = querySelector("div.command button");
    button.addEventListener("click", (event) => {
      console.log("coucou");
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.play() : this.pause();
      this.draw();
    });
  }

  play() {
    this.subscription = setInterval(() => {
      this.config.multiplicationFactor++;
      if (this.config.multiplicationFactor > 100) {
        this.config.multiplicationFactor = 0;
      }
      this.draw();
    }, DELAY);
  }

  pause() {
    if (this.subscription === undefined) {
      return;
    }
    clearInterval(this.subscription);
  }

  subscribe(callback: (newConfig: Config) => void) {
    this.callback = callback;
  }
}
