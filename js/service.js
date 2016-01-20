angular.module('Service', [])

.service('UserService', ['$scope', '$http', 'http://localhost:8000', function($scope, $http, $URL) {
	$scope.getUser = function() {
		$http({method: 'GET', url: $URL}).
			then(function(response) {
				console.log(response.data);
			})
	}
}])