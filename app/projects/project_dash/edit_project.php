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
	}
	
	foreach($queries as $query){
		$con->query($query);
	}
?>