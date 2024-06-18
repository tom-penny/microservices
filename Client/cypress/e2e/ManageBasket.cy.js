describe('VIEW BASKET', () => {

    let basket

    before(() => {
        cy.fixture('basket').then((obj) => {
            basket = obj
        })
    })

    it('Display list of basket items', () => {

        cy.login()
        cy.visit('/basket')

        cy.getSelector('basket-item').should('have.length', 2)
    })

    it('Display total basket value', () => {

        cy.login()
        cy.visit('/basket')

        let total = Object.values(basket).reduce((total, product) =>
            total + (product.unitPrice * product.quantity), 0)

        cy.getSelector('basket-total').should('have.text', `£${total.toFixed(2)}`)
    })
})

describe('UPDATE BASKET', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/basket')
    })

    it('Increment quantity and update subtotal', () => {

        cy.getSelector('item-quantity').first().invoke('text')
            .then(text => parseFloat(text)).as('itemQuantity')
        cy.getSelector('item-price').first().invoke('text')
            .then(text => parseFloat(text.replace('£', ''))).as('itemPrice')
        cy.getSelector('item-total').first().invoke('text')
            .then(text => parseFloat(text.replace('£', ''))).as('itemTotal')

        cy.getSelector('increment').first().click()

        cy.get('@itemQuantity').then(itemQuantity => {

            const newQuantity = itemQuantity + 1
            cy.getSelector('item-quantity').first().should('have.text', `${newQuantity}`)
        })

        cy.get('@itemTotal').then(itemTotal => {

            cy.get('@itemPrice').then(itemPrice => {

                const newTotal = (itemTotal + itemPrice).toFixed(2)
                cy.getSelector('item-total').first().should('have.text', `£${newTotal}`)
            })
        })
    })

    it('Decrement quantity and update subtotal', () => {

        cy.getSelector('item-quantity').first().invoke('text')
            .then(text => parseFloat(text)).as('itemQuantity')
        cy.getSelector('item-price').first().invoke('text')
            .then(text => parseFloat(text.replace('£', ''))).as('itemPrice')
        cy.getSelector('item-total').first().invoke('text')
            .then(text => parseFloat(text.replace('£', ''))).as('itemTotal')

        cy.getSelector('decrement').first().click()

        cy.get('@itemQuantity').then(itemQuantity => {

            const newQuantity = itemQuantity - 1
            cy.getSelector('item-quantity').first().should('have.text', `${newQuantity}`)
        })

        cy.get('@itemTotal').then(itemTotal => {

            cy.get('@itemPrice').then(itemPrice => {

                const newTotal = (itemTotal - itemPrice).toFixed(2)
                cy.getSelector('item-total').first().should('have.text', `£${newTotal}`)
            })
        })
    })
})

// describe('update basket', () => {

//     it('Increments quantity and updates subtotal', () => {

//         cy.login()
//         cy.visit('/basket')

//         cy.getSelector('basket-row').first().within(() => {
            
//             cy.getSelector('item-quantity').invoke('text')
//                 .then(text => parseFloat(text)).as('itemQuantity')
//             cy.getSelector('item-price').invoke('text')
//                 .then(text => parseFloat(text.replace('£', ''))).as('itemPrice')
//             cy.getSelector('item-total').invoke('text')
//                 .then(text => parseFloat(text.replace('£', ''))).as('itemTotal')
        
//             cy.getSelector('increment').click()

//             cy.get('@itemQuantity').then(itemQuantity => {

//                 const newQuantity = itemQuantity + 1
//                 cy.getSelector('item-quantity').should('have.text', `${newQuantity}`)
//             })

//             cy.get('@itemTotal').then(itemTotal => {

//                 cy.get('@itemPrice').then(itemPrice => {

//                     const newTotal = (itemTotal + itemPrice).toFixed(2)
//                     cy.getSelector('item-total').should('have.text', `£${newTotal}`)
//                 })
//             })
//         })
//     })

//     it('Decrements quantity and updates subtotal', () => {

//         cy.login()
//         cy.visit('/basket')

//         cy.getSelector('basket-row').first().within(() => {
            
//             cy.getSelector('item-quantity').invoke('text')
//                 .then(text => parseFloat(text)).as('itemQuantity')
//             cy.getSelector('item-price').invoke('text')
//                 .then(text => parseFloat(text.replace('£', ''))).as('itemPrice')
//             cy.getSelector('item-total').invoke('text')
//                 .then(text => parseFloat(text.replace('£', ''))).as('itemTotal')
        
//             cy.getSelector('decrement').click()

//             cy.get('@itemQuantity').then(itemQuantity => {

//                 const newQuantity = itemQuantity - 1
//                 cy.getSelector('item-quantity').should('have.text', `${newQuantity}`)
//             })

//             cy.get('@itemTotal').then(itemTotal => {

//                 cy.get('@itemPrice').then(itemPrice => {

//                     const newTotal = (itemTotal - itemPrice).toFixed(2)
//                     cy.getSelector('item-total').should('have.text', `£${newTotal}`)
//                 })
//             })
//         })
//     })
// })