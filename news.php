<?php
include('login.php'); // Includes Login Script
if(!isset($_SESSION['login_user'])){
	header("location: loginht.php");
}
?>

<!DOCTYPE HTML>
<HTML>
<head>
<TITLE>Inspiring talks</TITLE>
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
    
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" async>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
<BODY>
	<div id="loading">
  		<img id="loading-image" src="http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif"/>
	</div>
	<div class="row" id="headMenu">
        <div class="row" id="headMenu">
        <div id="menuItemsGroup">
            <a onclick="pageTabOnClick('History.php')">
                <div class="menuItem" id="hyStoriesPage">History</div>
            </a>
            <a onclick="pageTabOnClick('News.php')">
                <div class="menuItem activeTab" id="newsPage">News</div>
            </a>
            <a onclick="pageTabOnClick('index.php')">
                <div class="menuItem">My page</div>
            </a>
			<a href="logout.php">
                <i class="fa fa-sign-out" title='Log out' aria-hidden="true"></i>
            </a>
        </div>
    </div>
    </div>
    <div class="row newstab">
        <div id="hystorySideBar" class="column one hystorySideBar">
        </div>
    <div class="column three hystoriestab">
        <div class="row infoRow">
            <div class="column two">
                <input type="text" class="search" id="search" name="search" placeholder="Search..">
            </div>
            <div class="column one">
                ponedjeljak, 7 nov 2016
            </div>
            <div class="column one">
                <i class="fa fa-cloud" aria-hidden="true"></i>
                Sarajevo 15°
            </div>
        </div>
		<div id="storyGalery"></div>
	</div>
    </div>
</BODY>
</HTML>