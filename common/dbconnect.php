<?php
	try {
		$con = new PDO("mysql:host=localhost;dbname=rpt", 'root', '');
	} catch (PDOException $e) {
		echo json_encode($jsonReturn);
		die();
	}
?>