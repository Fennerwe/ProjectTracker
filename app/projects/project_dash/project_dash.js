angular.module('project.dash', [])

.controller('ProjectDashCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	
	var project = {};
	
	$http.get('app/projects/project_dash/get_project_dash.php?project_id=' + $stateParams.projectID)
	.success(function(response){
		project = response;
		
		//sets contextual color on progress bar depending on where the project is
		project.bar_color = '';
		if(project.hours/project.hours_allotted >= .85) project.bar_color = 'progress-bar-danger';
		else if(project.hours/project.hours_allotted >= .65) project.bar_color = 'progress-bar-warning';
		
		$scope.Project = project;
	});
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

.directive('editDelete', function(){
	return {
		restrict: 'E',
		scope: {
			type: '@',
			idnum: '@'
		},
		controller: ["$scope", "$http", function($scope, $http){
			$scope.edit = function(type, idnum){
				alert(type);
			};
			
			$scope.deleteData = function(type, idnum){
				alert(type);
			};
		}],
		template: '<span><i class="fa fa-pencil-square-o" ng-click="edit(type, idnum)" ></i><i class="fa fa-times" ng-click="deleteData(type, idnum)"></i></span>'
	};
});