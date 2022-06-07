describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("#addProduct").contains("Adicionar produto");
  });
});
