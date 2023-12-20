



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