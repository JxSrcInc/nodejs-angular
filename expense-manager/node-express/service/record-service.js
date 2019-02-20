const Util = require('../model/util.js');
const Records = require('../model/records.js');
const fs = require('fs');
 
class RecordService {
    constructor() {
    }
    getData(file) {
        console.log('load: '+file);
        const results = Util.load(file);
        this.src = new Records(results);
        return this.src;
    }
    saveJson(content, file) {
        console.log("save: "+file+'\n'+content);
        fs.writeFileSync(file, content);
        return '{"status":"ok"}';
    }
    getJson(file) {
        console.log('load: '+file);
        var fileContents = fs.readFileSync(file).toString();
        return fileContents;
    }
}
module.exports = RecordService;
 
