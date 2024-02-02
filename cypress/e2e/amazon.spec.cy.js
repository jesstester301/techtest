describe('technical test', () => {
    it('navigate to amazon.com and search iPhone 15 Pro', () => {
        cy.visit('https://www.amazon.com')
        cy.get('#twotabsearchtextbox', {timeout:6000}).type('iPhone 15 Pro{enter}')
        cy.get('.a-color-state').should('contain', '"iPhone 15 Pro"')

    // Define array to store product details
    const products = []

    // Extract product link, name, and price
    cy.xpath("//span[@data-component-type='s-search-results']/div/div[@data-component-type='s-search-result']")
    .should('exist')
    .each(($product) => {
        const titleValue = $product.find('div.s-title-instructions-style span.a-text-normal').text().trim()
        const hrefValue = $product.find('a').attr('href')
        const priceValue = $product.find('span.a-price span.a-offscreen').text().trim()

        // Push the values as an object into the products array
        if (titleValue && titleValue.toLowerCase().includes('iphone 15 pro')) {
            products.push({
                website: "Amazon",
                title: titleValue,
                price: priceValue,
                href: hrefValue
            })
        }
    })
    .then(() => {

        products.sort((a, b) => parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', '')));

        // Print the array of products to the Cypress Test Runner console
        cy.log('Products:')
        products.forEach((product, index) => {
            cy.log(`Product ${index + 1}: Website: ${product.website}, Title: ${product.title}, Price: ${product.price}, Link: ${product.href}`)
        })
    })
    })
})