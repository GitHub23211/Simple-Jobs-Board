export {Model}

const Model = {

    jobsResource: `http://localhost:1337/api/jobs?populate=*`,
    compResource: `http://localhost:1337/api/companies?populate=*`,

    event: new CustomEvent("modelUpdated"),

    data: {
        jobs: [],
        companies: []
    },

    foundJob: {},

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
    },

    postApplication: function(appInfo, JWT) {
        fetch('http://localhost:1337/api/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${JWT}`
            },
            body: JSON.stringify({data:appInfo})
        })
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                console.log(data)
            }
        )
    },

    fetchJobData: function(id) {
        fetch(`http://localhost:1337/api/jobs?populate=*&filters[id][$eq]=${id}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.foundJob = data
                window.dispatchEvent(new CustomEvent("jobFetched"))
            }
        )
    }
}