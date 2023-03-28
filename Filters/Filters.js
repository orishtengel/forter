const Duplicate = require("./Duplicate")

class Filters {

    constructor() {
        this.filters = [new Duplicate()]
    }

    // check if the format is supported, calls all filter method 
    // by convention all filter method will return array of array
    // Data = {originData, filteredData, filterOutData}
    async filter(data) {
        let filterArray = {originData: data, filteredData: [], filterOutData: []}
        filterArray = await this.filters[0].filter(data)
        for(let i = 1; i < this.filters.length; i++) {
            let _filterArray = await this.filters[i].filter(filterArray["filteredData"])
            filterArray["filteredData"] = _filterArray["filteredData"]
            filterArray[filterOutData] = [...filterArray["filterOutData"], ..._filterArray["filterOutData"]]
        }
        return filterArray
    }
}
module.exports = Filters