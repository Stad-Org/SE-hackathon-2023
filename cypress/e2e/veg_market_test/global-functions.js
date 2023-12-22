
function addProductToCart(product , quantity = 1) { 
	// Type the product name in the search field
	cy.get('.search-keyword').type(product.name);

	// Every search here should yield only one result
	cy.get('.products .product').its('length').should('eq', 1);

	// Check that product has correct name and price
	cy.get('.products .product').first().find('.product-name').should('contain', product.name);
	cy.get('.products .product').first().find('.product-price').should('contain', product.price);

	// Write the quantity wanted
	cy.get('.stepper-input .quantity').clear().type(quantity);

	// Find the product with product.name and add it to cart
	cy.contains('.product .product-name', product.name)
		.parents('.product')
		.find('.product-action button')
		.contains('ADD TO CART')
		.click();
};

function validateProductInCart(productName, productPrice) {
	// Click on the cart icon to go to the cart page
	cy.get(".cart-icon").click();

	// Validate that products are added to the cart
	cy.get("ul li").first().find(".product-name").should("contain", productName);
	cy.get("ul li")
		.first()
		.find(".product-price")
		.should("contain", productPrice);
}

function validateTotalAmount(expectedTotalAmount) {
	cy.get(".cart-preview .product-name")
		.siblings(".product-price")
		.invoke("text")
		.then((priceText) => {
			const price = parseFloat(priceText.replace("₹", ""));

			cy.get(".cart-preview .product-total .quantity")
				.invoke("text")
				.then((quantityText) => {
					const quantity = parseInt(quantityText, 10);

					// Calculate the expected total amount
					const actualTotalAmount = price * quantity;

					// Compare the expected and actual total amounts
					expect(actualTotalAmount).to.equal(expectedTotalAmount);
				});
		});
}

function validateCheckoutPage(
	productName,
	quantity,
	productPrice,
	actualTotalAmount
) {
	cy.contains("PROCEED TO CHECKOUT").click();

	cy.get(".products table .product-name").should("contain", productName);
	cy.get(".products table .quantity").should("contain", quantity);
	cy.get(".products table .amount").first().should("contain", productPrice);
	cy.get(".products table .amount").last().should("contain", actualTotalAmount);
}

function completeOrder() {
	cy.contains("Place Order").click();
	cy.get("select").select("Greece");
	cy.get('[type="checkbox"]').check();
	cy.contains("Proceed").click();

	cy.wait(6000); // Adding a wait to allow time for the suggestion to appear

	cy.url().should("eq", "https://rahulshettyacademy.com/seleniumPractise/#/");
}

module.exports = {
	addProductToCart,
	validateProductInCart,
	validateTotalAmount,
	validateCheckoutPage,
	completeOrder,
};
