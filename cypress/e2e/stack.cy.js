import {
  TEST_NUMBERS_ARRAY,
  INPUT_VALUE_SELECTOR,
  BUTTON_ADD_SELECTOR,
  BUTTON_DELETE_SELECTOR,
  BUTTON_CLEAR_SELECTOR,
  CIRCLE_SELECTOR,
  BORDER_COLOR_CHANGING,
  BORDER_COLOR_DEFAULT,
} from "../utils/constants";

describe("Стек", function () {
  const pushStack = (item) => {
    cy.get("@input").type(item);
    cy.get("@button-add").click();
    cy.get(CIRCLE_SELECTOR).last().as("last-circle");
    cy.get("@last-circle").contains(item);
    cy.get("@last-circle").prev().contains("top");
    cy.get("@last-circle").should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.get("@last-circle").should("have.css", "border-color", BORDER_COLOR_DEFAULT);
  };

  beforeEach(function () {
    cy.visit("#stack");
    cy.get(INPUT_VALUE_SELECTOR).as("input");
    cy.get(BUTTON_ADD_SELECTOR).as("button-add");
    cy.get(BUTTON_DELETE_SELECTOR).as("button-del");
    cy.get(BUTTON_CLEAR_SELECTOR).as("button-clear");
  });

  it("кнопка добавления недоступна, если в инпуте пусто", function () {
    cy.get("@input").should("not.have.value");
    cy.get("@button-add").should("be.disabled");
  });

  it("элемент правильно добавляется в стек", function () {
    TEST_NUMBERS_ARRAY.forEach((el) => pushStack(el));
  });

  it("элемент корректно удаляется  из стека", function () {
    TEST_NUMBERS_ARRAY.forEach((el) => pushStack(el));
    cy.get("@button-del").click();
    cy.get(CIRCLE_SELECTOR).last().as("last-circle");
    cy.get(CIRCLE_SELECTOR).as("circles");
    cy.get("@last-circle").should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.get("@last-circle").prev().contains("top");
    cy.get("@circles").should("have.length", TEST_NUMBERS_ARRAY.length - 1);
  });

  it("очитска стека работает корректно", function () {
    TEST_NUMBERS_ARRAY.forEach((el) => pushStack(el));
    cy.get("@button-clear").click();
    cy.get(CIRCLE_SELECTOR).should("have.length", 0);
    cy.get("@button-add").should("be.disabled");
    cy.get("@button-del").should("be.disabled");
    cy.get("@button-clear").should("be.disabled");
    cy.get("@input").should("not.have.value");
  });
});
