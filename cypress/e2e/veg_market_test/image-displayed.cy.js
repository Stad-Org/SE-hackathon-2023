import { getRandomInt } from "../../support/utils.js";

describe("Image Display Test", () => {
	beforeEach(() => {
		// Visit the website before each test
		cy.visit("https://rahulshettyacademy.com/seleniumPractise#/");
	});

	it("should check if an image is displayed", () => {
		// Assuming the image has a specific selector, adjust it accordingly

		cy.fixture("products").then((products) => {
			const product = products[getRandomInt(1, products.length)];
			cy.get(".search-keyword").type(product.name);

			// Every search here should yield only one result
			cy.get(".products .product").its("length").should("eq", 1);

			cy.get(".products .product").first().find(".product-image").click();

			// // Optionally, you can click on the image and make further assertions
			// cy.get('img#your-image-id-or-class').click();

			// // Wait for the modal or expanded view to be visible
			cy.get(".modal-wrapper .modal").should("be.visible");
		});
	});
});
