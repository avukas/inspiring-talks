<?php
	function connect($table) {
		$c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
		return $c;
	}

if($_SERVER['REQUEST_METHOD'] == 'GET') {
	$conn = connect('inspiringtalks.story');

	if(! $conn ) {
	   die('Could not connect: ' . mysqli_error($conn));
	}
	
	$storyId = ($_GET["storyId"]);		
	
	$query = $conn->prepare('DELETE FROM inspiringtalks.storyimages WHERE storyid = ?');
	
	$query->bind_param('i', $storyId);
	
	$query->execute();
	
	$sql = $conn->prepare("DELETE FROM inspiringtalks.story WHERE storyid = ?");
	
	$sql->bind_param('i', $storyId);
	
	$sql->execute();
	
	echo 'Could not delete data: ' + mysqli_error($conn);
	
	mysqli_close($conn);
}
?>
