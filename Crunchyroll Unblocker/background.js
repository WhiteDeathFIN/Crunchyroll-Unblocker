function setCookie (tld) {
	var xhr = new XMLHttpRequest();
	xhr.timeout = 5000;
	xhr.ontimeout = function () {
		chrome.notifications.create("", {type: "basic", title: "Request Timed Out", message: "Crunchyroll Unblocker has encounted an error", iconUrl: "crunblock128.png"}, function (notificationId) {});
	};
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			chrome.cookies.remove({url: "http://crunchyroll" + tld + "/", name: "sess_id"});
			chrome.cookies.set({url: "http://.crunchyroll" + tld + "/", name: "sess_id", value: xhr.responseText});
		}
	};
	xhr.open("GET", "http://www.crunblocker.com/sess_id.php", true);
	xhr.send(null);
}

function openStartPage()
{
	chrome.storage.sync.get({
		startPage: "home/queue"
	}, function(items) {
		// Page that opens when done.
		// This fork sets this to queue page.
		chrome.tabs.create({url: "http://www.crunchyroll.com/"+items.startPage});
	});
}

chrome.browserAction.onClicked.addListener (function () {
	setCookie(".com");
	openStartPage();
});

chrome.runtime.onMessage.addListener(function (message) { 
	setCookie (message.msg); 
});

chrome.runtime.onStartup.addListener(function () {
	setCookie (".com");
});
