﻿
var defaultRoute = "http://inpiring-talks-inspiring-talks.44fs.preview.openshiftapps.com/";

window.onload = logedIn();

function getElementById(elId){
	return document.getElementById(elId);
}

function getElValue(elId){
	return getElementById(elId).value;
}

function setElValue(elId,val){
	getElementById(elId).value = val;
}

function getElInnerHtml(elId){
	return getElementById(elId).innerHTML;
}

function setElInnerHtml(elId,val){
	getElementById(elId).innerHTML = val;
}

function getElStyleProp(elId,prop){
	return getElementById(elId).style[prop]
}

function setElStyleProp(elId,prop,val){
	getElementById(elId).style[prop] = val;
}

function setValidationMessInnerHtml(val){
	setElInnerHtml('validationMessage',getElInnerHtml('validationMessage') + val);
}

function showLoadingPanel(){
	setElStyleProp('loading','display','block');
}

function hideLoadingPanel(){
	setElStyleProp('loading','display','none');
}

function getSrc(elId,src){
	return getElementById(elId).src;
}

function setSrc(elId,src){
	getElementById(elId).src = src;
}

function hideValidationMessage(){
     setElStyleProp('validationMessageDiv','display','none');
}

function unhideEdit() {
	ClearStory();
    var el = document.getElementById('writeStory');
    if ( getElStyleProp('writeStory','display')=='block')
        setElStyleProp('writeStory','display', 'none');
    else
        setElStyleProp('writeStory','display', 'block');
}


function validate(){
    setElInnerHtml('validationMessage','');
    setElStyleProp('validationMessageDiv','display','none');
    
    
    var catSelect = getElValue('categorySelect');
    var newsCategorySelect = getElValue('newsCategory');
    var storyArea = getElValue('storyArea');
	var title = getElValue('storyTitle');
	var files = getElementById('fileupload').files;
	
    
    if(catSelect == "")
        setValidationMessInnerHtml('Please select story category.');
    if(newsCategorySelect == "")
        setValidationMessInnerHtml(' Please select news category.');
    if(storyArea == "")
        setValidationMessInnerHtml(' Please fill in story field.');
	if(title == "")
    	setValidationMessInnerHtml(' Please fill in title field.');
		
    if( getElInnerHtml('validationMessage') != '')
       setElStyleProp('validationMessageDiv','display','block');	
	else{		
		if(getElValue("storyId")!=-1){
			var story = {
				storytypeid:catSelect,
				newstypeid:newsCategorySelect,
				text:storyArea,
				title:title,
				storyid:getElValue("storyId"),
				userId:parseInt(getElInnerHtml("userId")),
				images:[]
			}
			if(getElementById("selectedImages").children.length > 0){
				for(i=0; i<getElementById("selectedImages").children.length; i++ ){
					story.images.push(getElementById("selectedImages").children[i].src);
				}
				saveStory(story);
			}
			else if(files.length > 0){
				for (var i = 0; i < files.length; i ++){	
					var FR= new FileReader();
					FR.onload = function(e) {
						story.images.push(e.target.result);			
						if ( story.images.length == files.length) {
							saveStory(story);
						}
					};       
					FR.readAsDataURL( files[i] );				   
				}
			}
			else{
				setValidationMessInnerHtml("Please select images.");
				return;
			}
		}
		else{
			if(files.length == 0){
				setValidationMessInnerHtml(' Please select images.');
				return;
			}
			var story = {
				storytypeid:catSelect,
				newstypeid:newsCategorySelect,
				text:storyArea,
				title:title,
				storyid: -1,
				userId:parseInt(getElInnerHtml("userId")),
				images:[]
			}
			for (var i = 0; i < files.length; i ++){	
				var FR= new FileReader();
				FR.onload = function(e) {
					story.images.push(e.target.result);			
					if ( story.images.length == files.length) {
						saveStory(story);
					}
				};       
				FR.readAsDataURL( files[i] );
			   
			}
		}
	}
}

function ClearStory(){
	setElValue('categorySelect',0);
	setElValue('newsCategory',0);
	setElValue('storyArea','');
	setElValue('storyTitle','');
	setElValue('fileupload','');
	setElValue("storyId", -1);
	setElInnerHtml('selectedImages','');
}

function makePost(postfix, object, _callback){
	showLoadingPanel();
	var http = new XMLHttpRequest();
	var url = defaultRoute + postfix;	
	http.open('POST', url, true);
	
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			hideLoadingPanel();		
			console.log(http.response);
			_callback(true);	
		}
		else if(http.status != 200){
			hideLoadingPanel();
			setElInnerHtml('validationMessage','An error occurred while saving story');
       		setElStyleProp('validationMessageDiv','display','block');	
		}
	}
	http.send(JSON.stringify(object));
}

function saveStory(story){
	var url = "story.php";	
	
	story.images = JSON.stringify(story.images)
		
	makePost(url,story,function(success){
		if(success){
			ClearStory();
			getStories();
		}
	})		
}

function displayUploadedImages() {
    var x = document.getElementById("fileupload");
    var txt = "";
   
    for (var i = 0; i < x.files.length; i++) {
        txt +="<img class='uploadedImages' src=" + URL.createObjectURL(x.files[i]) + "></img>";               
    }   
    setElInnerHtml("selectedImages", txt);
}



function openGalery(){
	imagesInd = 0;
	galeryImages = [];
	
	makeGet("getStory.php","storyId="+getElValue("galeryId"), function(response){
			
		for(i=0; i<response.length; i++)
			galeryImages.push(response[i].Image);
	
		setSrc("galery", galeryImages[0]);
		setElStyleProp('modal','display','block');	
		setElStyleProp('leftGalery','display','block');	
		setElStyleProp('rightGalery','display','block');	
		setElStyleProp('galeryFrame','display','block');	
		document.body.style.overflow = 'hidden';
	})
}

function hideGalery() {
    setElStyleProp('modal','display','none');	
    setElStyleProp('leftGalery','display','none');	
    setElStyleProp('rightGalery','display','none');	
    setElStyleProp('galeryFrame','display','none');	
    document.body.style.overflow = 'auto';
}

var galeryImages = [];
imagesInd = 0;

function leftImage(){
    imagesInd --;
    if( imagesInd <= 0 )
        imagesInd = galeryImages.length - 1;
    else if(imagesInd >= galeryImages.length)
        imagesInd = 0;
	
    setSrc('galery',galeryImages[imagesInd]);
}

function rightImage(){
     imagesInd ++;
    if( imagesInd <= 0 )
        imagesInd = galeryImages.length - 1;
    else if(imagesInd >= galeryImages.length)
        imagesInd = 0;
    setSrc('galery',galeryImages[imagesInd]);
}

document.onkeydown = function( evt ) {
    evt = evt || window.event;
    if ( evt.keyCode === 27 ){
       hideGalery()
    }
}

function pageTabOnClick(page) {

	var xhr= new XMLHttpRequest();
	xhr.open('GET', page, true);
	xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return;
		
		document.body.innerHTML= this.responseText;
        if(page == "index.php"){
            logedIn();
        }else  if(page == "History.php"){
            getHistories();		
        }else  if(page == "News.php"){
            getNews();
        }
	};	
	xhr.send();
}

function makeGet(postfix, params, _callback){
	var xhr= new XMLHttpRequest();
	var url = defaultRoute + postfix;
	showLoadingPanel();
	
	if(params != '')
		url += "?" + params;
	
	xhr.open('GET', url, true);
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(this.response);

			_callback(response);
			hideLoadingPanel();
		}
	};
 	xhr.send();	
}

function makeDownload(postfix){	
	window.open(defaultRoute + postfix,'_blank');
}


function makeDelete(postfix, params, _callback){
	var xhr= new XMLHttpRequest();
	var url = defaultRoute + postfix;
	showLoadingPanel();
	
	if(params != '')
		url += "?" + params;
	
	xhr.open('GET', url, true);
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.response);
			_callback(true);
			hideLoadingPanel();
		}
	};
 	xhr.send();	
}



function getStories(){ 
	makeGet("story.php",'userId='+parseInt(getElInnerHtml("userId")),function(stories){
		  var txt = "";
		  if(stories.length != 0){
			for(i=0; i<stories.length; i++){
				txt += "<div class=\"row yourstory\"><div class=\"yourStoryCaption\" id=\"yourStoryCaption\">"+ stories[i].Title +"<i class='fa fa-pencil edit-story' title='Edit story' onclick='editStory("+stories[i].StoryId+")'></i></div>"+
				"<div class=\"yourStoryContent\" id='yourStoryContent"+i+"'>" + stories[i].Text +"</div>"+
				"<input type=\"button\" class=\"readMore\" id='readmore"+i+"' onclick=\"showMore("+i+")\" value=\"read more\"/>" +
				"<div class=\"yourStoryLine\"><div class=\"rating\"><i class='fa fa-trash story-delete' title='Delete story' onclick='deleteStory("+stories[i].StoryId+")'></i><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>"+  
					"</div></div></div>";
			 }     
			document.getElementById('yourStories').innerHTML = txt;  
		  } 		
	})   
}

function getHistories(){      
   
	makeGet("historyStories.php",'',function(stories){
		var txt = "<div class=\"hyStoryCaption\">New</div>";
		if(stories.length != 0){
			for(i=0; i<stories.length; i++){
				txt = "<div class=\"row storyItem\" id='storyItem" + i +"' onclick=\"openHistory('"+i+"')\"><img class=\"row storyImg\" id='storyImg"+i+"'/>"+
				"<div id='storyText" +i+"' class=\"row sidebarText\"><input  style='display:none;' id='storyInput" +i+"' value = '"+ stories[i].StoryId +"' />"+ stories[i].Text +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				getElementById('hystorySideBar').appendChild(z);
				setSrc('storyImg'+ i,stories[i].Image);
			 }   

			setElInnerHtml("hystoryContent", stories[0].Text);
			setElValue("galeryId", getElValue("storyInput0") );
			setSrc("hystoryImg", stories[0].Image);
		}
	})   
}

function openHistory(i){
	setSrc('hystoryImg', getSrc('storyImg'+i));
	setElInnerHtml('hystoryContent', getElInnerHtml('storyText'+i));
	setElValue("galeryId", getElValue("storyInput"+i) );
}

function makeArticles(stories, filter){	
	for(i=0; i<stories.length; i++){
		var column = 'one';
		
		if(i%5 == 0)
			column = 'two';
		
		txt = "<div class=\"column "+column+" newsItem\" id='article"+i+"' onclick='widenArticle("+ i +")'><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
		"<div class=\"row storyText\"  id='storyText"+i+"'>"+ stories[i].Title +"</div></div>";
		
		txt += "<input style='display:none;' value='"+ stories[i].Text +"' id='text"+i+"'/>"
		txt += "<input style='display:none;' value='"+ stories[i].Title +"' id='title"+i+"'/>"
		var z = document.createElement('div');
		z.innerHTML = txt;
		getElementById('storyGalery').appendChild(z);
		setSrc('newsImg'+ i,stories[i].Image);
				
		if(i == 5 && !filter)
			break;
	}    
}

function getNews(){ 
	document.getElementById("search")
	.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13)
			filter();
	});

	makeGet("newsStories.php",'',function(stories){
		var txt = "<div class=\"hyStoryCaption\">New</div>";
			if(stories.length != 0){
			for(i=0; i<stories.length; i++){
				txt = "<div class=\"row storyItem\"><img class=\"row storyImg\" id='storyImg"+i +"'/>"+
				"<div class=\"row sidebarText\">"+ stories[i].Title +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				getElementById('hystorySideBar').appendChild(z);
				setSrc('storyImg'+ i, stories[i].Image);
			 }     
			
			makeArticles(stories,false);
		}
	});	
}

function filter(){
	var filt = getElValue("search");
	
	if(filt == "")
		getNews();
	
	document.getElementById('storyGalery').innerHTML = "";
	
	var query = "filter="+ filt;
	
	makeGet("filterNews",query,function(response){
		makeArticles(response,true);
	})
}

function deleteStory(storyId){
	var query = "storyId="+ storyId;
	
	makeDelete("deleteStory.php",query,function(response){
		if(response){
			getStories();
		}
	})
}

function showMore(i){
	if(getElStyleProp("yourStoryContent"+i,"max-height") == "none"){
		setElStyleProp("yourStoryContent"+i,"max-height","15%");
		setElStyleProp("yourStoryContent"+i,"transition","max-height 0.5s ease-in");
		setElValue("readmore" + i, "read more");
		
	}
	else{
		setElStyleProp("yourStoryContent"+i,"max-height","none");		
		setElStyleProp("yourStoryContent"+i,"transition","max-height 0.5s ease-out");
		setElValue("readmore" + i, "read less");
	}
}

function editStory(storyId){
	story = [];
	makeGet("getStory.php","storyId="+storyId, function(response){
		story.storyId = response[0].StoryId;
		
		story.title = response[0].Title;
		story.images = [];
		story.text = response[0].Text;
		story.storytypeid = response[0].StoryTypeId;		
		story.newstypeid = response[0].NewsTypeId;
		for(i=0; i<response.length; i++)
			story.images.push(response[i].Image);
		
		setElValue("storyTitle",story.title);
		setElValue("storyArea",story.text);
		setElValue("categorySelect",story.storytypeid);
		setElValue("newsCategory",story.newstypeid);
		setElValue("storyId", storyId);
		
		var txt = "";
		for (var i = 0; i < story.images.length; i++) {
			txt +="<img class='uploadedImages' src=" +story.images[i] + "></img>";               
		} 
		
		setElInnerHtml("selectedImages", txt);
	
		setElStyleProp('writeStory','display', 'block');		
	})
}

function widenArticle(articleId){
	if(getElementById("article"+articleId).classList.contains("one")){
		getElementById("article"+articleId).classList.remove("one");
		getElementById("article"+articleId).classList.add("four");
		setElStyleProp("storyText"+articleId, "max-height", "none");		
		setElStyleProp("storyText"+articleId, "height", "auto");
		setElInnerHtml("storyText"+articleId, getElInnerHtml("storyText"+articleId) + "<br/>" + getElValue("text"+articleId));
	}
	
	else if(getElementById("article"+articleId).classList.contains("two")){
		getElementById("article"+articleId).classList.remove("two");
		getElementById("article"+articleId).classList.add("four");
		setElStyleProp("storyText"+articleId, "max-height", "none");		
		setElStyleProp("storyText"+articleId, "height", "auto");
		setElInnerHtml("storyText"+articleId, getElInnerHtml("storyText"+articleId) + "<br/>" + getElValue("text"+articleId));
	}
	else if(getElementById("article"+articleId).classList.contains("four")){
		getElementById("article"+articleId).classList.remove("four");
		setElStyleProp("storyText"+articleId, "max-height", "10%")		
		setElStyleProp("storyText"+articleId, "height", "20px")
		var colClass ="one";
		if(articleId % 5 == 0){
			colClass = "two";
		}
		setElInnerHtml("storyText"+articleId, getElValue("title"+articleId));		
		getElementById("article"+articleId).classList.add(colClass);
	}
}

function logedIn(){
	makeGet("getUser.php","userId="+parseInt(getElInnerHtml("userId")),function(response){
			setElInnerHtml("Info",response.Info.replace(/\n/g, '<br/>'));
			setElInnerHtml("Education", response.Education.replace(/\n/g, '<br/>'));
			setElInnerHtml("Employment",response.Employment.replace(/\n/g, '<br/>'));
			setElInnerHtml("Hobies",response.Hobies.replace(/\n/g, '<br/>'));
			setElStyleProp("profile-pic","background","url(" + response.ProfileImage + ")");
			setElStyleProp("smallImg","background","url(" + response.ProfileImage + ")");
			getStories();
		
	})
}

function editUserInfo(elID){
	var editableText =document.createElement('textarea');
	editableText.style["width"]="100%";
	editableText.style["resize"]="none";
	editableText.style["height"]="20%";
	editableText.style["border-color"]="lightgray";
	editableText.id = elID + "edit"
	var divHtml =  getElementById(elID);
    editableText.textContent = divHtml.textContent;
	editableText.onblur = function(){ leaveEditUserInfo(elID); };
    divHtml.replaceWith(editableText);
    editableText.focus();
}

function leaveEditUserInfo(elID, action){
	var obj = {
		prop : elID,
		value : getElValue(elID+"edit"),
		userId : getElInnerHtml("userId")
	}
	makePost("editUserInfo.php",obj,function(){
		var editableText = getElementById(elID+"edit");	
		var divHtml =  document.createElement('div');
		divHtml.className  = "row uInfo";
		divHtml.id = elID;
		divHtml.innerHTML = editableText.value.replace(/\n/g, '<br/>');
		divHtml.onclick = function(){ editUserInfo(elID); };	
		editableText.replaceWith(divHtml);
		
	});
}

function uploadProfilePic(){
	getElementById("profile-image-upload").click();	
}

function setProfilePic(){
	var FR= new FileReader();
	FR.onload = function(e) {	
		var obj = {
			prop : 'ProfileImage',
			value : e.target.result,
			userId : getElInnerHtml("userId")
		}
		setElStyleProp('profile-pic','background','url('+e.target.result+')')
		setElStyleProp('smallImg','background','url('+e.target.result+')')
		makePost("editUserInfo.php",obj,function(){})		
	};       
	FR.readAsDataURL( getElementById("profile-image-upload").files[0] );
}


function downloadreport(){
	makeDownload("generateReport");
}

function deserializexml(){
	makeGet("deserialize.php","",function(response){
		if(response == "ok"){
			alert("Deserialized successfully");
		}
	})
}
























