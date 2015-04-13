var sites = [
	"svetkolemnas.info",
	"zvedavec.org",
	"ac24.cz",
	"rodinajezaklad.sk",
	"stopautogenocide.sk",
	"vzdor.sk",
	"osud.cz",
	"zemejas.cz",
	"ruvr.ru",
	"zemavek.sk",
	"panobcan.sk",
	"czechfreepress.cz",
	"vaseforum.sk",
	"slobodnyvysielac.sk",
	"hlavnespravy.sk",
	"badatel.sk",
	"badatel.net",
	"protiprudu.org",
	"beo.sk",
	"obcianskytribunal.sk",
	"sho.sk",
	"voxvictims.com",
	"magnificat.sk",
	"vkpatriarhat.org.ua",
	"freeglobe.parlamentnilisty.cz",
	"spolocnostsbm.com",
	"svobodnenoviny.eu",
	"auria.sk",
	"afinabul.blog.cz",
	"dolezite.sk",
	"inespravy.sk",
	"tvina.sk",
	"nadhlad.com",
	"ze-sveta.cz",
	"nwoo.org",
	"orgo-net.blogspot.sk",
	"cez-okno.net",
	"vlastnihlavou.cz",
	"neskutocne.sk",
	"bezpolitickekorektnosti.cz",
	"eiaktivity.sk",
	"nazorobcana.sk",
	"alternews.cz",
	"pravdive.eu",
	"aeronet.cz",
	"slovenskeslovo.sk",
	"svobodny-vysilac.cz/svcs",
	"vedy.sk",
	"leva-net.webnode.cz",
	"novysmer.cz",
	"novarepublika.cz",
	"extraplus.sk",
	"maat.sk",
	"lifenews.sk",
	"sputniknews.com",
	"je-to-inak.livejournal.com",
	"charta2015.com",
	"novorossia.weebly.com"
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