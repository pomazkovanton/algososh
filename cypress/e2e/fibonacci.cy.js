import { FIBONACCI_SERIES, INPUT_SELECTOR, BUTTON_SELECTOR, CIRCLE_SELECTOR, DELAY_IN_MS_X12 } from "../utils/constants";

describe("Последовательность Фибоначчи", function () {
  beforeEach(function () {
    cy.visit("#fibonacci");
    cy.get(INPUT_SELECTOR).as("input");
    cy.get(BUTTON_SELECTOR).as("button");
  });

  it("кнопка добавления недоступна, если в инпуте пусто", function () {
    cy.get("@input").should("not.have.value");
    cy.get("@button").should("be.disabled");
  });

  it("ряд Фиббоначи генерируются корректно", function () {
    cy.get("@input").type(19);
    cy.get("@button").click();

    cy.wait(DELAY_IN_MS_X12);

    cy.get(CIRCLE_SELECTOR)
      .should("have.length", 20)
      .each(($el, index) => {
        cy.wrap($el).contains(FIBONACCI_SERIES[index]);
      });
  });
});
