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
		'$state',
		'$mdToast',
		function($scope, $mdDialog, $http, $state, $mdToast) {
			$scope.URL = 'http://localhost:8000';
			$http({
				method:'GET', url:$scope.URL+'/users'}).
				then(function(response){
					$scope.users=response.data;
				})

			$scope.destroyDialog = function($event, user) {
				var dialog = $mdDialog.confirm()
						.title('Delete This User?')
						.textContent('User Name:'+ user.name)
						.targetEvent($event)
						.ok('Sure')
						.cancel('Cancel');

				$mdDialog.show(dialog).then(function() {
					$http({
						method:'GET', url:'http://localhost:8000/'+user.id+'/delete'})
						.then(function(response) {
							console.log(response);
							$state.reload();
							$mdToast.show(
								$mdToast.simple()
									.textContent('Success')
									.hideDelay(2000)	
							)
						})
				})
			}

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
								$state.reload();
								$mdToast.show(
									$mdToast.simple()
										.textContent('Success')
										.hideDelay(2000)	
								)
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

	.controller('UserCreateController',['$timeout',
		'$scope', 
		'$mdDialog',
		'$mdToast',
		'$http',
		'$state',
		function($timeout, $scope, $mdDialog, $mdToast, $http, $state) {
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
					$mdToast.show(
						$mdToast.simple()
							.textContent('Success')
							.hideDelay(2000)	
					)
					$state.reload();
				})
				console.log(data)
			};
	}])
