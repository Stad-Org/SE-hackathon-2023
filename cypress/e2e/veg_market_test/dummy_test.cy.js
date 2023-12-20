
describe('My Test Suite', function () {
  it('Visit the website and perform some tests', function () {
    // Visit the website
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');

    // Perform tests
    // Example: Verify the title of the page
    cy.title().should('eq', 'GreenKart - veg and fruits kart');

    // Example: Perform actions like clicking on elements
    cy.get('.search-keyword').type('ca');

    // Example: Assertion after an action
    // Use a more specific selector to target the products within the products wrapper
    cy.get('.products .product').should('have.length', 4);

    // Add more tests based on your requirements
  });
});


describe('Add Products to Cart', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });

  it('should add a single product to the cart', function () {
    cy.get('.search-keyword').type('Cauliflower');
    cy.get('.products .product').first().contains('ADD TO CART').click();

    // Wait for the cart to be updated and then make assertions
    cy.get('.cart-info table tbody tr td strong').should('contain', '1');
    // Add more assertions based on your specific implementation for total amount calculation
  });
});


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

      // Every search here should yield only one result
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




describe('Add Products to Cart', function () {
  beforeEach(function () {
    // Visit the website before each test
    cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
  });
  

  it('should add every product to the cart', function () {
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

        // Add more assertions based on your specific implementation for total amount calculation
        // For example, use the product price from the fixture
        cy.get(':nth-child(2) > :nth-child(3) > strong').should('contain', product.price); // Check if the cart amount is correct

        // Check if the "PROCEED TO CHECKOUT" button is enabled
        cy.get('.cart-preview button').should('not.be.disabled');

        // Clear the search field for the next iteration
        cy.get('.search-keyword').clear();
      });
    });
  });
});



// describe('Add Products to Cart', function () {
//   beforeEach(function () {
//     // Visit the website before each test
//     cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
//   });


//   it('should add a single product to the cart', function () {
//     cy.get('.search-keyword').type('Cauliflower');
//     cy.get('.products .product').first().contains('ADD TO CART').click();

//     // Wait for the cart to be updated and then make assertions
//     cy.get('.cart-info tbody td:nth-child(2)').invoke('text').should('contain', '1');
//     // Add more assertions based on your specific implementation for total amount calculation
//   });



//   // it('should add multiple products to the cart', function () {
//   //   cy.get('.search-keyword').type('Cauliflower');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   cy.get('.search-keyword').clear().type('Carrot');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   cy.get('.search-keyword').clear().type('Capsicum');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   // Add a small delay to ensure the cart is updated before checking the content
//   //   cy.wait(1000);

//   //   // Add more assertions based on your specific implementation for multiple products
//   // });

//   // it('should add products with different quantities to the cart', function () {
//   //   cy.get('.search-keyword').type('Cauliflower');
//   //   cy.get('.products .product').first().find('.quantity').clear().invoke('removeAttr', 'disabled').type('3');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   // Add a small delay to ensure the cart is updated before checking the content
//   //   cy.wait(1000);

//   //   // Add more assertions based on your specific implementation for different quantities
//   // });

//   // it('should add products with different categories to the cart', function () {
//   //   cy.get('.search-keyword').type('Cauliflower');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   cy.get('.search-keyword').clear().type('Cashews');
//   //   cy.get('.products .product').first().contains('ADD TO CART').click();

//   //   // Add a small delay to ensure the cart is updated before checking the content
//   //   cy.wait(1000);

//   //   // Add more assertions based on your specific implementation for different categories
//   // });


// });


