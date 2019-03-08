const AccountManager = require('./accountManager');

class ActiveAccountManager extends AccountManager {
    constructor() {
        super('C:/Users/JiangJxSrc/Documents/personal/tax/2018');
    }
}
module.exports = ActiveAccountManager;