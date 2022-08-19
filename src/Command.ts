import { Config } from "./interfaces/Config";
import { keys, querySelector } from "./utils";

const DELAY = 300;

export class Command {
  _config: Config = {
    samples: 0,
    multiplicationFactor: 0,
  };
  callback: ((newConfig: Config) => void) | undefined;
  _isPlaying = false;
  subscription: ReturnType<typeof setInterval> | undefined;

  constructor(config: Config) {
    this.config = config;
    this.initActions();
  }

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(val: boolean) {
    this._isPlaying = val;
    this.draw();
  }

  get config() {
    return this._config;
  }

  set config(val: Config) {
    this._config = val;
    this.draw();
  }

  draw() {
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

    this.callback?.(this.config);
  }

  initActions() {
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

  initButtonAction() {
    const button = querySelector("div.command button");
    button.addEventListener("click", (event) => {
      console.log("coucou");
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.play() : this.pause();
    });
  }

  pause() {
    if (this.subscription === undefined) {
      return;
    }
    clearInterval(this.subscription);
  }

  play() {
    this.subscription = setInterval(() => {
      let multiplicationFactor = this.config.multiplicationFactor;
      multiplicationFactor++;
      if (multiplicationFactor > 100) {
        multiplicationFactor = 0;
      }
      this.config = { ...this.config, multiplicationFactor };
    }, DELAY);
  }

  subscribe(callback: (newConfig: Config) => void) {
    this.callback = callback;
  }
}
