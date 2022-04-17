
var assert = chai.assert;


describe("Level 1", () => {

    it("L1c The home page has a link to About Us", () => {

        cy.visit('http://localhost:8083/');
        cy.wait(100);

        cy.get('a')
        .contains('About Us')
        .should('have.prop', 'href')
        .and('include', '/#!/about')
        .then(href => {
            cy.visit(href)
            cy.contains("Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!")
        })
    
    })


});