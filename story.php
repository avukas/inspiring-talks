<?php

function connect($table) {
    $c = mysqli_connect("localhost:3306", "root", "adi01234","inspiringtalks");
    return $c;
}

function IsNullOrEmptyString($question){
    return (!isset($question) || trim($question)==='');
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
	
	if(IsNullOrEmptyString($data->title) || IsNullOrEmptyString($data->text) || !isset($data->newstypeid) || !isset($data->storytypeid) || !isset($data->images) ){
		echo "Invalid data. Please fill empty fields!";
		return;
	}
	if($data->storyid == -1){
		
		$sql = $conn->prepare('INSERT INTO inspiringtalks.story (title,text,storytypeid,newstypeid, userid) VALUES (?,?,?,?,?)');
		
		$sql->bind_param('ssiii', $data->title,$data->text,$data->storytypeid,$data->newstypeid, $data->userId);
		
		$sql->execute();
	
		echo 'Error: ' . mysqli_error($conn) . $data->userId;
				
		
		$storyId = mysqli_insert_id($conn);

		insertImages(json_decode($data->images),$storyId);
	}
	else{
		$sql = $conn->prepare('DELETE FROM inspiringtalks.storyimages where StoryId = ?');
		
		$sql->bind_param('i', $data->storyid);
		
		$sql->execute();
		
		$sql = $conn->prepare('UPDATE inspiringtalks.story set Title = ?,Text = ?,
		StoryTypeId = ?, NewsTypeID = ? WHERE StoryId = ?');
		
		$sql->bind_param('ssiii', $data->title,$data->text,$data->storytypeid,$data->newstypeid,$data->storyid );
		
		$sql->execute();
				
		echo 'Error: ' . mysqli_error($conn);
		
		insertImages(json_decode($data->images),$data->storyid);
	}

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
	$userId =  $_GET['userId'];
	
	$query = $conn->prepare('SELECT  s.*, i.Image FROM inspiringtalks.story s, inspiringtalks.storyimages i WHERE i.StoryId = s.StoryId 
	and userId = ? and i.StoryImageId = (SELECT StoryImageId from inspiringtalks.storyimages where StoryId = s.StoryId LIMIT 1)');
	
	$query->bind_param('i', $userId);
	
	$query->execute();
	echo mysqli_error($conn);
	
	$result = $query->get_result();

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			 $new_array[] = $row;
		}
	} 
	
	mysqli_close($conn);
	echo json_encode($new_array);	
}	

?>
