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
												 WHERE	s.status_text = '$status_text')";
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
	}
	
	foreach($queries as $query){
		$con->query($query);
	}
?>