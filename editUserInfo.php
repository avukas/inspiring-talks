<?php
	
	function connect($table) {
		$c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
		return $c;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		$conn = connect('inspiringtalks.story');
		
		$json = file_get_contents('php://input');
		$data = json_decode($json);
			
		$sql = $conn->prepare('UPDATE inspiringtalks.user set ' . $data->prop . ' = ? WHERE userId = ?');
		$sql->bind_param('si', $data->value, $data->userId );		
		$sql->execute();				
		echo 'Error: ' . mysqli_error($conn);	
		mysqli_close($conn);
	}
?>
