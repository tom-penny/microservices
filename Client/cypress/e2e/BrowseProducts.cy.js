describe('BROWSE PRODUCTS', () => {

    it('Display list of products', () => {

        cy.visit('/catalogue')

        cy.getSelector('product-card').should('have.length.greaterThan', 0)
    })

    it('Navigate to product page', () => {

        cy.visit('/catalogue')

        cy.getSelector('product-card').first().then(($productCard) => {

            const productId = $productCard.attr('data-testid')

            cy.get($productCard).click()

            cy.url().should('include', productId)
        })
    })

    it('Navigate to category page', () => {

        cy.visit('/')

        cy.getSelector('open-menu').click()
        cy.getSelector('open-dropdown').click()

        cy.getSelector('link-category').first().then(($linkCategory) => {

            const categoryName = $linkCategory.attr('data-testid')

            cy.get($linkCategory).click()

            cy.url().should('include', categoryName)
        })
    })
})

describe('FILTER PRODUCTS', () => {

    it('Sort products by name', () => {

        cy.visit('/catalogue')

        let names = []

        cy.getSelector('field-name').each(($name) => {

            names.push($name.text())
        })
        .then(() => {

            let sortedNames = [...names].sort()
            expect(names).to.deep.equal(sortedNames)
        })
    })

    it('Sort products by price', () => {

        cy.visit('/catalogue')

        cy.intercept('*sort=price*', req => {
            delete req.headers['if-none-match']
        }).as('getProducts')

        cy.getSelector('select-sort').select('price', { force: true })

        cy.wait('@getProducts').then(({ response }) => {
            
            let prices = []

            const { products } = response.body

            for (let i = 0; i < products.length; i++) {
                prices.push(products[i].price)
            }

            let sortedPrices = [...prices].sort()
            expect(prices).to.deep.equal(sortedPrices)
        })
    })

    it('Sort products by date', () => {

        cy.visit('/catalogue')

        cy.intercept('*sort=created*', req => {
            delete req.headers['if-none-match']
        }).as('getProducts')

        cy.getSelector('select-sort').select('created', { force: true })

        cy.wait('@getProducts').then(({ response }) => {
            
            let dates = []

            const { products } = response.body

            for (let i = 0; i < products.length; i++) {
                dates.push(new Date(products[i].created))
            }

            let sortedDates = [...dates].sort()
            expect(dates).to.deep.equal(sortedDates)
        })
    })

    it('List products in ascending order', () => {

        cy.visit('/catalogue')

        let names = []

        cy.getSelector('field-name').each(($name) => {

            names.push($name.text())
        })
        .then(() => {

            let sortedNames = [...names].sort()
            expect(names).to.deep.equal(sortedNames)
        })
    })

    it('List products in descending order', () => {

        cy.visit('/catalogue')

        cy.intercept('*order=desc*', req => {
            delete req.headers['if-none-match']
        }).as('getProducts')

        cy.getSelector('select-order').select('desc', { force: true })

        cy.wait('@getProducts').then(({ response }) => {
            
            let names = []

            const { products } = response.body

            for (let i = 0; i < products.length; i++) {
                names.push(products[i].name)
            }

            let sortedNames = [...names].sort().reverse()
            expect(names).to.deep.equal(sortedNames)
        })
    })

    it('Filter products by category', () => {
        
        cy.visit('/')

        cy.intercept('/api/products/category/*').as('getProducts')

        cy.getSelector('open-menu').click()
        cy.getSelector('open-dropdown').click()

        cy.getSelector('link-category').first().then(($linkCategory) => {

            const categoryName = $linkCategory.attr('data-testid')

            cy.get($linkCategory).click()

            cy.wait('@getProducts').then(({ response }) => {

                const { products } = response.body

                for (const { categories } of products) {

                    expect(categories.some(c => c.name === categoryName)).to.be.true
                }
            })
        })
    })


    it('Filter products by search term', () => {

        cy.visit('/catalogue')

        cy.getSelector('input-search').type('tab')

        cy.getSelector('field-name').each(($name) => {

            expect($name.text().toLowerCase()).to.include('tab')
        })
    })
})

describe('VIEW PRODUCT', () => {

    it('Add product to basket', () => {

        cy.visit('/catalogue')

        cy.getSelector('product-card').first().click()

        cy.getSelector('basket-quantity').invoke('text').then(text => {
            const quantity = parseInt(text)

            cy.getSelector('add-product').click()
            
            cy.getSelector('basket-quantity').should('have.text', (quantity + 1).toString())
        })
    })
})