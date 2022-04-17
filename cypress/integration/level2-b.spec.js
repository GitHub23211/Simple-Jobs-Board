
var assert = chai.assert;


describe("Level 2", () => {

 
    it("L2b The title of each job should be a hyperlink to '/#!/jobs/ID", () => {


        cy.fixture('jobs').then((data) => {

            cy.visit('http://localhost:8083/');
            cy.wait(100);

            // look for links to each job 
            data.jobs.slice(0,10).forEach((job) => {
                cy.get('a')
                .contains(job.attributes.title)
                .should('have.prop', 'href')
                .and('include', '/#!/jobs/' + job.id)
            })
        })
    })
    
});