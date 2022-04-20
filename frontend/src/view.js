export const errorView = () => {
    let target = document.getElementById('main')
    target.innerHTML = '<h1> Page not found </h1>'
}

export const aboutView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `<p1> Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself! </p>`
    selectedNav("About Us")
}

export const homeView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `<p>Bob will have some job's here</p>`
    selectedNav("Home")
}

export const helpView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `<p1>Be sure to be honest in your application!</p1>`
    selectedNav("Applicant Help")
}

const selectedNav = (id) => {
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