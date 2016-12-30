function unhideEdit() {
    var el = document.getElementById('writeStory');
    if ( el.style.display === 'block')
        el.style.display = 'none';
    else
        el.style.display = 'block';
}
function validate(){
    document.getElementById('validationMessage').innerHTML = '';
    document.getElementById('validationMessageDiv').style.display = 'none';
    
    
    var catSelect = document.getElementById('categorySelect').value;
    var newsCategorySelect = document.getElementById('newsCategory').value;
    var storyArea = document.getElementById('storyArea').value;
	var title = document.getElementById('storyTitle').value;
	var files = document.getElementById('fileupload').files;
	
    
    if(catSelect == "")
        document.getElementById('validationMessage').innerHTML = 'Please select story category.';
    if(newsCategorySelect == "")
        document.getElementById('validationMessage').innerHTML +=' Please select news category.';
    if(storyArea == "")
        document.getElementById('validationMessage').innerHTML +=' Please fill in story field.';
	if(title == "")
    	document.getElementById('validationMessage').innerHTML +=' Please fill in title field.';
	if(files.length == 0)
    	document.getElementById('validationMessage').innerHTML +=' Please select images.';
		
    if( document.getElementById('validationMessage').innerHTML != '')
       document.getElementById('validationMessageDiv').style.display = 'block';	
	else{			
		var story = {
			storycategory:catSelect,
			newscategory:newsCategorySelect,
			text:storyArea,
			title:title,
			images:{
				image:[]
			}
		}
		for (var i = 0; i < files.length; i ++){	
			var FR= new FileReader();
			FR.onload = function(e) {
				story.images.image.push(e.target.result);			
				if ( story.images.image.length == files.length) {
			   		saveStory(story);
				}
			};       
			FR.readAsDataURL( files[i] );
		   
		}
	}
}

function ClearStory(){
	document.getElementById('categorySelect').value=0;
    document.getElementById('newsCategory').value=0;
    document.getElementById('storyArea').value='';
	document.getElementById('storyTitle').value='';
	document.getElementById('fileupload').value="";
	document.getElementById("selectedImages").innerHTML = "";
}

function saveStory(story){
	document.getElementById('loading').style.display = 'block';	
	
	var http = new XMLHttpRequest();
	var url = "http://localhost:8080/story.php";	
	http.open('POST', url, true);

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			document.getElementById('loading').style.display = 'none';		
			ClearStory();
		}
		else if(http.status != 200){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('validationMessage').innerHTML='An error occurred while saving story';
       		document.getElementById('validationMessageDiv').style.display = 'block';	
		}
	}
	story.images.image = JSON.stringify(story.images.image)
	http.send(JSON.stringify(story));
}

function readFile(file) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

function uploadedImages() {
    var x = document.getElementById("fileupload");
    var txt = "";
   
    for (var i = 0; i < x.files.length; i++) {
        txt +="<img style='width:100px; height:100px; margin-right:5px; margin-bottom:5px; border:1px solid lightgrey;' src=" + URL.createObjectURL(x.files[i]) + "></img>";               
    }   
    document.getElementById("selectedImages").innerHTML = txt;
}

function hideValidationMessage(){
     document.getElementById('validationMessageDiv').style.display = 'none';
}

function openGalery(){
    document.getElementById('modal').style.display = 'block';
    document.getElementById('leftGalery').style.display = 'block';
    document.getElementById('rightGalery').style.display = 'block';
    document.getElementById('galery').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

images = ["https://durhamcountylibrary.org/exhibits/dcrhp/images/cr037.jpg",
          "https://s-media-cache-ak0.pinimg.com/736x/8e/8b/96/8e8b96542163eddb99859f0b399cf974.jpg",
          "http://67.media.tumblr.com/c0a71d8534c5e78506df59cec9e662ac/tumblr_n301koKFoF1qbj1sio1_500.jpg",
          "https://s-media-cache-ak0.pinimg.com/originals/6f/22/12/6f22122d5c52e0cb752a278542ec8012.jpg"]

i = 0;

function leftImage(){
    i --;
    if( i <= 0 )
        i = images.length - 1;
    else if(i >= images.length)
        i = 0
    document.getElementById('galery').style.background = 'url(' +images[i]+')';
    document.getElementById('galery').style.backgroundSize = 'cover';
}

function rightImage(){
     i ++;
    if( i <= 0 )
        i = images.length - 1;
    else if(i >= images.length)
        i = 0;
    
    document.getElementById('galery').style.background = 'url(' +images[i]+')';
    document.getElementById('galery').style.backgroundSize = 'cover';
}

document.onkeydown = function( evt ) {
    evt = evt || window.event;

    if ( evt.keyCode === 27 ){
       hideGalery()
    }
}

function hideGalery() {
    document.getElementById( 'modal' ).style.display = 'none';
    document.getElementById( 'leftGalery' ).style.display = 'none';
    document.getElementById( 'rightGalery' ).style.display = 'none';
    document.getElementById( 'galery' ).style.display = 'none';
    document.body.style.overflow = '';
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

function getStories(){      
    var stories = [];
    var xhr= new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8080/story.php", true);
    xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    stories = JSON.parse(this.response).story;
    var txt = "";
    for(i=0; i<stories.length; i++){
        txt += "<div class=\"row yourstory\"><div class=\"yourStoryCaption\" id=\"yourStoryCaption\">"+ stories[i].title +"</div>"+
        "<div class=\"yourStoryContent\" id=\"yourStoryContent\">"+stories[i].text +"</div>"+
        "<input type=\"button\" class=\"readMore\" onclick=\"showMore()\" value=\"read more\"/>" +
        "<div class=\"yourStoryLine\"><div class=\"rating\"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>"+  
            "</div></div></div>";
     }     
     document.getElementById('yourStories').innerHTML = txt;                
    };	
    xhr.send();	    
}

function getHistories(){      
    var stories = [];
    var xhr= new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8080/historyStories.php", true);
    xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return;
    stories = JSON.parse(this.response).story;
    var txt = "<div class=\"hyStoryCaption\">New</div>";
    for(i=0; i<stories.length; i++){
        txt = "<div class=\"row storyItem\" id='storyItem" + i +"' onclick=\"openHistory('"+stories.indexOf(stories[i])+"')\"><img class=\"row storyImg\" id='storyImg"+i+"'/>"+
        "<div id='storyText" +i+"' class=\"row storyText\">"+ stories[i].text +"</div></div>";
		var z = document.createElement('div');
		z.innerHTML = txt;
		document.getElementById('hystorySideBar').appendChild(z);
		document.getElementById('storyImg'+ i).src =stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
     }               
    };	
    xhr.send();	    
}

function openHistory(i){
	document.getElementById('hystoryImg').src = document.getElementById('storyImg'+i).src
	document.getElementById('hystoryContent').innerHTML = document.getElementById('storyText'+i).innerHTML;
}

function getNews(){ 
	document.getElementById("search")
	.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode == 13)
			filter();
	});
		
    var stories = [];
    var xhr= new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8080/newsStories.php", true);
    xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return;
		stories = JSON.parse(this.response).story;
		var txt = "<div class=\"hyStoryCaption\">New</div>";
		for(i=0; i<stories.length; i++){
			txt = "<div class=\"row storyItem\"><img class=\"row storyImg\" id='storyImg"+i +"'/>"+
			"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
			var z = document.createElement('div');
			z.innerHTML = txt;
			document.getElementById('hystorySideBar').appendChild(z);
			document.getElementById('storyImg'+ i).src = stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
		 }     
		txt = "";
		for(i=0; i<stories.length; i++){
			if(i==0 || i==5){
				txt = "<div class=\"column two newsItem\"><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
				"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				document.getElementById('storyGalery').appendChild(z);
				document.getElementById('newsImg'+ i).src = stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
			}
			else {
				txt = "<div class=\"column one newsItem\"><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
				"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				document.getElementById('storyGalery').appendChild(z);
				document.getElementById('newsImg'+ i).src = stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
			}
			if(i == 5)
				break;
		}
    };	
    xhr.send();	    
}

function filterArray(arr){		
	var filt = document.getElementById("search").value;
	var retArr = [];
	for(i=0; i<arr.length; i++){
		if(arr[i].newscategory=="news" &&(arr[i].text.indexOf(filt)!=-1 || arr[i].title.indexOf(filt)!=-1))
			retArr.push(arr[i]);
	}	
	return retArr;
}

function filter(){
	var filt = document.getElementById("search").value;
	if(filt == "")
		return;
	document.getElementById('storyGalery').innerHTML = "";
	var stories = [];
    var xhr= new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8080/news.php", true);
    xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return;
		stories = JSON.parse(this.response).story;
		var txt = "<div class=\"hyStoryCaption\">New</div>";
		
		stories = filterArray(stories );
		
		txt = "";
		for(i=0; i<stories.length; i++){
			if(i%5==0){
				txt = "<div class=\"column two newsItem\"><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
				"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				document.getElementById('storyGalery').appendChild(z);
				document.getElementById('newsImg'+ i).src = stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
			}
			else {
				txt = "<div class=\"column one newsItem\"><img class=\"row newsImg\" id='newsImg"+i +"'/>"+
				"<div class=\"row storyText\">"+ stories[i].text +"</div></div>";
				var z = document.createElement('div');
				z.innerHTML = txt;
				document.getElementById('storyGalery').appendChild(z);
				document.getElementById('newsImg'+ i).src = stories[i].images.image.split('","')[0].replace('["','').replace('"]','');
			}
		}
	}
	xhr.send();	 
}