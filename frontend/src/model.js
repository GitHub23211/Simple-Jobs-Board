export {model}

const model = {

    jobsInfo: './sample-data.json',

    data: {
        jobs: []
    },

    loadJobs: function() {
        fetch(this.jobsInfo)
        .then( 
            (response) => {
            return response.json()
        })
        .then(
            (data) => {
                this.data.jobs = data;
                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event)
            }
        )
    }
}