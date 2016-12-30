<?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        echo "post";
    }
    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $xml = simplexml_load_file("test.xml");
        $json = json_encode($xml);
        
        $json = json_decode($json);
        
        for($x=0; $x<sizeof($json->story); $x++){
            if($json->story[$x]->newscategory == "history")
                 unset($json->story[$x]);
        }    
		
        $json->story = array_slice($json->story, 0, 8);
        echo json_encode($json);
    }
?>