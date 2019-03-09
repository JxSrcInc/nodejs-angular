const Util = require('./util.js');
const fs = require('fs');
class AccountManager {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.map = {
            jxsrc: new AccountJxsrc(),
            '1013': new AccountRental(2),
            '5376': new AccountRental(2),
            '9076': new AccountRental(2),
            '9298': new AccountRental(2),
            '9374': new AccountRental(2),
            '9860': new AccountRental(2),
            '9899': new AccountRental(2),
            '13300': new AccountRental()
        }
    }
    get(filename) {
        console.log(filename);
        for(const key in this.map) {
            if(filename.includes(key)) {
                const account = this.map[key];
                account.setFilename(this.rootDir+'/data/'+filename);
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
    getSrcFiles() {
        return fs.readdirSync(this.rootDir+'/data');
    }
}

class AccountJxsrc {
    setFilename(filename) {
        this.filename = filename;
    }
    getFilename() {
        return this.filename;
    }
    convert(data) {
        if (data.Date && (data.Expense || data.Revenue)) {
//            console.log(data)
            let val;
            if (data.Expense.length == 0) {
                // Income
                val = parseFloat(data.Revenue);
            } else {
                val = -parseFloat(data.Expense);
            }
            const date = new Date(data.Date);
            let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//            console.log(formatted_date + "," + val + "," + data.Merchant);
            return { 'date': formatted_date, 'val': val, 'merchant': data.Merchant, 'note': data.Note };
        }

    }
    getCategories() {
        return  ['Receivable',
        'Tax preparation',
        'Computer service',
        'Insurance',
        'Office expanse',
        'Postage',
        'Telephone',
        'Travel expense',
        'Uniforms',
        'Meals (100%)',
        'Meals (50%)',
        'Unemployment',
        'HSA contribution',
        'HSA fee',
        'Property tax',
        'Gift card'
        ];
    }
}

class AccountRental {
    constructor(split = 1) {
        this.split = split;
    }
    setFilename(filename) {
        this.filename = filename;
    }
    getFilename() {
        return this.filename;
    }
    convert(data) {
        if (data.Date && (data.Expense || data.Revenue)) {
//            console.log(data)
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
        return  ['Receivable',
        'Test'
        ];
    }
}

module.exports = AccountManager;
/*
module.exports = {
    FileTransferManager: FileTransferManager,
    FileTransfer_Transaction: FileTransfer_Transaction
}
*/