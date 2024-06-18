describe('CHECKOUT', () => {

    let userId

    before(() => {
        cy.fixture('user').then((user) => {
            userId = user.id
        })
    })

    beforeEach(() => {
        cy.login()
        cy.visit('/checkout')
    })

    it('Select address from list', () => {
        
        cy.getSelector('submit-checkout').should('be.disabled')

        cy.getSelector('select-address').first().check({ force: true })

        cy.getSelector('submit-checkout').should('not.be.disabled')
    })

    it('Display checkout confirmation', () => {

        cy.getSelector('select-address').first().check({ force: true })

        cy.getSelector('submit-checkout').click({ force: true })

        cy.getSelector('checkout-message').should('exist')
    })

    it('Generate pending order', () => {

        cy.intercept('POST', '/api/basket/*').as('checkout')

        cy.getSelector('select-address').eq(1).check({ force: true })

        cy.getSelector('submit-checkout').click({ force: true })

        cy.wait('@checkout').then(({ response: { body } }) => {

            expect(body).to.have.property('checkoutId')

            cy.visit('/account')

            cy.getSelector('tab-orders').click()

            cy.getSelectorById(body.checkoutId).should('exist')
        })
    })
})