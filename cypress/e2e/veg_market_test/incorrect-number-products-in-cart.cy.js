describe('Adding 4 Items of Broccoli to Cart but inserting 3', () => {
    beforeEach(() => {
      // Visit the website before each test
      cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
    });
  
    it('should add Brocolli - 1 Kg with negative quantity to the cart', () => {
      // Product name to search for (replace with the actual name if it's different)
      const productName = 'Brocolli - 1 Kg';
      let NumberOfProducts = 0 ; 
      let orderNumbOfProducts =   0 ; 
      
  
      // Type the product name in the search field
      cy.get('.search-keyword').type(productName);
  
      // Every search here should yield only one result
      cy.get('.products .product').its('length').should('eq', 1);
  
      // Check that product has correct name and price
      cy.get('.products .product').first().find('.product-name').should('contain', productName);

  
      // Find the product with product.name and add it to cart with negative quantity
      cy.get('.products .product').first().get('input[type=number]').clear() // Clear the input field
      .type(2);
        
  
      for(let i = 0  ; i < 2 ; i++) { 

        cy.get('.products .product').first().get('input[type=number]').invoke('val').then((value) => {        
            NumberOfProducts += parseInt(value, 10);
    

          cy.log(`Number of Products: ${NumberOfProducts}`);
        });
        cy.contains('.product .product-name', productName)
        .parents('.product')
        .find('.product-action button')
        .contains('ADD TO CART')
        .click();
       }

        // Click on the cart icon to go to the cart page
        cy.get('.cart-icon').click();

        // Get the product name, price, and quantity
        cy.get('.cart-preview .product-name')
        .invoke('text')
        .then((productName) => {
            // Get the product price
            cy.get('.cart-preview .product-price')
            .invoke('text')
            .then((priceText) => {
                const price = parseFloat(priceText.replace('₹', ''));

                // Get the product quantity
                cy.get('.cart-preview .product-total .quantity')
                .invoke('text')
                .then((quantityText) => {
                    orderNumbOfProducts = parseInt(quantityText, 10);
                    cy.log('the number of products i wanted to order are ' , NumberOfProducts)
                    cy.log('The number of products i ordered are' , orderNumbOfProducts)
                });
            });
        }); 
    });
});  