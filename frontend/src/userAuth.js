export {userAuth}

const userAuth = {
    userData: null,
    userjwt: null,

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
                    window.alert("Invalid username or password")
                }
                else {
                    this.userData = data.user
                    this.userjwt = data.jwt
                    window.dispatchEvent(new CustomEvent("modelUpdated"))
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

    userExist: function() {
        if(this.userData) {
            return true
        }
        return false
    }
}