class Duplicate {
    constructor () {}

    // The filter() method filters the data array to return only objects that do not have a duplicate value
    // for the OrderID property.
    async filter(data) {
        let duplicateData = []
        const mySet = new Set()
        let filterData = data.filter((line) => {
            if(mySet.has(line["OrderID"])) {
                duplicateData.push(line)
                return false
            }
            mySet.add(line["OrderID"])
            return true
        })
        return [data, filterData, duplicateData]
    }
}

module.exports = Duplicate