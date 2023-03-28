const JSONWriter = require("./JSONWriter")

//The Writers class is defined, which serves as a wrapper for different types of writers, such as JSONWriter.
class Writers {
    constructor() {
        this.writers = {
            json: new JSONWriter()
        }
    }

    //check if the format is supported, the write() method calls the corresponding writer's write() method 
    async write(data, format, path) {
        if(this.writers[format] == null) {
            throw new Error("unusupported format")
        }
        let config = path.split("/")
        let filename = config[config.length - 1].split(".")[0]
        let arrayPath = config.slice(config.indexOf("Inputs"))
        return await this.writers[format].write(data, arrayPath, filename)
    }
}
module.exports = Writers