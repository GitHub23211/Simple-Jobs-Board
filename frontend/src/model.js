/*  Joshua Santos
    45203083
    model.js
    Object that deals with getting and posting data to the Strapi database
    as well as dispatching events to let the controller know if it needs
    to change the information displayed on screen
*/

export {Model}

const Model = {

    jobsResource: `http://localhost:1337/api/jobs?populate=*&sort[0]=publishedAt:desc&pagination[pageSize]=10`,

    event: new CustomEvent("modelUpdated"),

    jobs: [],

    searchResults: {
        results: [],
        searchTerm: ""
    },

    foundData: {},

    appliedJobs: {},

    fetchData: function() {
        fetch(this.jobsResource)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.jobs = data.data
                window.dispatchEvent(this.event)
            }
        )
    },

    //Manually changes the hash URL
    changeHash: function(path, id) {
        window.location.hash = path + id
        window.dispatchEvent(this.event)
    },

    //Searches Strapi database for jobs containing searchTerm in their description (case-insensitive)
    //and stores the results and searchTerm in a searchResults object.
    //Dispatches a searchedJobs event after.
    searchEntries: function(searchTerm) {
        fetch(`http://localhost:1337/api/jobs?filters[description][$containsi]=${searchTerm}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.searchResults.results = data.data
                this.searchResults.searchTerm = searchTerm
                window.dispatchEvent(new CustomEvent("searchedJobs"))
            }
        )
    },

    //Posts the users job application to the Strapi database
    postApplication: function(appInfo, JWT) {
        fetch('http://localhost:1337/api/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${JWT}`
            },
            body: JSON.stringify({data:appInfo})
        })
    },

    //Fetches a detailed view of a job/company that matches the given id from the Strapi database
    //data parameter is used to identify whether we are accessing the "jobs" or "companies" collection
    //event parameter is used to decide what event it will dispatch to the controller
    fetchIndividual: function(data, id, event) {
        fetch(`http://localhost:1337/api/${data}?populate=*&filters[id][$eq]=${id}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.foundData = data
                window.dispatchEvent(new CustomEvent(event))
            }
        )
    },

    //Fetches all job applications that contain the user's name in the user data field
    fetchAppliedJobs: function(user) {
        fetch(`http://localhost:1337/api/job-applications?populate=*&filters[user][username][$eq]=${user}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.appliedJobs = data.data
                window.dispatchEvent(new CustomEvent("appliedJobsFetched"))
            }
        )
    }
}