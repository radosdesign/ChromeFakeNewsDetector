/**
 * Returns 0 if site is without propaganda, 1 if site is supposed to have propaganda
 */
function checkSite(url) {
	for (i = 0; i < sites.length; i++) {
		var site = sites[i];
		if(url.indexOf(site) > -1) {
			return 1;
		}
	}
	return 0;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	var siteStatus = checkSite(tab.url);
	console.log("Site's " + tab.url + " status: " + siteStatus);
	if(siteStatus == 1) {
		chrome.pageAction.show(tabId);
	}
	else {
		chrome.pageAction.hide(tabId);
	}
});