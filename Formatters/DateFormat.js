const moment = require("momnet")

class DatesFormat {
    constructor() {}
    format(data) {
        return data.map(line => {
            line['OrderDate'] = moment(line['OrderDate'],"YYYY-MM-DD").format("YYYY-MM-DD")
            line['DeliveryDate'] = moment(line['DeliveryDate'],"YYYY-MM-DD").format("YYYY-MM-DD")
            return line
        })
    }
}

module.exports = DatesFormat