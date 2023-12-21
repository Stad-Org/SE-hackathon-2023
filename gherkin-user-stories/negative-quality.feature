Feature: Adding Broccoli with Negative Quantity to Cart

  Scenario: Add Broccoli with Negative Quantity to Cart
    Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    When I type "Brocolli - 1 Kg" in the search field
    And the product has the correct name as "Brocolli - 1 Kg"
    And I clear the input field for quantity
    And I enter a negative quantity in the input field
    And I click on 'ADD TO CART'
    Then the product is not added to the cart
    And an error message or warning is displayed

  @known_issue
  Scenario: Incorrect Number of Products in Cart
    Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    When I add 4 items of "Brocolli - 1 Kg" to the cart but insert only 3
    Then the actual number of products in the cart should be 3
    But it results in an incorrect number of products in the cart
