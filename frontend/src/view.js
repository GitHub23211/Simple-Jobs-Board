/*  Joshua Santos
    45203083
    View.js
    View module of the website
*/

export {View}

const View = {
    errorView: function() {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("error-page-template").innerText)
        target.innerHTML = template()
    },
    
    applyTemplate: function(id, string, nav) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById(id).innerText)
        target.innerHTML = template({text:string})
        selectedNav(nav)
    },

    aboutView: function() {
        this.applyTemplate("text-template", `Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!`,
        "About Us")
    },

        
    helpView: function() {
        this.applyTemplate("text-template", `Be sure to he honest in your application!`,
        "Applicant Help")
    },

    homeView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("home-template").innerText)
        target.innerHTML = template({job:data})
        selectedNav("Home")
    },
    
    jobView: function(data, user) {
        let target = document.getElementById('main')
        let job = data;
        let template = Handlebars.compile(document.getElementById("job-template").innerText)
        target.innerHTML = template({job: job, user:user})
    },

    companyView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("company-template").innerText)
        let compJobList = data.attributes.jobs.data
        target.innerHTML = template({data: data, job:compJobList})
    },

    searchView: function(data, searchTerm) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("search-template").innerText)
        target.innerHTML = template({job:data, searchTerm:searchTerm, numResults:data.length})
    },

    loginView: function(user) {
        let target = document.getElementById('header-auth')
        let template = Handlebars.compile(document.getElementById("login-template").innerText)
        target.innerHTML = template({user:user})
    },

    invalidLoginView: function() {
        let target = document.getElementById('header-auth')
        let template = Handlebars.compile(document.getElementById("invalid-login-template").innerText)
        target.innerHTML = template() + target.innerHTML
    },

    jobAppView: function() {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("jobapp-template").innerText)
        target.innerHTML = template() + target.innerHTML
    },

    appliedJobsView: function(appliedJobs) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("applied-jobs-template").innerText)
        target.innerHTML = template({job:appliedJobs})
    }
}


// <--------------- Helper Functions --------------->

//Finds the navigation menu, and adds the "selected" class to the
//<a> tag whose text matches the 'id' parameter
const selectedNav = function(id) {
    let nav = document.getElementsByClassName('main-menu')
    for(let i = 0; i < nav[0].children.length; i++) {
        if(nav[0].children[i].innerText === id) {
            nav[0].children[i].classList.add('selected')
        }
        else {
            nav[0].children[i].classList.remove('selected')
        }
    }
}