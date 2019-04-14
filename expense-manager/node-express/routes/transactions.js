var express = require('express');
var router = express.Router();
var RecordService = require('../service/record-service.js');
var service = new RecordService();
/* GET transaction listing. */
router.get('/', async function(req, res, next) {
  const file = req.param("src");
  try {
    const data = await service.getData(file);
   res.json(data);
  } catch(err) {
    res.status(404);
    res.json(err);
  }
});

module.exports = router;
