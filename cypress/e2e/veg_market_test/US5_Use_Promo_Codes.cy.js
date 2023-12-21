describe('Use a promo code', () => {
  beforeEach( () => {
    // Go to page
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

    // Add an item to the basket
    cy.get('.product-action button').first().click();
    cy.get('.cart-icon').first().click();
    cy.get('.action-block').first().click();
  });

  it('should add a 10% discount', { defaultCommandTimeout: 10000 }, () => {
    // Enter the valid promo code
    cy.get('.promoWrapper input').first().type('rahulshettyacademy');
    cy.get('.promoBtn').first().click();

    // Wait to load
    cy.get('.promoBtn > .promo-btn-loader').should('not.exist');

    // Validate discount
    cy.get('.discountPerc').first().should('have.text', '10%');
  });

  it('should not add the 10% discount', { defaultCommandTimeout: 10000 }, () => {
    // Enter an invalid promo code
    cy.get('.promoWrapper input').first().type('1111111');
    cy.get('.promoBtn').first().click();

    // Wait to load
    cy.get('.promoBtn > .promo-btn-loader').should('not.exist');

    // Validate discount
    cy.get('.discountPerc').first().should('have.text', '0%');
  });
});
