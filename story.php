<?php
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$json = file_get_contents('php://input');
	$data = json_decode($json,true);
	
	$xml = simplexml_load_string(assocArrayToXML("stories",$data));
	$xml->asXml('test.xml');
	echo "ok";
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	$xml = simplexml_load_file("test.xml");
	$json = json_encode($xml);   

	echo $json;
}	
?>
