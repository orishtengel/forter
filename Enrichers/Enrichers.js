const CurrencyToUSD = require("./CurrencyToUSD");
const ProcessingDate = require("./ProccesingDate");
const ReasonCatagory = require("./ReasonCatagory");
const path = require("path")

class Enrichers {

    constructor(readers) {
        this.enrichers = [new CurrencyToUSD(), new ProcessingDate() , new ReasonCatagory(readers, path.join(__dirname,'../Files/reason_codes.csv'))]
    }

    async init() {
        await Promise.all(this.enrichers.map( async (enricher) => {
            if(enricher.init) {
                await enricher.init()
            }
        }))
    }

    async enrich(data) {
        for(let i = 0; i < this.enrichers.length; i++) {
           data = await this.enrichers[i].enrich(data)
        }
        return data
    }
}

module.exports = Enrichers