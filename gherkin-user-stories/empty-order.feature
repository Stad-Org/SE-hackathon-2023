Feature: Place Empty Order

  As a user,
  I want to be informed when attempting to place an empty order,
  So that I can avoid unintended actions.

  Scenario: Attempting to Place an Empty Order
    Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    When I navigate to the checkout page
    And I attempt to place the order without adding any products
    Then an error message should be displayed informing me that the order is empty
    And I should not be able to proceed with the empty order
    And I am redirected to the home page

  @known_issue
  Scenario: Defect - Incorrect Behavior for Empty Order
    Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    When I navigate to the checkout page
    And I attempt to place the order without adding any products
    Then the order is placed without showing an error
    And the system behaves incorrectly by allowing an empty order
