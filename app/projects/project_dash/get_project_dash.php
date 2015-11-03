<?php
	require_once('../../../common/dbconnect.php');
	
	$pid = $_GET['project_id'];
	
	$rslt = array();
	
	//get the info related specifically to the project
	$query = "SELECT	p.project_name as 'title',
						p.project_description as 'desc',
						p.hours_used as 'hours',
						p.hours_allotted as 'hours_allotted',
						p.deployment_server as 'dep_server',
						p.git_repo as 'git_repo',
						p.start_date as 'date_started',
						p.completed_date as 'date_completed',
						s.css_class as 'status_class',
						s.status_text,
						p.tech_used as 'tech',
						p.excess_hour_charges as 'excess_charges',
						p.misc_info
			  FROM		project_info as p,
						status as s
			  WHERE		p.status_id = s.status_id
						AND p.project_id = $pid";
						
	$project_info = $con->query($query);
	
	$rslt = array_merge($rslt, $project_info->fetchAll(PDO::FETCH_ASSOC)[0]);
	
	//convert tech used into an array
	$rslt['tech'] = explode("|", $rslt['tech']);
	
	//change date timestamps
	$rslt['date_started'] = date_format(date_create($rslt['date_started']), "F d, Y");
	$rslt['date_completed'] = $rslt['date_completed'] ? date_format(date_create($rslt['date_completed']), "F d, Y") : "";
	
	//get info for researchers associated with the project
	$query = "SELECT	r.researcher_first_name as 'first_name',
						r.researcher_last_name as 'last_name',
						rp.pi_flag as 'pi',
						rp.idx as 'r_ind'
			  FROM		researcher r,
						project_researchers rp
		      WHERE		rp.project_id = $pid
						AND r.researcher_id = rp.researcher_id";
						
	$researchers = $con->query($query);
	
	$researcher_array = array(); //initialize to empty array in case no researchers have been added to the project yet
	foreach($researchers->fetchAll(PDO::FETCH_ASSOC) as $row){
		$researcher_array[] = $row;
	}
	$rslt['researchers'] = $researcher_array;
	
	//get info for grants the project falls under
	$query = "SELECT	g.grant_name as 'name',
						g.grant_desc as 'desc',
						pg.partial_amount as 'amount',
						pg.idx as 'g_ind'
			  FROM		funded_grant g,
						project_grants pg
			  WHERE		pg.project_id = $pid
						AND pg.grant_id = g.grant_id
			  ORDER 	BY g.grant_name";
			  
	$grants = $con->query($query);
	
	$grants_array = array(); //initialize to empty array in case no grants have been added
	foreach($grants->fetchAll(PDO::FETCH_ASSOC) as $row){
		$grants_array[] = $row;
	}
	$rslt['grants'] = $grants_array;
	
	//get info on users who have contributed to the project
	$query = "SELECT 	CONCAT(u.user_first_name, ' ', u.user_last_name) as 'name',
						up.hours_contributed,
						up.idx as 'u_ind'
			  FROM		users u,
						user_project_contrib up
			  WHERE		up.project_id = $pid
						AND up.user_id = u.user_id
			  ORDER		BY up.hours_contributed";
	
	$users = $con->query($query);
	
	$contr_users_arr = array(); //initialize to empty array in case no users have been added yet
	foreach($users->fetchAll(PDO::FETCH_ASSOC) as $row){
		$contr_users_arr[] = $row;
	}
	$rslt['contributing_users'] = $contr_users_arr;
	
	echo json_encode($rslt);
	
?>