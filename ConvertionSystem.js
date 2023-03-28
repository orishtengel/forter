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

        let datafile = await this.readers.read(filepath)
        let dataFileFormatted = await this.formaters.format(datafile)
        let dataFileEnriched = await this.enrichers.enrich(dataFileFormatted)
        let dataFileFiltered = await this.filters.filter(dataFileEnriched)
        
        let config = args[1].split("/")
        let filename = config[config.length - 1].split(".")[0]
        let arrayPath = config.slice(config.indexOf("Inputs"))
        this.writers.write(dataFileFiltered[1],"json", arrayPath, filename)
        this.writers.write(dataFileFiltered[2],"json", arrayPath, filename + "_duplicates",)
    }
}


//An instance of the ConvertionSystem class is created, and running the procces.
const convert = new ConvertionSystem()
convert.init().then(() => {
    convert.convert(args[1])
})

