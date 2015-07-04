app.controller('MyCarCtrl', function($scope, $state) {
	$scope.goToMap = function(type, category) {
		$state.go('map', { mapType: type, mapCategory: category });
	};
});