/*  Joshua Santos
    45203083
    userAuth.js
    Object that deals with storing user information
    and validating logins
*/

export {userAuth}

const userAuth = {
    userData: null,
    userjwt: null,
    error: null,

    //Sends a POST request containing the username, email and password from the registerForm object 
    //parameter to Strapi's authentication API to verify and register the user to Strapi's database.
    register: function(registerForm) {
        fetch('http://localhost:1337/api/auth/local/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerForm)
        })
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                if(data.error) {
                    if(Object.keys(data.error.details).length > 0) {
                        this.error = data.error.details.errors
                    }
                    else {
                        this.error = data
                    }
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
                }
                else {
                    this.userData = data.user
                    this.userjwt = data.jwt
                    this.loginInvalid = false
                    window.dispatchEvent(new CustomEvent("registrationSuccess"))
                }
            }
        )
    },

    //Sends a POST request containing the username and password in the authInfo object parameter to Strapi's authentication API
    //to verify and log the user in. If Strapi does not return the user data posted, then
    //dispatch an invalidLogin event. Otherwise, populate the userData and userjwt fields.
    login: function(authInfo) {
        fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authInfo)
            }
        )
        .then( 
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                if(data.error) {
                        window.dispatchEvent(new CustomEvent("invalidLogin"))
                }
                else {
                    this.userData = data.user
                    this.userjwt = data.jwt
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
                }
            }
        )
    },
    

    //Returns the user jwt
    getJWT: function() {
        if(this.userjwt) {
            return this.userjwt
        }
        else {
            return null
        }
    },

    //Checks if the userData field is not null and returns true if it is, false otherwise
    userExists: function() {
        if(this.userData) {
            return true
        }
        return false
    },

    //Sets the error field to null to clear any error messages 
    //left on the registration page
    clearError: function() {
        this.error = null
    }
}