const fs = require('fs');

class CSVReader {
    constructor() {}

    async read(filepath) {
        const data = await this._readFile(filepath) // using callback for resolve 
        let dataByRows = data.split("\n")
        const params = dataByRows[0].split(",").map(x => x.trim()) // save the parameters from csv file 
        dataByRows = dataByRows.slice(1) // take out the parameters from csv file 
        return dataByRows.map((line) => {
            let splitLine = line.split(",").map(x => x.trim())
            let jsonLine = {}
            params.map((param,index) => {
                if(Number.isNaN(Number(splitLine[index])))
                    jsonLine[param] = splitLine[index]
                else
                    jsonLine[param] = Number(splitLine[index])  

            })
            return jsonLine
        })
    }

    async _readFile(filepath) {
        return new Promise((resolve,reject) => {
            fs.readFile(filepath, (err,data) => {
                if(err) {
                    reject(err) 
                    return
                }
                resolve(data.toString('utf-8'))
            })
        })
    }
}

module.exports = CSVReader