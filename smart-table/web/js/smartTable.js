// Component - SmartTable
function SmaratTableController($scope, $window, $route) {
  var colIndex = 0;
  var maxCol = 20;
  var preMaxCol = maxCol;
  var emptyTable = {"header":[],"firstCol":[],"rows":[]};
  var tables = [];
  var firstColWidth = 3;
  var colWidth = 80;
  var windowWidth = $($window).width();
  $scope.smartTables = {value:[emptyTable]};
  if($scope.$ctrl.table !== undefined && $scope.$ctrl.table.header !== undefined) {
    $scope.smartTables.value = getSmartTables();//{value:[$scope.$ctrl.table]};
  }
  this.$onChanges = function(changes) {

    if($scope.$ctrl.table === undefined) {
        var tables = [];
        tables.push(emptyTable);
        $scope.smartTables.value = tables;
      } else {
        $scope.smartTables.value = getSmartTables();
      }
  };

  angular.element($window).bind('resize', function() {
    windowWidth = $($window).width();
    maxCol = getMaxCol(windowWidth);
    if(maxCol != preMaxCol) {
      preMaxCol = maxCol;
      $scope.smartTables.value = getSmartTables();
      $route.reload();
    }
  });

  function getSmartTables() {
    colIndex = 0;
    maxCol = getMaxCol(windowWidth);
    $scope.cols = maxCol;
    tables = [];
    var t = $scope.$ctrl.table;
    ok = true;
    while(ok) {
      var table = getNextSmartTable(t);
      if(table == null) {
        ok = false;
      } else {
        tables.push(table);
      }
    }
    return tables;
  }

  function getMaxCol(windowWidth) {
    var c = (windowWidth-firstColWidth)/colWidth;
    if($scope.$ctrl.table.header.length < c) {
      return $scope.$ctrl.table.header.length;
    }
    var cRound = Math.round(c);
    if(cRound > c) {
      return cRound-1;
    } else {
      return cRound;
    }
  }

  function getNextSmartTable(table) {
    if(colIndex >= table.header.length) {
      return null;
    }
    var tHeaders = [];
    tHeaders[0] = " ";
    var tColumns = [];
    var tRows = [];
    var leftCols = table.header.length - colIndex;
    for(var i=0; i<maxCol; i++) {
      if(i < leftCols) {
        tHeaders[i+1] = {value:table.header[i+colIndex]};
      } else {
        tHeaders[i+1] = {value:"_____"};
      }
      tColumns.push(i+1);
    }
    for(var i=0; i<table.firstCol.length; i++) {
      var row = [];
      row[0] = table.firstCol[i];
      for(var k=0; k<maxCol; k++) {
        if(k < leftCols) {
          row[k+1] = table.rows[i][k+colIndex];
        } else {
          row[k+1] = {"space":" "};
        }
      }
      tRows.push(row);
    }
    colIndex += Math.min(maxCol, leftCols);
    return {
      headers: tHeaders,
      columns: tColumns,
      rows: tRows
    };
  }
  $scope.getStyle = function(r, c) {
    if(r[c].maxAvCnt > r[c].apptCnt) {
      return "open";
    } else if(r[c].maxAvCnt == r[c].apptCnt) {
      return "closed";
    } else {
      return "overbook";
    }
  };
}

angular.module('myApp').component('smartTable', {
  templateUrl: 'template/smart-table.html',
  controller: SmaratTableController,
  bindings: {
    table: '<'
  }
});
