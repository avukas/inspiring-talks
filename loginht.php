<?php
include('login.php'); // Includes Login Script

if(isset($_SESSION['login_user'])){
	header("location: index.php");
}
?>
<HTML>
<HEAD>
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>Inspiring talks</TITLE>
<link rel="stylesheet" type="text/css" href="style.css">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" async>
</HEAD>
<BODY>
<div class="row" style="height:100%">
	<div class="column one" style="height:100%"></div>
	<div class="column two" style="height:100%; box-shadow: lightgrey 1px 1px 1px 1px;">
		<div class="row" style="height:100%">
			<div class="column one"></div>
			<div class="column two">
			<div class="row">
			  <img src="http://www.mycustomer.com/sites/all/themes/pp/img/default-user.png" alt="Avatar" class="avatar">
			</div>
			 <form action = "" method = "post">
				<div class="row" style="width:100%; margin-top:2%">
				  <label style="width:100%">Username</label>
				</div>
				<div class="row" style="width:100%; margin-top:2%">
				  <input style="width:100%" type="text" class="loginInput" placeholder="Enter Username" name="username" required>
				</div>
				<div class="row" style="width:100%; margin-top:2%">
				  <label style="width:100%">Password</label>
				</div>
				<div class="row" style="width:100%; margin-top:2%">
				  <input style="width:100%" type="password" class="loginInput" placeholder="Enter Password" name="password" required>
				</div>
				<div class="row" style="width:100%; margin-top:2%">
				  <button  name="submit" class="storyButton" value = " Login " type="submit">Login</button>
				</div>
				<div class="row" style="width:100%; margin-top:2%">
					<span><?php echo $error; ?></span>
				</div>
			</form>
			</div>
		</div>
	</div>
	<div class="column one"></div>
</div>
<script src="https://use.fontawesome.com/3c3ce0701a.js"></script>
<script src="script.js"></script>    
</BODY></HTML>