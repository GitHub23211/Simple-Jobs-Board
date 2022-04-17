// level1.spec.js created with Cypress

var assert = chai.assert;


describe("Level 2", () => {

    it("L2g Accessing an unknown URL shows a message including Page Not Found", () => {
        
        // make a random string that will be an unknown fragment
        const fragment = Math.random().toString().substring(2, 8)
        cy.visit('http://localhost:8083/#!/' + fragment)
        cy.contains('Page Not Found', {matchCase: false})

    })
    
});