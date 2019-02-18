// Controller
JXSRC.module.controller("Ctrl", function($scope, $routeParams, $http, TableService){
  $scope.tableList = JXSRC.tableList;
  if(JXSRC.tableList.length === 0) {
    TableService.createTable(24,2,0,"Table A");
    TableService.createTable(16,5,6,"Table B");
    JXSRC.table = JXSRC.tableList[0];
  }
  $scope.table = JXSRC.table;
  if($routeParams.template === undefined) {
    // added for root access
    if(JXSRC.template === undefined) {
      JXSRC.template = 'help';
    }
  } else {
    JXSRC.template = $routeParams.template
  }
  $scope.template = JXSRC.template;
  $scope.initTemplate = JXSRC.template;
  $scope.selectTable = function(title) {
    if($scope.initTemplate === 'help') {
      JXSRC.template = 'table';
      $scope.template = JXSRC.template;
    }
    var foundTable = TableService.getTable(title);
    if(foundTable === undefined) {
      $scope.error = "Invalid table title: "+title;
    } else {
      $scope.table = foundTable;
      JXSRC.table =  foundTable;
    }
  }
/*
  if($routeParams.server === undefined || $routeParams.server === 'local') {
    $scope.table = TableService.createTable($routeParams.cols,$routeParams.rows,$routeParams.start);
    JXSRC.table = {title:$routeParams.title,data:$scope.table};
  } else {
    var  url = "createTable?cols="+$routeParams.cols+"&rows="+$routeParams.rows+"&start="+$routeParams.start;
    $http({
      mkethod: "GET",
      url: url
    })
	   .then(function(response) {
    $scope.table = response.data;
    JXSRC.table = {title:$routeParams.title,data:response.data};
	},function(error) {
      $scope.error = error;
    });
  }
  */
});
