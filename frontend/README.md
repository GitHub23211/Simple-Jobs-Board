# COMP2110 Bob's Jobs Frontend

* Took style.css from Assignment 1 to use as the CSS Style for this assignment.
* Took header code from Assignment 1 to create the header, navigation bar and search bar for the document.
* Rough implementation of Level 1 code up to adding the "selected" class to the current page.
    * Made three view functions that display a different message depending on the hash to work out how to use the router class.
* Used the classList property of an HTML element to dynamically add/remove a "selected" class to the last clicked nav-menu link.
* Refactored view.js into an individual object.
* Based off the MVC video, implemented model.js to fetch and store sample-data.json and trigger a custom event "modelUpdated"
    * modelUpdated event updates the variable "data" in main.js which then passes this variable to a function in view.js called "homeView" to display the first 10 jobs on the home page.
    * Made sure to only populate the routes object and call the route() function from router.js once modelUpdated event is fully complete.
* Created a Handlebars template to correctly display the first 10 jobs.
    * Created a custom Handlebars helper (jobEach()) that has a similar implementation to the #each helper but stops after 10 iterations.
