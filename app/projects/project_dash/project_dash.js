angular.module('projectDash', []);

angular.module('projectDash').controller('projectDashCtrl', ['$scope', '$http', function($scope, $http){
	/*$http.get('get_project_dash.php')
	.success(function(response){
		$scope.Project = response;
	});*/
	
	var project = {};
	
	project.title	= 'Test Project';
	project.desc	= 'A test project to demo the project dashboard for the research project tracking app';
	
	project.status_text	= 'Active';
	project.status_class = 'status-active';
	
	project.hours = 15;
	project.hours_allotted = 80;
	
	project.researchers = [{first_name: 'John', last_name: 'Smith'}, {first_name: 'Jane', last_name: 'Doe'}];
	
	project.grants = [{name: 'Test Grant', amount: 10000.00}]
	
	project.contributing_users = [{name: 'Trey Fenner', hours_contributed: 15}]
	
	project.dep_server = 'ovzve25-56.appstate.edu'
	
	project.git_repo = 'https://vso.appstate.edu/tfs/ITS%20Research/_git/ResearchProjectTracker'
	
	project.start_date = Date.now();
	
	project.tech = ['AngularJS', 'HTML5', 'MySQL'];
	
	$scope.Project = project;
}]);