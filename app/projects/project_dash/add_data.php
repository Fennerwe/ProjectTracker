<?php
	require_once('../../../common/dbconnect.php');
	
	$params = json_decode(file_get_contents('php://input'),true);
	extract($params);
	
	switch($action){
		case 'researcher':
			if($select_type == 'new'){				
				$con->query("INSERT INTO researcher(researcher_first_name, researcher_last_name)
							 VALUES('$first_name', '$last_name')");
							 
				$rslt = $con->query("SELECT MAX(researcher_id) as id FROM researcher");
				
				$researcher_id = $rslt->fetch(PDO::FETCH_ASSOC)['id'];
			}
			else {
				$researcher_id = $researcher['id'];
			}
			
			$pi = $primary ? 1 : 0;
			
			$con->query("INSERT INTO project_researchers(researcher_id, project_id, pi_flag)
						 VALUES($researcher_id, $pid, $pi)");
			break;
		case 'grant':
			if($select_type == 'new'){
				$con->query("INSERT INTO funded_grant(grant_name) VALUES('$grant_name')");
				
				$rslt = $con->query("SELECT MAX(grant_id) as id FROM funded_grant");
				
				$grant_id = $rslt->fetch(PDO::FETCH_ASSOC)['id'];
			}
			else {
				$grant_id = $grant['id'];
			}
			
			$con->query("INSERT INTO project_grants(grant_id, project_id, partial_amount)
						 VALUES($grant_id, $pid, $grant_amount)");
						 
			break;
		case 'user':
			if($select_type == 'new'){
				$con->query("INSERT INTO users(user_first_name, user_last_name, security_role)
							 VALUES('$first_name', '$last_name', 1)");
							 
				$rslt = $con->query("SELECT MAX(user_id) as id FROM users");
				
				$user_id = $rslt->fetch(PDO::FETCH_ASSOC)['id'];
			}
			else {
				$user_id = $user['id'];
			}
			
			$con->query("INSERT INTO user_project_contrib(user_id, project_id, hours_contributed)
						 VALUES($user_id, $pid, $hours)");
						 
			$con->query("UPDATE project_info
						 SET	hours_used = hours_used + $hours
						 WHERE	project_id = $pid");
			break;
		case 'tech':
			$con->query("UPDATE project_info
						 SET	tech_used = (
									CASE
										WHEN
											isnull(tech_used) or tech_used = ''
										THEN
											'$tech'
										ELSE
											CONCAT(tech_used, '|', '$tech')
									END
								)
						 WHERE	project_id = $pid");
			echo "UPDATE project_info
						 SET	tech_used = (
									CASE
										WHEN
											isnull(tech_used)
										THEN
											'$tech'
										ELSE
											CONCAT(tech_used, '|', '$tech')
									END
								)
						 WHERE	project_id = $pid";
			break;
	}
?>