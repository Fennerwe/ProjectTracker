angular.module('services.project_data', []).factory('projectData', ['$http', function($http){
	
	function ProjectData(){
		this.pid = -1;
		var project = {};
		var editFields = {};
		
		var add_action;
		
		this.getProject = function(projectID){
			this.pid = projectID;
			return $http.get('app/projects/project_dash/get_project_dash.php?r=full&project_id=' + this.pid, {cache: false}).then(function(response){
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
					fields.dep_server = project.dep_server;
					fields.git_repo = project.git_repo;
					fields.date_started = project.date_started;
					fields.date_completed = project.date_completed;
					fields.excess_charges = project.excess_charges;
					fields.misc_info = project.misc_info;
					break;
			}
			
			fields.action = type;
			editFields = fields;
		};
		
		this.setAddAction = function(type){
			add_action = type;
		};
		
		this.getAddAction = function(){
			return add_action;
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
						$http.get('app/projects/project_dash/get_project_dash.php?r=researchers&project_id=' + project.pid, {cache: false}).then(function(response){
							project.researchers = response.data;
						});
						break;
					case 'grants':
						$http.get('app/projects/project_dash/get_project_dash.php?r=grants&project_id=' + project.pid, {cache: false}).then(function(response){
							project.grants = response.data;
						});
						break;
					case 'users':
						$http.get('app/projects/project_dash/get_project_dash.php?r=users&project_id=' + project.pid, {cache: false}).then(function(response){
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
					case 'extra':
						project.dep_server = editFields.dep_server;
						project.git_repo = editFields.git_repo;
						project.date_started = editFields.date_started;
						project.date_completed = editFields.date_completed;
						project.excess_charges = editFields.excess_charges;
						project.misc_info = editFields.misc_info;
						break;
				}
			});
		};
		
		this.addData = function(data){
			data.pid = project.pid;
			data.action = add_action;
			$http.post('app/projects/project_dash/add_data.php', data).then(function(){
				switch(add_action){
					case 'researcher':
						$http.get('app/projects/project_dash/get_project_dash.php?r=researchers&project_id=' + project.pid, {cache: false}).then(function(response){
							project.researchers = response.data;
						});
						break;
					case 'grant':
						$http.get('app/projects/project_dash/get_project_dash.php?r=grants&project_id=' + project.pid, {cache: false}).then(function(response){
							project.grants = response.data;
						});
						break;
					case 'user':
						$http.get('app/projects/project_dash/get_project_dash.php?r=users&project_id=' + project.pid, {cache: false}).then(function(response){
							project.users = response.data['users'];
							project.hours = response.data['hours'];
							setProjectBarColor();
						});
						break;
					case 'tech':
						project.tech.push(data.tech);
						break;
				}
			});
		};
	};
	
	return new ProjectData();
}]);