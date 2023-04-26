describe("Приложение", function () {
  it("должно быть доступно по адресу: localhost:3000", function () {
    cy.visit("/");
  });
});
