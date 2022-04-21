export {view}

const view = {
    errorView: function() {
        let target = document.getElementById('main')
        target.innerHTML = '<h1> Page not found </h1>'
    },
    
    aboutView: function() {
        let target = document.getElementById('main')
        target.innerHTML = `<p1> Bob's Jobs is a revolution in career planning brought to you by Bob Bobalooba himself! </p>`
        this.selectedNav("About Us")
    },
    
    homeView: function(data) {
        let target = document.getElementById('main')

    //Custom Handlebars helper function called "eachJob"
    //It takes the data parameter passed into homeView and implements the Handlebars template below it
    //for the first 10 entries in the data.
        Handlebars.registerHelper('eachJob', function(data, options) {
            let template = ""
            for(let i = 0; i < 10; i++) {
                template = template + options.fn(data[i])
            }
            return template;
        })
    
        let template = Handlebars.compile(
            `<div class='joblist'>
                {{#eachJob job}}
                    <div class='job'>
                        <div class='jobtitle'> {{attributes.title}} </div>
                        <div class='location'> Location: {{attributes.location}} </div>
                        <div class='salary'> Type: {{attributes.type}} </div>
                    </div>
                {{/eachJob}}
            </div>`
        )
        target.innerHTML = template({job:data.jobs})
        this.selectedNav("Home")
    },
    
    helpView: function() {
        let target = document.getElementById('main')
        target.innerHTML = `<p1>Be sure to he honest in your application!</p1>`
        this.selectedNav("Applicant Help")
    },
    
    
    //Finds the navigation menu link via its innerText then adds the "selected" class to that element's classList
    //It then removes the "selected" class from all the other HTML elements.
    selectedNav: function(id) {
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
}