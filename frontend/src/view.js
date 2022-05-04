/*  Joshua Santos
    45203083
    View.js
    View module of the website
*/

export {view}

const view = {
    errorView: function() {
        let target = document.getElementById('main')
        let template = '<h1> Page not found </h1>'
        target.innerHTML = template
    },
    
    applyTemplate: function(id, string, nav) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById(id).innerText)
        target.innerHTML = template({text:string})
        selectedNav(nav)
    },

    aboutView: function() {
        this.applyTemplate("text-template", `Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!`,
        "About Us")
    },

        
    helpView: function(html, selectedNav) {
        this.applyTemplate("text-template", `Be sure to he honest in your application!`,
        "Applicant Help")
    },

        
    homeView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("home-template").innerText)
        target.innerHTML = template({job:data})
        selectedNav("Home")
    },
    
    jobView: function(data, id) {
        let target = document.getElementById('main')
        let list = data[id];
        let template = Handlebars.compile(document.getElementById("job-template").innerText)
        target.innerHTML = template({data: list})
    },

    companyView: function(data, id) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("company-template").innerText)
        target.innerHTML = template({data: data.companies[id], job:data.jobs, companyID:(id+data.companies[0].id)})
    }
}


// <--------------- Helper Functions --------------->

//Finds the navigation menu link via its innerText then adds the "selected" class to that element's classList
//It then removes the "selected" class from all the other HTML elements.
const selectedNav = function(id) {
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

//Custom Handlebars helper function called "eachJob"
//It basically takes the job array in sample-data.json and implements "job-template"
//for a certain number of job entries up until the "limit" paramater.
Handlebars.registerHelper('eachJob', function(data, options) {
    let template = ""
    for(let i = 0; i < 10; i++) {
        template = template + options.fn(data[i])
    }
    return template;
})

Handlebars.registerHelper('eachCompanyJob', function(data, id, options) {
    let template = ""
    for(let i = 0; i < data.length; i++) {
        if(data[i].attributes.company.data.id == id) {
            template = template + options.fn(data[i])
        }
    }
    return template;
})