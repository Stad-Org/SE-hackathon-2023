const gf = require("./global-functions.js");

describe("As a user I want to create and complete the order for the products I have in the cart", () => {
	beforeEach(() => {
		// Visit the website before each test
		cy.visit("https://rahulshettyacademy.com/seleniumPractise#/");
	});

	it("should place an order", () => {
		// Load the products fixture
		cy.fixture("products").then((products) => {
			// Take only the first product from the JSON array
			const product = products[0];

			// Step 1: Add product to cart
			gf.addProductToCart(product);

			// Step 2: Validate product in the cart
			gf.validateProductInCart(product.name, product.price);

			// Step 3: Validate total amount
			gf.validateTotalAmount(product.price * 1); // Assuming quantity is 1

			// Step 4: Validate checkout page
			gf.validateCheckoutPage(
				product.name,
				1,
				product.price,
				product.price * 1
			);

			// Step 5: Complete the order
			gf.completeOrder();
		});
	});
});
