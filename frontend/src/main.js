
import {Router} from './router.js'
import {errorView, aboutView, homeView, helpView} from './view.js'

const router = new Router(errorView)

router.get('/', () => {
    homeView()
})

router.get('/about', () => {
    aboutView()
})

router.get('/help', () => {
    helpView();
})

window.onload = () => {
    // document.getElementById('main').innerHTML = "<p>Bob will have some job's here</p>"
    router.route();
}