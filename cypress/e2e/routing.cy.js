describe("Маршруты", function () {
  beforeEach(function () {
    cy.visit("/");
  });
  it("должна открываться домашняя страница", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("должна открываться страница со строкой", function () {
    cy.get('a[href="#/recursion"]').click();
    cy.contains("Строка");
  });
  it("должна открываться страница с последовательностью Фибоначчи", function () {
    cy.get('a[href="#/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });
  it("должна открываться страница с сортировкой массива", function () {
    cy.get('a[href="#/sorting"]').click();
    cy.contains("Сортировка массива");
  });
  it("должна открываться страница со стеком", function () {
    cy.get('a[href="#/stack"]').click();
    cy.contains("Стек");
  });
  it("должна открываться страница с очередью", function () {
    cy.get('a[href="#/queue"]').click();
    cy.contains("Очередь");
  });
  it("должна открываться страница со связанным списком", function () {
    cy.get('a[href="#/list"]').click();
    cy.contains("Связный список");
  });
});
