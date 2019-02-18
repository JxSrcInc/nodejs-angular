function ChartsController($scope, TableService) {
	$scope.dataSource = getDataSource();
	function getDataSource() {
		var data = TableService.getCounts($scope.$ctrl.table);
		return data;
	};
	this.$onChanges = function(changes) {
		$scope.dataSource = getDataSource();
	};

}

angular.module('myApp').component('charts', {
  templateUrl: 'template/charts.html',
  controller: ChartsController,
  bindings: {
    table: '<'
  }
});
