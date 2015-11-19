angular.module('services.project_data', []).factory('projectData', ['$http', function($http){
	
	function ProjectData(){
		var pid;
		var project = {};
		var editFields = {};
		
		this.getProject = function(projectID){
			pid = projectID;
			return $http.get('app/projects/project_dash/get_project_dash.php?r=full&project_id=' + pid, {cache: false}).then(function(response){
				project = response.data;
				setProjectBarColor();
				return project;
			});
		};
		
		var setProjectBarColor = function(){
			//sets contextual color on progress bar depending on where the project is
			project.bar_color = '';
			if(project.hours/project.hours_allotted >= .85) project.bar_color = 'progress-bar-danger';
			else if(project.hours/project.hours_allotted >= .65) project.bar_color = 'progress-bar-warning';
		};
		
		this.updateEditFields = function(type){
			var fields = {};
			switch(type){
				case 'p_info':
					fields.title = project.title;
					fields.status = {status_text: project.status_text, css_class: project.status_class};
					fields.desc = project.desc;
					break;
				case 'researchers':
					fields.researchers = project.researchers;
					fields.primaries = {};
					fields.researchers.forEach(function(r){
						if(r.pi == 1) fields.primaries[r.r_ind] = 1;
					});
					break;
				case 'grants':
					fields.grants = project.grants;
					break;
				case 'users':
					fields.users = project.contributing_users;
					break;
				case 'tech':
					fields.tech = [];
					project.tech.forEach(function(v){
						fields.tech.push({value: v});
					});
					break;
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
			$http.post('app/projects/project_dash/edit_project.php', editFields).then(function(){
				switch(editFields.action){
					case 'p_info':
						project.title = editFields.title;
						project.status_text = editFields.status.status_text;
						project.status_class = editFields.status.css_class;
						project.desc = editFields.desc;
						break;
					case 'researchers':
						$http.get('app/projects/project_dash/get_project_dash.php?r=researchers&project_id=' + pid, {cache: false}).then(function(response){
							project.researchers = response.data;
						});
						break;
					case 'grants':
						$http.get('app/projects/project_dash/get_project_dash.php?r=grants&project_id=' + pid, {cache: false}).then(function(response){
							project.grants = response.data;
						});
						break;
					case 'users':
						$http.get('app/projects/project_dash/get_project_dash.php?r=users&project_id=' + pid, {cache: false}).then(function(response){
							project.users = response.data['users'];
							project.hours = response.data['hours'];
							setProjectBarColor();
						});
						break;
					case 'tech':
						project.tech = [];
						editFields.tech.forEach(function(v){
							project.tech.push(v.value);
						});
						break;
				}
			});
		};
	};
	
	return new ProjectData();
}]);