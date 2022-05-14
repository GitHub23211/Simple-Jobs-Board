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
    * Will create a new function that will show all relevant jobs soon.
* Created a searchView function that displays all jobs returned by searchEntries in model.js using a Handlebars template called "search-template" in index.html
    * "search-template" checks if the array is empty and either displays a view of all relevant jobs or a generic error page that informs the user that their search term did not find any jobs

# Level 4
* Removed html code in header-auth and created a new "login-template" that shows a login form if a user is logged out, or a message saying "Welcome [user]" if they are logged in.
    * Login form's onsubmit now rebound via the bindings() function in main.js
        * It now calls a function called auth() in main.js instead that turns the values gotten from the username and password textboxes into a JSON object and passes it to a function in userauth.js called login()
* userauth.js is an object that stores a user's data and a function called login()
    * login() makes a POST request to Strapi's authentication api and returns a confirmed user's data, prints it to the console and then dispatches a modelUpdated event (for now)
* Modified login-template to include a logout button and a message that informs the user they have logged in
* Added a logout() function to main.js that is bound to the logout button's onclick. It sets the userData field in the userAuth object to null and dispatches a modelUpdated event so that the login form appears again
* Added a window.alert call in login that is called when Strapi sends back an error. This alert that tells the user that the username or password inputted is invalid.
* Added a getJWT() and getUser() function in userAuth.js.
    * getJWT() will be used to get the JSON web token from the user data sent by the backend
    * getUser() checks if the userData field is null
    * It's current use is to inform the controller that if the user is logged, do not search for a login-form element (as it will be null) and to load the logout button's onclick with the logout() function.
* Added a button on a detailed job's page that says Apply for Job. Changed the onclick function of this button to a function called applyJob in main.js.
    * applyJob calls a view function called jobAppView that concatenates the innerHTMl of the page with a template called "jobApp-template" 
        * Essentially, it places a textarea input and a submit button form on top of the job application page
    * The onsubmit function of this submit button has been changed to submitApplication() found in main.js
        * For now, submitApplication() just console logs a message to tell me the button is working.
* Removed the class structure of model.js and replaced it with a prototype object structure.
* Added getUser() and getJWT() functions in userAuth.js to be used later for authenticated requests and to show different views when a user is logged in
* Fixed accidentally rebinding the onsubmit of the job application submit input element to rebinding the onsubmit of the form element
* Now checks everytime a detailed job application page is loaded if the user is logged
    * Used later to hide/show the jobApp element
* Added an additional parameter to the jobView() function in view.js that takes a user
    * Pass the getUser() function from userAuth.js as a parameter
    * jobView() then passes the result of this function to the job-template to decide whether or not to dispaly the "Apply for this Job" button
        * Show button if user is logged in, else do not
* Changed submitApplication in main.js so that it takes the text from the textarea input, wraps it in JSON and passes it to a new function in model.js called postApplication()
    * postApplication() takes this data and makes a POST request to the backend to create a new entry under the JobApplication collection.
* Added another function in model.js called fetchJobData()
    * A job id is passed into the parameter, and fetches the job information from the backend that matches this id
* Improved job fetching mechanism:
    * The function bound to router.routes['/jobs'] is now fetchJobData()
    * fetchJobData() dispatches a new event called "jobFetched" after fetching all its data.
    * When the jobFectched event is dispatched, a listener function then calls jobView() from view.js to display the job's detailed information.
* Borrowed footer html code from assignment 1
* Styled the job application textarea
* Added a message that pops up when an invalid username and/or password is used to login
* Created an object called "appliedJobs" in model.js that stores all the jobs that the logged in user has applied.
    * These jobs are fetched using the fetchAppliedJobs() function in model.js that makes an api call to Strapi using filters to get the data precisely.
* Created a function in view.js called appliedJobsView() that takes in an object containing all of the jobs the user has applied for and displays them on screen using the "applied-jobs-template" in index.html
* Added a new hash URL path in main.js for the "/me" URL.
    * Set the function of this URL to call fetchAppliedJobs()
        * fetchAppliedJobs() then dispatches a "appliedJobsFetched" event that then calls the appliedJobsView()

# Post-task work
* Refactored and cleaned up unneeded code.
* Backend now fully relies on the Strapi API to sort and filter data rather than using sort() methods or manually finding data by going through an array
* Made an error-view template that is shown when the user tries to input a hash URL that is not in the routes table.
* Styled the search bar and modified the layout of the navigation bar
* changed selectedNav() in view.js to work with the modified layout of the nav bar.
* Working on bettering the layout of the logo and login area
* Removed the need for the eachJob Handlebar helper function
    * Used the "pagination" API call to Strapi to only return the first 10 entries
* Fixed the structure of the nav bar so it passes cypress tests.
* Added comments to most functions.
    * Will add comments to the others later.
* Added placeholder text to login form
* Added a register link and will add a registration page soon
* Improved the function that is called when the /me hash URL is accessed. Checks if the user is logged in otherwise will show the error page.
* Changed the appliedJobs variable in model.js into an object that stores the array of applied jobs and the user's name
    * Modified the appliedJobsView() in view.js to use this object
* Improved layout and css of the:
    * Company page view
    * Logo and login form
    * Job list view
* Removed generic "text-template" and added specific templates for the about us and help pages
* Implemented registration page which is described in the other README under the "Extension" heading.
    * Added a "register-template" to render when the user visits the register hash URL
    * Added a bindRegister() function which binds the register form's onsubmit to a registerUser() function (both are found in main.js)
        * registerUser() creates an object that contains the username, email and password fields needed by Strapi to add a new user to the database
        * Passes this object to a fuction called register() in userAuth.js
* register() makes a POST request to the account creation API.
    * If the response is successful, logs the user in and dispatches a registrationSuccess event
    * If it fails, it shows an error on the registration page
* After a registrationSuccess event, the user is redirected to the home URL and the page is refreshed.
* Added comments to all functions in view.js
    * All that's left are the bind functions
* Created different css styles for the search-header depending on a failed or successful search
* Styled job application form, and submit, button and input#text elements.
* Removed invalidLogin boolean from userAuth.js and invalidLoginView from view.js
    * Added a boolean parameter to loginView() that passes that onto the Handlebars template to decide whether to display the message that informs the user that they failed to login.
    * Still need to figure out how to remove the message after a certain amount of time or if the user changes page
* Created a new object called bindedFunctions.js that stores all the functions that are bound to various buttons by the binding functions in main.js
* Added comments to these functions and the binding functions as well.
* Rearranged the order of the Handlebars templates in index.html and the functions in view.js
* Turned the nav-bar html code into a Handlebars template so that it's able to decide for itself whether to show the "My Applications" link depending on if the user is logged in or not.
    * Added a navBarView() function in view.js to display the nav nar
* Changed the display mode of the navigation bar to flex from grid.
* Added the ability for the site to check if a user has already applied for a job
    * When the user clicks on the "Apply for this Job" button, checkIfApplied() is called from model.js
        * Retrieves a JSON object by asking for , then trying to find a 
* Removed ability for the site to check ifa user has already applied for a job
    * Would fail the last 2 tests