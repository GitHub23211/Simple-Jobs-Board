
var assert = chai.assert;


describe("Level 1", () => {

    it("L1e There is a <nav> menu on every page with links to other pages", () => {
        
        cy.visit('http://localhost:8083/')
        cy.get('nav').within(() => {
            cy.get('a').contains('Home').as('link')

            cy.get('@link')
            .should('have.prop', 'href')
            .and('include', '/#')

            cy.get('@link').parent()
            .should('have.prop', 'class')
            .and('equals', 'selected')
        })

        cy.visit('http://localhost:8083/#!/about')
        cy.get('nav').within(() => {
            cy.get('a').contains('About Us').as('link')

            cy.get('@link')
            .should('have.prop', 'href')
            .and('include', '/#!/about')

            cy.get('@link').parent()
            .should('have.prop', 'class')
            .and('equals', 'selected')
        })

        cy.visit('http://localhost:8083/#!/help')
        cy.get('nav').within(() => {
            cy.get('a').contains('Applicant Help').as('link')

            cy.get('@link')
            .should('have.prop', 'href')
            .and('include', '/#!/help')

            cy.get('@link').parent()
            .should('have.prop', 'class')
            .and('equals', 'selected')
        })
    })
    

});