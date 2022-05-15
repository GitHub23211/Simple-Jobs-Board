# COMP2110 Web Development Assignment

This project implements the Bob's Jobs web application for the COMP2110 
Web Development assignment.  

Full details of the assignment requirements are in [the doc folder](doc/assignment.md). 

## Getting Started

Once you have cloned a copy of this repository locally you need to install the 
dependancies using `npm`.  This requires that you have `node` and `npm` installed.  

The overall project consists of two sub-projects for the backend and the frontend.
Each is independant in terms of code and the backend project (Strapi) will have
its own `package.json` file and node modules installed.  You will need to create
that project when the time comes.

In the main folder, you need to install the project dependencies (`http-server`
to run the frontend server and `cypress` for testing):

```shell
npm install
```

Once you have done this you can run the frontend server from the main project
directory with:

```shell
npm run frontend
```

To run the tests you can open up the Cypress GUI:

```shell
npm run cypress
```

The tests are split into 12 separate files so that we can run them automatically
as part of the Github Classroom grading.  Initially the tests for levels 1 and 2
are provided.  Otherse will be added later.  You may not change anything about
the tests (we would be able to see from the git logs).

## Level 3 and 4

Details of these levels are now in the [assignment spec](doc/assignment.md).

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