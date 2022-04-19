
export const errorView = () => {
    let target = document.getElementById('main')
    target.innerHTML = '<h1> Page not found </h1>'
}

export const aboutView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `<p1> Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself! </p>`
}

export const homeView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `<p>Bob will have some job's here</p>`
}

export const helpView = () => {
    let target = document.getElementById('main')
    target.innerHTML = `Be sure to be honest in your application!`
}