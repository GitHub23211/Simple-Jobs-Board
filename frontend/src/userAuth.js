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
    loginInvalid: false,

    //POSTs the username and password in the authInfo object parameter to Strapi's authentication API
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
                    if(!this.loginInvalid) {
                        window.dispatchEvent(new CustomEvent("invalidLogin"))
                        this.loginInvalid = true
                    }
                }
                else {
                    this.userData = data.user
                    this.userjwt = data.jwt
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
                    this.loginInvalid = false
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
    }
}