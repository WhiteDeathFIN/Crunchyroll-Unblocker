var alrm = true;

function setCookie () {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			chrome.cookies.remove({url: "http://crunchyroll.com/", name: "sess_id"});
			chrome.cookies.set({url: "http://.crunchyroll.com/", name: "sess_id", value: xhr.responseText})
			window.setTimeout(setAlarm,3000);
		}
	}
	xhr.open('GET', 'http://www.crunblocker.com/sess_id.php', true);
	xhr.send(null);
}

function setAlarm () {
	chrome.alarms.create("alrm", {"delayInMinutes": 1});
}

chrome.browserAction.onClicked.addListener (function (tab) {
	setCookie();
	chrome.tabs.create({"url": "http://crunchyroll.com/videos/anime/"});
});

chrome.webRequest.onBeforeSendHeaders.addListener (function (tab) {
	if (alrm) {
		alrm = false;
		setCookie();
	}
},{"urls": ["*://*.crunchyroll.com/*"]});

chrome.alarms.onAlarm.addListener(function (alarm) {alrm = true;});
chrome.runtime.onStartup.addListener(function () {setCookie ();});