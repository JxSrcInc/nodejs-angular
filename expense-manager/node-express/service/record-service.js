const Util = require('../model/util.js');
const Records = require('../model/records.js');
class RecordService {
    constructor() {
        if(this.src == undefined) {
            const results = Util.load('C:/Users/JiangJxSrc/Documents/personal/JxSrc/transaction/2018/transaction.csv');
            this.src = new Records(results);
        };
    }
    getData() {
        return this.src;
    }
}
module.exports = RecordService;