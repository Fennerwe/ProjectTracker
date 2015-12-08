angular.module('projects', [])

.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('app/projects/projects.php')
	.success(function(response){
		$scope.projects = response;
	});
	
	$scope.add_new_project = false;
	
	$scope.hideOverlay = function(){
		$scope.add_new_project = false;
	};
}])

.controller('NewProjectCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	$scope.project = {};
	
	$http.get('app/projects/project_dash/get_status_codes.php', {cache: true}).then(function(response){
		$scope.status_codes = response.data;
	});
	
	$scope.createProject = function(){
		$http.post('app/projects/new_project.php', $scope.project).then(function(response){
			$state.go('project', {"projectID": response.data});
		});
	};
	
	$scope.close = function(){
		$scope.project = {};
		$scope.$parent.hideOverlay();
	};
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
							