import { keys, querySelector } from "../src/utils";

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("keys returns Object.keys()", () => {
  expect(keys({ toto: 123, titi: false })).toStrictEqual(["toto", "titi"]);
});

test("querySelector throw an error", () => {
  let foundError = false;
  try {
    const elt = querySelector("asdfasfd");
    console.log("elt: ", elt);
  } catch (err) {
    foundError = true;
  }
  expect(foundError).toStrictEqual(true);
});
