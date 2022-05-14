/*  Joshua Santos
    45203083
    model.js
    Object that deals with getting and posting data to the Strapi database
    as well as dispatching events to let the controller know if it needs
    to change the information displayed on screen
*/

export {Model}

const Model = {

    event: new CustomEvent("modelUpdated"),

    firstTenJobs: [],

    searchResults: {
        searchTerm: "",
        results: []
    },

    foundData: {},

    appliedJobs: {
        user: "",
        jobs: [],
    },

    //Manually changes the hash URL
    changeHash: function(path, id) {
        if(id) {
            window.location.hash = path + id
        }
        else {
            window.location.hash = path 
        }
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
    postApplication: function(appInfo, jwt) {
        fetch('http://localhost:1337/api/job-applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${jwt}`
            },
            body: JSON.stringify({data:appInfo})
        })
    },

    //Fetches the first 10 jobs from the Strapi database
    //After sorting by the latest publishedAt date
    fetchTenJobs: function() {
        fetch(`http://localhost:1337/api/jobs?populate=*&sort[0]=publishedAt:desc&pagination[pageSize]=10`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.firstTenJobs = data.data
                window.dispatchEvent(this.event)
            }
        )
    },

    // Fetches a detailed view of a job/company that matches the given id from the Strapi database
    // Data parameter is used to identify whether we are accessing the "jobs" or "companies" collection
    // Event parameter is used to decide what event it will dispatch to the controller
    fetchDetailed: function(data, id, event) {
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

    //Fetches all job applications that contain the "user" parameter in the username data field
    fetchAppliedJobs: function(user) {
        fetch(`http://localhost:1337/api/job-applications?populate=*&filters[user][username][$eq]=${user}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.appliedJobs.user = user
                this.appliedJobs.jobs = data.data
                window.dispatchEvent(new CustomEvent("appliedJobsFetched"))
            }
        )
    },

    //Checks if a user already has a job application tied to them in the Strapi database.
    //Tries to retrieve a JSON object of this application.
    //If the data array found in this object has a length of 0 i.e. is empty,
    //Then the user has not applied for this job yet. Else, they have.
    //Dispatches the respective events based on this condition
    checkIfApplied: function(user, id) {
        const username = user.username
        fetch(`http://localhost:1337/api/job-applications?populate=*&filters[user][username][$eq]=${username}&filters[job][id][$eq]=${id}`)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                if(data.data.length != 0) {
                    window.dispatchEvent(new CustomEvent("alreadyApplied"))
                }
                else {
                    window.dispatchEvent(new CustomEvent("sendApplication"))
                }
            }
        )
    }
}