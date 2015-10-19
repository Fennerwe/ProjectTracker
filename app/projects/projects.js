angular.module('projects', ['ui-router']);

angular.module('projects').config(function($stateProvider, $urlRouterProvider){
		
		$stateProvider.state('project', {
			url: 'project/:projectID',
			templateUrl: 'projectDash/project-dash.tpl.html',
			controller: 'projectDashCtrl'
		});
});

angular.module('projects').controller('projectsCtrl', ['$scope', '$http', function($scope, $http){
	
}]);

angular.module('projects').directive('card', function(){
	return {
		restrict: 'E',
		templateUrl: 'project-card.tpl.html'
	};
});
							