// level1.spec.js created with Cypress

var assert = chai.assert;


describe("Level 2", () => { 

    it("L2e The company name on a job page is a link to show the company details", () => {

        cy.fixture('jobs').then((data) => {
            const job = data.jobs[Math.floor(Math.random()*data.jobs.length)]
            cy.visit('http://localhost:8083/#!/jobs/' + job.id )
            cy.wait(100)
            cy.get('a')
            .contains(job.attributes.company.data.attributes.name)
            .should('have.prop', 'href')
            .and('include', '/#!/companies/' + job.attributes.company.data.id)
        })
    })    
    
});