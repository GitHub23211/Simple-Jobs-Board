
var assert = chai.assert;


describe("Level 1", () => {
 
    it("L1a Has a title Bob's Jobs", () => {
        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.contains("Bob's Jobs", { matchCase: false });
    })

});