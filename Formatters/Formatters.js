const CurrencyAmountFormat = require("./CurrencyAmountFormat");
const DatesFormat = require("./DateFormat");

class Formatters {

    constructor() {
        this.formaters = [new CurrencyAmountFormat() , new DatesFormat()]
    }

    //check if the format is supported, calls all format method 
    async format(data) {
        for(let i = 0; i < this.formaters.length; i++) {
           data = await this.formaters[i].format(data)
        }
        return data
    }
}

module.exports = Formatters