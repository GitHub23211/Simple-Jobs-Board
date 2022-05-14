/*  Joshua Santos
    45203083
    main.js
    Controller module of the website
*/

import {Router} from './router.js'
import {View} from './view.js'
import {userAuth} from './userAuth.js'
import {Model} from './model.js'
import {bindFuncs} from './bindedFunctions.js'

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

    router.get('/register', () => {
        View.registerUserView(userAuth.error)
        userAuth.clearError()
        bindRegister()
    })

    //Login form/Logout button should be displayed constantly so it is not tied to a specific hash URL
    View.loginView(userAuth.userData, false)

    router.route()
    alwaysOnBindings()
})

//Checks if a search term exists, and decodes it so that special characters such as spaces are rendered properly
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
    View.loginView(userAuth.user, true)
    console.log("invalid login")
    alwaysOnBindings()
})

//If a user's registration is successful
//redirect the user to the home page and 
//refresh the page
window.addEventListener("registrationSuccess", () => {
    Model.changeHash('home')
    window.dispatchEvent(new CustomEvent("modelUpdated"))
})


//<-------- Bindings -------->


//Functions that must be bound for every page on the site.
//Specifically, the login, logout and search bar buttons
const alwaysOnBindings = function() {
    bindSearch()
    bindLogin()
}

//Binds the search button to the searchJobs() from bindFunctins.js
const bindSearch = function() {
    let searchForm = document.getElementById("search-form")
    searchForm.onsubmit = bindFuncs.searchJobs
}

//If the user logs in, find the logout button
//and bind it to logout() from bindFunctins.js
//Else, find the login button and bind it
//to the authenticateUser() from bindFunctins.js
const bindLogin = function() {
    if(userAuth.userExists()) {
        let logoutButton = document.getElementById("logoutbutton")
        logoutButton.onclick = bindFuncs.logout
    }
    else{
        let loginForm = document.getElementById("login-form")
        loginForm.onsubmit = bindFuncs.authenticateUser
    }
}

//Binds the register account button on the registration page to 
//registerUser() from bindFunctins.js
const bindRegister = function() {
    let registerForm = document.getElementById("register-form")
    registerForm.onsubmit = bindFuncs.registerUser
}

//Find the "Apply for this Job" button
//and bind it to the bindJobAppSubmitButton() function
const  bindJobAppButton =  function() {
    let applyFormButton = document.getElementById("apply-button")
    if(applyFormButton) {
        applyFormButton.onclick = bindJobAppSubmitButton
    }
}

//Displays the job application form
//then finds the form's submit button and binds it to
//submitApplication() from bindFunctins.js
const bindJobAppSubmitButton = function() {
    View.jobAppView()
    let jobAppSubmit = document.getElementById("jobapp-form")
    if(jobAppSubmit) {
        jobAppSubmit.onsubmit = bindFuncs.submitApplication
    }
}


//Whenever a user visits the website
//fetch the first 10 jobs from the Strapi database
//and populate the routes table in router.js
//and load the necessary view functions
window.onload = () => {
    Model.fetchTenJobs()
}