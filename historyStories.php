<?php
function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
	}

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        echo "post";
    }
    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
       
		// Create connection
		$conn = connect('inspiringtalks.story');
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$sql = "SELECT  s.*, i.Image FROM inspiringtalks.story s, inspiringtalks.storyimages i WHERE i.StoryId = s.StoryId
		and i.StoryImageId = (SELECT StoryImageId from inspiringtalks.storyimages 
													where StoryId = s.StoryId LIMIT 1) and NewsTypeId = 1 LIMIT 10";
													
		
		$result = $conn->query($sql);
		
		$new_array = array();
		
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				 $new_array[] = $row;
			}
		} 
		echo json_encode($new_array);
	}    
?>