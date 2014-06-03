var cr = new RegExp("crunchyroll.");
var uscr = new RegExp("crunchyroll.com");

if (cr.test(document.URL) && document.URL.indexOf("crunchyroll.") < 13) {
	if (uscr.test(document.URL)) {
		_setCookie ();
	} else {
		chrome.runtime.sendMessage({msg: "REDIRECT"});
	}
}
		
function _setCookie () {
	chrome.storage.local.get("TIME", function (items) {
		var time = items["TIME"];
		if ((time + 1800000) < (new Date()).getTime()) {
			chrome.storage.local.set({"TIME": (new Date()).getTime()});
			chrome.runtime.sendMessage({msg: "SET"});
		}
	});
}