const Util = require('../model/util.js');
const Loader = require('./loader');
const Records = require('../model/records.js');
const fs = require('fs');
const FileTransferManager = require('../fileTransfer/fileTransferManager');


class RecordService {
     constructor() {
         this.repoDir = new FileTransferManager().getRoot()+'/repository/';
    }
    getData(file) {
        console.log('load: ' + file);
        return new Promise(async function (resolve, reject) {
            const fileTransfer = new FileTransferManager().get(file);
            console.log('record-service: '+fileTransfer);
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
    saveJson(content, file) {
        file = this.repoDir+file;
        console.log("save: " + file + '\n' + content);
        fs.writeFileSync(file, content);
        return '{"status":"ok"}';
    }
    getJson(file) {
        file = this.repoDir+file;
        console.log('load: ' + file);
        var fileContents = fs.readFileSync(file).toString();
        return fileContents;
    }
}
module.exports = RecordService;

