<?php
function connect($table) {
		$c = mysqli_connect(getenv('MYSQL_SERVICE_HOST'), getenv('MYSQL_USER'), getenv('MYSQL_PASSWORD'), getenv('MYSQL_DATABASE'));
		return $c;
	}
session_start(); 
$error='';
	if (isset($_POST['submit'])) {
		if (empty($_POST['username']) || empty($_POST['password'])) {
			$error = "Username or Password is invalid";
		}	
		else
		{
			$username=$_POST['username'];
			$password=$_POST['password'];
			
			$connection = connect("user");
			
			$username = stripslashes($username);
			$password = stripslashes($password);		
						
			$query = $connection->prepare('select userId from inspiringtalks.user where password=? AND username=?');
			
			$query->bind_param('ss', $password, $username);
			
			$query->execute();
			$query->store_result();
			
			$query->bind_result($userId);	
			$query->fetch();	

			if ($query->num_rows == 1) {
				$_SESSION['login_user']=$username;	
				$_SESSION['userId']=$userId;
				header("location: index.php"); 
			} else {
				$error = "Username or Password is invalid";
			}			
			mysqli_close($connection);
		}
	}
?>
