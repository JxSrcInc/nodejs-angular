var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
const fs = require('fs');
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
  if(fs.existsSync(lastYearFile)) {
    console.log(lastYearFile);
    res.json({categories:service.getJson(file),lastYear:service.getFile(lastYearFile)});
  } else {
    console.log(lastYearFile+" does not exist.");
    // not exist -> set category.records = []
    const strFile = service.getJson(file);
    let clone = JSON.parse(strFile);
    Object.keys(clone).some((key) => {
      clone[key].records = [];
    });
    res.json({categories:strFile,lastYear:JSON.stringify(clone)});
  }
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
 