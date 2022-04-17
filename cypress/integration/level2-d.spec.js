// level1.spec.js created with Cypress

var assert = chai.assert;


describe("Level 2", () => {

    it("L2d The job page should have a link back to the home page", () => {

        cy.fixture('jobs').then((data) => {

            cy.visit('http://localhost:8083/');
            cy.wait(100);
            const job = data.jobs[0]
            cy.get('a')
                .contains(job.attributes.title)
                .click()
            cy.get('a')
            .should('have.prop', 'href')
            .and('include', '/#')
            
        })
    })
    
});