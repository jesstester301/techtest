describe('ebay', () => {
    it('ebay', () => {
        cy.visit('https://www.ebay.com')
        cy.get('#gh-ac').type('iPhone 15 Pro')
        cy.get('#gh-btn').click()

    // Define array to store product details
    const products = []

    // Extract product link, name, and price
    cy.xpath('//div[@id="srp-river-results"]/ul/li[@class="s-item s-item__pl-on-bottom"]')
    .should('exist')
    .each(($product) => {
        const titleEbay = $product.find('.s-item__title > span').text().trim()
        const hrefEbay = $product.find('a').attr('href')
        const priceEbay = $product.find('span.s-item__price').text().trim()
        
        if(titleEbay && titleEbay.toLowerCase().includes('iphone 15 pro')){
            products.push({
                website: "eBay",
                title: titleEbay,
                price: priceEbay,
                href: hrefEbay
            })
        }
    })
    .then(() => {
        products.sort((a, b) => parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', '')));

        cy.log('Products:')
        products.forEach((product, index) => {
        cy.log(`Product ${index + 1}: Website: ${product.website}, Title: ${product.title}, Price: ${product.price}, Link: ${product.href}`)
    })
    })
    })
})