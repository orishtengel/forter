class CurrencyToUSD {
    constructor() {
        this.exchangeRate = { EUR: 0.5, AUD: 0.333, USD: 1 }
    }

    //the enrich() method adds an AmountUSD property to the object, which is calculated 
    //by multiplying the value of the AmountUSD property by the exchange rate of the currency code in the exchangeRate instance variable.
    enrich(data) {
        return data.map((line) => {
            if (this.exchangeRate[line["Currency"]] == null) {
                throw new Error( "Unsupported exchange rate")
            }
            line['AmountUSD'] = Math.round(Number(line["AmountUSD"]) * Number(this.exchangeRate[line["Currency"]]))
            return line
        })
    } 
}

module.exports = CurrencyToUSD