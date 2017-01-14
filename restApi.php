<?php
function connect($table) {
    $c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
    return $c;
}

	function zag() {
		header("{$_SERVER['SERVER_PROTOCOL']} 200 OK");
		header('Content-Type: text/html');
		header('Access-Control-Allow-Origin: *');
	}
	function rest_get($request, $data) {
		if (strpos($request, 'story') !== false){
			if(strpos($request,"="))
			{
				echo "implement with params";				
			}
			else
			{
				$conn = connect('inspiringtalks.story');
				
				$sql = "SELECT * FROM inspiringtalks.story";
				
				echo mysqli_error($conn);
				
				$result = $conn->query($sql);	
				
				$new_array = array();
				
				if ($result->num_rows > 0) {
					while($row = $result->fetch_assoc()) {
						 $new_array[] = $row;
					}
				} 
		
				echo json_encode($new_array);
			}
		}
	}
	function rest_post($request, $data) { 
		echo "implement post";	
	}
	function rest_delete($request) { }
	function rest_put($request, $data) {
		echo "implement put";	
	}
	function rest_error($request) { }

	$method  = $_SERVER['REQUEST_METHOD'];
	$request = $_SERVER['REQUEST_URI'];

	switch($method) {
		case 'PUT':
			parse_str(file_get_contents('php://input'), $put_vars);
			zag(); $data = $put_vars; rest_put($request, $data); break;
		case 'POST':
			zag(); $data = $_POST; rest_post($request, $data); break;
		case 'GET':
			zag(); $data = $_GET; rest_get($request, $data); break;
		case 'DELETE':
			zag(); rest_delete($request); break;
		default:
			header("{$_SERVER['SERVER_PROTOCOL']} 404 Not Found");
			rest_error($request); break;
	}
?>

