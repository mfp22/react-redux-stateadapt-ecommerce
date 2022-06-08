describe("empty spec", () => {
  it("render correctly", () => {
    cy.visit("/");
    cy.get("#addProduct").should("exist");
  });

  it("should add new product", () => {
    cy.visit("/");
    cy.get("#addProduct").click();
    cy.get("#productsLength").should("contain", "1");
  });

  it("should add new async product", () => {
    cy.get("#addProductAsync").click();
    cy.get("#productsLength").should("contain", "2");
  });

  it("should be able to set shipping value", () => {
    cy.visit("/");
    cy.get("#setShipping").click();

    cy.get("#shippingValue").should("not.contain.value", 0);
  });
});
