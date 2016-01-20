angular.module('usermodule', ['ui.router', 'Routing', 'ngMaterial', 'ngMessages', 'Service'])

	.config(function($stateProvider, $urlRouterProvider, routerProvider) {
		$stateProvider
			.state('user', {
				url: '/user',
				abstract: true,
				parent: 'root',
				templateUrl: 'templates/user/user.html'
			})

			.state('user.list', {
				url: '',
				partent: 'user',
				controller: 'UserListController',
				controllerAs: 'list',
				templateUrl: 'templates/user/list.html'
			})
	})

	

	.controller('UserListController',['$scope', '$mdDialog', function($scope, $mdDialog) {
		

		$scope.users = [
            {"name":"jason","phone":"09123456789","address":"123123"},
            {"name":"jack","phone":"0123123123","address":"12312322"},
            {"name":"ckck","phone":"123131","address":"song"}
        ]


        $scope.create = function($event) {
        	$mdDialog.show({
		        controller: 'UserCreateController',
		        controllerAs: 'create',
		        templateUrl: 'templates/dialog/dialog.tmpl.html',
		        parent: angular.element(document.body),
		        targetEvent: $event,
		        clickOutsideToClose:true,
		      })

        }
	}])

	.controller('UserCreateController',['$timeout',
		'$scope', 
		'$mdDialog',
		function($timeout, $scope, $mdDialog) {
			$scope.cancel = function() {
				$mdDialog.cancel();
			}

			$scope.createUser = function() {
				console.log(this.user);
				$mdDialog.hide();
				Service.getUser();
			}
	}])