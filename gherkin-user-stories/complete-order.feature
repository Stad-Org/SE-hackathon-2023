Feature: Complete Order

  Background: I have internet connection 

  Scenario: Place Order for a Product
    Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    When I add a product to the cart
    And I click on the cart icon
    Then the cart preview is displayed

    And Validate product in the cart
    And Validate total amount in the cart

    And I click on 'PROCEED TO CHECKOUT'
    Then the checkout page is displayed

    And Validate product details on the checkout page

    And I click on 'Place Order'
    Then the order is placed successfully

    And I select 'Greece' from the dropdown
    And I check the checkbox
    And I click on 'Proceed'
    Then the order is processed, and the user is redirected to the home page
