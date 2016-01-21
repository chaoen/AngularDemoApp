angular.module('usermodule', ['ui.router', 'Routing', 'ngMaterial', 'ngMessages'])
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

			.state('user.edit', {
				url: '',
				parent: 'user',
				controller: 'UserEditController',
				controllerAs: 'edit',
				templateUrl: 'templates/dialog/edit.html'
			})
	})

	
	.controller('UserListController',['$scope',
		'$mdDialog',
		'$http',
		function($scope, $mdDialog, $http) {
			// $scope.user = null;
			$scope.URL = 'http://localhost:8000';
			$http({
				method:'GET', url:$scope.URL+'/users'}).
				then(function(response){
					$scope.users=response.data;
				})

			$scope.editDialog = function($event, userId) {
				$mdDialog.show({
					controller: function ($scope, $http, $mdDialog) {
						$http({
							method:'GET', url:'http://localhost:8000/'+userId}).
							then(function(response){
								$scope.user=response.data;
							})
						$scope.cancel = function() {
							$mdDialog.cancel();
						}

						$scope.updateUser = function() {
							Object.toparams = function ObjecttoParams(obj) {
							    var p = [];
							    for (var key in obj) {
							        p.push(key + '=' + encodeURIComponent(obj[key]));
							    }
							    return p.join('&');
							};
							$http({
								method:'POST',
								url:'http://localhost:8000/'+userId+'/update',
								data:Object.toparams(this.user),
								headers: {'Content-Type':'application/x-www-form-urlencoded'}
							}).then(function(response){
								console.log(response.data);
								$mdDialog.cancel();
							})
						}
					},
					templateUrl: 'templates/dialog/edit.html',
					parent: angular.element(document.body),
					targetEvent: $event,
					clickOutsideToClose:true,
				})
			}
        	$scope.createDialog = function($event) {
	        	$mdDialog.show({
			        controller: 'UserCreateController',
			        controllerAs: 'create',
			        templateUrl: 'templates/dialog/create.html',
			        parent: angular.element(document.body),
			        targetEvent: $event,
			        clickOutsideToClose:true,
			    })

        }
	}])

	.controller('UserEditController', ['$timeout',
		'$scope',
		'$mdDialog',
		'$http',
		'$state',
		function($timeout, $scope, $mdDailog, $http, $state) {
			$scope.URL = 'http://localhost:8000';
			// console.log(userId);
			console.log($state);
			$scope.cancel = function() {
				$mdDialog.cancel();
			}

		}])

	.controller('UserCreateController',['$timeout',
		'$scope', 
		'$mdDialog',
		'$http',
		function($timeout, $scope, $mdDialog, $http) {
			$scope.URL = 'http://localhost:8000';
			$scope.cancel = function() {
				$mdDialog.cancel();
			}

			$scope.createUser = function() {
				data = this.user;
				Object.toparams = function ObjecttoParams(obj) {
				    var p = [];
				    for (var key in obj) {
				        p.push(key + '=' + encodeURIComponent(obj[key]));
				    }
				    return p.join('&');
				};
				$http({
					method:'POST',
					url:$scope.URL+'/store',
					data:Object.toparams(data),
					headers: {'Content-Type':'application/x-www-form-urlencoded'}
				}).then(function(response){
					console.log(response.data);
					$mdDialog.cancel();
				})
				console.log(data)
			};
	}])
