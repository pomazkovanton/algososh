describe("Последовательность Фибоначчи", function () {
  beforeEach(function () {
    cy.visit("#fibonacci");
    cy.get('[data-cy="input-string"]').as("input");
    cy.contains("Развернуть").as("button");
  });
});
