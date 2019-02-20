var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
var service = new RecordService();
/* GET categories. */
router.get('/', function(req, res, next) {
  const params = req.query;
  const file = params['json'];
  res.json(service.getJson(file));
});
/* POST categories. */
router.post('/', function(req, res, next) {
  const params = req.query;
  const file = params['json'];
  // content-type = application/json
  const content = JSON.stringify(req.body);
  /* content-type = text/plain
  const content = req.body;
  */
  res.json(service.saveJson(content, file));
});
module.exports = router;
 