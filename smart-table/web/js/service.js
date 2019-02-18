var CountService = angular.module('CountService', [])
.service('TableService', function () {
  this.getTable = function(titil) {
    var found = undefined;
    JXSRC.tableList.forEach(function(table) {
      if(titil === table.title) {
        found = table;
      }
    });
    return found;
  }
  this.createTable = function(cols,rows,start,title,remote) {
    if(remote) {
      var  url = "createTable?cols="+$routeParams.cols+"&rows="+$routeParams.rows+"&start="+$routeParams.start;
      $http({
        mkethod: "GET",
        url: url
      })
  	  .then(function(response) {
        JXSRC.tableList.push({title:title, data:response.data, index:JXSRC.tableList.length});
  	   },function(error) {
        JXSRC.urlError = error;
      }); // end then and http
    } else {
      JXSRC.tableList.push({title:title, data:buildTable(cols,rows,start), index:JXSRC.tableList.length});
    }
  };
  function buildTable(cols,rows,start) {
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
    this.getCounts = function (table) {
      return {
      "chart": {
        "caption": table===undefined?'':table.title,
        "xAxisName": "Appointment Count",
        //more chart properties
      },
      "data": count(table)
      };
    };
    function count(table) {
      if(table === undefined) {
        return [];
      }
      var open = 0;
      var close = 0;
      var overbook = 0;
      table.data.rows.forEach(function(day) {
        day.forEach(function(time){
          if(time.apptCnt < 3) {
            open++;
          } else if(time.apptCnt == 3) {
              close++;
          } else {
            overbook++;
          }
        });
      });

      return [
        { "label": "Open", "value": open },
        { "label": "Close", "value": close },
        { "label": "Over Book", "value": overbook }
      ];
    }
});
