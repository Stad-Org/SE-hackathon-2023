Scenario1: Successfully Applying a Promo Code
    Given that the website has loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    And I have added all the items to my cart
    And I click on the "PROCEED TO CHECKOUT" button
    When I enter a promo code into the 'Enter Promo Code' field
    And the promo code is a valid code
    Then I should see a "Code applied ..!" message 
    And I should see that the discount is applied to the total amount
    And the 'Total After Discount' message should reflect the applied changes

Scenario2: Unsuccesfully Applying a Promo code
    Given that the website has loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
    And I have added all the items to my cart
    And I click on the "PROCEED TO CHECKOUT" button
    When I enter a promo code into the 'Enter Promo Code' field
    But the Promo Code I added is not a valid one 
    Then I should see a "Invalid code ..!" message
    And I should not see a discount applied to the total amount
    And the 'Total After Discount' message should be the same as the "Total Amount" message
