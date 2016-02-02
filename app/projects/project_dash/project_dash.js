angular.module('project.dash', ['ngAnimate',
								'services.project_data'])

/*
* Main controller for the project dashboard page.
* 
* Services: projectData - main service for holding/manipulating project data
*			$stateParams - ui-router service used to get router state data
*/
.controller('ProjectDashCtrl', ['$scope', 'projectData', '$stateParams', function($scope, projectData, $stateParams){
	
	//uses projectID in state params to fetch project data
	projectData.getProject($stateParams.projectID).then(function(data){
		$scope.Project = data;
	});
	
	//variable used to indicate if an overlay should be displayed (and which one)
	$scope.overlay = '';
	
	/*
	* Calls function in projectData that sets up the fields that are to be edited and then
	* displays the edit overlay.
	*
	* Params: type - (string) the type of data to be edited (project, researcher, grant, user, tech, misc)
	*/
	$scope.edit = function(type){
		projectData.updateEditFields(type);
		showOverlay('edit');
	};
	
	/*
	* Calls functio in projectData that sets up fields for adding a new piece of data to the project
	* and then displays the add overlay.
	*
	* Params: type - (string) the type of data to be added (researcher, grant, user, tech)
	*/
	$scope.add = function(type){
		projectData.setAddAction(type);
		showOverlay('add');
	};
	
	/*
	* Sets overlay display variable to the overlay that needs to be displayed.
	*
	* Params: oly - (string) the overlay to be displayed (add, edit)
	*/
	function showOverlay(oly){
		$scope.overlay = oly;
	};
	
	/*
	* Hides whatever overlay is displayed by setting variable to an empty string.
	*/
	$scope.hideOverlay = function(){
		$scope.overlay = '';
	};
}])

/*
* Controller used for editing a project's data.
*
* Services: $http - used for server requests
*			projectData - service that holds data for the project and is used for manipulating the data between controllers
*			$state - ui-router service for programmatically switching router states
*/
.controller('ProjectEditCtrl', ['$scope', '$http', 'projectData', '$state', function($scope, $http, projectData, $state){
	
	//retrieves status code data for populating select options
	$http.get('app/projects/project_dash/get_status_codes.php', {cache: true}).then(function(response){
		$scope.status_codes = response.data;
	});
	
	//sets a watch on the editFields field in projectData so that when it gets updated, changes are automatically reflected
	$scope.$watch(
		function(){
			return projectData.getEditFields();
		},
		function(newVal){
			$scope.fields = projectData.getEditFields();
		}
	);
	
	/*
	* Uses the saveChanges function in projectData to submit changes to the server and then hides the overlay.
	*/
	$scope.save = function(){
		projectData.saveChanges();
		$scope.$parent.hideOverlay();
	};
	
	/*
	* Uses delete function in projectData to delete the selected piece of data and then hides the overlay.
	*/
	$scope.delete = function(ind){
		projectData.delete(ind);
		
		//If the data to be deleted is the project itself, then route the application back to the projects page
		if($scope.fields.action == 'p_info'){
			$state.go('projects', {});
		}
		$scope.$parent.hideOverlay();
	};
}])

/*
* Controller used for adding new data to a project.
*
* Services: projectData - service that holds data for the project and is used for manipulating the data between controllers
*			$http - used for server requests
*/
.controller('ProjectAddCtrl', ['$scope', 'projectData', '$http', function($scope, projectData, $http){
	
	//Sets the initial type of added data to new (other option is 'existing')
	$scope.d = {select_type: 'new'};
	
	//Gets the existing data for a project (researchers, tech, grants, users)
	$http.get('app/projects/project_dash/get_existing.php?pid=' + projectData.pid, {cache: false}).then(function(response){
		$scope.existing_data = response.data;
	});
	
	//Sets a watch on add_action variable in the projectData service.  add_action determines what type of data the user
	//will add
	$scope.$watch(
		function(){
			return projectData.getAddAction();
		},
		function(newVal){
			$scope.add_action = projectData.getAddAction();
		}
	);
	
	/*
	* Uses addData function the projectData service to save the new data.
	*/
	$scope.save = function(){
		projectData.addData($scope.d);
		
		$scope.close();
	};
	
	/*
	* Used to reset the select_type back to 'new' and then calls parent controller function to hide the overlay.
	*/
	$scope.close = function(){
		$scope.d = {select_type: 'new'};
		$scope.$parent.hideOverlay();
	}
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

//displays an element on mouseover, otherwise visibility is set to hidden so that the element
//takes up space on the page (prevents the rest of the page from jumping around when the element changes
//visibility
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

//Element directive for showing a small edit icon that when clicked will bring up the edit overlay
.directive('edit', function(){
	return {
		restrict: 'E',
		scope: {
			//type is declared as a data attribute on the element and determines what data will
			//be edited
			type: '@'
		},
		controller: ['$scope', function($scope){
			
			/*
			* Calls the parent controller's edit function.
			*
			* Params: type - (string) the type of data to be edited (project, researcher, grant, user, tech, misc)
			*/
			$scope.edit = function(type){
				$scope.$parent.edit(type);
			};
		}],
		template: '<span><i class="fa fa-pencil-square-o" ng-click="edit(type)" ></i></span>'
	};
})

//Element directive for showing an 'add' button.  Used to bring up the add overlay for a specific type of data.
.directive('addButton', function(){
	return {
		restrict: 'E',
		scope: {
			//Type is declared as a data attribute on the element and determines what type of data will be added
			type: '@'
		},
		template: '<button type="button" class="btn btn-success btn-xs" ng-click="$parent.add(type)">Add<span style="margin-left: 5px;"><i class="fa fa-plus-square"></i></span></button>'
	};
});;