const gf = require("./global-functions.js");

describe("Empty Order Test", () => {
	beforeEach(() => {
		// Visit the website before each test
		cy.visit("https://rahulshettyacademy.com/seleniumPractise#/");
	});

	it("should add check the spelling of quantity in checkout", () => {
		cy.fixture("products").then((products) => {
			// Take only the first product from the JSON array
			const product = products[0];
			gf.addProductToCart(product);

			gf.validateProductInCart(product.name, product.price);

			cy.contains("PROCEED TO CHECKOUT").click();

			const expectedText = "Quantity";
			cy.get("table td")
				.eq(2)
				.should(($element) => {
					const actualText = $element.text();
					expect(actualText).to.equal(expectedText);
				});
		});
	});
});
