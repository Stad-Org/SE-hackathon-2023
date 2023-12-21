// US1: Add Products in the Cart  

// Replace the "TODO" with something else 

// Test Case ID  TODO (give it a number)
describe('Add the First Product to Cart', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });


  it('Search and add the first product to the cart', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {
      // Take only the first product from the JSON array
      const product = products[0];

      // Type the product name in the search field
      cy.get('.search-keyword').type(product.name);

      // The search here should yield only one result
      cy.get('.products .product').its('length').should('eq', 1); 

      // Check that product has correct name and price
      cy.get('.products .product').first().find('.product-name').should('contain', product.name);
      cy.get('.products .product').first().find('.product-price').should('contain', product.price);

      // Click the "ADD TO CART" button for the first product
      cy.get('.products .product').first().contains('ADD TO CART').click();

      // Wait for the cart to be updated and then make assertions
      cy.get('.cart-info table tbody tr td strong').should('contain', '1'); // Check if the cart has 1 item

      // Use the product price from the fixture
      cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', product.price); // Check if the cart amount is correct

      // Check if the "PROCEED TO CHECKOUT" button is enabled
      cy.get('.cart-preview button').should('not.be.disabled');
    });
  });


});




// Test Case ID  TODO (give it a number)
describe('Add the first Product to Cart with 2 quantity', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });


  it('Search and add the first product with quantity 2 to the cart ', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {
      // Take only the first product from the JSON array
      const product = products[0];
      const how_many_items = 2 ; 

      // Type the product name in the search field
      cy.get('.search-keyword').type(product.name);

      // The search here should yield only one result
      cy.get('.products .product').its('length').should('eq', 1); 

      // Check that product has correct name and price
      cy.get('.products .product').first().find('.product-name').should('contain', product.name);
      cy.get('.products .product').first().find('.product-price').should('contain', product.price);

      // Write the quantity wanted
      cy.get('.stepper-input .quantity').clear().type(how_many_items);

      // Click the "ADD TO CART" button for the first product
      cy.get('.products .product').first().contains('ADD TO CART').click();

      // Wait for the cart to be updated and then make assertions
      cy.get('.cart-info table tbody tr td strong').should('contain', '1'); // Check if the cart has 1 item

      // Add more assertions based on your specific implementation for total amount calculation
      // For example, use the product price from the fixture
      cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', how_many_items * product.price); // Check if the cart amount is correct

      // Check if the "PROCEED TO CHECKOUT" button is enabled
      cy.get('.cart-preview button').should('not.be.disabled');
    });
  });


});


describe('Add the Product to Cart with \"wrong\" quantity', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });

  
  // Should not be clickable
  it('Search and add \"wrong\" quantity of each product to the cart ', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {

      const test_inputs = ["0.5", "0", "-1", "random_string", "+1E4"];

      test_inputs.forEach(how_many_items => {
        // Iterate through each product
        products.forEach((product) => {
          // Reload the page before adding each product
          cy.reload();
                    
          // Type the product name in the search field
          cy.get('.search-keyword').type(product.name);
          
          // The search here should yield only one result
          cy.get('.products .product').its('length').should('eq', 1); 
          
          // Check that product has correct name and price
          cy.get('.products .product').first().find('.product-name').should('contain', product.name);
          cy.get('.products .product').first().find('.product-price').should('contain', product.price);
          
          // Write the quantity wanted
          cy.get('.stepper-input .quantity').clear().type(how_many_items);
          
          // Check if the "ADD TO CART" button for wrong quantity of product is not clickable
          cy.get('.products .product').first().contains('ADD TO CART').should('not.be.enabled');
          
        });
      });
    });
  });
    
    
});




describe('Add every product to the cart by it self and check the price is as expected', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });
  

  it('Add every product to the cart by it self and check the price is as expected', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {
      // Iterate through each product
      products.forEach((product) => {
        // Reload the page before adding each product
        cy.reload();

        // Type the product name in the search field
        cy.get('.search-keyword').type(product.name);

        // Every search here should yield only one result
        cy.get('.products .product').its('length').should('eq', 1); 

        // Check that product has correct name and price
        cy.get('.products .product').first().find('.product-name').should('contain', product.name);
        cy.get('.products .product').first().find('.product-price').should('contain', product.price);

        // Click the "ADD TO CART" button for the first product
        cy.get('.products .product').first().contains('ADD TO CART').click();

        // Wait for the cart to be updated and then make assertions
        cy.get('.cart-info table tbody tr td strong').should('contain', '1'); // Check if the cart has 1 item

        // Use the product price from the fixture
        cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', product.price); // Check if the cart amount is correct

        // Check if the "PROCEED TO CHECKOUT" button is enabled
        cy.get('.cart-preview button').should('not.be.disabled');

        // Clear the search field for the next iteration
        cy.get('.search-keyword').clear();
      });
    });
  });
});




describe('Add all products to the cart one by one and check the price is as expected', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });
  

  it('Add all products to the cart one by one and check the price is as expected', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {
      
      var total_sum = 0 ; 
      var number_of_items_added_to_card = 0 ; 
      
      // Iterate through each product
      products.forEach((product) => {

        // Type the product name in the search field
        cy.get('.search-keyword').type(product.name);

        // Every search here should yield only one result
        cy.get('.products .product').its('length').should('eq', 1); 

        // Check that product has correct name and price
        cy.get('.products .product').first().find('.product-name').should('contain', product.name);
        cy.get('.products .product').first().find('.product-price').should('contain', product.price);

        total_sum += product.price ; 
        number_of_items_added_to_card++ ; 

        // Click the "ADD TO CART" button for the first product
        cy.get('.products .product').first().contains('ADD TO CART').click();

        // Wait for the cart to be updated and then make assertions
        cy.get('.cart-info table tbody tr td strong').should('contain', number_of_items_added_to_card); // Check if the cart has 1 item

        // Use the product price from the fixture
        cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', total_sum); // Check if the cart amount is correct

        // Check if the "PROCEED TO CHECKOUT" button is enabled
        cy.get('.cart-preview button').should('not.be.disabled');

        // Clear the search field for the next iteration
        cy.get('.search-keyword').clear();
      });
    });
  });
});

