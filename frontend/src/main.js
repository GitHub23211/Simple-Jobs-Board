/*  Joshua Santos
    45203083
    Main.js
    Controller module of the website
*/

import {Router} from './router.js'
import {View} from './view.js'
import {userAuth} from './userAuth.js'
import {Model} from './model.js'

const router = new Router(View.errorView)

window.addEventListener("modelUpdated", () => {
    let jobs = Model.data.jobs
    let companies = Model.data.companies

    router.get('/', () => {
        View.homeView(jobs)
    })

    router.get('/#', () => {
        View.homeView(jobs)
    })
    
    router.get('/about', () => {
        View.aboutView()
    })
    
    router.get('/help', () => {
        View.helpView();
    })

    router.get('/jobs', (pathInfo) => {
        const findEntry = (data) => {
            return pathInfo.id == data.id
        }

        View.jobView(jobs, jobs.findIndex(findEntry))
    })

    router.get('/companies', (pathInfo) => {
        const findEntry = (data) => {
            return pathInfo.id == data.id
        }

        View.companyView(companies, companies.findIndex(findEntry))
    })

    router.get('/search', (pathInfo) => {
        View.searchView(Model.searchEntries(pathInfo.id), pathInfo.id)
    })

    View.loginView(userAuth.userData)

    router.route()
    bindings()
})

const searchJobs = function() {
    event.preventDefault()
    Model.changeHash(this.elements[0].value)
}

const auth = function () {
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

const applyJob = function() {
    View.jobAppView()
    window.dispatchEvent(new HashChangeEvent("hashUpdated"))
}

const submitApplication = function() {
    console.log("Clicked submit")
    console.log(this)
}

const bindings = function() {
    let searchForm = document.getElementById("search-form")
    searchForm.onsubmit = searchJobs

    if(!userAuth.getUser()) {
        let loginForm = document.getElementById("login-form")
        loginForm.onsubmit = auth
    }

    if(userAuth.getUser()) {
        let logoutButton = document.getElementById("logoutbutton")
        logoutButton.onclick = logout
        let applyFormButton = document.getElementById("apply-button")
        if(applyFormButton) {
            applyFormButton.onclick = applyJob
        }
    }

    let submitAppButton = document.getElementById("submitApp-button")
    if(submitAppButton) {
        submitAppButton.onsubmit = submitApplication
    }
}

window.onload = () => {
    Model.fetchData()
}