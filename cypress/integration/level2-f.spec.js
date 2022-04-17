// level1.spec.js created with Cypress

var assert = chai.assert;


describe("Level 2", () => {

    it("L2f The company page shows a list of all jobs advertised by that company", () => {
        
        cy.fixture('jobs').then((data) => {
            const job = data.jobs[Math.floor(Math.random()*data.jobs.length)]
            const company = job.attributes.company.data
            cy.visit('http://localhost:8083/#!/companies/' + company.id )
            cy.wait(100)

            const companyJobs = data.jobs.filter((job) => {
                return (job.attributes.company.data.id === company.id)
            })
            cy.get(".job").should('have.length', companyJobs.length)
            companyJobs.forEach((jj) => {
                cy.contains(jj.attributes.title)
                cy.contains(jj.attributes.type)
                cy.contains(jj.attributes.location)
            })
        })

    })
    
});