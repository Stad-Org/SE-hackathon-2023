
describe('As a user I want to create and complete the order for the products I have in the cart',  () => {
    beforeEach( () => {
      // Visit the website before each test
      cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
    });

    
    it('should place an order',  () => {
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

            // Find the product with product.name and add it to cart 
            cy.contains('.product .product-name', product.name)
                .parents('.product')
                .find('.product-action button')
                .contains('ADD TO CART')
                .click();


            // Click on the cart icon to go to the cart page
            cy.get('.cart-icon').click();

            // Validate that products are added to the cart
            cy.get('ul li').first().find('.product-name').should('contain', product.name);
            cy.get('ul li').first().find('.product-price').should('contain', product.price);
            
            // Get the price and quantity values
            cy.get('.cart-preview .product-name')
            .siblings('.product-price')
            .invoke('text')
            .then((priceText) => {
            const price = parseFloat(priceText.replace('₹', '')); // Assuming the price is in the format '₹x.xx'

            cy.get('.cart-preview .product-total .quantity')            
                .invoke('text')
                .then((quantityText) => {
                    const quantity = parseInt(quantityText, 10);

                    // Calculate the expected total amount
                    const expectedTotalAmount = price * quantity;

                    // Retrieve the actual total amount from the cart
                    cy.get('.cart-preview .product-total .amount')
                        .invoke('text')
                        .then((actualTotalAmountText) => {
                            const actualTotalAmount = parseFloat(actualTotalAmountText.replace('₹', '')); // Assuming the total amount is in the format '₹x.xx'

                            // Compare the expected and actual total amounts
                            expect(actualTotalAmount).to.equal(expectedTotalAmount);

                            // Optionally, you can log or perform additional actions based on the comparison result
                            cy.log(`Expected Total Amount: ₹${expectedTotalAmount}`);
                            cy.log(`Actual Total Amount: ₹${actualTotalAmount}`);

                            cy.contains('PROCEED TO CHECKOUT').click();

                                
                            cy.contains('Place Order').click();
                            cy.get('select').select('Greece');
                            cy.get('[type="checkbox"]').check() 
                            cy.contains('Proceed').click();
                            
                            cy.wait(6000); // Adding a wait to allow time for the suggestion to appear

                            cy.url().should('eq', 'https://rahulshettyacademy.com/seleniumPractise/#/')

                    });
                });
            });
        });
    })
}) 