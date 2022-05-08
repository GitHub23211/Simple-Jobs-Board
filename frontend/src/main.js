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

//Populates the routes object in route.js
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
        Model.fetchIndividual('jobs', pathInfo.id, 'jobFetched')
    })

    router.get('/companies', (pathInfo) => {
        Model.fetchIndividual('companies', pathInfo.id, 'companyFetched')
    })

    router.get('/search', (pathInfo) => {
        Model.searchEntries(pathInfo.id)
    })

    router.get('/me', () => {
        Model.fetchAppliedJobs(userAuth.userData.username)
    })

    //Login form/Logged should be dispalyed constantly so it is not tied to a specific URL
    View.loginView(userAuth.userData)

    router.route()
    allBindings()
})

window.addEventListener("searchedJobs", () => {
    let searchTerm = ""
    if(Model.searchResults.searchTerm) {
        searchTerm = decodeURI(Model.searchResults.searchTerm)
    }
    View.searchView(Model.searchResults.results, searchTerm)
})

window.addEventListener("jobFetched", () => {
    View.jobView(Model.foundData.data[0], userAuth.userExists())
    if(userAuth.userExists()) {
        bindJobAppButton()
    }
})

window.addEventListener("companyFetched", () => {
    View.companyView(Model.foundData.data[0])
})

window.addEventListener("invalidLogin", () => {
    View.invalidLoginView()
    allBindings()
})

window.addEventListener("appliedJobsFetched", () => {
    View.appliedJobsView(Model.appliedJobs)
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
        loginForm.onsubmit = auth
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

const auth =  function () {
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


window.onload = () => {
    Model.fetchData()
}