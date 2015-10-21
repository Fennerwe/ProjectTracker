<?php
	require_once('../../common/dbconnect.php');
	
	$query = "SELECT	p.project_id as 'id',
						p.project_name as 'title',
						p.project_description as 'desc',
						s.css_class as 'status',
						p.hours_used as 'hours',
						p.hours_allotted
			  FROM		project_info p,
						status s
			  WHERE		s.status_id = p.status_id
			  ORDER BY	s.status_id,
						project_name";
						
	$rslt = $con->query($query);
	
	$projects = array();
	foreach($rslt->fetchAll(PDO::FETCH_ASSOC) as $row){
		if(strlen($row['desc']) > 140){
			$row['desc'] = substr_replace($row['desc'], "...", -3, -1);
		}
		$projects[] = $row;
	}
	
	echo json_encode($projects);
?>