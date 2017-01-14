<?php

	function connect($table) {
		$c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
		return $c;
	}
	
	if ($_SERVER['REQUEST_METHOD'] == 'GET') {

		// Create connection
		$conn = connect('inspiringtalks.story');
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$filter = ($_GET["filter"]);

		$typename = "News";
		$sql = $conn->prepare('SELECT s.*, i.Image FROM inspiringtalks.story s, inspiringtalks.storyimages i WHERE i.StoryId = s.StoryId
		and i.StoryImageId = (SELECT StoryImageId from inspiringtalks.storyimages where StoryId = s.StoryId LIMIT 1) 
		and s.NewsTypeId = 2 and (text like '%$?%' or title like '%$?%')');
		
		$sql->bind_param('ss', $filter, $filter);
				
		$result = $conn->query($sql);
		
		echo mysqli_error($conn);
		
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				 $new_array[] = $row;
			}
		} 
		echo json_encode($new_array);
	} 
?>