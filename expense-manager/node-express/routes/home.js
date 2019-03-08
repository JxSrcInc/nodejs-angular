var express = require('express');
var router = express.Router();
const ActiveAccountManager = require('../account/activeAccountManager');
/* GET users listing. */
router.get('/', function(req, res, next) {
  const accountManager = new ActiveAccountManager();
  const map = accountManager.getMap();
  let accounts = [];
  for(const key in map) {
    const categories = map[key].getCategories();
    accounts.push({account:key, categories:categories});
  }
  res.json({homeDir:accountManager.getRootDir(), accounts:accounts,
    acctSrc:accountManager.getSrcFiles()});
});

module.exports = router;
