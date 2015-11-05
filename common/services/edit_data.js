angular.module('services.project_data', []).factory('projectData', ['$http', function($http){

	
	function ProjectData(){
		var project = {};
		var editFields = {};
		var status_codes = {};
		
		$http.get('app/projects/project_dash/get_status_codes.php', {cache: true}).then(function(response){
			status_codes = response.data;
		});
		
		this.getProject = function(projectID){
			return $http.get('app/projects/project_dash/get_project_dash.php?project_id=' + projectID, {cache: false}).then(function(response){
				project = response.data;
				return project;
			});
		};
		
		this.updateEditFields = function(type){
			var fields = {};
			switch(type){
				case 'p_info':
					fields.title = project.title;
					fields.status = project.status_text;
					fields.desc = project.desc;
					fields.status_codes = status_codes;
				case 'researcher':
				case 'grant':
				case 'user':
				case 'tech':
				case 'extra':
			}
			
			fields.action = type;
			editFields = fields;
		};
		
		this.getEditFields = function(){
			return editFields;
		};
		
		this.saveChanges = function(){
			var a = 10;
			a += 10;
		};
	};
	
	return new ProjectData();
}]);