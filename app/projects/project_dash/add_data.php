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
			
			$pi = $primary ? 1 : 0;
			
			$con->query("INSERT INTO project_researchers(researcher_id, project_id, pi_flag)
						 VALUES($researcher_id, $pid, $pi)");
			break;
	}
?>