angular.module('services.project_data', []).factory('projectData', ['$http', function($http){
	
	function ProjectData(){
		var project = {};
		var editFields = {};
		
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
					fields.status = {status_text: project.status_text, css_class: project.status_class};
					fields.desc = project.desc;
					break;
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
			editFields.pid = project.pid;
			$http.post('app/projects/project_dash/edit_project.php', editFields);
			switch(editFields.action){
				case 'p_info':
					project.title = editFields.title;
					project.status_text = editFields.status.status_text;
					project.status_class = editFields.status.css_class;
					project.desc = editFields.desc;
					break;
			}
		};
	};
	
	return new ProjectData();
}]);