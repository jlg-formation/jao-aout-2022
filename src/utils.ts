export const querySelector = <T extends Element>(
  cssSelector: string,
  type?: new () => T
): T => {
  const result = document.querySelector(cssSelector);
  if (result === null) {
    throw new Error(`Cannot find selector: ${cssSelector}`);
  }
  if (type !== undefined) {
    if (!(result instanceof type)) {
      throw new Error(`Cannot find selector with requested type: ${type.name}`);
    }
  }
  return result as T;
};
