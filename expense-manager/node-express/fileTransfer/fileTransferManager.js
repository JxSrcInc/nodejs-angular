const Util = require('./util.js');

class FileTransferManager {
    constructor() {
        this.root = 'C:/Users/JiangJxSrc/Documents/personal/tax/2018';
    }
    get(filename) {
        console.log("get " + filename);
        if (filename.includes('transaction')) {
            return new FileTransfer_Transaction(this.root + '/data/' + filename);
        } else
        if (filename.includes('13300')) {
            return new FileTransfer_Rental(this.root + '/data/' + filename);
        } else
        if (filename.includes('9899')) {
            return new FileTransfer_Rental(this.root + '/data/' + filename, 2);
        } else {
            return null;
        }
    }
    getRoot() {
        return this.root;
    }
}

class FileTransfer_Transaction {
    constructor(filename) {
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
}

class FileTransfer_Rental {
    constructor(filename, split = 1) {
        this.filename = filename;
        this.split = split;
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
}

module.exports = FileTransferManager;
/*
module.exports = {
    FileTransferManager: FileTransferManager,
    FileTransfer_Transaction: FileTransfer_Transaction
}
*/