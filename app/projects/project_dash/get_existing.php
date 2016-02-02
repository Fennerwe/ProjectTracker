<?php
	require_once('../../../common/dbconnect.php');
	
	$pid = $_GET['pid'];
	
	$rslt = array();
	
	$query = "SELECT	CONCAT(researcher_first_name, ' ', researcher_last_name) AS name,
						researcher_id as id
			  FROM		researcher
			  WHERE		researcher_id not in (SELECT	researcher_id
											  FROM		project_researchers
											  WHERE		project_id = $pid)";
			  
	$researchers = $con->query($query);
	
	foreach($researchers->fetchAll(PDO::FETCH_ASSOC) as $row){
		$rslt['researchers'][] = $row;
	}
	
	$query = "SELECT	CONCAT(user_first_name, ' ', user_last_name) AS name,
						user_id as id
			  FROM		users
			  WHERE		user_id NOT IN (SELECT	user_id
										FROM	user_project_contrib
										WHERE	project_id = $pid)";
			  
	$users = $con->query($query);
	
	foreach($users->fetchAll(PDO::FETCH_ASSOC) as $row){
		$rslt['users'][] = $row;
	}
	
	$query = "SELECT	grant_name as name,
						grant_id as id
			  FROM		funded_grant
			  WHERE		grant_id NOT IN (SELECT	grant_id
										 FROM	project_grants
										 WHERE	project_id = $pid)";
			  
	$grants = $con->query($query);
	
	foreach($grants->fetchAll(PDO::FETCH_ASSOC) as $row){
		$rslt['grants'][] = $row;
	}
	
	echo json_encode($rslt);
?>