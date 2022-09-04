# COMP2110 Web Development Assignment

This project implements the Bob's Jobs web application for the COMP2110 
Web Development assignment.  

Full details of the assignment requirements are in [the doc folder](doc/assignment.md). 

## Extension

* Implemented a registration form that registers new users to the website
    * Automatically logs user in and redirects to home page after successful registration
    * If registration fails, update registration form informing user of what details they are missing/failed to input properly.
    * However, cannot inform user if password is too short/username is already taken.
        * Strapi only sends back a generic "An error occurred during account creation" 400 error which makes it impossible to distinguish which error to inform the user of from the API response alone.
* Added a "My Applications" link to the nav bar so the user can directly view the jobs they've applied for.
    * Only appears if they have logged in.
* Search terms that return 0 results show a "no results found page" that suggests different actions the user can take to make a better search.
* Accessing the '/me' hash url without being logged in now shows the error page.
* Logging out now returns you to the home page.
