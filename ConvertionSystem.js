const Enrichers = require("./Enrichers/Enrichers");
const Filters = require("./Filters/Filters");
const Formaters = require("./Formatters/Formatters");
const Readers = require("./Readers/Readers");
const Writers = require("./Writers/Writers");

var args = process.argv.slice(1);

// The ConvertionSystem class is defined, which serves as the main class
// responsible for connecting all the other classes and ensuring that they work together.

class ConvertionSystem {
    constructor() {
        this.readers = new Readers()
        this.formaters = new Formaters()
        this.enrichers = new Enrichers(this.readers)
        this.filters = new Filters()
        this.writers = new Writers()
    }

    async init() {
       await this.enrichers.init()
    }

    async convert(filepath) {
        // This method is defined, which takes a file path as an argument and converts the data in the file. 
        // The file is read using the Readers instance, then formatted, enriched, and filtered.
        // Finally, the data is written to two output files using the Writers instance.
        try {
            let datafile = await this.readers.read(filepath)
            let dataFileFormatted = await this.formaters.format(datafile)
            let dataFileEnriched = await this.enrichers.enrich(dataFileFormatted)
            let dataFileFiltered = await this.filters.filter(dataFileEnriched)
            let path = args[1]
            this.writers.write(dataFileFiltered["filteredData"], "json", path)
            this.writers.write(dataFileFiltered["filterOutData"], "json", path , "_duplicates") 
        }
        catch (err) {
            console.log(err)
        }
    }
}

const convert = new ConvertionSystem()
convert.init().then(() => {
    convert.convert(args[1])
})

