/*  Joshua Santos
    45203083
    View.js
    View module of the website
*/

export {View}

const View = {
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

        
    helpView: function() {
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
        let job = data[id];
        let template = Handlebars.compile(document.getElementById("job-template").innerText)
        target.innerHTML = template({job: job})
    },

    companyView: function(data, id) {
        let target = document.getElementById('main')
        let template = Handlebars.compile(document.getElementById("company-template").innerText)
        let compJobList = data[id].attributes.jobs.data
        target.innerHTML = template({data: data[id], job:compJobList})
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
//Takes a job array from the object in sample-data.json and inserts its details
//into the "job-template" Handlebar template
//for up to 10 job arrays
//Also sorts the job array before inserting each job into the tempalte 
//from most recent according to its publishedAt attribute
Handlebars.registerHelper('eachJob', function(data, options) {
    let template = ""
    data.sort(
        (a, b) => {
            let date1 = Date.parse(a.attributes.publishedAt)
            let date2 = Date.parse(b.attributes.publishedAt)
            if(date1 > date2) {
                return -1
            }
            if(date1 < date2) {
                return 1
            }
            return 0
        }
    )
    for(let i = 0; i < 10; i++) {
        template = template + options.fn(data[i])
    }
    console.log(data)
    return template;
})