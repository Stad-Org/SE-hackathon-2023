describe("Add Broccoli with Negative Quantity to Cart", () => {
	beforeEach(() => {
		// Visit the website before each test
		cy.visit("https://rahulshettyacademy.com/seleniumPractise#/");
	});

	it("should not add Brocolli - 1 Kg with negative quantity to the cart check: quantity", () => {
		// Product name to search for (replace with the actual name if it's different)
		const productName = "Brocolli - 1 Kg";
		const negativeQuantity = -1;

		// Type the product name in the search field
		cy.get(".search-keyword").type(productName);

		// Every search here should yield only one result
		cy.get(".products .product").its("length").should("eq", 1);

		// Check that product has correct name and price
		cy.get(".products .product")
			.first()
			.find(".product-name")
			.should("contain", productName);

		// Find the product with product.name and add it to cart with negative quantity
		cy.get(".products .product")
			.first()
			.get("input[type=number]")
			.clear() // Clear the input field
			.type(negativeQuantity);

		cy.contains(".product .product-name", productName)
			.parents(".product")
			.find(".product-action button")
			.contains("ADD TO CART")
			.click();

		cy.get(".cart-icon").click();
		//cy.get("ul li").first().find(".quantity").should("contain", productName);
		cy.get("ul li")
			.first()
			.find(".product-total .quantity")
			.invoke("text")
			.then((quantityText) => {
				const quantity = parseInt(quantityText, 10);
				expect(quantity).to.not.be.lt(0);
			});
	});

	it("should not add Brocolli - 1 Kg with negative quantity to the cart : Check price", () => {
		// Product name to search for (replace with the actual name if it's different)
		const productName = "Brocolli - 1 Kg";
		const negativeQuantity = -1;

		// Type the product name in the search field
		cy.get(".search-keyword").type(productName);

		// Every search here should yield only one result
		cy.get(".products .product").its("length").should("eq", 1);

		// Check that product has correct name and price
		cy.get(".products .product")
			.first()
			.find(".product-name")
			.should("contain", productName);

		// Find the product with product.name and add it to cart with negative quantity
		cy.get(".products .product")
			.first()
			.get("input[type=number]")
			.clear() // Clear the input field
			.type(negativeQuantity);

		cy.contains(".product .product-name", productName)
			.parents(".product")
			.find(".product-action button")
			.contains("ADD TO CART")
			.click();

		cy.get(".cart-icon").click();
		//cy.get("ul li").first().find(".quantity").should("contain", productName);
		cy.get("ul li")
			.first()
			.find(".product-total .amount")
			.invoke("text")
			.then((quantityText) => {
				const quantity = parseInt(quantityText, 10);
				expect(quantity).to.not.be.lt(0);
			});
	});
});
