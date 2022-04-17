
var assert = chai.assert;


describe("Level 1", () => {

    it("L1b Your pages link to a CSS Stylesheet", () => {

        cy.visit('http://localhost:8083/')
        cy.get("link[rel='stylesheet']")
    })   

});