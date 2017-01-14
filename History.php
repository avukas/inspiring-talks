<?php
include('login.php'); // Includes Login Script
if(!isset($_SESSION['login_user'])){
	header("location: loginht.php");
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
	<div id="loading">
  		<img id="loading-image" src="http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif"/>
	</div>
    <div id="modal" onclick="hideGalery()" class="modal"></div>
    <div id="leftGalery" onclick="leftImage()"><i class="fa fa-chevron-left fa-3x"  style="position:relative; top:50%;" aria-hidden="true"></i></div>
    <div id="rightGalery" onclick="rightImage()"><i class="fa fa-chevron-right fa-3x" style="position:relative; top:50%; 
    left: 94%;" aria-hidden="true"></i></div>
    
	<div class="galery" style="text-align:center" id="galeryFrame">
		<img id="galery" class="galeryImg"/>
	</div>
	<div class="row" id="headMenu">
        <div id="menuItemsGroup">
            <a onclick="pageTabOnClick('History.php')">
                <div class="menuItem activeTab" id="hyStoriesPage">History</div>
            </a>
            <a onclick="pageTabOnClick('News.php')">
                <div class="menuItem" id="newsPage">News</div>
            </a>
            <a onclick="pageTabOnClick('index.php')">
                <div class="menuItem">My page</div>
            </a>
			<a href="logout.php">
                <i class="fa fa-sign-out" title='Log out'  aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div class="row hystoriestab">
        <div id="hystorySideBar" class="column one hystorySideBar">  
            
        </div>
        <div class="column three">  
        <div class="row infoRow">
            <div class="column two"></div>
            <div class="column one">
                ponedjeljak, 7 nov 2016
            </div>
            <div class="column one">
                <i class="fa fa-cloud" aria-hidden="true"></i>
                Sarajevo 15°
            </div>
        </div>
            <div class="hyStory" id="historyFrame">
            <div class="row history">
                <img onclick="openGalery()"  id="hystoryImg" class="hystoryImg"/>
                <div class="historyContent" id="hystoryContent"></div> 
				<input id="galeryId"  style="display:none;" value="-1" />				
                <div class="hyStoryLine"> 
                    <img class="usersImg"/>
                    <div class="userName"></div>
                    <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    </div>
                </div>
            </div>    
        </div>
        </div>
    </div>
    
<script src="https://use.fontawesome.com/3c3ce0701a.js"></script>
<script src="script.js"></script>    
</BODY></HTML>