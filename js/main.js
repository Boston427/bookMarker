// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Saves Bookmark
function saveBookmark(e) {
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	if(!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
/*
	// Local Storage Test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	if(localStorage.getItem('bookmarks') === null) {
		//inti array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		// set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		//reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();

	//Re-fetch bookmarks
	fetchBookmarks();

	// prevents form from submitting
	e.preventDefault();
}

// delete bookmarks
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}
	//reset back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re-fetch bookmarks
	fetchBookmarks();
}

// fetch bookmarks

function fetchBookmarks() {
	//Get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
									  '<h3>'+name+
									  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
									  '</h3>'+
									  '</div>';
	}
}

function validateForm(siteName, siteUrl) {
	if(!siteName || !siteUrl) {
		alert('Please fill in form');
		return false;
	} 

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert('Please use a valid URL');
		return false;
	}

	return true;
}