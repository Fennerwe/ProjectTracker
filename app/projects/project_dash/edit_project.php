<?php
	require_once('../../../common/dbconnect.php');
	
	$params = json_decode(file_get_contents('php://input'),true);
	extract($params);
	
	$status_text = $status['status_text'];
	
	$queries = [];
	switch($action){
		case 'p_info':
			$queries[] = "UPDATE 	project_info
						   SET		project_name = '$title',
									project_description = '$desc',
									status_id = (SELECT	s.status_id
												 FROM	status s
												 WHERE	s.status_text = '$status_text')";
			break;
	}
	
	foreach($queries as $query){
		$con->query($query);
	}
?>