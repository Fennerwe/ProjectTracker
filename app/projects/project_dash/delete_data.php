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
		case 'users':
			$con->query("DELETE FROM user_project_contrib WHERE idx = $ind");
			$con->query("UPDATE project_info
						 SET	hours_used = (SELECT 	SUM(hours_contributed)
											  FROM		user_project_contrib
											  WHERE		project_id = $pid)");
			break;
		case 'tech':
			$rslt = $con->query("SELECT tech_used FROM project_info WHERE project_id = $pid");
			$tech = $rslt->fetch(PDO::FETCH_ASSOC)['tech_used'];
			
			$tech = explode('|', $tech);
						
			$ind = array_search($ind['value'], $tech);
			
			unset($tech[$ind]);
			
			$tech_used = implode('|', $tech);

			$con->query("UPDATE project_info SET tech_used = '$tech_used' WHERE project_id = $pid");
			break;
	}
?>