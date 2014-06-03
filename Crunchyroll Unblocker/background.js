function setCookie () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			chrome.cookies.remove({url: "http://crunchyroll.com/", name: "sess_id"});
			chrome.cookies.set({url: "http://.crunchyroll.com/", name: "sess_id", value: xhr.responseText});
		}
	}
	xhr.open("GET", "http://www.crunblocker.com/sess_id.php", true);
	xhr.send(null);
}

chrome.browserAction.onClicked.addListener (function () {
	setCookie();
	chrome.tabs.create({url: "http://crunchyroll.com/videos/anime/"});
});

chrome.runtime.onMessage.addListener(function (message) { 
	if (message.msg == "SET") { 
		setCookie (); 
	} else if (message.msg == "REDIRECT") {
		chrome.tabs.update({url: "http://www.crunchyroll.com/"});
	}
});

chrome.runtime.onStartup.addListener(function () {setCookie ();});