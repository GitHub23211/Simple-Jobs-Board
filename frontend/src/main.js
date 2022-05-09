/*  Joshua Santos
    45203083
    main.js
    Controller module of the website
*/

import {Router} from './router.js'
import {View} from './view.js'
import {userAuth} from './userAuth.js'
import {Model} from './model.js'

const router = new Router(View.errorView)

window.addEventListener("modelUpdated", () => {
    router.get('/', () => {
        View.homeView(Model.firstTenJobs)
    })

    router.get('/#', () => {
        View.homeView(Model.firstTenJobs)
    })
    
    router.get('/about', () => {
        View.aboutView()
    })
    
    router.get('/help', () => {
        View.helpView();
    })

    router.get('/jobs', (pathInfo) => {
        Model.fetchDetailed('jobs', pathInfo.id, 'jobFetched')
    })

    router.get('/companies', (pathInfo) => {
        Model.fetchDetailed('companies', pathInfo.id, 'companyFetched')
    })

    router.get('/search', (pathInfo) => {
        Model.searchEntries(pathInfo.id)
    })

    router.get('/me', () => {
        if(userAuth.userExists()) {
            Model.fetchAppliedJobs(userAuth.userData.username)
        }
        else {
            View.errorView()
        }
    })

    //Login form/Logout button should be displayed constantly so it is not tied to a specific hash URL
    View.loginView(userAuth.userData)

    router.route()
    allBindings()
})

//Checks if a search term exists, and decodes its so that special characters such as spaces are rendered properly
//on the page. Passes the searchTerm to the searchView() function after
window.addEventListener("searchedJobs", () => {
    let searchTerm = ""
    if(Model.searchResults.searchTerm) {
        searchTerm = decodeURI(Model.searchResults.searchTerm)
    }
    View.searchView(Model.searchResults.results, searchTerm)
})

//Calls the jobView() model.
//If the user is logged in, display the "Apply for this Job" button
window.addEventListener("jobFetched", () => {
    View.jobView(Model.foundData.data[0], userAuth.userExists())
    if(userAuth.userExists()) {
        bindJobAppButton()
    }
})

//Calls the companyView() function and passes
//the company data found
window.addEventListener("companyFetched", () => {
    View.companyView(Model.foundData.data[0])
})

//Calls  the appliedJobsView() function and passes
//the object that contains all the jobs
//the logged in user has applied for
window.addEventListener("appliedJobsFetched", () => {
    View.appliedJobsView(Model.appliedJobs)
})

//Calls the invalidLoginView() if the
//user fails to log in.
//Due to the change in view, need to rebind
//the login and search bindings
window.addEventListener("invalidLogin", () => {
    View.invalidLoginView()
    allBindings()
})



const allBindings = function() {
    bindSearch()
    bindLogin()
}

const bindSearch = function() {
    let searchForm = document.getElementById("search-form")
    searchForm.onsubmit = searchJobs
}

const bindLogin = function() {
    if(!userAuth.userExists()) {
        let loginForm = document.getElementById("login-form")
        loginForm.onsubmit = authenticateUser
    }

    if(userAuth.userExists()) {
        let logoutButton = document.getElementById("logoutbutton")
        logoutButton.onclick = logout
    }
}

const  bindJobAppButton =  function() {
    let applyFormButton = document.getElementById("apply-button")
    if(applyFormButton) {
        applyFormButton.onclick = applyJob
    }
}

const applyJob = function() {
    View.jobAppView()
    let jobAppSubmit = document.getElementById("jobapp-form")
    if(jobAppSubmit) {
        jobAppSubmit.onsubmit = submitApplication
    }
}

const submitApplication = function() {
    event.preventDefault()
    const jobAppData = {
        'text': this.elements['text'].value,
        'job': Model.foundData.data[0],
        'user': userAuth.userData
    }
    Model.postApplication(jobAppData, userAuth.getJWT())
    Model.changeHash("!/me", "")
}

const searchJobs = function() {
    event.preventDefault()
    Model.changeHash("!/search/", this.elements[0].value)
}

const authenticateUser =  function () {
    event.preventDefault()
    const authInfo = {
       identifier: this.elements['username'].value,
       password: this.elements['password'].value 
    }
    userAuth.login(authInfo)
}

const logout = function() {
    userAuth.userData = null
    window.dispatchEvent(new CustomEvent("modelUpdated"))
}

//Whenever a user visits the website
//fetch the first 10 jobs from the Strapi database
//and populate the routes table in router.js
//and loads the necessary view functions
window.onload = () => {
    Model.fetchTenJobs()
}