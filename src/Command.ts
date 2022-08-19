import { Config } from "./interfaces/Config";

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
      const slider = document.querySelector(
        `div.command label.${key} input`
      ) as HTMLInputElement;

      slider.value = this.config[key] + "";

      const label = document.querySelector(
        `div.command label.${key} span`
      ) as Element;
      label.innerHTML = this.config[key] + "";
    }

    const button = document.querySelector("div.command button") as Element;
    button.innerHTML = this.isPlaying ? "Pause" : "Play";

    this.callback?.(this.config);
  }

  initActions() {
    const array = Object.keys(this.config) as (keyof Config)[];
    for (const key of array) {
      const slider = document.querySelector(
        `div.command label.${key} input`
      ) as HTMLInputElement;
      slider.addEventListener("input", (event) => {
        const value = +slider.value;

        this.config[key] = value;
        this.draw();
      });
    }

    this.initButtonAction();
  }

  initButtonAction() {
    const button = document.querySelector("div.command button") as Element;
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
