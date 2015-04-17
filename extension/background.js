var sites = [
	"ac24.cz",
	"aeronet.cz",
	"afinabul.blog.cz",
	"alternews.cz",
	"auria.sk",
	"badatel.net",
	"badatel.sk",
	"beo.sk",
	"bezpolitickekorektnosti.cz",
	"cez-okno.net",
	"charta2015.com",
	"sputniknews.com",
	"czechfreepress.cz",
	"eiaktivity.sk",
	"extraplus.sk",
	"freepub.cz",
	"hlavnespravy.sk",
	"inespravy.sk",
	"je-to-inak.livejournal.com",
	"jetoinak.livejournal.com",
	"leva-net.webnode.cz",
	"maat.sk",
	"magnificat.sk",
	"nadhlad.com",
	"nazorobcana.sk",
	"novarepublika.cz",
	"novorossia.weebly.com",
	"novysmer.cz",
	"nwoo.org",
	"orgo-net.blogspot.sk",
	"panobcan.sk",
	"pravdive.eu",
	"rodinajezaklad.sk",
	"slovak.ruvr.ru",
	"czech.ruvr.ru",
	"sho.sk",
	"slobodnyvysielac.sk",
	"slovenskeslovo.sk",
	"spolocnostsbm.com",
	"stopautogenocide.sk",
	"svetkolemnas.info",
	"svobodnenoviny.eu",
	"svobodny-vysilac.cz/svcs",
	"vedy.sk",
	"vkpatriarhat.org.ua",
	"vlastnihlavou.cz",
	"voxvictims.com",
	"ze-sveta.cz",
	"zemavek.sk",
	"zvedavec.org"
];

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