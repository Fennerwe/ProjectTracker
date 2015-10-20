angular.module('projects', [])

.config(function($stateProvider, $urlRouterProvider){
		
		$stateProvider.state('project', {
			url: 'project/:projectID',
			templateUrl: 'projects/projectDash/project-dash.tpl.html',
			controller: 'projectDashCtrl'
		});
})

.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('projects/projects.php')
	.success(function(response){
		$scope.projects = response;
	});
}])

.directive('card', function(){
	return {
		restrict: 'E',
		templateUrl: 'projects/project-card.tpl.html'
	};
});
							