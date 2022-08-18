export class Command {
  constructor(config) {
    this.config = config;
    this.applyConfig();
    this.initActions();
  }

  subscribe(callback) {
    this.callback = callback;
  }

  applyConfig() {
    const array = Object.keys(this.config);
    console.log("array: ", array);
    for (const key of array) {
      const slider = document.querySelector(`div.command label.${key} input`);
      console.log("slider: ", slider);
      slider.value = this.config[key];

      const label = document.querySelector(`div.command label.${key} span`);
      label.innerHTML = this.config[key];
    }
  }

  initActions() {
    const array = Object.keys(this.config);
    for (const key of array) {
      const slider = document.querySelector(`div.command label.${key} input`);
      slider.addEventListener("input", () => {
        console.log("coucou");
      });
    }
  }
}
