
var assert = chai.assert;


describe("Level 1", () => {

    it("L1-6 The home page has a link to Applicant Help", () => {
        
        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.get('a')
        .contains('Applicant Help')
        .should('have.prop', 'href')
        .and('include', '/#!/help')
        .then(href => {
            cy.visit(href)
            cy.contains("Be sure to he honest in your application!")
        })
    })

});