class AdminPage {
  navigateToAdmin() {
    cy.contains("span.oxd-main-menu-item--name", "Admin")
      .should("be.visible")
      .click();

    cy.url().should("include", "/admin/viewSystemUsers");
    cy.wait(2000); // Waktu untuk render halaman Admin
  }

  clickAddButton() {
    cy.contains("button", "Add").should("be.visible").click();
    cy.url().should("include", "/saveSystemUser");
    cy.wait(1000); // Tunggu form siap
  }

  fillNewAdminData(username, role) {
    // Role
    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown").contains(role).click();

    // Employee Name
    cy.get('input[placeholder="Type for hints..."]').type("O");
    cy.wait(2000); // Tunggu dropdown tampil
    cy.get(".oxd-autocomplete-dropdown > div").first().click();

    // Status
    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown").contains("Enabled").click();

    // Username
    cy.get('input[autocomplete="off"]').eq(0).clear().type(username);

    // Password
    cy.get('input[type="password"]').eq(0).clear().type("Password123!");
    cy.get('input[type="password"]').eq(1).clear().type("Password123!");

    cy.wait(1000); // Tunggu sebelum save
  }

  save() {
    cy.get("button").contains("Save").should("not.be.disabled").click();
    cy.wait(3000); // Tunggu redirect dan load user list
  }

  verifyUserInList(username) {
    cy.url().should("include", "/admin/viewSystemUsers");
    cy.get("input.oxd-input").eq(1).should("be.visible").clear().type(username);
    cy.wait(1000); // Tunggu input selesai

    cy.contains("button", "Search").should("be.visible").click();
    cy.wait(2000); // Tunggu hasil tampil

    cy.get(".oxd-table-body").should("contain.text", username);
  }
}

module.exports = AdminPage;
