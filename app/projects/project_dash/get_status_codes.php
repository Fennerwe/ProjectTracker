<?php
	require_once('../../../common/dbconnect.php');
	
	$query = "SELECT	status_text
			  FROM		status";
			  
	$rslt = $con->query($query);
	
	$return = array();
	foreach($rslt->fetchAll(PDO::FETCH_ASSOC) as $row){
		$return[] = $row;
	}
	
	echo json_encode($return);
?>