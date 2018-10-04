//
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') {
        return;
    }

    // Check whether this site is on the list
    if (isOnTheList(tab.url)) {
        // For example: "sk", "sk_SK", "en", "en_US", "cs", "cs_CZ", ...
        var lng = window.navigator.userLanguage || window.navigator.language;

        var configFile = 'config-en.js';
        if (lng === 'sk-SK' || lng === 'sk') {
            configFile = 'config-sk.js';
        }
        else if (lng === 'cs-CZ' || lng === 'cs') {
            configFile = 'config-cs.js';
        }

        // Load config file and show warning
        chrome.tabs.executeScript(tab.id, {file: configFile}, function () {
            chrome.tabs.executeScript(tab.id, {file: 'show_warning.js'});
        });
    }
});

/**
 * Returns 'true' if site is on the Fake news list
 */
function isOnTheList(url) {
    for (i = 0; i < sites.length; i++) {
        var site = sites[i];
        if (url.indexOf(site) > -1) {
            return true;
        }
    }
    return false;
}
