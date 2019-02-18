function HelpController($scope, TableService, $location) {
  var menuContent = [{name:"Table", desc:"View data in table"},
  {name:"Charts", desc:"View data in charts"},
  {name:"Create Table", desc:"Create new table and add it into Navigation"}];
  var menu = [];
  menuContent.forEach(function(m) {
    menu.push({name:m.name,desc:m.desc,length:m.desc.length});
  });
  $scope.menu = menu;
  $scope.tableList = JXSRC.tableList;
  $scope.selectTable = function(title) {
    JXSRC.template = 'table';
    var foundTable = TableService.getTable(title);
    if(foundTable === undefined) {
      $scope.error = "Invalid table title: "+title;
    } else {
      JXSRC.table =  foundTable;
      $location.path('/table/table');
    }
  }
}

angular.module('myApp').component('help', {
  templateUrl: 'template/help.html',
  controller: HelpController
});
