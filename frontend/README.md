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
* Remove html code in header-auth and created a new "login-template" that shows a login form if a user is logged out, or a message saying "Welcome [user]" if they are logged in.
    * Login form's onsubmit has been rebounded via the bindings() function in main.js
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
    * applyJob then dispatches a hashChange event to load the newly concatenated HTML code
    * The onsubmit function of this submit button has been changed to submitApplication() found in main.ks
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