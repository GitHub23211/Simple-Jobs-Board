/*  Joshua Santos
    45203083
    bindedFunctions.js
    Functions that the bind functions in main.js bind to different buttons on the webpage.
*/

export {bindFuncs} 
import {Model} from "./model.js"
import {userAuth} from "./userAuth.js"

const bindFuncs = {

    //Creates an object from the information inputted by the user
    //on the registration page and passes it to register() from userAuth.js
    registerUser: function() {
        event.preventDefault()
    
        const registerForm = {
            'username': this.elements['username'].value,
            'email': this.elements['email'].value,
            'password': this.elements['password'].value
        }
        userAuth.register(registerForm)
    },
    
    //Creates an object from the information inputted by the user
    //on the login form on the top right of the webpage and
    //passes it to login() from userAuth.js
    authenticateUser:  function () {
        event.preventDefault()
        const authInfo = {
           identifier: this.elements['username'].value,
           password: this.elements['password'].value 
        }
        userAuth.login(authInfo)
    },

    //Sets userData to null then refreshes the page
    //This means any checks for the user existing 
    //will now return false which means the webpage
    //will now treat the user as an unauthenticated guest
    logout: function() {
        userAuth.userData = null
        Model.changeHash('home')
        window.dispatchEvent(new CustomEvent("modelUpdated"))
    },

    //Manually changes the hash url to match the search hash URL
    //stored in the routes table in router.js and adds the
    //pathInfo.id portion manually as well.
    searchJobs: function() {
        event.preventDefault()
        Model.changeHash("!/search/", this.elements[0].value)
    },

    //Creates an object from the information inputted by the user
    //in the job application form, and passes it along with the
    //user's JWT to postApplication() in model.js
    //Then changes the hash URl to show the jobs the user has applied for
    submitApplication: function() {
        event.preventDefault()
        const jobAppData = {
                'text': this.elements['text'].value,
                'job': Model.foundData.data[0],
                'user': userAuth.userData
            }
        Model.postApplication(jobAppData, userAuth.getJWT())
        Model.changeHash("!/me", "")
    }
}