const Util = require('../../model/util.js');
const Records = require('../../model/records.js');
const RootDir = require('./root');
const results = Util.loadRental_9899(new RootDir().getRootDir()+'Expense_9899 Whiskey_18.csv');
let src = new Records(results);
console.log(src.getRecords());