describe('Search for Products', function () {
    beforeEach(function () {
      // Visit the website before each test
      cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
    });
  
    it('should display the selected products in the search results screen', function () {
      // Load the products fixture
      cy.fixture('products').then((products) => {
        // Take a product from the JSON array
        const product = products[0];
  
        // Type the product name in the search field
        cy.get('.search-keyword').type(product.name);
  
        // Verify that search results contain the expected product
        cy.get('.products .product').should('have.length.greaterThan', 0);
        cy.get('.products .product .product-name').should('contain', product.name);
    
      });
    });

    it('should not display results for multiple search keywords', function () {
        // Load the products fixture
        cy.fixture('products').then((products) => {
            // Take two products with different names from the JSON array
            const product1 = products[0];
            const product2 = products[1];

            // Type the product names in the search field
            const combinedKeywords = `${product1.name} ${product2.name}`;
            cy.get('.search-keyword').type(combinedKeywords);

            // Verify that no search results are displayed
            cy.get('.products .product').should('not.exist');

        });
        });


    it('should display all products that have the combination of letters typed', function () {
    // Load the products fixture
    cy.fixture('products').then((products) => {
        // Take a product from the JSON array
        const product = products[0];

        // Extract a substring of the product name to search for
        const searchSubstring = product.name.substring(0, 3);

        // Type the substring in the search field
        cy.get('.search-keyword').type(searchSubstring);

        // Get expected results
        const expectedResults = products.filter((product) => {
        return product.name.includes(searchSubstring);
        });


        // Verify that search results contain all products with the search substring
        cy.get('.products .product').should('have.length', expectedResults.length);
        cy.get('.products .product .product-name').each(($el) => {
        cy.wrap($el.text()).should('contain', searchSubstring);
        });
    });
    });

    
  });