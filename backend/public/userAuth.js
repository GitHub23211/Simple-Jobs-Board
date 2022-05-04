export {userAuth}

const userAuth = {
    userData: {},

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
                console.log("User logged in")
                this.userData = data
                console.log(this.userData)
                window.dispatchEvent(new CustomEvent("modelUpdated"))
            }
        )
    }
}