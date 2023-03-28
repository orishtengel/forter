const moment = require("momnet")

class ProcessingDate {
    constructor() {}

    enrich(data) {
        return data.map((line) => {
            line['ProcessingDate'] = moment(line["OrderDate"]).add('3','day').format('YYYY-MM-DD')
            return line
        })
    } 
}

module.exports = ProcessingDate

