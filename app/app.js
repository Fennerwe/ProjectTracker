angular.module('app', ['ui.router',
					   'projects']);
					   
angular.module('app').config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'app/home.tpl.html'
		})
		.state('users', {
			url: '/users',
			templateUrl: 'app/users/users.tpl.html'
		})
		.state('projects', {
			url: '/projects',
			templateUrl: 'app/projects/projects.tpl.html',
			controller: 'ProjectsCtrl'
		});
});