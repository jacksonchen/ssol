var request = require('request'),
    cheerio = require('cheerio'),
    notifier = require('node-notifier');

var j = request.jar(),
    old;
var cookie = request.cookie(`b_id=OHySLxWGK74UbWwxS1Ziyx; __qca=P0-1345335876-1483666358443; mp_6cfb4f74c6f96c73f7d86d528d751e8a_mixpanel=%7B%22distinct_id%22%3A%20%221597fab61b1361-01804e3dc1552-1d356f52-13c680-1597fab61b25b5%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D; cX_P=j1bo30ugyvfhqfbo; AMCV_774C31DD5342CAF40A490D44%40AdobeOrg=793872103%7CMCIDTS%7C17281%7CMCMID%7C85207983344904925612857466513422608845%7CMCAAMLH-1493667484%7C7%7CMCAAMB-1493667484%7CNRX38WO0n5BH8Th-nqAG_A%7CMCAID%7CNONE; _vwo_uuid_v2=CDE19CA160315574DE6BD13B10AFBE1B|a5ca51f150d134f95ed875b374287baf; _snow_id.6486=8a2e0612-fd72-44b1-bf37-c416380dcb3b.1501373705.1.1501373705.1501373705.eeb2cd33-1f22-45af-91a8-ace713f877ae; __utmz=227718799.1513098189.28.16.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga=GA1.2.1455124743.1468991418; __unam=c5b17e2-160aba62285-3ee6fc14-12; __utma=227718799.1455124743.1468991418.1513098189.1515513859.29; _gid=GA1.2.1035737219.1516050032; BIGipServer~CUIT~ssol-prod.cc.columbia.edu-128.59.44.35.443-pool=4183571328.47873.0000`);
var url = 'https://ssol.columbia.edu/cgi-bin/ssol/pPo55L58KRK7QFPsqQIpoB/';
j.setCookie(cookie, url);

function randomTime() {
  var hmm = Math.floor(Math.random() * 10000) + 1000;
  return hmm;
}

function runner() {
  setTimeout(() => {
    request.post({url: url, form: {
       'tran[1]_CALLNUM' : '26410HUMA 1121 W 008N3.00',
       'tran[1]_act' : 'Change Section',
       'tran[1]_entry' : 'student',
       'tran[1]_tran_name' : 'sreg'
     }, jar: j}, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         var $ = cheerio.load(body);
         let newText = $('.cls2').siblings().text();
         if (newText != old) {
           old = newText;
           console.log(newText);
           console.log("\n===========================\n");
           notifier.notify('Art Hum Change');
         }
         runner();
       }
     })
  }, randomTime());
}

runner();
