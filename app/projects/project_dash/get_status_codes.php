<?php
	require_once('../../../common/dbconnect.php');
	
	$query = "SELECT	status_text,
						css_class,
						status_id as id
			  FROM		status";
			  
	$rslt = $con->query($query);
	
	$return = array();
	foreach($rslt->fetchAll(PDO::FETCH_ASSOC) as $row){
		$return[] = $row;
	}
	
	echo json_encode($return);
?>