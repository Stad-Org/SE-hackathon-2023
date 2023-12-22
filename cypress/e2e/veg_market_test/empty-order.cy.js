describe("Empty Order Test", () => {
	beforeEach(() => {
		// Visit the website before each test
		cy.visit("https://rahulshettyacademy.com/seleniumPractise#/");
	});

	it("should create an empty order", () => {
		// Step 1: Navigate to the checkout page
		cy.get(".cart-icon").click();

		cy.contains("PROCEED TO CHECKOUT").should("be.disabled");
		cy.contains("PROCEED TO CHECKOUT").click();

		// Step 2: Verify that the checkout page is displayed
		cy.url().should("include", "/cart");

		// Step 3: Click on 'Place Order' on the checkout page

		cy.contains("Place Order").click();

		// Step 4: Check the checkbox and click on 'Proceed'
		cy.get('[type="checkbox"]').check();
		cy.contains("Proceed").click();

		cy.wait(6000);

		// Step 6: Verify redirection to the home page
		cy.url().should("eq", "https://rahulshettyacademy.com/seleniumPractise/#/");
	});
});
