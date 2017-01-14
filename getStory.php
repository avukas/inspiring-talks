<?php
	
	function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET') {
		$conn = connect('inspiringtalks.story');

		if(! $conn ) {
		   die('Could not connect: ' . mysqli_error($conn));
		}
		
		$storyId = ($_GET["storyId"]);
													
		$query = $conn->prepare('SELECT  s.*, i.Image FROM inspiringtalks.story s, inspiringtalks.storyimages i WHERE i.StoryId = ?
		and i.StoryImageId IN (SELECT StoryImageId from inspiringtalks.storyimages 
													where StoryId = s.StoryId)');
	
		$query->bind_param('i', $storyId);

		$query->execute();
		echo mysqli_error($conn);
		
		$result = $query->get_result();
		
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				 $new_array[] = $row;
			}
		} 
		echo json_encode($new_array);	
		mysqli_close($conn);
	}
?>
