const Util = require('../../model/util.js');
const Records = require('../../model/records.js');
const RootDir = require('./root');
const results = Util.loadRental_13300(new RootDir().getRootDir()+'interest_13300_LongLeaf_18.csv');
let src = new Records(results);
console.log(src.getRecords());