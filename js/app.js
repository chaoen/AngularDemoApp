'use strict'

angular.module('App', ['ui.router', 'Routing', 'usermodule', 'ngMaterial'])

    .config(function ($stateProvider, $urlRouterProvider, routerProvider) {
        $stateProvider
          .state('root', {
            abstract: true,
            url: '',
            views: {
              '': {
                templateUrl: 'templates/header/header.html',
              },
              'header@root': {
                templateUrl: 'templates/header/header.html',
              }
            }
          })

          .state('home', {
            url: '/',
            parent: 'root',
            templateUrl: 'templates/home/home.html'
          });

        $urlRouterProvider.otherwise('/');

        routerProvider.setCollectionUrl('js/routeCollection.json');
    })

    .controller('MainController', function ($scope, router) {
        $scope.reload = function() {
            router.setUpRoutes();
        };
    })

    