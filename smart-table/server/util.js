exports.createTable = function(cols, rows, start) {
  var t = {"header":[], "firstCol":[], "rows":[]};
  var hLen = parseInt(cols);
  var cLen = parseInt(rows);
  for(var i=0; i<hLen; i++) {
    var time = i+parseInt(start);
    t.header[i] = time+":00";
  }
  for(var i=0; i<cLen; i++) {
    t.firstCol[i] = "2017-01-0"+(1+i);
  }
  for(var i=0; i<cLen; i++) {
    var row = [];
    for(var k=0; k<hLen; k++) {
      var apptCnt =  Math.floor(Math.random() * (4 + 1)) ;
      row[k] = {"apptCnt":apptCnt,"maxAvCnt":3};
    }
    t.rows.push(row);
  }
  return t;
};
