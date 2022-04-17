

var assert = chai.assert;


describe("Level 2", () => {

    it("L2a Ten jobs shown on the main page, each in a <div class=job>", () => {

        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.fixture('jobs').then((data) => {
            cy.get(".job").should('have.length', 10)
            // should contain the first ten job titles
            data.jobs.slice(0,10).forEach((job) => {
                cy.contains(job.attributes.title)
                cy.contains(job.attributes.type)
                cy.contains(job.attributes.location)
            })
            // we should also check that the other jobs 
            // aren't here but the titles are too similar 
            // and so occur in the 10
        })
    })
    
    
});