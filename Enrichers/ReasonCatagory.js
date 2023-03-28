class ReasonCatagory {
    constructor(readers, configFilePath) {
        this.readers = readers
        this.configFilePath = configFilePath
        this.codes = []
        this.config = { AMEX: "AMERICAN_EXPRESS" , VISA: "VISA"}
    }

    // The init() method is defined, which reads the contents of the file specified by configFilePath
    // and assigns them to the codes instance variable.
    async init () {
        this.codes = await this.readers.read(this.configFilePath)
    }

    // The enrich() method maps over each object in the data array and checks if the ReasonCode
    // and ProcessorName properties of each object match those in the codes instance variable.
    // If there is a match, the enrich() method adds a ReasonCatagory property to the object,
    // and its value is taken from the Reasoncategory property of the matching object in codes. 
    enrich(data) {
        return data.map((line) => {
            let resp = this.codes.find((code) => code["ReasonCode"] == line["ReasonCode"] && code["Processor"] == this.config[line["ProcessorName"]])
            if(resp == null) {
                throw `Unsupported reason code ${line["ReasonCode"]} & processor ${line["ProcessorName"]}.`  
            }
            line["ReasonCatagory"] = resp["Reasoncategory"]
            return line
        })
    } 
}

module.exports = ReasonCatagory