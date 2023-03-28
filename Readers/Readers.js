const CSVReader = require("./CSVReader");

class Readers {
    constructor() {
        this.readers = {
            csv: new CSVReader()
        }
    }
    
    //check if the format is supported, calls the corresponding read method 
    async read(filepath) {
        let format = filepath.split(".")[1]
        if(this.readers[format] == null) {
            throw "unusupported format"
        } 
        return await this.readers[format].read(filepath)
    }
}

module.exports = Readers