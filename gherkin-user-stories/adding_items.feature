Scenario: Adding 4 Items of Broccoli to Cart but inserting 3
  Given the website is loaded successfully at "https://rahulshettyacademy.com/seleniumPractise#/"
  When I type "Brocolli - 1 Kg" in the search field
  And I clear the input field for quantity
  And I enter "2" in the input field
  And I click on 'ADD TO CART' twice
  And I click on the cart icon
  Then the cart preview is displayed
  But the total price in the cart should reflect the correct calculation
