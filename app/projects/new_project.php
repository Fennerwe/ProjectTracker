<?php
	/*
	* This script is used to add a new project to the database.  Data comes in through a POST request.
	*/

	require_once('../../common/dbconnect.php');
	
	//Extract the POST request data
	$project = json_decode(file_get_contents('php://input'),true);
	
	//Get the ID of the status code
	$status_id = $project['status']['id'];
	
	//Create a new project with the provided data and default values for everything else
	$con->query("INSERT INTO project_info(project_name, project_description, status_id, hours_allotted, start_date)
				VALUES('$project[name]', '$project[desc]', $status_id, 80, NOW())");
		
	//Get the ID of the project that was just created
	$query = $con->query("SELECT MAX(project_id) as id FROM project_info");
	
	$project_id_rslt = $query->fetch(PDO::FETCH_ASSOC);
	$project_id = $project_id_rslt['id'];
	
	//Project ID is returned to client
	echo json_encode($project_id);
?>