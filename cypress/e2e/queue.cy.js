import {
  INPUT_SELECTOR,
  BUTTON_ADD_SELECTOR,
  BUTTON_DELETE_SELECTOR,
  BUTTON_CLEAR_SELECTOR,
  CIRCLE_SELECTOR,
  BORDER_COLOR_CHANGING,
  BORDER_COLOR_DEFAULT,
  TEST_NUMBERS_ARRAY,
  DELAY_IN_MS_X05,
} from "../utils/constants";

describe("Очередь", function () {
  const enqueue = (item, delay = null) => {
    delay && cy.wait(delay);
    cy.get("@input").type(item);
    cy.get("@button-add").click();
  };

  const checkingEnqueue = (item, index) => {
    enqueue(item);
    cy.get("@circles").eq(index).should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.get("@circles").eq(index).should("have.css", "border-color", BORDER_COLOR_DEFAULT);
    cy.get("@circles").eq(index).contains(item);
    cy.get("@circles").eq(index).next().next().contains("tail");
    cy.get("@circles").eq(0).prev().contains("head");
  };

  const checkingDequeue = (items, index) => {
    cy.get("@button-del").click();
    cy.get("@circles").eq(index).should("have.css", "border-color", BORDER_COLOR_CHANGING);
    cy.get("@circles").eq(index).should("have.css", "border-color", BORDER_COLOR_DEFAULT);
    cy.get("@circles").eq(index).should("not.include.text", items[index]);
    cy.get("@circles").eq(index).prev().should("not.include.text", "head");
    cy.get("@circles")
      .eq(index + 1)
      .prev()
      .contains("head");
  };

  beforeEach(function () {
    cy.visit("#queue");
    cy.get(INPUT_SELECTOR).as("input");
    cy.get(BUTTON_ADD_SELECTOR).as("button-add");
    cy.get(BUTTON_DELETE_SELECTOR).as("button-del");
    cy.get(BUTTON_CLEAR_SELECTOR).as("button-clear");
    cy.get(CIRCLE_SELECTOR).as("circles");
  });

  it("кнопка добавления недоступна, если в инпуте пусто", function () {
    cy.get("@input").should("not.have.value");
    cy.get("@button-add").should("be.disabled");
  });

  it("элемент правильно добавляется в очередь", function () {
    TEST_NUMBERS_ARRAY.forEach((el, index) => checkingEnqueue(el, index));
  });
  it("элемент правильно удаляется из очереди", function () {
    TEST_NUMBERS_ARRAY.forEach((el) => enqueue(el, DELAY_IN_MS_X05));
    for (let step = 0; step < TEST_NUMBERS_ARRAY.length; step++) {
      checkingDequeue(TEST_NUMBERS_ARRAY, step);
    }
  });
  it("все элементы удаляются из очереди", function () {
    TEST_NUMBERS_ARRAY.forEach((el) => enqueue(el, DELAY_IN_MS_X05));
    cy.get("@button-clear").click();
    cy.get("@circles").each(($el) => {
      cy.wrap($el).should("not.have.text");
    });
  });
});
