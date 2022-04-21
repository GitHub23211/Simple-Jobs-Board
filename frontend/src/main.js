import {Router} from './router.js'
import {model} from './model.js'
import {view} from './view.js'

const router = new Router(view.errorView)
window.addEventListener("modelUpdated", () => {
    let data = model.data.jobs
    router.get('/', () => {
        view.homeView(data)
    })
    
    router.get('/about', () => {
        view.aboutView()
    })
    
    router.get('/help', () => {
        view.helpView();
    })
    router.route()
})

window.onload = () => {
    model.loadJobs()
}