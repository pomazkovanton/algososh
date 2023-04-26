import {
  INPUT_VALUE_SELECTOR,
  INPUT_INDEX_SELECTOR,
  BUTTON_ADD_IN_HEAD_SELECTOR,
  BUTTON_ADD_IN_TAIL_SELECTOR,
  BUTTON_ADD_BY_INDEX_SELECTOR,
  BUTTON_DELETE_FROM_HEAD_SELECTOR,
  BUTTON_DELETE_FROM_TAIL_SELECTOR,
  BUTTON_DELETE_BY_INDEX_SELECTOR,
  CIRCLE_SELECTOR,
  BORDER_COLOR_DEFAULT,
  BORDER_COLOR_CHANGING,
  BORDER_COLOR_MODIFIED,
  TEST_NUMBERS_ARRAY,
  LIST_NUMBERS_ARRAY,
  DELAY_IN_MS_X05
} from "../utils/constants";

describe("Список", function () {
  beforeEach(function () {
    cy.visit("#list");
    cy.get(INPUT_VALUE_SELECTOR).as("input-value");
    cy.get(INPUT_INDEX_SELECTOR).as("input-index");
    cy.get(BUTTON_ADD_IN_HEAD_SELECTOR).as("button-add-in-head");
    cy.get(BUTTON_ADD_IN_TAIL_SELECTOR).as("button-add-in-tail");
    cy.get(BUTTON_ADD_BY_INDEX_SELECTOR).as("button-add-by-index");
    cy.get(BUTTON_DELETE_FROM_HEAD_SELECTOR).as("button-del-from-head");
    cy.get(BUTTON_DELETE_FROM_TAIL_SELECTOR).as("button-del-from-tail");
    cy.get(BUTTON_DELETE_BY_INDEX_SELECTOR).as("button-del-by-index");
    cy.get(CIRCLE_SELECTOR).as("circles");
  });

  it("кнопка добавления (head и tail), кнопки добавления по индексу и удаления по индексу недоступны если в инпуте пусто", function () {
    cy.get("@input-value").should("not.have.value");
    cy.get("@input-index").should("not.have.value");
    cy.get("@button-add-in-head").should("be.disabled");
    cy.get("@button-add-in-tail").should("be.disabled");
    cy.get("@button-add-by-index").should("be.disabled");
    cy.get("@button-del-by-index").should("be.disabled");
  });

  it("дефолтный список отрисовывается корректно", function () {
    cy.get("@circles").should("have.length", 4);
    cy.get("@circles").each(($el, index) => {
      cy.wrap($el).contains(LIST_NUMBERS_ARRAY[index]);
    });
    cy.get("@circles").first().prev().contains("head");
    cy.get("@circles").last().next().next().contains("tail");
  });

  it("элемент корректно добавляется в head", function () {
    cy.get("@input-value").type(TEST_NUMBERS_ARRAY[0]);
    cy.get("@button-add-in-head").click();
    cy.get("@circles").first().contains(TEST_NUMBERS_ARRAY[0]);
    cy.get("@circles").first().should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.wait(DELAY_IN_MS_X05);
    cy.get("@circles").first().contains(TEST_NUMBERS_ARRAY[0]);
    cy.get("@circles").first().should("have.css", "border-color", BORDER_COLOR_MODIFIED);
    cy.get("@circles").first().should("have.css", "border-color", BORDER_COLOR_DEFAULT);
    cy.get("@circles").first().prev().contains("head");
  });

  it("элемент корректно добавляется в tail", function () {
    cy.get("@input-value").type(TEST_NUMBERS_ARRAY[0]);
    cy.get("@button-add-in-tail").click();
    cy.get("@circles").eq(3).contains(TEST_NUMBERS_ARRAY[0]);
    cy.get("@circles").eq(3).should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.wait(DELAY_IN_MS_X05);
    cy.get("@circles").last().contains(TEST_NUMBERS_ARRAY[0]);
    cy.get("@circles").last().should("have.css", "border-color", BORDER_COLOR_MODIFIED);
    cy.get("@circles").last().should("have.css", "border-color", BORDER_COLOR_DEFAULT);
    cy.get("@circles").last().next().next().contains("tail");
  });

  it("элемент корректно добавляется по индексу.", function () {
    cy.get("@input-value").type(TEST_NUMBERS_ARRAY[0]);
    cy.get("@input-index").type(TEST_NUMBERS_ARRAY[3]);
    cy.get("@button-add-by-index").click();
    cy.get("@circles").each(($el, index) => {
      if (index < TEST_NUMBERS_ARRAY[3]) {
        cy.wrap($el).prev().contains(TEST_NUMBERS_ARRAY[0]);
        cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_CHANGING);
      }
      if (index === TEST_NUMBERS_ARRAY[3]) {
        cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_MODIFIED);
        cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_DEFAULT);
        cy.wrap($el).contains(TEST_NUMBERS_ARRAY[0]);
        cy.wrap($el).next().contains(TEST_NUMBERS_ARRAY[3]);
      }
    });
  });
  
  it("элемент корректно удаляется из head", function () {
    cy.get("@button-del-from-head").click();
    cy.get("@circles").first().should("not.have.text");
    cy.get("@circles").first().next().next().contains(LIST_NUMBERS_ARRAY[0]);
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").first().contains(LIST_NUMBERS_ARRAY[1]);
  });

  it("элемент корректно удаляется из tail", function () {
    const lastIndex = LIST_NUMBERS_ARRAY.length - 1;
    cy.get("@button-del-from-tail").click();
    cy.get("@circles").eq(lastIndex).should("not.have.text");
    cy.get("@circles").eq(lastIndex).next().next().contains(LIST_NUMBERS_ARRAY[lastIndex]);
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").eq(lastIndex - 1).contains(LIST_NUMBERS_ARRAY[lastIndex - 1]);
  });

  it("элемент корректно удаляется по индексу", function () {
    const currentIndex = TEST_NUMBERS_ARRAY[3];
    const lengthList = LIST_NUMBERS_ARRAY.length;
    cy.get("@input-index").type(currentIndex);
    cy.get("@button-del-by-index").click();
    cy.get("@circles").each(($el, index) => {
      if (index < currentIndex) {
        cy.wrap($el).should("have.css", "border-color", BORDER_COLOR_CHANGING);
      }
      if (index === currentIndex) {
        cy.wrap($el).should("not.have.text");
        cy.wrap($el).next().next().contains(LIST_NUMBERS_ARRAY[currentIndex]);
      }
    });
    cy.get("@circles").should("have.length", lengthList - 1);
    cy.get("@circles").last().contains(LIST_NUMBERS_ARRAY[lengthList - 2]);
    cy.get("@circles").last().next().next().contains("tail");
  });
});
