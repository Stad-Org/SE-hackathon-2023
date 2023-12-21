// describe('Test Case TC401 - Navigate to Top Deals', () => {

//     beforeEach(function () {
//         // Visit the website before each test
//         cy.visit('https://rahulshettyacademy.com/seleniumPractise#/');
//       });
      
//     it('should navigate to Top Deals and verify the table with discounts', () => {
//         // Step 1: Visit the Home page
//         cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
//         cy.url().should('include', '/seleniumPractise/#/');

//         // Checking if the home page is visible
//         cy.get('.brand').should('have.text', 'GREENKART');

//         // Step 2: Click on the "Top Deals" link. Ensure it is not opened in a new tab
//         cy.get('a').contains('Top Deals').invoke('removeAttr','target').click();
//         cy.url().should('include', '/offers');

//         // Checking if the deals table is visible
//         cy.get('table').should('be.visible');
//         cy.get('tr th').should('contain', 'Veg/fruit name');
//         cy.get('tr th').should('contain', 'Price');
//         cy.get('tr th').should('contain', 'Discount price');
//     });

// });


// describe('Test Case TC402 - Browse Top Deals', () => {
//     beforeEach(() => {
//         // Visit the Top Deals page before each test
//         cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
//     });

//     it('should browse through the Top Deals pages', () => {
//         // You can choose how many products to display per page
//         // Select all possible options

//         cy.get('#page-menu').find('option').each(($el, index, $list) => {
//             cy.wrap($el).invoke('val').then((val) => {
//                 cy.get('#page-menu').select(val);
//                 console.log(`Selected option ${val}`);
//             });

//             // Keep a record of all products in each page (dict page->list of products in the page)
//             let productCache = {};

//             // Function to get all products in the current page and verify with previous stored products
//             function storeAndVerifyProducts(productCache) {
//                 // Wait for page to be stable
//                 cy.wait(500);
//                 // Get the current page number
//                 cy.get('.pagination').find('.active').then(($activePage) => {
//                     const pageNumber = parseInt($activePage.text());
//                     // Get name, price and discount price of all products in the page
//                     cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
//                         const productName = $el.text();
//                         const productPrice = $el.next().text();
//                         const productDiscountPrice = $el.next().next().text();
//                         console.log(`Product ${index}: ${productName} - ${productPrice} - ${productDiscountPrice}`);
//                         // If product is not in cache, add it, otherwise verify that it is the same
//                         if (!(productName in productCache)) {
//                             productCache[productName] = [productPrice, productDiscountPrice];
//                         } else {
//                             expect(productCache[productName][0]).to.equal(productPrice);
//                             expect(productCache[productName][1]).to.equal(productDiscountPrice);
//                         }
//                     });
//                 });
//             }


//             // Step 1: Ensure all is visible and go to first page
//             cy.get('table').should('be.visible');
//             cy.get('tr th').should('contain', 'Veg/fruit name');
//             cy.get('tr th').should('contain', 'Price');
//             cy.get('tr th').should('contain', 'Discount price');

//             // Go to first page if not already there
//             cy.get('.pagination').get('a[aria-label="First"]').as('firstButton');
//             cy.get('@firstButton').then(($btn) => {
//                 if ($btn.attr('aria-disabled') === 'false') {
//                     cy.wrap($btn).click();
//                 }
//             });
//             storeAndVerifyProducts(productCache);

//             // Step 2: Navigate through pages using "Next" button
//             cy.get('.pagination').get('a[aria-label="Next"]').as('nextButton');
            
//             // recursive function to click the "Next" button until it is disabled
//             function clickNextButton() {
//                 cy.get('@nextButton').then($btn => {
//                     storeAndVerifyProducts(productCache);
//                     if ($btn.attr('aria-disabled') === 'false') {
//                         cy.wrap($btn).click();
//                         clickNextButton();
//                     }
//                 });
//             }
//             clickNextButton();

//             // Step 3: Navigate back using "Previous" button
//             cy.get('.pagination').get('a[aria-label="Previous"]').as('previousButton');

//             // Click the "Previous" button until it is disabled
//             function clickPreviousButton() {
//                 cy.get('@previousButton').then($btn => {
//                     storeAndVerifyProducts(productCache);
//                     if ($btn.attr('aria-disabled') === 'false') {
//                         cy.wrap($btn).click();
//                         clickPreviousButton();
//                     }
//                 });
//             }
//             clickPreviousButton();


//             // Step 4: Go to last page, if not already there
//             cy.get('.pagination').get('a[aria-label="Last"]').as('lastButton');
//             cy.get('@lastButton').then(($btn) => {
//                 if ($btn.attr('aria-disabled') === 'false') {
//                     cy.wrap($btn).click();
//                 }
//             });
//             storeAndVerifyProducts(productCache);

//             // Step 5: Go to first page
//             cy.get('.pagination').get('a[aria-label="First"]').as('firstButton');
//             cy.get('@firstButton').then(($btn) => {
//                 if ($btn.attr('aria-disabled') === 'false') {
//                     cy.wrap($btn).click();
//                 }
//             });
//             storeAndVerifyProducts(productCache);

//             // Step 6: Navigate using page number buttons
//             // Get all buttons, discarding the "Next", "Previous", "First" and "Last" buttons
//             cy.get('.pagination').find('a').not('[aria-label="Next"]').not('[aria-label="Previous"]').not('[aria-label="Last"]').not('[aria-label="First"]').as('pageButtons');

//             // Click each page button
//             cy.get('@pageButtons').each(($btn) => {
//                 storeAndVerifyProducts(productCache);
//                 cy.wrap($btn).click();
//             });
//         });
//     });
// });


describe('Test Case TC403 - Search for Top Deals', () => {

    beforeEach(() => {
        // Visit the offers page before each test
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    });

    it('should be able to search for discounts in Top Deals', () => {
        // Step 1: Ensure the deals table is visible
        cy.get('table').should('be.visible');

        function testSearch(searchString, expectedResults) {
            // Type the search string in the search field
            cy.get('#search-field').type(searchString);

            // Verify that search results contain the expected products
            cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
                const productName = $el.text();
                expect(expectedResults).to.include(productName);
            });

            // Clear the search field
            cy.get('#search-field').clear();
        }

        // Step 2: Search for a product that exists
        testSearch('Cucumber', ['No data']);
        testSearch('Mango', ['Mango']);
        testSearch('Apple', ['Apple', 'Pineapple']);

    });

});

