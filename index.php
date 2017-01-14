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
	<input id="profile-image-upload" class="hidden" onchange="setProfilePic()" type="file">
	<div style="display:none;" id="userId"><?php echo $_SESSION['userId'] ?></div>
	<div id="loading">
  		<img id="loading-image" src="http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif"/>
	</div>
	<input id="storyId"  style="display:none;" value="-1"/>
	<div class="row" id="headMenu">
        <div id="menuItemsGroup">
            <a onclick="pageTabOnClick('History.php')">
                <div class="menuItem" id="History">History</div>
            </a>
            <a onclick="pageTabOnClick('News.php')">
                <div class="menuItem" id="News">News</div>
            </a>
            <a onclick="pageTabOnClick('index.php')">
                <div class="menuItem activeTab" title='Log out' id="index">My page</div>
            </a>
			<a href="logout.php">
                <i class="fa fa-sign-out"title='Log out' aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div class="row profileMenu">        
    </div>
    <div class="row">
        <div class="smallImg" id="smallImg" onclick="uploadProfilePic()">
            <div class="profilePic">
            </div>
        </div>
        <div class="column one userInfos"> 
            <div class="row userinfo">
                <div class="Img" id="profile-pic" onclick="uploadProfilePic()">
                    <div class="profilePic">
                    </div>
                </div>
            </div>
            <div class="row userinfo">
                <div class="row userCaption">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <label class="userInfoLabel">Your info</label>
					<i id="iuserInfo"  class="fa-floppy-o save-icon" onclick="saveUserInfo('Info')" aria-hidden="true"></i>
				</div>
				<div class="row uInfo" id="Info" onclick="editUserInfo('Info')"></div>
            </div>
            <div class="row userinfo">
                <div class="row userCaption">
                    <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                    <label class="userInfoLabel">Your education</label>		
					<i id="bucation"  class="fa-floppy-o save-icon" onclick="saveUserInfo('Education')" aria-hidden="true"></i>					
			   </div>
			   <div  class="row uInfo" id="Education" onclick="editUserInfo('Education')"></div>
            </div>
            <div class="row userinfo">
                <div class="row userCaption">
                    <i class="fa fa-briefcase" aria-hidden="true"></i>
                    <label class="userInfoLabel">Current employment </label>
					<i id="iuserEmpl" class="fa-floppy-o save-icon" onclick="saveUserInfo('Employment') aria-hidden="true"></i>
				</div>
				<div class="row uInfo" id="Employment" onclick="editUserInfo('Employment')"></div>
            </div>
            <div class="row userinfo">
                <div class="row userCaption">
                    <i class="fa fa-futbol-o" aria-hidden="true"></i>
                    <label class="userInfoLabel">Hobies</label>	
					<i id="iuserHoby" class="fa-floppy-o save-icon" onclick="saveUserInfo('Hobies') aria-hidden="true"></i>					
                </div>
				<div class="row uInfo" id="Hobies" onclick="editUserInfo('Hobies')"></div>
            </div>
        </div>
	<div class="column two yourStories">
		<div class="row writeStoryRow">
			<i class="fa fa-pencil-square-o" style="cursor:pointer; margin-bottom:10px;" onclick='unhideEdit()' aria-hidden="true"></i> Write a story
		</div>
		<div class="row" id="writeStory" style="display:none;">
			<input type="text" id="storyTitle" class="storyTitle" placeholder="Story title">
			<div>                    
				<select class="storySelect" id="categorySelect">                          
				  <option value="0" disabled selected>Story category</option>
				  <option value="1">Bussiness</option>
				  <option value="2">Politics</option>
				  <option value="3">Art</option>
				  <option value="4">Technology</option>
				</select> 
				<select class="storySelect" id="newsCategory">
				  <option value="0" disabled selected>News category</option>
				  <option value="1">History</option>
				  <option value="2">News</option>
				</select>
				<form class="storyForm">
					<input type="file" id="fileupload" onchange="displayUploadedImages()" name="pic" accept="image/*" multiple>
					<div id="selectedImages"></div>
				</form>
			</div>            
			<textarea id="storyArea" placeholder="Write your story here" ></textarea>
			 <button onclick="validate()" name="save" class="storyButton">Save</button>
			 <div id="validationMessageDiv">
				 <i class="fa fa-times" style="cursor:pointer" aria-hidden="true" onclick="hideValidationMessage()"></i>
				 <label id="validationMessage"></label>
			 </div>     
		</div>
		 <div id="yourStories"> 
		</div>            
	</div>           
	<div class="column one placeHol">
		<div class="row" style="text-align:center;">
			<i class="fa fa-file-pdf-o fa-5x" aria-hidden="true" onclick="downloadreport()" style="margin-top:20%; cursor:pointer;"></i>
			<div class="row">download report</div>			
		</div>
		<div class="row" style="text-align:center;">	
			<i class="fa fa-file-code-o fa-5x" aria-hidden="true" onclick="deserializexml()" style="margin-top:20%; cursor:pointer;"></i>
			<div class="row">deserialize xml</div>	
		</div>
	</div>  
</div>
<script src="https://use.fontawesome.com/3c3ce0701a.js"></script>
<script src="script.js"></script>
</BODY></HTML>