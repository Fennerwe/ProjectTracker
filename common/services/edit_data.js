angular.module('services.project_data', []).factory('projectData', ['$http', function($http){
	var project = {};
	var editFields = {};
	var deleteFields = {};
	
	function ProjectData(){
		var project = {};
		this.getProject = function(projectID){
			return $http.get('app/projects/project_dash/get_project_dash.php?project_id=' + projectID, {cache: false});
		};
		
		this.updateEditFields = function(type, idnum){
			var fields;
			switch(type){
				case 'p_info':
				case 'researcher':
				case 'grant':
				case 'user':
				case 'tech':
				case 'extra':
			}
			
			editFields = fields;
		};
		
		this.updateDeleteFields = function(type, idnum){
			var fields;
			switch(type){
				case 'p_info':
				case 'researcher':
				case 'grant':
				case 'user':
				case 'tech':
				case 'extra':
			}
			
			deleteFields = fields;
		};
	};
	
	return new ProjectData();
}]);