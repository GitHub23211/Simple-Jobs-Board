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
        this.applyTemplate("text-template", `Be sure to he honest in your application!`,
        "About Us")
    },

        
    helpView: function(html, selectedNav) {
        this.applyTemplate("text-template", `Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself!`,
        "Applicant Help")
    },

        
    homeView: function(data) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("home-template").innerText)
        target.innerHTML = template({job:data})
        selectedNav("Home")
    },
    
    listView: function(data, id, templateName) {
        let target = document.getElementById('main')
        let list = data[id];
        let template = Handlebars.compile(document.getElementById(templateName).innerText)
        target.innerHTML = template({data: list})
    },

    jobView: function(data, id) {
        this.listView(data, id, "job-template")
    },

    companyView: function(data, id) {
        this.listView(data, id, "company-template")
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
//It takes the data parameter passed into homeView and implements the Handlebars template below it
//for the first 10 entries in the data.
Handlebars.registerHelper('eachJob', function(data, limit, options) {
    let template = ""
    for(let i = 0; i < limit; i++) {
        template = template + options.fn(data[i])
    }
    return template;
})