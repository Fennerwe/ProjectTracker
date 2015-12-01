angular.module('project.dash', ['ngAnimate',
								'services.project_data'])

.controller('ProjectDashCtrl', ['$scope', 'projectData', '$stateParams', function($scope, projectData, $stateParams){
	
	projectData.getProject($stateParams.projectID).then(function(data){
		$scope.Project = data;
	});
	
	$scope.overlay = '';
	
	$scope.edit = function(type){
		projectData.updateEditFields(type);
		showOverlay('edit');
	};
	
	$scope.add = function(type){
		projectData.setAddAction(type);
		showOverlay('add');
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

.controller('ProjectAddCtrl', ['$scope', 'projectData', function($scope, projectData){
	
	$scope.$watch(
		function(){
			return projectData.getAddAction();
		},
		function(newVal){
			$scope.add_action = projectData.getAddAction();
		}
	);
	
	$scope.save = function(){
		projectData.addData();
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

.directive('showhidden', function() {
    return {
        link : function(scope, element, attrs) {
            element.parent().parent().bind('mouseenter', function() {
                element.css('visibility', 'visible');
            });
            element.parent().parent().bind('mouseleave', function() {
                 element.css('visibility', 'hidden');
            });
        }
    };
})

.directive('edit', function(){
	return {
		restrict: 'E',
		scope: {
			type: '@'
		},
		controller: ['$scope', function($scope){
			$scope.edit = function(type){
				$scope.$parent.edit(type);
			};
		}],
		template: '<span><i class="fa fa-pencil-square-o" ng-click="edit(type)" ></i></span>'
	};
})

.directive('addButton', function(){
	return {
		restrict: 'E',
		scope: {
			type: '@'
		},
		template: '<button type="button" class="btn btn-success btn-xs" ng-click="$parent.add(type)">Add<span style="margin-left: 5px;"><i class="fa fa-plus-square"></i></span></button>'
	};
});