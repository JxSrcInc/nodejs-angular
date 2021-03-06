const Util = require('./util.js');
const fs = require('fs');
const Config = require('../config.local.js');

class AccountManager {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.map = {
        }
        const accountMap = new Config().accountMap;
        accountMap.forEach((ele) => {
            if (ele.account == 'AccountJxsrc') {
                this.map[ele.id] = new AccountJxsrc();
            } else
                if (ele.account == 'AccountNNZ') {
                    this.map[ele.id] = new AccountNNZ();
                } else
                    if (ele.account == 'AccountRental') {
                        this.map[ele.id] = new AccountRental(ele.args);
                    } else
                        if (ele.account == 'AccountNewRental') {
                            this.map[ele.id] = new AccountNewRental(ele.args);
                        } else
                            if (ele.account == 'AccountHome') {
                                this.map[ele.id] = new AccountHome();
                            }
        })
    }
    get(filename) {
        console.log("AccountManager.get: " + filename);
        for (const key in this.map) {
            if (filename.includes(key)) {
                const account = this.map[key];
                account.setFilename(this.rootDir + '/data/' + filename);
                return account;
            }
        }
        return null;
    }
    getRootDir() {
        return this.rootDir;
    }
    getMap() {
        return this.map;
    }

    // modified to allow src file name has format key+<additional info>, like jxsrc <year>.csv
    getSrcFiles() {
        let filter = [];
        const files = fs.readdirSync(this.rootDir + '/data');
        for (const key in this.map) {
            let found = undefined;
            for (let i in files) {
                let index = files[i].lastIndexOf(".csv");
                if (index == files[i].length - 4) {
                    const file = files[i]
                    if (file.indexOf(key) >= 0) {
                        found = file
                        break
                    }
                }
            }
            if (found) {
                filter.push(found)
            } else {
                console.warn(key+' has no src file in '+this.rootDir + '/data');
            }

        }
        return filter;
    }
    getJsonFiles() {
        let filter = [];
        for (const key in this.map) {
            const file = this.rootDir + '/repository/' + key + '.json'
            if (fs.existsSync(file)) {
                //             console.log(file)
                filter.push(key + ".json");
            } else {
                console.warn('cannot find ' + file);
            }
        }
        return filter;
    }
    /*
     getSrcFiles() {
         const files = fs.readdirSync(this.rootDir+'/data');
         let filter = [];
         for(let i in files) {
             let index = files[i].lastIndexOf(".csv");
             console.log(index+","+files[i])
             if(index == files[i].length-4) {
                 filter.push(files[i]);
             }
         }
         return filter;
     }
     */
    /*
     getJsonFiles() {
         const files = fs.readdirSync(this.rootDir+'/repository');
         let filter = [];
         for(let i in files) {
             let index = files[i].lastIndexOf(".json");
             if(index == files[i].length-5) {
                 filter.push(files[i]);
             }
         }
         return filter;
     }
 */
}

class AccountJxsrc {
    constructor() {
        this.config = new Config();
    }
    setFilename(filename) {
        this.filename = filename;
    }
    getFilename() {
        return this.filename;
    }
    convert(data) {
        if (data.Date && (data.Expense || data.Income)) {
            let val;
            if (data.Expense.length == 0) {
                // Income
                val = parseFloat(Util.convertToFloat(data.Income));
            } else {
                val = -parseFloat(Util.convertToFloat(data.Expense));
            }
            const date = new Date(data.Date);
            let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return { 'date': formatted_date, 'val': val, 'merchant': data.Merchant, 'note': data.Note };
        }

    }
    getCategories() {
        // array of string
        return this.config.jxSrcCategories;
    }
}

class AccountRental {
    constructor(split = 1) {
        this.split = split;
        this.config = new Config();
    }
    setFilename(filename) {
        this.filename = filename;
    }
    getFilename() {
        return this.filename;
    }
    convert(data) {
        console.log(data)
        if (data.Date && (data.Expense || data.Revenue)) {
            let val;
            if (data.Expense.length == 0) {
                // Income
                val = parseFloat(Util.convertToFloat(data.Revenue));
            } else {
                val = -parseFloat(Util.convertToFloat(data.Expense));
            }
            const date = new Date(data.Date);
            let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            //            console.log(formatted_date + "," + val + "," + data.Merchant);
            return { 'date': formatted_date, 'val': val / this.split, 'merchant': data.Name, 'note': data.Description };
        }

    }
    getCategories() {
        // array of string
        return this.config.rentalCategories;
    }
}

class AccountHome extends AccountJxsrc {
    constructor() {
        super(1);
        this.config = new Config();
    }
    getCategories() {
        // array of string
        return this.config.homeCategories;
    }
}

class AccountNewRental extends AccountRental {
    constructor(split) {
        super(split);
    }
    getCategories() {
        return super.getCategories().concat(['Purchase Price'
        ]);
    }
}

class AccountNNZ extends AccountJxsrc {
    constructor() {
        super(1);
        this.config = new Config();
    }
    getCategories() {
        return this.config.nnzCategories;
    }
}
module.exports = AccountManager;
/*
module.exports = {
    FileTransferManager: FileTransferManager,
    FileTransfer_Transaction: FileTransfer_Transaction
}
*/