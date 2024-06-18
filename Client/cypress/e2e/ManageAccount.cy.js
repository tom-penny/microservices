describe('MANAGE ADDRESSES', () => {

    let userId
    const address = {
        "firstName": "firstName",
        "lastName": "lastName",
        "street": "street",
        "city": "city",
        "region": "region",
        "country": "country",
        "zip": "zip"
    }

    before(() => {
        cy.fixture('user').then((user) => {
            userId = user.id
        })
    })

    beforeEach(() => {
        cy.login()
        cy.visit('/account')
    })

    it('Display list of addresses', () => {

        cy.getSelector('address-card').should('have.length.greaterThan', 0)
    })

    it('Create a new address', () => {
        
        cy.intercept('POST', '/api/users/*/addresses').as('createAddress')

        cy.getSelector('input-first').type(address.firstName)
        cy.getSelector('input-last').type(address.lastName)
        cy.getSelector('input-street').type(address.street)
        cy.getSelector('input-city').type(address.city)
        cy.getSelector('input-region').type(address.region)
        cy.getSelector('input-country').type(address.country)
        cy.getSelector('input-zip').type(address.zip)

        cy.getSelector('submit-address').click()

        cy.wait('@createAddress').then(({ response: { body } }) => {

            expect(body).to.have.property('address')
            expect(body.address).to.have.property('id')

            cy.getSelectorById(body.address.id).should('exist')

            cy.request('DELETE', `/api/users/${userId}/addresses/${body.address.id}`)
        })
    })

    it('Delete an existing address', () => {

        cy.request('POST', `/api/users/${userId}/addresses`, { address }).then(({ body }) => {

            expect(body).to.have.property('address')
            expect(body.address).to.have.property('id')

            cy.getSelectorById(body.address.id).within(() => {
                
                cy.getSelector('delete-address').click()
            })

            cy.getSelectorById(body.address.id).should('not.exist')
        })
    })
})

describe('MANAGE ORDERS', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/account')
        cy.getSelector('tab-orders').click()
    })

    it('Display list of orders', () => {

        cy.getSelector('order-row').should('have.length.greaterThan', 0)
    })

    it('Generate return request', () => {

        cy.getSelector('order-row').first().click().within(() => {
            cy.getSelector('submit-return').first().click({ force: true })
        })
    })
})