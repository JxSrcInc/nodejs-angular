var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
var service = new RecordService();
/* GET transaction listing. */
router.get('/', function(req, res, next) {
  const file = req.param("src");
  res.json(service.getData(file));
});

module.exports = router;
