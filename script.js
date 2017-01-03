
var defaultRoute = "http://localhost:8080/";

window.onload = getStories();

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
	setElStyleProp('loading','display','none');
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
	if(files.length == 0)
    	setValidationMessInnerHtml(' Please select images.');
		
    if( getElInnerHtml('validationMessage') != '')
       setElStyleProp('validationMessageDiv','display','block');	
	else{			
		var story = {
			storycategory:catSelect,
			newscategory:newsCategorySelect,
			text:storyArea,
			title:title,
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

function ClearStory(){
	setElValue('categorySelect',0);
	setElValue('newsCategory',0);
	setElValue('storyArea','');
	setElValue('storyTitle','');
	setElValue('fileupload','');
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
	
	story.imagesJSON.stringify(story.images)
		
	makePost(url,story,function(success){
		if(success){
			ClearStory();
		}
	})		
}

function uploadedImages() {
    var x = document.getElementById("fileupload");
    var txt = "";
   
    for (var i = 0; i < x.files.length; i++) {
        txt +="<img class='uploadedImages' src=" + URL.createObjectURL(x.files[i]) + "></img>";               
    }   
    setElInnerHtml("selectedImages", txt);
}



function openGalery(){
    setElStyleProp('modal','display','block');	
    setElStyleProp('leftGalery','display','block');	
    setElStyleProp('rightGalery','display','block');	
    setElStyleProp('galery','display','block');	
    document.body.style.overflow = 'hidden';
}

function hideGalery() {
   setElStyleProp('modal','display','none');	
    setElStyleProp('leftGalery','display','none');	
    setElStyleProp('rightGalery','display','none');	
    setElStyleProp('galery','display','none');	
    document.body.style.overflow = 'hidden';
}

var galeryImages = [];
imagesInd = 0;

function leftImage(){
    imagesInd --;
    if( imagesInd <= 0 )
        imagesInd = galeryImages.length - 1;
    else if(imagesInd >= galeryImages.length)
        imagesInd = 0;
	
    setElStyleProp('galery','background','url(' +galeryImages[imagesInd]+')');
    setElStyleProp('galery','backgroundSize','cover');
}

function rightImage(){
     imagesInd ++;
    if( imagesInd <= 0 )
        imagesInd = galeryImages.length - 1;
    else if(imagesInd >= galeryImages.length)
        imagesInd = 0;
    
    setElStyleProp('galery','background','url(' +galeryImages[imagesInd]+')');
    setElStyleProp('galery','backgroundSize','cover');
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
        if(page == "index.html"){
            getStories();
        }else  if(page == "History.html"){
            getHistories();							
        }else  if(page == "News.html"){
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


function getStories(){ 
	makeGet("story.php",'',function(stories){
		  var txt = "";
		for(i=0; i<stories.length; i++){
			txt += "<div class=\"row yourstory\"><div class=\"yourStoryCaption\" id=\"yourStoryCaption\">"+ stories[i].Title +"</div>"+
			"<div class=\"yourStoryContent\" id=\"yourStoryContent\">"+stories[i].Text +"</div>"+
			"<input type=\"button\" class=\"readMore\" onclick=\"showMore()\" value=\"read more\"/>" +
			"<div class=\"yourStoryLine\"><div class=\"rating\"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>"+  
				"</div></div></div>";
		 }     
		document.getElementById('yourStories').innerHTML = txt;   		
	})   
}

function getHistories(){      
   
	makeGet("historyStories.php",'',function(stories){
		var txt = "<div class=\"hyStoryCaption\">New</div>";
		for(i=0; i<stories.length; i++){
			txt = "<div class=\"row storyItem\" id='storyItem" + i +"' onclick=\"openHistory('"+stories.indexOf(stories[i])+"')\"><img class=\"row storyImg\" id='storyImg"+i+"'/>"+
			"<div id='storyText" +i+"' class=\"row storyText\">"+ stories[i].text +"</div></div>";
			var z = document.createElement('div');
			z.innerHTML = txt;
			getElementById('hystorySideBar').appendChild(z);
			setSrc('storyImg'+ i,stories[i].Image);
		 }        
	})   
}

function openHistory(i){
	setSrc('hystoryImg', getSrc('storyImg'+i));
	setElInnerHtml('hystoryContent', getElInnerHtml('storyText'+i));
}

function makeArticles(stories, filter){
	var column = 'one';
	for(i=0; i<stories.length; i++){
		if(i%5 == 0){
			column = 'two';
			txt = "<div class=\"column "+column+" newsItem\"><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
			"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
			var z = document.createElement('div');
			z.innerHTML = txt;
			getElementById('storyGalery').appendChild(z);
			setSrc('newsImg'+ i,stories[i].Image);
		}		
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
		for(i=0; i<stories.length; i++){
			txt = "<div class=\"row storyItem\"><img class=\"row storyImg\" id='storyImg"+i +"'/>"+
			"<div class=\"row storyText\">"+ stories[i].Text +"</div></div>";
			var z = document.createElement('div');
			z.innerHTML = txt;
			getElementById('hystorySideBar').appendChild(z);
			setSrc('storyImg'+ i, stories[i].Image);
		 }     
		
		makeArticles(stories,false);
	});	
}

function filter(){
	var filt = getElValue("search");
	
	if(filt == "")
		return;
	
	
	document.getElementById('storyGalery').innerHTML = "";
	
	var query = "filter="+ filt;
	
	makeGet("filterNews",query,function(response){
		makeArticles(response,true);
	})
}