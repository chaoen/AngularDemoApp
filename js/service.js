angular.module('App', [])

.service('UserService', ['$scope', '$http', 'http://localhost:8000', function($scope, $http, $URL) {
	$scope.getUser = function() {
		$http({method: 'GET', url: 'http://localhost:8000/users'}).
			then(function(response) {
				console.log(response);
			})
	}
}])