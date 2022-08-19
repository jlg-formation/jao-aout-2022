/// <reference types="cypress" />

describe("check screen", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000");
  });

  it("displays two todo items by default", () => {
    cy.get("h1").contains("Multiplication");
    cy.get("div.command").contains("Samples: 10");
    cy.get("div.command").contains("Multiplication Factor: 3");
    cy.get("div.command").contains("Play");

    cy.contains("button", "Play").click();
    cy.contains("button", "Pause");
    cy.wait(2000);
    cy.contains("button", "Pause").click();
  });
});
