const RecordService = require('../../service/record-service');
const service = new RecordService();

console.log(service.getData('jxsrc.csv'));