function unhideEdit(){
    var el = document.getElementById('writeStory');
    if(el.style.display == 'block')
        el.style.display = 'none'
    else
        el.style.display = 'block'
}

function validate(){
    document.getElementById('validationMessage').innerHTML = '';
    document.getElementById('validationMessageDiv').style.display = 'none';
    
    
    var catSelect = document.getElementById('categorySelect').value;
    var newsCategorySelect = document.getElementById('newsCategory').value;
    var storyArea = document.getElementById('storyArea').text;
    
    if(catSelect == "")
        document.getElementById('validationMessage').innerHTML = 'Please select story category.';
    if(newsCategorySelect == "")
        document.getElementById('validationMessage').innerHTML +=' Please select news category.';
    if(/\S/.test(storyArea))
        document.getElementById('validationMessage').innerHTML +=' Please fill in story field.';
    
    if( document.getElementById('validationMessage').innerHTML != '')
       document.getElementById('validationMessageDiv').style.display = 'block';
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
    i--;
    if(i <= 0)
        i = images.length - 1;
    else if(i >= images.length)
        i = 0
    document.getElementById('galery').style.background = 'url(' +images[i]+')';
    document.getElementById('galery').style.backgroundSize = 'cover';
}

function rightImage(){
     i++;
    if(i <= 0)
        i = images.length - 1;
    else if(i >= images.length)
        i = 0;
    
    document.getElementById('galery').style.background = 'url(' +images[i]+')';
    document.getElementById('galery').style.backgroundSize = 'cover';
}

document.onkeydown = function(evt) {
    evt = evt || window.event;

    if (evt.keyCode === 27){
       hideGalery()
    }
}

function hideGalery(){
    document.getElementById('modal').style.display = 'none';
    document.getElementById('leftGalery').style.display = 'none';
    document.getElementById('rightGalery').style.display = 'none';
    document.getElementById('galery').style.display = 'none';
    document.body.style.overflow = '';
}


function pageTabOnClick(page) {

	var xhr= new XMLHttpRequest();
	xhr.open('GET', page, true);
	xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return;
		
		document.body.innerHTML= this.responseText;
	};
	
	xhr.send();
}