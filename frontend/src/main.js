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
        Model.fetchJobData(pathInfo.id)
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

window.addEventListener("jobFetched", () => {
    View.jobView(Model.foundJob.data[0], userAuth.userExist())
    bindJobAppButton()
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
    let jobAppSubmit = document.getElementById("jobApp-form")
    if(jobAppSubmit) {
        jobAppSubmit.onsubmit = submitApplication
    }
}

const submitApplication = function() {
    event.preventDefault()
    console.log(this.elements)
    const jobAppData = {
        'text': this.elements['text'].value,
        'job': Model.foundJob.data[0],
        'user': userAuth.userData
    }
    console.log(userAuth.getJWT())
    Model.postApplication(jobAppData, userAuth.getJWT())

}

const bindings = function() {
    let searchForm = document.getElementById("search-form")
    searchForm.onsubmit = searchJobs

    if(!userAuth.userExist()) {
        let loginForm = document.getElementById("login-form")
        loginForm.onsubmit = auth
    }

    if(userAuth.userExist()) {
        let logoutButton = document.getElementById("logoutbutton")
        logoutButton.onclick = logout
    }
}

const bindJobAppButton = function() {
    if(userAuth.userExist()) {
        let applyFormButton = document.getElementById("apply-button")
        if(applyFormButton) {
            applyFormButton.onclick = applyJob
        }
    }
}

window.onload = () => {
    Model.fetchData()
}