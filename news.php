<?php
 if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $xml = simplexml_load_file("test.xml");
        $json = json_encode($xml);
        
        $json = json_decode($json); 
		
        echo json_encode($json);
    }
?>