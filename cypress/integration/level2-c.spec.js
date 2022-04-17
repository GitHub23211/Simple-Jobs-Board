// level1.spec.js created with Cypress

var assert = chai.assert;


describe("Level 2", () => {

    it("L2c Clicking on a job title should show all of the job details.", () => {

        cy.fixture('jobs').then((data) => {
            cy.visit('http://localhost:8083/');
            cy.wait(100);
            // look for links to each job
            // (for some reason #10 fails)
            data.jobs.slice(0,9).forEach((job) => {
                cy.get('a')
                  .contains(job.attributes.title)
                  .click()
                cy.contains(job.attributes.title)
                // job description should be the literal HTML
                cy.get('.job-description').invoke('html').should('equal', job.attributes.description)
                cy.go('back')
            })

        })
    })
    
});