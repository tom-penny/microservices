Cypress.Commands.add('getSelector', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getSelectorById', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('ignoreImages', () => {
    return cy.intercept('*/images/products/*', { statusCode: 200, body: '' })
})

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth/login',
        body: {
            email: 'test7@test.com',
            password: 'Abc123!'
        }
    })
    .then(({ body: { userId } }) => {

        cy.fixture('basket').then((basket) => {
            
            cy.request({
                method: 'PUT',
                url: `/api/basket/${userId}`,
                body: { basket }
            })
            .then((response) => {

                expect(response.status).to.eq(200)
            })
        })
    })
})
