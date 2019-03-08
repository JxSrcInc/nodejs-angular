const Util = require('../../model/util.js');
const Records = require('../../model/records.js');
const RootDir = require('./root');
const results = Util.loadTransaction(new RootDir().getRootDir()+'transaction.csv');
let src = new Records(results);
console.log(src.getRecords());