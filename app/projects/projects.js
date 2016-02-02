angular.module('projects', [])

//main controller for page
.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('app/projects/projects.php')
	.success(function(response){
		$scope.projects = response;
	});
	
	//variable that controls whether the "add new project" is displayed or not
	$scope.add_new_project = false;
	
	/*
	* Function used by child controller to hide the overlay
	*/
	$scope.hideOverlay = function(){
		$scope.add_new_project = false;
	};
}])

/*
* Controller used for creating a new project.
*
* Services: $http - used for server requests
			$state - ui-router service used to programmatically change router state
*/
.controller('NewProjectCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
	$scope.project = {};
	
	//used to populate the status select options
	$http.get('app/projects/project_dash/get_status_codes.php', {cache: true}).then(function(response){
		$scope.status_codes = response.data;
	});
	
	/*
	* Submits the values for the new project to the server.  Server responds with the ID of the newest
	* project which is used to programmatically route to the new project's page
	*/
	$scope.createProject = function(){
		$http.post('app/projects/new_project.php', $scope.project).then(function(response){
			$state.go('project', {"projectID": response.data});
		});
	};
	
	/*
	* Resets project to an empty object (to clear fields) and then calls parent's function to hide
	* the overlay.
	*/
	$scope.close = function(){
		$scope.project = {};
		$scope.$parent.hideOverlay();
	};
}])

/*
* Element directive that displays a card for each project.  Cards have the project name, description,
* hours, and are color coded and sorted by status.
*/
.directive('card', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/projects/project-card.tpl.html'
	};
})

/*
* Element directive for displaying the "new project" card.
*/
.directive('newProjectCard', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/projects/new-project-card.tpl.html'
	};
});
							