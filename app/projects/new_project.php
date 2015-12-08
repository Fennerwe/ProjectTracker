<?php
	require_once('../../common/dbconnect.php');
	
	$project = json_decode(file_get_contents('php://input'),true);
	
	$status_id = $project['status']['id'];
	
	$con->query("INSERT INTO project_info(project_name, project_description, status_id, hours_allotted, start_date)
				VALUES('$project[name]', '$project[desc]', $status_id, 80, NOW())");
				
	$query = $con->query("SELECT MAX(project_id) as id FROM project_info");
	
	$project_id = $query->fetch(PDO::FETCH_ASSOC)['id'];
	
	echo json_encode($project_id);
?>