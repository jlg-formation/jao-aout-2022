export const querySelector = (cssSelector: string) => {
  const result = document.querySelector(cssSelector);
  if (result === null) {
    throw new Error(`Cannot find selector: ${cssSelector}`);
  }
  return result;
};
