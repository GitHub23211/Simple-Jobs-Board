import {Router} from './router.js'
import {model} from './model.js'
import {view} from './view.js'

const router = new Router(view.errorView)
window.addEventListener("modelUpdated", () => {
    let jobs = model.data.jobs
    let companies = model.data.companies

    router.get('/', () => {
        view.homeView(jobs)
    })

    router.get('/#', () => {
        view.homeView(jobs)
    })
    
    router.get('/about', () => {
        view.aboutView()
    })
    
    router.get('/help', () => {
        view.helpView();
    })

    router.get('/jobs', (pathInfo) => {
        view.jobView(jobs, pathInfo.id - jobs[0].id)
    })

    router.get('/companies', (pathInfo) => {
        view.companyView(companies, pathInfo.id - companies[0].id)
    })

    router.route()
})

window.onload = () => {
    model.loadJobs()
}