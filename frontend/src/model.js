export {Model}

const Model = {

    jobsResource: `http://localhost:1337/api/jobs?populate=*`,
    compResource: `http://localhost:1337/api/companies?populate=*`,

    event: new CustomEvent("modelUpdated"),

    data: {
        jobs: [],
        companies: []
    },

    fetchData: function() {
        Promise.all(
            [
                fetch(this.jobsResource)
                .then((response) => response.json()),
                fetch(this.compResource)
                .then((response) => response.json()),
            ]
        )
        .then(
            (responses) => {
                this.data.jobs = responses[0].data
                this.data.companies = responses[1].data
                window.dispatchEvent(this.event)
            }
        )
    },

    changeHash: function(searchTerm) {
        window.location.hash = "!/search/" + searchTerm
        window.dispatchEvent(this.event)
    },

    searchEntries: function(searchTerm) {
        let foundData = []
        let index = 0;
        for(let i = 0; i < this.data.jobs.length; i++) {
            if(this.data.jobs[i].attributes.description.includes(searchTerm)) {
                foundData[index] = this.data.jobs[i]
                index++
            }
        }
        return foundData
    }
}