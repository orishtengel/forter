const JSONWriter = require("./JSONWriter")

//The Writers class is defined, which serves as a wrapper for different types of writers, such as JSONWriter.
class Writers {
    constructor() {
        this.writers = {
            json: new JSONWriter()
        }
    }

    //check if the format is supported, the write() method calls the corresponding writer's write() method 
    async write(data, format, arrayPath, filename) {
        if(this.writers[format] == null) {
            throw "unusupported format"
        } 
        return await this.writers[format].write(data, arrayPath, filename)
    }
}
module.exports = Writers