// US1: Add Products in the Cart  




describe('Add the First Product to Cart', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });


  it('should add the first product to the cart', function () {
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

      // Add more assertions based on your specific implementation for total amount calculation
      // For example, use the product price from the fixture
      cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', product.price); // Check if the cart amount is correct

      // Check if the "PROCEED TO CHECKOUT" button is enabled
      cy.get('.cart-preview button').should('not.be.disabled');
    });
  });


});




describe('Add the Product to Cart with \"worong\" quantity', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });


  it('should add the first product to the cart', function () {
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
      // cy.get('.stepper-input > .quantity').type("-1");
      // cy.get('.quantity').type('YourTextHere');
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

