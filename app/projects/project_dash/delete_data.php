<?php
	require_once('../../../common/dbconnect.php');
	
	$params = json_decode(file_get_contents('php://input'),true);
	extract($params);
	
	switch($action){
		case 'p_info':
			$con->query("DELETE FROM project_info WHERE project_id = $pid");
			break;
		case 'researchers':
			$con->query("DELETE FROM project_researchers WHERE idx = $ind");
			break;
		case 'grants':
			$con->query("DELETE FROM project_grants WHERE idx = $ind");
			break;
	}
?>