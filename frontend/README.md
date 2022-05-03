# COMP2110 Bob's Jobs Frontend and Backend

# Level 1
* Took style.css from Assignment 1 to use as the CSS Style for this assignment.
* Took header code from Assignment 1 to create the header, navigation bar and search bar for the document.
* Rough implementation of Level 1 code up to adding the "selected" class to the current page.
    * Made three view functions that display a different message depending on the hash URL to work out how to use the router class.
* Used the classList property of an HTML element to dynamically add/remove a "selected" class to the last clicked nav-menu link.
* Refactored view.js into an individual object.


# Level 2
* Based off the MVC video, implemented model.js to fetch and store sample-data.json and trigger a custom event "modelUpdated"
    * modelUpdated event updates the variable "data" in main.js which then passes this variable to a function in view.js called "homeView" to display the first 10 jobs on the home page.
    * Made sure to only populate the routes object and call the route() function from router.js once modelUpdated event is fully complete.
* Created a Handlebars template to correctly display the first 10 jobs.
    * Created a custom Handlebars helper (jobEach()) that has a similar implementation to the #each helper but stops after 10 iterations.
* Modified Handlebars template to include a hyperlink tag for each job title that is uniquely identified by their job id.
* Created a basic individual jobs view and company view functions. Does not display all required information yet.
* Updated the data variable in model to hold arrays for both jobs and companies. These arrays are then accessed by the jobView and companyView functions respectively.
* Refactored view.js again to be a bit neater and less repetitive.
* Moved all the handlebar templates to the bottom of index.html.
* Added job description to individual job pages.
* Styled individual job pages.
* Modified companyView() to display the company logo and all jobs they have posted.

# Level 3
* Changed Model.js into a class so that I could create two objects:
    * One object holds the data for all jobs and the other the for all companies
* Added a findEntry function in main.js that finds the array index of a company/job from their respective arrays if the company/job id matches the pathInfo id.
* Removed the eachCompanyJob helper function in view.js
* Modified view.js so that it is compatible with the new data passed by the new Model objects
* Modified index.html so that is compatible with the new data passed by the modified view.js functions
* Added information at the top of each created .js script.
* Added a sort function to the eachJob helper function in view.js that sorts the job array from most recent according to the publishedAt attribute of each job.
* Modified the header-search div html code to be more simple and better suit this assignment.
* Added a bindings function in main.js that rebinds the form submit action to a function called formSearch
    * formSearch disables the default behaviour of the form submit action
    * It then makes a call to a model.js function called searchEntries and passes the search term inputted by the user into this function.
* Added a searchEntries function in model.js that creates a new array that inserts all jobs that contains a string passed as a parameter in their descriptions.
    * Also modifies the hash URL to include "/search" + the search term and then dispatches a modelUpdated event
* Added a route for the search hash URL in main.js.
    * Only logs a dummy message + the pathInfo.id for now
* Redid searchEntries model so that it does not modify the hash URL or dispatches an event
* Created a new changeHash function in model.js that modifies the hash URL and dispatches an event
    * This allows the website to now look for jobs by directly modifying the URL on top of using the search function.
* Modified the function run when it changes to a search hash URL to use the homeView function in view.js. 
    * Searching for a job shows the first 10 relevant jobs.
    * Will create a new function that will show all relevant jobs instead.
