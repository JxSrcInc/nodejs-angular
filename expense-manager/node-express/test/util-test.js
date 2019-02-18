const Util = require('../model/util.js');
const Records = require('../model/records.js');
const results = Util.load('C:/Users/JiangJxSrc/Documents/personal/JxSrc/transaction/2018/transaction.csv');
let src = new Records(results);
console.log(src.getRecords());