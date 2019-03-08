const ftm = require('../../fileTransfer/fileTransferManager.js');

const fileTransferManager = new ftm.FileTransferManager();
console.log(fileTransferManager.get('transaction'));