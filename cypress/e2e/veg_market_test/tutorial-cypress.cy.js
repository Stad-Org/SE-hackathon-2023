describe('My First Test', () => {
    it('Clicks the link type', () => {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()

        // Should be on a new URL which
        // includes '/commands/actions'
        cy.url().should('include', '/commands/actions')

        cy.get('.action-email').type('fake@mail.com')

        cy.get('.action-email').should('have.value', 'fake@mail.com')

    })
  })