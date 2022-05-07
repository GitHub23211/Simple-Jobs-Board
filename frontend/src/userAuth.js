export {userAuth}

const userAuth = {
    userData: null,
    userjwt: null,
    attemptInvalid: false,

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
                    if(!this.attemptInvalid) {
                        window.dispatchEvent(new CustomEvent("invalidLogin"))
                        this.attemptInvalid = true
                    }
                }
                else {
                    this.userData = data.user
                    this.userjwt = data.jwt
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
                    this.attemptInvalid = false
                }
            }
        )
    },

    submitApp: function() {

    },

    getJWT: function() {
        if(this.userjwt) {
            return this.userjwt
        }
        else {
            return null
        }
    },

    userExists: function() {
        if(this.userData) {
            return true
        }
        return false
    }
}