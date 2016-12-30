<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        echo "post";
    }
    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $xml = simplexml_load_file("test.xml");
        $json = json_encode($xml);
        
        $json = json_decode($json);
        
		$retArr = array();
        for($x=0; $x<sizeof($json->story); $x++){
             if($json->story[$x]->newscategory == "news")
                 array_push($retArr, $json->story[$x]);
        }     
       	$json->story = $retArr;
        echo json_encode($json);
    }
?>