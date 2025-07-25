Feature: Login and Add Multiple Admins

  Scenario Outline: User logs in with valid credentials
    Given user is on the login page
    When user logs in using username "<username>" and password "<password>"
    Then user should see the dashboard page

    Examples:
      | username | password  |
      | Admin    | admin123  |

  Scenario Outline: Add new admin user
    Given user is logged in as "<username>" with "<password>"
    And user navigates to Admin page
    When user adds a new admin "<newUsername>" with role "<role>"
    Then the admin "<newUsername>" should appear in the user list

    Examples:
      | username | password  | newUsername    | role   |
      | Admin    | admin123  | cssuser1w2s2  | ESS    |
      | Admin    | admin123  | cressuser22sw1  | Admin  |

  Scenario Outline: Login with invalid credentials
    Given user tries to login using invalid fixture "invalidUser"
    Then user should see an error message

