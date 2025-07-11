class LoginPage {
  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  }

  fillUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  fillPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  verifyDashboardVisible() {
    cy.url().should("include", "/dashboard");
    cy.get("aside").should("be.visible");
  }
}

module.exports = LoginPage

