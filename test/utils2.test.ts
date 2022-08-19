import { querySelector } from "../src/utils";

describe("utils-querySelector", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("querySelector works", () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    const elt = querySelector("input", HTMLInputElement);
    if (!(elt instanceof HTMLInputElement)) {
      throw new Error("non");
    }
    expect(elt).toBeDefined();
  });

  test("querySelector does not have right type", () => {
    let foundError = false;
    try {
      const input = document.createElement("input");
      document.body.appendChild(input);
      const elt = querySelector("input", HTMLAnchorElement);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error("non");
      }
      expect(err.message).toMatch(/Cannot find selector with requested type: /);
      foundError = true;
    }
    expect(foundError).toStrictEqual(true);
  });

  test("querySelector throw an error", () => {
    let foundError = false;
    try {
      const elt = querySelector("asdfasfd");
    } catch (err) {
      if (!(err instanceof Error)) {
        throw new Error("non");
      }
      expect(err.message).toMatch(/Cannot find selector: /);
      foundError = true;
    }
    expect(foundError).toStrictEqual(true);
  });
});
