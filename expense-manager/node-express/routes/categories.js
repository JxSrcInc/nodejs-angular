var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
const Config = require('../config.local.js');
var service = new RecordService();
const config = new Config();
/* GET categories. */
router.get('/', function(req, res, next) {
  const params = req.query;
  const file = params['json'];
  let lastYearFile = config.lastYearDir+'/repository/'+file;
  const i = lastYearFile.indexOf('.json')-3;
  if(lastYearFile.charAt(i) == '_') {
    const year = parseInt(lastYearFile.substring(i+1, i+3))-1;
    lastYearFile = lastYearFile.substring(0,i)+"_"+year.toString()+".json";
  }
  console.log(lastYearFile);
  res.json({categories:service.getJson(file),lastYear:service.getFile(lastYearFile)});
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
 