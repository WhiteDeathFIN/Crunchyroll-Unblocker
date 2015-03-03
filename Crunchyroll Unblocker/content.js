var cr = new RegExp("crunchyroll.");
var us = new RegExp("United States of America");
var c = window.location.hostname;

if (cr.test(window.location.hostname)) {
	chrome.storage.local.get("TIME", function (items) {
		var time = items["TIME"];
		if ((time + 1800000) < (new Date()).getTime() || !(isUS())) {
			chrome.storage.local.set({"TIME": (new Date()).getTime()});
			chrome.runtime.sendMessage({msg: c.slice(c.indexOf("crunchyroll.") + 11, c.length)});
		}
	});
}

function isUS () {
	var location = document.getElementById("footer_country_flag");
	if (us.test(location.alt)) {
		return true;
	}
}
