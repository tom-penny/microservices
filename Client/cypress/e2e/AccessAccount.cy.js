describe('LOGIN', () => {

    let email
    let password

    before(() => {
        cy.fixture('user').then((user) => {
            email = user.email
            password = user.password
        })
    })

    it('Sign in with valid credentials', () => {

        cy.visit('/login')

        cy.getSelector('input-email').type(email)
        cy.getSelector('input-password').type(password)
        cy.getSelector('submit-login').click()

        cy.url().should('include', '/account')
    })

    it('Display login error messages', () => {

        cy.visit('/login')

        cy.getSelector('input-email').type(email)
        cy.getSelector('input-password').type('password')
        cy.getSelector('submit-login').click()

        cy.getSelector('error-message').should('exist')
    })
})

describe('LOGOUT', () => {
    
    it('Sign out of existing session', () => {
        
        cy.login()
        cy.visit('/account')

        cy.getCookie('token').should('exist')

        cy.getSelector('open-menu').click()
        cy.getSelector('link-logout').click({ force: true })

        cy.url('eq', Cypress.config().baseUrl)
    })
})

describe('REGISTER', () => {

    let email
    let password

    before(() => {
        cy.fixture('user').then((user) => {
            email = user.email
            password = user.password
        })
    })

    it('Sign up with valid credentials', () => {

        const userId = '11111111-1111-1111-1111-111111111111'

        cy.visit('/register')

        cy.intercept('POST', '/api/auth/register', {
            statusCode: 201,
            body: { userId }
        })
        .as('register')

        cy.getSelector('input-email').type('cypress@test.com')
        cy.getSelector('input-password').type(password)
        cy.getSelector('submit-register').click()

        cy.wait('@register').its('response.body')
            .should('have.property', 'userId', userId)
    })

    it('Display register error messages', () => {

        cy.visit('/register')

        cy.getSelector('input-email').type(email)
        cy.getSelector('input-password').type(password)
        cy.getSelector('submit-register').click()

        cy.getSelector('error-message').should('exist')
    })
})