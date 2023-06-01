describe("Signing in", () => {

  before(() => {
    cy.signup("user@email.com", "username","12345678")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#username").type("username");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("someone@example.com");
    cy.get("#username").type("username");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#username").type("username");
    cy.get("#password").type("password");
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