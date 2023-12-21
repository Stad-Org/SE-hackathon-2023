describe('Test Case TC401 - Navigate to Top Deals', () => {

    beforeEach(function () {
        // Visit the website before each test
        cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
      });
      
    it('should navigate to Top Deals and verify the table with discounts', () => {
        // Step 1: Visit the Home page
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.url().should('include', '/seleniumPractise/#/');

        // Checking if the home page is visible
        cy.get('.brand').should('have.text', 'GREENKART');

        // Step 2: Click on the "Top Deals" link. Ensure it is not opened in a new tab
        cy.get('a').contains('Top Deals').invoke('removeAttr','target').click();
        cy.url().should('include', '/offers');

        // Checking if the deals table is visible
        cy.get('table').should('be.visible');
        cy.get('tr th').should('contain', 'Veg/fruit name');
        cy.get('tr th').should('contain', 'Price');
        cy.get('tr th').should('contain', 'Discount price');
    });

});
