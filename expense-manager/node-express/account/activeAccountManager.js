const AccountManager = require('./accountManager');
const Config = require('../config.local.js');
class ActiveAccountManager extends AccountManager {
    constructor() {
        super(new Config().rootDir);
    }
}
module.exports = ActiveAccountManager;