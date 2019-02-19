const Util = require('../model/util.js');
const Records = require('../model/records.js');
const results = Util.load('./test.csv');
let src = new Records(results);
console.log(src.getRecords());