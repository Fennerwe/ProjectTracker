angular.module('app', ['ui.router',
					   'projects',
					   'project.dash']);

//main module					   
angular.module('app').config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	
	//set up routing
	$stateProvider
		//home page (has main navigation links)
		.state('home', {
			url: '/home',
			templateUrl: 'app/home.tpl.html'
		})
		//page that displays the "contributing users" for viewing/editing
		.state('users', {
			url: '/users',
			templateUrl: 'app/users/users.tpl.html'
		})
		//page that displays all projects
		.state('projects', {
			url: '/projects',
			templateUrl: 'app/projects/projects.tpl.html',
			controller: 'ProjectsCtrl'
		})
		//page for an individual project, uses project id
		.state('project', {
			url: '/project/:projectID',
			templateUrl: 'app/projects/project_dash/project-dash.tpl.html',
			controller: 'ProjectDashCtrl'
		});
});