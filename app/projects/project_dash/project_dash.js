angular.module('project.dash', ['ngAnimate',
								'services.project_data'])

.controller('ProjectDashCtrl', ['$scope', 'projectData', '$stateParams', function($scope, projectData, $stateParams){
	
	projectData.getProject($stateParams.projectID).then(function(data){
		$scope.Project = data;
		//sets contextual color on progress bar depending on where the project is
		$scope.Project.bar_color = '';
		if($scope.Project.hours/$scope.Project.hours_allotted >= .85) $scope.project.bar_color = 'progress-bar-danger';
		else if($scope.Project.hours/$scope.Project.hours_allotted >= .65) $scope.Project.bar_color = 'progress-bar-warning';
	});

	/*$http.get('app/projects/project_dash/get_project_dash.php?project_id=' + $stateParams.projectID)
	.success(function(response){
		project = response;
		
		//sets contextual color on progress bar depending on where the project is
		project.bar_color = '';
		if(project.hours/project.hours_allotted >= .85) project.bar_color = 'progress-bar-danger';
		else if(project.hours/project.hours_allotted >= .65) project.bar_color = 'progress-bar-warning';
		
		$scope.Project = project;
	});*/
	
	$scope.overlay = '';
	
	$scope.edit = function(type){
		projectData.updateEditFields(type);
		showOverlay('edit');
	};
	
	function showOverlay(oly){
		$scope.overlay = oly;
	};
	
	$scope.hideOverlay = function(){
		$scope.overlay = '';
	};
}])

.controller('ProjectEditCtrl', ['$scope', '$http', 'projectData', function($scope, $http, projectData){
	$http.get('app/projects/project_dash/get_status_codes.php', {cache: true}).then(function(response){
		$scope.status_codes = response.data;
	});
			
	$scope.$watch(
		function(){
			return projectData.getEditFields();
		},
		function(newVal){
			$scope.fields = projectData.getEditFields();
		}
	);
	
	$scope.save = function(){
		projectData.saveChanges();
		$scope.$parent.hideOverlay();
	};
}])

//displays edit/delete icons for a single item
.directive('showonhover', function() {
	return {
        link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                element.css('display', 'inline-block');
            });
            element.parent().bind('mouseleave', function() {
                 element.css('display', 'none');
            });
		}
    };
})

//displays the edit/delete icons for a group of items instead of a single one
.directive('showonhover2', function() {
    return {
        link : function(scope, element, attrs) {
            element.parent().parent().bind('mouseenter', function() {
                element.css('display', 'inline-block');
            });
            element.parent().parent().bind('mouseleave', function() {
                 element.css('display', 'none');
            });
        }
    };
})

.directive('edit', function(){
	return {
		restrict: 'E',
		scope: {
			type: '@',
		},
		controller: ['$scope', function($scope){
			$scope.edit = function(type){
				$scope.$parent.edit(type);
			};
		}],
		template: '<span><i class="fa fa-pencil-square-o" ng-click="edit(type)" ></i></span>'
	};
});