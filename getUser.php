<?php

function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
}
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	// Create connection
	$conn = connect('inspiringtalks.story');
	// Check connection
	if (mysqli_connect_errno($conn)) {
		echo "Connection failed: " . mysqli_connect_errno();
	} 	
	
	$userId = ($_GET["userId"]);
	
	$query = $conn->prepare('SELECT  *  FROM inspiringtalks.user WHERE userid=?');
	
	$query->bind_param('i', $userId);
	
	$query->execute();
	echo mysqli_error($conn);
	
	$result = $query->get_result();
	
	$new_array =  $result->fetch_assoc();
	
	mysqli_close($conn);
	echo json_encode($new_array);	
}	

?>
