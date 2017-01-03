<?php

function connect($table) {
    $c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
    return $c;
}


function assocArrayToXML($root_element_name,$ar)
{
	$xml = simplexml_load_file("test.xml");
	$story = $xml->addChild('story');
	$f = function($f,$c,$a) {
			foreach($a as $k=>$v) {
				if(is_array($v)) {
					$ch=$c->addChild($k);
					$f($f,$ch,$v);
				} else {
					$c->addChild($k,$v);
				}
			}
	};
	$f($f,$story,$ar);
	return $xml->asXML();
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
	
	echo 'Error: ' . mysqli_error($c);
	
	mysqli_close($c);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$json = file_get_contents('php://input');
	$data = json_decode($json);
		
	// Create connection
	$conn = connect("inspiringtalks.story");
	// Check connection
	if (mysqli_connect_errno($conn)) {
		echo "Connection failed: " . mysqli_connect_errno();
	} 	
	$sql = "INSERT INTO inspiringtalks.story (title,text,storytypeid,newstypeid) VALUES ('$data->title','$data->text',
	$data->storytypeid,$data->newstypeid)";

	if (!mysqli_query($conn,$sql))
	  {
		echo 'Error: ' . mysqli_error($conn);
	  }
	
	$storyId = mysqli_insert_id($conn);

	insertImages(json_decode($data->images),$storyId);

	mysqli_close($conn);
	echo "ok";
}


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
	$json = file_get_contents('php://input');
	$data = json_decode($json,true);

	// Create connection
	$conn = connect("inspiringtalks.story");
	// Check connection
	if ($conn->connect_error) {
		echo "Connection failed: " . $conn->connect_error;
	} 	

	mysqli_query($conn,"UPDATE inspiringtalks.story set title = $data->title, text = $data->text,storytypeid = $data->storytypeid, newstypeid = $data->newstypeid) WHERE storyid = $data->storyid");
	
	mysqli_query($conn,"DELETE inspiringtalks.storyimages WHERE storyid = $data->storyid");
	
	insertImages($data->stories, $data->storyid); 
		
	$storyId = mysqli_insert_id($conn);

	insertImages($data->images,$storyId);

	mysqli_close($conn);
	echo "ok";
}


else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	// Create connection
	$conn = connect('inspiringtalks.story');
	// Check connection
	if (mysqli_connect_errno($conn)) {
		echo "Connection failed: " . mysqli_connect_errno();
	} 

	$sql = "SELECT  s.*, i.Image FROM inspiringtalks.story s, inspiringtalks.storyimages i WHERE i.StoryId = s.StoryId
	 and i.StoryImageId = (SELECT StoryImageId from inspiringtalks.storyimages 
													where StoryId = s.StoryId LIMIT 1)";
	$result = $conn->query($sql);
	

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			 $new_array[] = $row;
		}
	} 
	
	mysqli_close($conn);
	echo json_encode($new_array);	
}	

if(isset($_POST['delete'])) {
	$conn = connect('inspiringtalks.story');

	if(! $conn ) {
	   die('Could not connect: ' . mysqli_error());
	}

	$story_id = $_POST['syoryid'];

	$sql = "DELETE FROM inspiringtalks.story WHERE storyid = $story_id DELETE FROM inspiringtalks.storyimages WHERE storyid = $story_id";

	$retval = mysqli_query( $conn, $sql );

	if(! $retval ) {
	   echo 'Could not delete data: ' + mysqli_error();
	}

	echo "Story deleted successfully\n";

	mysqli_close($conn);
}
?>
