import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const LoginPage = require('../../pages/LoginPage');
const AdminPage = require('../../pages/AdminPage');

// Buat instance
const loginPage = new LoginPage();
const adminPage = new AdminPage();

Given("user is on the login page", () => {
  loginPage.visit();
});

When("user logs in using username {string} and password {string}", (username, password) => {
  loginPage.fillUsername(username);
  loginPage.fillPassword(password);
  loginPage.submit();
});

Then("user should see the dashboard page", () => {
  loginPage.verifyDashboardVisible();
  cy.screenshot("dashboard-page");
});

Given("user is logged in as {string} with {string}", (username, password) => {
  loginPage.visit();
  loginPage.fillUsername(username);
  loginPage.fillPassword(password);
  loginPage.submit();
  loginPage.verifyDashboardVisible();
});

When("user navigates to Admin page", () => {
  adminPage.navigateToAdmin();
  cy.screenshot("admin-page");
});

When("user adds a new admin {string} with role {string}", (newUsername, role) => {
  adminPage.clickAddButton();
  adminPage.fillNewAdminData(newUsername, role);
  adminPage.save();
});

Then("the admin {string} should appear in the user list", (newUsername) => {
  adminPage.verifyUserInList(newUsername);
  cy.screenshot("admin-user-added");
});

Given("user tries to login using invalid fixture {string}", (fixtureName) => {
  cy.fixture(fixtureName).then((user) => {
    const LoginPage = require("../../pages/LoginPage");
    const loginPage = new LoginPage();

    loginPage.visit();
    loginPage.fillUsername(user.username);
    loginPage.fillPassword(user.password);
    loginPage.submit();
    cy.wait(2000);
  });
});

Then("user should see an error message", () => {
  cy.get(".oxd-alert-content-text") // Sesuaikan dengan selector pesan error di OrangeHRM
    .should("be.visible")
    .and("contain.text", "Invalid credentials");
});
