/*  Joshua Santos
    45203083
    Model.js
    .js that contains the functions and fields for the Model class
*/

export class Model {
    constructor(source) {
        this.source = source
        this.data = []
    }

    fetchData() {
        fetch(this.source)
        .then(
            (response) => {
                return response.json()
            }
        )
        .then(
            (data) => {
                this.data = data.data
                let event = new CustomEvent("modelUpdated");
                window.dispatchEvent(event)
            }
        )
    }
}