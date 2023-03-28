const Duplicate = require("./Duplicate")

class Filters {

    constructor() {
        this.filters = [new Duplicate()]
    }

    // check if the format is supported, calls all filter method 
    // by convention all filter method will return array of array
    // Data = {originData, filteredData, filterOutData}
    async filter(data) {
        for(let i = 0; i < this.filters.length; i++) {
            data = await this.filters[i].filter(data)
        }
        return data
    }
}
module.exports = Filters