angular.module('project.dash', [])

.controller('ProjectDashCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	
	var project = {};
	
	$http.get('app/projects/project_dash/get_project_dash.php?project_id=' + $stateParams.projectID)
	.success(function(response){
		project = response;
		
		project.bar_color = 'yellow';
		if(project.hours/project.hours_allotted >= .85) project.bar_color = 'progress-bar-danger';
		else if(project.hours/project.hours_allotted >= .65) project.bar_color = 'progress-bar-warning';
		
		$scope.Project = project;
	});
}]);