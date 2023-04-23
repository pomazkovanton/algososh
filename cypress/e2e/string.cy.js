import {
  STRING_TEST_START,
  DELAY_IN_MS,
  BORDER_COLOR_CHANGING,
  BORDER_COLOR_DEFAULT,
  BORDER_COLOR_MODIFIED,
  STRING_TEST_MIDLE,
  STRING_TEST_END,
} from "../utils/constants";

describe("Строка", function () {
  beforeEach(function () {
    cy.visit("#recursion");
    cy.get('[data-cy="input-string"]').as("input");
    cy.contains("Развернуть").as("button");
  });

  it("кнопка добавления недоступна, если в инпуте пусто", function () {
    cy.get("@input").should("not.have.value");
    cy.get("@button").should("be.disabled");
  });

  it("строка разворачивается коректно", function () {
    cy.get("@input").type(STRING_TEST_START);
    cy.get("@button").click();
    cy.get('[data-cy="circle-main"]').as("circle");
    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        cy.wrap($el).contains(STRING_TEST_START[index]);

        if (index === 0 || index === 4) {
          cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_CHANGING);
        } else {
          cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_DEFAULT);
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        cy.wrap($el).contains(STRING_TEST_MIDLE[index]);
        if (index === 0 || index === 4) {
          cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_MODIFIED);
        } else if (index === 1 || index === 3) {
          cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_CHANGING);
        } else {
          cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_DEFAULT);
        }
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle")
      .should("have.length", 5)
      .each(($el, index) => {
        cy.wrap($el).contains(STRING_TEST_END[index]);
        cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_MODIFIED);
      });
  });
});
