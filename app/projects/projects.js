angular.module('projects', [])

.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('app/projects/projects.php')
	.success(function(response){
		$scope.projects = response;
	});
}])

.directive('card', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/projects/project-card.tpl.html'
	};
})

.directive('newProjectCard', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/projects/new-project-card.tpl.html'
	};
});
							