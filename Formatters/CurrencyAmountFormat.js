class CurrencyAmountFormat {
    constructor() {
        this.currencyAmountFormat = {
            MyBook : { VISA: 0.01, AMEX: 1 },
            MyShop : { VISA: 0.001, AMEX: 1},
            MyFlight: { VISA: 0.01, AMEX: 1}
        }
    }

    // The method maps over the data and for each line checks if the merchant name and the processor
    // is supported if so multiplies the amount in the line by the format value 
    // for the merchant and processor and sets the value of AmountUSD
    format(data) {
        return data.map(line => {
            if(this.currencyAmountFormat[line['MerchantName']] == null) {
                throw new Error("Merchant unsupported")
            }
            if(this.currencyAmountFormat[line['MerchantName']][line['ProcessorName']] == null) {
                throw new Error("Processor unsupported")
            }
            line['AmountUSD'] = Number(line['Amount']) * this.currencyAmountFormat[line['MerchantName']][line['ProcessorName']]
            return line
        })
    }
}

module.exports = CurrencyAmountFormat