import {Router} from './router.js'
import {Model} from './model.js'
import {View} from './view.js'

const router = new Router(View.errorView)
const jobsInfo = new Model(`http://localhost:1337/api/jobs?populate=*`)
const compInfo = new Model(`http://localhost:1337/api/companies?populate=*`)

window.addEventListener("modelUpdated", () => {
    let jobs = jobsInfo.data
    let companies = compInfo.data

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

    router.route()
})

window.onload = () => {
    jobsInfo.fetchData()
    compInfo.fetchData()
}