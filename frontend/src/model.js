/*  Joshua Santos
    45203083
    Model.js
    .js that contains the functions and fields for the Model class
*/

export class Model {
    constructor(source) {
        this.source = source
        this.data = []
        this.event = new CustomEvent("modelUpdated")
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
                window.dispatchEvent(this.event)
            }
        )
    }

    changeHash(searchTerm) {
        window.location.hash = "!/search/" + searchTerm
        window.dispatchEvent(this.event)
    }

    searchEntries(searchTerm) {
        let foundData = []
        let index = 0;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].attributes.description.includes(searchTerm)) {
                foundData[index] = this.data[i]
                index++
            }
        }
        return foundData
    }
}