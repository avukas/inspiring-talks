<?php
require('fpdf.php');
function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
	}
class PDF extends FPDF
{
	function BasicTable( $data){	

		$this->SetFillColor(255,0,0);
		$this->SetTextColor(105,105,105);
		$this->SetDrawColor(47,79,79);
		
		$this->SetFont('Arial','',10);
		// Data
		foreach($data as $row)
		{
			foreach($row as $col)
				$this->MultiCell(0,6,$col,1);
			$this->Ln();
		}
	}
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	// Create connection
	$conn = connect('inspiringtalks.story');
	$pdf=new PDF();
	$pdf->AddPage();
	$pdf->Ln();
	$pdf->Ln();
	

	$query = 'SELECT  u.FirstName,u.LastName,  st.Name, nt.Name, s.Title, s.Text 
			  FROM inspiringtalks.story s, inspiringtalks.user u, inspiringtalks.StoryType st, inspiringtalks.NewsType nt 
			  WHERE s.StoryTypeId = st.StoryTypeId AND s.NewsTypeId = nt.NewsTypeId AND u.UserId = s.UserId';
	
	$result = $conn->query($query);	
		
	$new_array = array();
	
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			 $new_array[] = $row;
		}
	} 
	
	$header = array('UserId', 'Title', 'Story type', 'News type');
	$pdf->BasicTable($new_array);
	
	mysqli_close($conn);
	$pdf->Output("I","report.pdf");
}	
?>
