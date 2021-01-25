const Loader = require('./loader');
const Records = require('../model/records.js');
const fs = require('fs');
const ActiveAccountManager = require('../account/activeAccountManager');


class RecordService {
     constructor() {
         this.repoDir = new ActiveAccountManager().getRootDir()+'/repository/';
    }
    /**
     * get transaction csv file
     * @param {*} file 
     */
    getData(file) {
        console.log('RecordService.load: ' + file);
        return new Promise(async function (resolve, reject) {
            const fileTransfer = new ActiveAccountManager().get(file);
            if (fileTransfer) {
                try {
                    const results = await new Loader().load(fileTransfer);
                    var src = new Records(results);
                    resolve(src);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject('Cannot find FileTransfer for ' + file);
            }
        })
    }
    /**
     * save json file
     * @param {*} content 
     * @param {*} file 
     */
    saveJson(content, file) {
        file = this.repoDir+file;
        console.log("save: " + file + '\n' + content);
        fs.writeFileSync(file, content);
        return '{"status":"ok"}';
    }
    /**
     * get json file
     * @param {*} file 
     */
    getJson(file) {
        file = this.repoDir+file;
        console.log('load Json: ' + file);
        var fileContents = fs.readFileSync(file).toString();
        return fileContents;
    }
    getFile(file) {
        console.log('load File: ' + file);
        var fileContents = fs.readFileSync(file).toString();
        return fileContents;
    }

}
module.exports = RecordService;

