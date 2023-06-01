describe("Signing in", () => {

  before(() => {
    cy.signup("username","12345678")
  })

  it("with valid credentials, redirects to '/'", () => {
    cy.visit("/login");
    cy.get("#username").type("username");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing username, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });
});