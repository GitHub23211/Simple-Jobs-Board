/*  Joshua Santos
    45203083
    View.js
    View module of the website
*/

export {View}

const View = {
    //Error page that is displayed when the user visits a URL not registered on the routes table
    errorView: function() {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("error-page-template").innerText)
        target.innerHTML = template()
    },
    
    //Generic function that simply applies the template and gives the 
    //clicked nav bar link the selected class
    applyTemplate: function(id, nav) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById(id).innerText)
        target.innerHTML = template()
        selectedNav(nav)
    },

    //Dispalys the "About Us" page
    aboutView: function() {
        this.applyTemplate("about-us-template", "About Us")
    },

    //Dispalys the "Applicant Help" page  
    helpView: function() {
        this.applyTemplate("help-template", "Applicant Help")
    },

    //Takes data which is an array containing the 10 most newly published jobs from the Strapi database
    homeView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("home-template").innerText)
        target.innerHTML = template({job:data})
        selectedNav("Home")
    },
    
    //Takes an object that contains all the information about a specific job
    //and dispalys a detailed view of that job such as its full description.
    //A user field is taken to check whether the user is logged in
    //If they are, then show the "Apply for this Job" button
    jobView: function(data, user) {
        let target = document.getElementById('main')
        let job = data;
        let template = Handlebars.compile(document.getElementById("job-template").innerText)
        target.innerHTML = template({job: job, user:user})
    },

    //Takes an object that contains all the information about a specific company
    //and displays a detailed view of that company such as its logo, and website url.
    //Also displays all the jobs that company has posted on the site.
    companyView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("company-template").innerText)
        let compJobList = data.attributes.jobs.data
        target.innerHTML = template({data: data, job:compJobList})
    },

    //Called when the user uses the search bar to look for a job.
    //Takes an array of matching jobs, and the search term used
    //Displays the jobs and notifies the user what search term they used
    //and how many results were found
    searchView: function(data, searchTerm) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("search-template").innerText)
        target.innerHTML = template({job:data, searchTerm:searchTerm, numResults:data.length})
    },

    //Simply shows the login form found at the top of the web page.
    //Takes a user object to check whether the user is logged in or not.
    //If the user is logged in, show a message that contains the user's name
    //and display a logout button next to it.
    //If the user is not logged in, show the login form and a link to register
    loginView: function(user) {
        let target = document.getElementById('header-auth')
        let template = Handlebars.compile(document.getElementById("login-template").innerText)
        target.innerHTML = template({user:user})
    },

    //Small message that pops up that warns the user they entered 
    //invalid credentials when trying to log in
    invalidLoginView: function() {
        let target = document.getElementById('header-auth')
        let template = Handlebars.compile(document.getElementById("invalid-login-template").innerText)
        target.innerHTML = template() + target.innerHTML
    },

    //Responsible for displaying the job application form when the
    //user clicks on the "Apply for this Job" button found on
    //a job's detailed view
    jobAppView: function() {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("jobapp-template").innerText)
        target.innerHTML = template() + target.innerHTML
    },

    //Takes an array that contains all the jobs a user has applied for and
    //displays it on the screen using a template.
    appliedJobsView: function(appliedJobs) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("applied-jobs-template").innerText)
        let jobs = appliedJobs.jobs
        let user = appliedJobs.user
        target.innerHTML = template({job:jobs, user:user})
    },

    //Displays the user registration form.
    //Takes an errors parameter that contains messages
    //the page should display if the user fails to register
    //an account.
    registerUserView: function(errors) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("register-template").innerText)
        target.innerHTML = template({error:errors})
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