const obj = {
  toto: 123,
  titi: "asdf",
  tutu: false,
};

const obj2 = {
  toto: obj.toto,
  titi: obj.titi,
  tutu: obj.false,
};

const obj3 = {
  ...obj,
  tata: undefined,
};

console.log("obj3: ", obj3);

class WebServer {
  #options = {
    port: 3000,
    dbUrl: "mysql://localhost",
  };

  constructor(options) {
    for (const key of Object.keys(options)) {
      this.#options[key] = options[key];
    }

    Object.assign(this.#options, options);

    this.#options = { ...this.#options, options };
  }
}

const webServer = new WebServer({
  port: 3500,
});

const array = [1, "tutu", false];

const array2 = [...array, ...array];

function xxx(a, b) {
  console.log("a: ", a);
  console.log("b: ", b);
}

xxx(...array);
xxx(1, "tutu", false);
