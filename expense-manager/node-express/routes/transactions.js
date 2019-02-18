var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
var service = new RecordService();
/* GET transaction listing. */
router.get('/', function(req, res, next) {
  res.json(service.getData());
});

module.exports = router;
