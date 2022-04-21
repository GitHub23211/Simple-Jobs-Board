export {model}

const model = {

    jobsInfo: './sample-data.json',

    data: {
        jobs: [],
        companies: []
    },

    loadJobs: function() {
        fetch(this.jobsInfo)
        .then( 
            (response) => {
            return response.json()
        })
        .then(
            (data) => {
                this.data.jobs = data.jobs;
                this.data.companies = data.companies
                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event)
            }
        )
    }
}