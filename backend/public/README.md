# COMP2110 Bob's Jobs Backend

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
    