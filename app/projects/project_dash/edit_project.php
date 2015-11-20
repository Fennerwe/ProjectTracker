<?php
	require_once('../../../common/dbconnect.php');
	
	$params = json_decode(file_get_contents('php://input'),true);
	extract($params);
	
	$queries = [];
	switch($action){
		case 'p_info':
			$status_text = $status['status_text'];
			$queries[] = "UPDATE 	project_info
						  SET		project_name = '$title',
									project_description = '$desc',
									status_id = (SELECT	s.status_id
												 FROM	status s
												 WHERE	s.status_text = '$status_text')
						  WHERE		project_id = $pid";
			break;
		case 'researchers':
			foreach($primaries as $k => $v){
				$queries[] = "UPDATE	project_researchers
							  SET		pi_flag = $v
							  WHERE		idx = $k";
			}
			break;
		case 'grants':
			foreach($grants as $g){
				$queries[] = "UPDATE	project_grants
							  SET		partial_amount = $g[amount]
							  WHERE		idx = $g[g_ind]";
			}
			break;
		case 'users':
			$hours = 0;
			foreach($users as $u){
				$hours += $u['hours_contributed'];
				
				$queries[] = "UPDATE	user_project_contrib
							  SET		hours_contributed = $u[hours_contributed]
							  WHERE		idx = $u[u_ind]";
			}
			
			$queries[] = "UPDATE	project_info
						  SET		hours_used = $hours
						  WHERE		project_id = $pid";
			
			break;
		case 'tech':
			$tech_arr = array();
			
			foreach($tech as $v){
				array_push($tech_arr, $v['value']);
			}
			
			$techstring = implode('|', $tech_arr);
			
			$queries[] = "UPDATE	project_info
						  SET		tech_used = '$techstring'
						  WHERE		project_id = $pid";
			break;
		case 'extra':
			$start_date_str = $date_started ? "'".date("Y-m-d H:i:s", strtotime($date_started))."'" : 'null';
			$comp_date_str = $date_completed ? "'".date("Y-m-d H:i:s", strtotime($date_completed))."'" : 'null';
			$dep_server = $dep_server ? $dep_server : 'null';
			$git_repo = $git_repo ? $git_repo : 'null';
			$excess_charges = $excess_charges ? $excess_charges : 'null';
			$misc_info = $misc_info ? $misc_info : 'null';
		
			$queries[] = "UPDATE	project_info
						  SET		deployment_server = '$dep_server',
									git_repo = '$git_repo',
									start_date = $start_date_str,
									completed_date = $comp_date_str,
									excess_hour_charges = $excess_charges,
									misc_info = '$misc_info'
						  WHERE		project_id = $pid";
			break;
	}
	
	foreach($queries as $query){
		$con->query($query);
	}
?>