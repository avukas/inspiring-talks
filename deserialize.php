<?php

function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
	}	
	function insertImages($images, $storyId) {
		$c = connect('inspiringtalks.storyimages');
		$query = "INSERT INTO inspiringtalks.storyimages (storyid,image) values";	
		
		for ($x = 0; $x < sizeof($images); $x++) {
			if($x!=0)
				$query = $query . ",";
			$query = $query . "($storyId,'$images[$x]')";   
		}
		$r = mysqli_query($c,$query);		
		
		mysqli_close($c);
	}

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $conn = connect("inspiringtalks.story");
					
	    $xml = simplexml_load_file("story.xml");
	    $json = json_encode($xml);   
		$data = json_decode($json);
		
		echo $json;
		
		$sql = $conn->prepare('INSERT INTO inspiringtalks.story (title,text,storytypeid,newstypeid, userid) VALUES (?,?,?,?,?)');	
		$sql->bind_param('ssiii', $data->title,$data->text,$data->storytypeid,$data->newstypeid, $data->userid);	
		
		$sql->execute();
		
		$message = "ok";
		$storyId = mysqli_insert_id($conn);
		insertImages(json_decode($data->images),$storyId);
		
		echo json_encode($message);
	}    
?>