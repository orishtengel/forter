
const fs = require('fs')
const path = require("path")


class JSONWriter {
    async write(data, arrayPath ,filename) {
        
        // stringify JSON Object
        let fullpath = ""

        //create the folder needed from the path
        for(let i = 0; i < arrayPath.length - 1; i++) {
            if( i == 0) { fullpath = '../Outputs' }
            else { fullpath = fullpath + "/" + arrayPath[i] }
            try {
                fs.mkdirSync(path.join(__dirname, fullpath), { recursive: true })
            }
            catch (err) {}
        }

        console.log(`${fullpath}/${filename}.json`)
        
        //convers the array into JSON and writes it
        var jsonContent = JSON.stringify(data,null,4);
        fs.writeFile(path.join(__dirname,`${fullpath}/${filename}.json`), jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
}

module.exports = JSONWriter