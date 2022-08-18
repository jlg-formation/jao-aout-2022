import { Config } from "./interfaces/Config";

export class Command {
  config: Config;
  callback: ((newConfig: Config) => void) | undefined;

  constructor(config: Config) {
    this.config = config;
    this.applyConfig();
    this.initActions();
  }

  subscribe(callback: (newConfig: Config) => void) {
    this.callback = callback;
  }

  applyConfig() {
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
        this.applyConfig();
        this.callback?.(this.config);
      });
    }
  }
}
