class Duplicate {
    constructor () {}

    // The filter() method filters the data array to return only objects that do not have a duplicate value
    // for the OrderID property.
    async filter(data) {
        let filterOutData = []
        const mySet = new Set()
        let filteredData = data.filter((line) => {
            if(mySet.has(line["OrderID"])) {
                filterOutData.push(line)
                return false
            }
            mySet.add(line["OrderID"])
            return true
        })
        return { data, filteredData, filterOutData }
    }
}

module.exports = Duplicate