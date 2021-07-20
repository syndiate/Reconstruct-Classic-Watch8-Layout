// ==UserScript==
// @name        Reconstruct Classic Watch8 YouTube Layout
// @version 1.0.0
// @description  A revised and (almost) fixed version of the "simple script that seeks to reconstruct the classic watch7 layout on YouTube."
// @author syndiate
// @require https://unpkg.com/vue@2.6.12/dist/vue.js
// @require https://unpkg.com/xfetch-js@0.5.0/dist/xfetch.min.js
// @match *://*.youtube.com/*
// @match *://*.youtu.be/*
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM.getValue
// @grant GM.setValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// @grant unsafeWindow
// @run-at document-start
// @license MITs
// ==/UserScript==

/*

original script by daylin#2409 (aka theundeadwolf0)
fixed and transformed by syndiate#0760
with assistance from Valmoiiaa#7824

original script: https://textbin.net/raw/beta-classic-yt-watch7-14-02-2021
^ the above script is REALLY broken (use at your own risk!)
on the other hand, if you don't want a broken script, then use this script.

*/

//try {
// Define watch template (we inject information into this later):

var videoId = (function()
	{

    var list = false;
    var index = false;


    var videoIdSplit = window.location.search.split(/\?|\&|\=/g);

    function findList() {

       for (var o = 0; o < videoIdSplit.length; o++) {

        if (videoIdSplit[o] == "list") {

            list = true;

            return videoIdSplit[o + 1]

        }

        }

    }

    function findIndexParameter() {

        for (var k = 0; k < videoIdSplit.length; o++) {

            if (videoIdSplit[k] == "index") {

                index = true;

                return videoIdSplit[k + 1]

            }

        }

    }

    function findId() {

    for (var i = 0; i < videoIdSplit.length; i++) {

        if (videoIdSplit[i] == "v") {

            return videoIdSplit[i + 1]

        }

    }

    }

    return (findId() + (list ? `&list=` + findList() + (index ? findIndexParameter() : ``) : ``));

	})();












var isolatedViewCount = false;



var videoInfoCardLoaded = false;
var videoRecoLoaded = false;


function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// i18n
function getCookie(cname)
{

	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for(var i = 0; i <ca.length; i++) {

		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0)
		{
		  return c.substring(name.length, c.length);
		}

	}

	return "";

}

function resolveLanguage()
{

	var pref = getCookie("PREF").split(/(&)|(=)/g);
	for (i = 0; i < (pref.length + 1); i++)
	{

		if (pref[i] == "hl")
		{

			return pref[i + 3];

		}
		if (pref[i] == (pref.length + 1))
		{

			return "en";

		}

	}

}

var lang = {
			addto: "Add to",
			share: "Share",
			more: "More",
			subscribe: "Subscribe",
			unsubscribe: "Unsubscribe",
			subscribed: "Subscribed",
			showmore: "Show more",
			showless: "Show less",
			isolateViewCount: new RegExp(" views", "g"),
			dateTypeUploadedBefore: new RegExp("Uploaded on ", "g"),
			dateTypeUploaded: "Uploaded on __date__",
			dateTypePublishedBefore: new RegExp("Uploaded on ", "g"),
			dateTypePublished: "Published on __date__",
			dateTypePremieredBefore: new RegExp("Premiered ", "g"),
			dateTypePremiered: "Premiered on __date__",
			dateTypeLiveRelativeBefore: new RegExp("Started streaming ", "g"),
			dateTypeLiveRelative: "Started streaming __date__",
			dateTypeLiveBefore: new RegExp("Started streaming on ", "g"),
			dateTypeLive: "Started streaming on __date__",
			dateTypeStreamedRelativeBefore: new RegExp("Streamed live ", "g"),
			dateTypeStreamedRelative: "Streamed live __date__",
			dateTypeStreamedBefore: new RegExp("Streamed live on ", "g"),
			dateTypeStreamed: "Streamed live on __date__"
		};
var ytLang = resolveLanguage();

if (ytLang == "en")
{
		var lang = {
			addto: "Add to",
			share: "Share",
			more: "More",
			subscribe: "Subscribe",
			unsubscribe: "Unsubscribe",
			subscribed: "Subscribed",
			showmore: "Show more",
			showless: "Show less",
            report: "Report",
            statistics: "Statistics",
            transcript: "Transcript",
            translations: "Add translations",
            views: "views",
            upnext: "Up next",
            autoplay: "Autoplay",
            license: "License",
            category: "Category",
            signin: "Sign in",
            opinioncount: "Sign in to make your opinion count.",
            clickcardlike: "Like this video?",
            clickcarddislike: "Don't like this video?",
            watchagainlater: "Want to watch this again later?",
            clickcardaddto: "Sign in to add this video to a playlist.",
            reportvideo: "Need to report the video?",
            clickcardreport: "Sign in to report inappropriate content.",
            loading: "Loading...",
            autoplayhover: "When autoplay is enabled, a suggested video will automatically play next.",
            featurenotavailable: "This feature is not available right now. Please try again later.",
            rentalrequired: "Rating is available when the video has been rented.",
            verified: "Verified",
            sharesharebox: "Share",
            shareembed: "Embed",
            shareemail: "Email",
            startat: "Start at",
            interactivetranscript: "The interactive transcript could not be loaded.",
            facebookshare: 'Share to Facebook. Opens in a new window.',
            twittershare: 'Share to Twitter. Opens in a new window.',
            googleshare: 'Share to Google+. Opens in a new window.',
            bloggershare: 'Share to Blogger. Opens in a new window.',
            redditshare: 'Share to reddit. Opens in a new window.',
            tumblrshare: 'Share to Tumblr. Opens in a new window.',
            pinterestshare: 'Share to Pinterest. Opens in a new window.',
            russianplatform: 'Share to ВКонтакте. Opens in a new window.',
            linkedinshare: 'Share to LinkedIn. Opens in a new window.',
            stumbleuponshare: 'Share to StumbleUpon. Opens in a new window.',
            otherrussianplatform: 'Share to Одноклассники. Opens in a new window.',
            livejournalshare: 'Share to LiveJournal. Opens in a new window.',
            diggshare: 'Share to Digg. Opens in a new window.',
            embedpreview: "Preview:",
            embedvideosize: "Video size:",
            embedsuggested: "Show suggested videos when the video finishes",
            embedplayercontrols: "Show player controls",
            embedvideotitle: "Show video title and player actions",
            embednocookie: "Enable privacy-enhanced mode",
            embedmsg: "By displaying YouTube videos on your site, you are agreeing to the",
            embedmsghref: "YouTube API terms of service",
            embedcustomsize: "Custom size",
            registernow: "Register now",
			isolateViewCount: new RegExp(" views", "g"),
			dateTypeUploadedBefore: new RegExp("Uploaded on ", "g"),
			dateTypeUploaded: "Uploaded on __date__",
			dateTypePublishedBefore: new RegExp("Uploaded on ", "g"),
			dateTypePublished: "Published on __date__",
			dateTypePremieredBefore: new RegExp("Premiered ", "g"),
			dateTypePremiered: "Premiered on __date__",
			dateTypeLiveRelativeBefore: new RegExp("Started streaming ", "g"),
			dateTypeLiveRelative: "Started streaming __date__",
			dateTypeLiveBefore: new RegExp("Started streaming on ", "g"),
			dateTypeLive: "Started streaming on __date__",
			dateTypeStreamedRelativeBefore: new RegExp("Streamed live ", "g"),
			dateTypeStreamedRelative: "Streamed live __date__",
			dateTypeStreamedBefore: new RegExp("Streamed live on ", "g"),
			dateTypeStreamed: "Streamed live on __date__"
		};
}
if (ytLang == "ja")
{
		var lang = {
			addto: "追加",
			share: "共有",
			more: "その他",
			subscribe: "チャンネル登録",
			unsubscribe: "登録解除",
			subscribed: "登録済み",
			showmore: "もっと見る",
			showless: "一部を表示",
			isolateViewCount: new RegExp("(視聴回数 )|( 回)", "g"),
            report: "報告書",
            statistics: "統計",
            transcript: "トランスクリプト",
            translations: "翻訳を追加する",
            views: "ビュー",
            upnext: "次に",
            autoplay: "自動再生",
            license: "ライセンス",
            category: "カテゴリー ",
            signin: "サインイン",
            opinioncount: "あなたの意見を重要視するためにサインインしてください。",
            clickcardlike: "このビデオが好きですか？",
            clickcarddislike: "このビデオが気に入らない？",
            watchagainlater: "後でもう一度見たいですか？",
            clickcardaddto: "サインインして、このビデオを再生リストに追加します。",
            reportvideo: "ビデオを報告する必要がありますか？",
            clickcardreport: "サインインして不適切なコンテンツを報告します。",
            loading: "読み込んでいます...",
            autoplayhover: "自動再生が有効になっている場合、提案されたビデオが次に自動的に再生されます。",
            featurenotavailable: "この機能は現在ご利用いただけません。 後でもう一度やり直してください。",
            rentalrequired: "レーティングは、ビデオがレンタルされたときに利用できます。",
            verified: "確認済み",
            sharesharebox: "シェア",
            shareembed: "埋め込む",
            shareemail: "Eメール",
            startat: "で開始",
            interactivetranscript: "インタラクティブトランスクリプトを読み込めませんでした。",
            facebookshare: 'Facebookに共有します。 新しいウィンドウで開きます。',
            twittershare: 'Twitterで共有します。 新しいウィンドウで開きます。',
            googleshare: 'Google+に共有します。 新しいウィンドウで開きます。',
            bloggershare: 'Bloggerに共有します。 新しいウィンドウで開きます。',
            redditshare: 'redditに共有します。 新しいウィンドウで開きます。',
            tumblrshare: 'Tumblrに共有します。 新しいウィンドウで開きます。',
            pinterestshare: 'Pinterestに共有します。 新しいウィンドウで開きます。',
            russianplatform: 'ВКонтактеに共有します。 新しいウィンドウで開きます。',
            linkedinshare: 'LinkedInに共有します。 新しいウィンドウで開きます。',
            stumbleuponshare: 'StumbleUponに共有します。 新しいウィンドウで開きます。',
            otherrussianplatform: 'Одноклассникиに共有します。 新しいウィンドウで開きます。',
            livejournalshare: 'LiveJournalに共有します。 新しいウィンドウで開きます。',
            diggshare: 'Diggにシェアする。 新しいウィンドウで開きます。',
            embedpreview: "プレビュー：",
            embedvideosize: "ビデオサイズ：",
            embedsuggested: "動画が終了したら、おすすめの動画を表示する",
            embedplayercontrols: "プレーヤーのコントロールを表示する",
            embedvideotitle: "動画のタイトルとプレーヤーのアクションを表示する",
            embednocookie: "プライバシー強化モードを有効にする",
            embedmsg: "あなたのサイトにYouTubeビデオを表示することにより、あなたは",
            embedmsghref: "YouTubeAPI利用規約",
            embedcustomsize: "カスタムサイズ",
            registernow: "今すぐ登録"
		};
}
if (ytLang == "de")
{
		var lang = {
			addto: "Hinzufügen",
			share: "Teilen",
			more: "Mehr",
			subscribe: "Abonnieren",
			unsubscribe: "Abo beenden",
			subscribed: "Abonniert",
			showmore: "Mehr anzeigen",
			showless: "Weniger anzeigen",
            report: "Melden",
            statistics: "Statistik",
            transcript: "Transkript",
            translations: "Übersetzungen hinzufügen",
            views: "Aufrufe",
            upnext: "Nächstes Video",
            autoplay: "Autoplay",
            license: "Lizenz",
            category: "Kategorie",
            signin: "Anmelden",
            opinioncount: "Melde dich bei YouTube an, damit dein Feedback gezählt wird.",
            clickcardlike: "Dieses Video gefällt dir?",
            clickcarddislike: "Dieses Video gefällt dir nicht?",
            watchagainlater: "Möchtest du dieses Video später noch einmal ansehen?",
            clickcardaddto: "Wenn du bei YouTube angemeldet bist, kannst du dieses Video zu einer Playlist hinzufügen.",
            reportvideo: "Möchtest du dieses Video melden?",
            clickcardreport: "Melde dich an, um unangemessene Inhalte zu melden",
            loading: "Wird geladen...",
            autoplayhover: "Wenn Autoplay aktiviert ist, wird die Wiedergabe automatisch mit einem der aktuellen Videovorschläge fortgesetzt.",
            featurenotavailable: "Diese Funktion ist zurzeit nicht verfügbar. Bitte versuche es später erneut.",
            rentalrequired: "Die Bewertungsfunktion ist nach Ausleihen des Videos verfügbar.",
            verified: "Verifiziert",
            sharesharebox: "Teilen",
            shareembed: "Einbetten",
            shareemail: "E-Mail",
            startat: "Start um",
            interactivetranscript: "Das interaktive Transkript konnte nicht geladen werden.",
            facebookshare: 'Hier klicken, um das Video auf Facebook zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            twittershare: 'Hier klicken, um das Video auf Twitter zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            googleshare: 'Hier klicken, um das Video auf Google+ zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            bloggershare: 'Hier klicken, um das Video auf reddit zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            redditshare: 'Hier klicken, um das Video auf Blogger zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            tumblrshare: 'Hier klicken, um das Video auf Tumblr zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            pinterestshare: 'Hier klicken, um das Video auf Pinterest zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            russianplatform: 'Hier klicken, um das Video auf ВКонтакте zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            linkedinshare: 'Hier klicken, um das Video auf LinkedIn zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            stumbleuponshare: 'Hier klicken, um das Video auf Одноклассники zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            otherrussianplatform: 'Hier klicken, um das Video auf StumbleUpon zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            livejournalshare: 'Hier klicken, um das Video auf LiveJournal zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            diggshare: 'Hier klicken, um das Video auf Digg zu teilen. Dadurch wird ein neues Fenster geöffnet.',
            embedpreview: "Vorschau:",
            embedvideosize: "Videogröße:",
            embedsuggested: "Nach Ende des Videos vorgeschlagene Videos anzeigen",
            embedplayercontrols: "Player-Steuerelemente anzeigen",
            embedvideotitle: "Videotitel und Player-Aktionen anzeigen",
            embednocookie: "Erweiterten Datenschutzmodus aktivieren",
            embedmsg: "Durch die Wiedergabe von YouTube-Videos auf deiner Website stimmst du den",
            embedmsghref: "YouTube API-Nutzungsbedingungen",
            embedcustomsize: "Benutzerdefinierte Größe",
            registernow: "Jetzt anmelden"
		};
}
if (ytLang == "es")
{
		var lang = {
			addto: "Añadir a",
			share: "Compartir",
			more: "Más",
			subscribe: "Suscribirse",
			unsubscribe: "Cancelar",
			subscribed: "Suscrito",
			showmore: "Mostrar más",
			showless: "Mostrar menos"
		};
}
if (ytLang == "ro")
{
        var lang = {
            addto: "Adaugă în",
            share: "Distribuie",
            more: "Mai mult",
            subscribe: "Abonează-te",
            unsubscribe: "Dezabonează-te",
            subscribed: "Abonat(ă)",
            showmore: "Arată mai mult",
            showless: "Arată mai puțin"
        };
}
if (ytLang == "pl")
{
        var lang = {
            addto: "Zapisz",
            share: "Udostępnij",
            more: "Więcej",
            subscribe: "Subskrybuj",
            unsubscribe: "Odsubskrybuj",
            subscribed: "Subskrybujesz",
            showmore: "Pokaż więcej",
            showless: "Pokaż mniej"
        };
}




var utcoffsets = {
asiakabul: "+270",
europetirane: "+120",
africaalgiers: "+60",
pacificpagopago: "-660",
europeandorra: "+120",
africaluanda: "+60",
americaanguilla: "-240",
antarcticacasey: "+660",
antarcticadavis: "+420",
antarcticadumontdurville: "+600",
antarcticamawson: "+300",
antarcticamcmurdo: "+720",
antarcticapalmer: "-180",
antarcticarothera: "-180",
antarcticasyowa: "+180",
antarcticatroll: "+120",
antarcticavostok: "+360",
americaantigua: "-240",
americaargentinabuenosaires: "-180",
americaargentinacatamarca: "-180",
americaargentinacordoba: "-180",
americaargentinajujuy: "-180",
americaargentinalarioja: "-180",
americaargentinamendoza: "-180",
americaargentinariogallegos: "-180",
americaargentinasalta: "-180",
americaargentinasanjuan: "-180",
americaargentinasanluis: "-180",
americaargentinatucuman: "-180",
americaargentinaushuaia: "-180",
asiayerevan: "+240",
americaaruba: "-240",
antarcticamacquarie: "+600",
australiaadelaide: "+570",
australiabrisbane: "+600",
australiabrokenhill: "+570",
australiadarwin: "+570",
australiaeucla: "+525",
australiahobart: "+600",
australialindeman: "+600",
australialordhowe: "+630",
australiamelbourne: "+600",
australiaperth: "+480",
australiasydney: "+600",
europevienna: "+120",
asiabaku: "+240",
americanassau: "-240",
asiabahrain: "+180",
asiadhaka: "+360",
americabarbados: "-240",
europeminsk: "+180",
europebrussels: "+120",
americabelize: "-360",
africaportonovo: "+60",
atlanticbermuda: "-180",
asiathimphu: "+360",
americalapaz: "-240",
americakralendijk: "-240",
europesarajevo: "+120",
africagaborone: "+120",
americaaraguaina: "-180",
americabahia: "-180",
americabelem: "-180",
americaboavista: "-240",
americacampogrande: "-240",
americacuiaba: "-240",
americaeirunepe: "-300",
americafortaleza: "-180",
americamaceio: "-180",
americamanaus: "-240",
americanoronha: "-120",
americaportovelho: "-240",
americarecife: "-180",
americariobranco: "-300",
americasantarem: "-180",
americasaopaulo: "-180",
indianchagos: "+360",
asiabrunei: "+480",
europesofia: "+180",
africaouagadougou: "0",
africabujumbura: "+120",
asiaphnompenh: "+420",
africadouala: "+60",
americaatikokan: "-300",
americablancsablon: "-240",
americacambridgebay: "-360",
americacreston: "-420",
americadawson: "-420",
americadawsoncreek: "-420",
americaedmonton: "-360",
americafortnelson: "-420",
americaglacebay: "-180",
americagoosebay: "-180",
americahalifax: "-180",
americainuvik: "-360",
americaiqaluit: "-240",
americamoncton: "-180",
americanipigon: "-240",
americapangnirtung: "-240",
americarainyriver: "-300",
americarankininlet: "-300",
americaregina: "-360",
americaresolute: "-300",
americastjohns: "-150",
americaswiftcurrent: "-360",
americathunderbay: "-240",
americatoronto: "-240",
americavancouver: "-420",
americawhitehorse: "-420",
americawinnipeg: "-300",
americayellowknife: "-360",
atlanticcapeverde: "-60",
americacayman: "-300",
africabangui: "+60",
africandjamena: "+60",
americapuntaarenas: "-180",
americasantiago: "-240",
pacificeaster: "-360",
asiashanghai: "+480",
asiaurumqi: "+360",
indianchristmas: "+420",
indiancocos: "+390",
americabogota: "-300",
indiancomoro: "+180",
africabrazzaville: "+60",
africakinshasa: "+60",
africalubumbashi: "+120",
pacificrarotonga: "-600",
americacostarica: "-360",
europezagreb: "+120",
americahavana: "-240",
americacuracao: "-240",
asiafamagusta: "+180",
asianicosia: "+180",
europeprague: "+120",
africaabidjan: "0",
europecopenhagen: "+120",
africadjibouti: "+180",
americadominica: "-240",
americasantodomingo: "-240",
americaguayaquil: "-300",
pacificgalapagos: "-360",
africacairo: "+120",
americaelsalvador: "-360",
africamalabo: "+60",
africaasmara: "+180",
europetallinn: "+180",
africaaddisababa: "+180",
atlanticstanley: "-180",
atlanticfaroe: "+60",
pacificfiji: "+720",
europehelsinki: "+180",
europeparis: "+120",
americacayenne: "-180",
pacificgambier: "-540",
pacificmarquesas: "-570",
pacifictahiti: "-600",
indiankerguelen: "+300",
africalibreville: "+60",
africabanjul: "0",
asiatbilisi: "+240",
europeberlin: "+120",
europebusingen: "+120",
africaaccra: "0",
europegibraltar: "+120",
europeathens: "+180",
americadanmarkshavn: "0",
americanuuk: "-120",
americascoresbysund: "0",
americathule: "-180",
americagrenada: "-240",
americaguadeloupe: "-240",
pacificguam: "+600",
americaguatemala: "-360",
europeguernsey: "+60",
africaconakry: "0",
africabissau: "0",
americaguyana: "-240",
americaportauprince: "-240",
europevatican: "+120",
americategucigalpa: "-360",
asiahongkong: "+480",
europebudapest: "+120",
atlanticreykjavik: "0",
asiakolkata: "+330",
asiajakarta: "+420",
asiajayapura: "+540",
asiamakassar: "+480",
asiapontianak: "+420",
asiatehran: "+270",
asiabaghdad: "+180",
europedublin: "+60",
europeisleofman: "+60",
asiajerusalem: "+180",
europerome: "+120",
americajamaica: "-300",
asiatokyo: "+540",
europejersey: "+60",
asiaamman: "+180",
asiaalmaty: "+360",
asiaaqtau: "+300",
asiaaqtobe: "+300",
asiaatyrau: "+300",
asiaoral: "+300",
asiaqostanay: "+360",
asiaqyzylorda: "+300",
africanairobi: "+180",
pacificenderbury: "+780",
pacifickiritimati: "+840",
pacifictarawa: "+720",
asiapyongyang: "+540",
asiaseoul: "+540",
asiakuwait: "+180",
asiabishkek: "+360",
asiavientiane: "+420",
europeriga: "+180",
asiabeirut: "+180",
africamaseru: "+120",
africamonrovia: "0",
africatripoli: "+120",
europevaduz: "+120",
europevilnius: "+180",
europeluxembourg: "+120",
asiamacau: "+480",
europeskopje: "+120",
indianantananarivo: "+180",
africablantyre: "+120",
asiakualalumpur: "+480",
asiakuching: "+480",
indianmaldives: "+300",
africabamako: "0",
europemalta: "+120",
pacifickwajalein: "+720",
pacificmajuro: "+720",
americamartinique: "-240",
africanouakchott: "0",
indianmauritius: "+240",
indianmayotte: "+180",
americabahiabanderas: "-300",
americacancun: "-300",
americachihuahua: "-360",
americahermosillo: "-420",
americamatamoros: "-300",
americamazatlan: "-360",
americamerida: "-300",
americamexicocity: "-300",
americamonterrey: "-300",
americaojinaga: "-360",
americatijuana: "-420",
pacificchuuk: "+600",
pacifickosrae: "+660",
pacificpohnpei: "+660",
europechisinau: "+180",
europemonaco: "+120",
asiachoibalsan: "+480",
asiahovd: "+420",
asiaulaanbaatar: "+480",
europepodgorica: "+120",
americamontserrat: "-240",
africacasablanca: "+60",
africamaputo: "+120",
asiayangon: "+390",
africawindhoek: "+120",
pacificnauru: "+720",
asiakathmandu: "+345",
europeamsterdam: "+120",
pacificnoumea: "+660",
pacificauckland: "+720",
pacificchatham: "+765",
americamanagua: "-360",
africaniamey: "+60",
africalagos: "+60",
pacificniue: "-660",
pacificnorfolk: "+660",
pacificsaipan: "+600",
europeoslo: "+120",
asiamuscat: "+240",
asiakarachi: "+300",
pacificpalau: "+540",
asiagaza: "+180",
asiahebron: "+180",
americapanama: "-300",
pacificbougainville: "+660",
pacificportmoresby: "+600",
americaasuncion: "-240",
americalima: "-300",
asiamanila: "+480",
pacificpitcairn: "-480",
europewarsaw: "+120",
atlanticazores: "0",
atlanticmadeira: "+60",
europelisbon: "+60",
americapuertorico: "-240",
asiaqatar: "+180",
europebucharest: "+180",
asiaanadyr: "+720",
asiabarnaul: "+420",
asiachita: "+540",
asiairkutsk: "+480",
asiakamchatka: "+720",
asiakhandyga: "+540",
asiakrasnoyarsk: "+420",
asiamagadan: "+660",
asianovokuznetsk: "+420",
asianovosibirsk: "+420",
asiaomsk: "+360",
asiasakhalin: "+660",
asiasrednekolymsk: "+660",
asiatomsk: "+420",
asiaustnera: "+600",
asiavladivostok: "+600",
asiayakutsk: "+540",
asiayekaterinburg: "+300",
europeastrakhan: "+240",
europekaliningrad: "+120",
europekirov: "+180",
europemoscow: "+180",
europesamara: "+240",
europesaratov: "+240",
europeulyanovsk: "+240",
europevolgograd: "+180",
africakigali: "+120",
indianreunion: "+240",
americastbarthelemy: "-240",
atlanticsthelena: "0",
americastkitts: "-240",
americastlucia: "-240",
americamarigot: "-240",
americamiquelon: "-120",
americastvincent: "-240",
pacificapia: "+780",
europesanmarino: "+120",
africasaotome: "0",
asiariyadh: "+180",
africadakar: "0",
europebelgrade: "+120",
indianmahe: "+240",
africafreetown: "0",
asiasingapore: "+480",
americalowerprinces: "-240",
europebratislava: "+120",
europeljubljana: "+120",
pacificguadalcanal: "+660",
africamogadishu: "+180",
africajohannesburg: "+120",
atlanticsouthgeorgia: "-120",
africajuba: "+120",
africaceuta: "+120",
atlanticcanary: "+60",
europemadrid: "+120",
asiacolombo: "+330",
africakhartoum: "+120",
americaparamaribo: "-180",
arcticlongyearbyen: "+120",
africambabane: "+120",
europestockholm: "+120",
europezurich: "+120",
asiadamascus: "+180",
asiataipei: "+480",
asiadushanbe: "+300",
africadaressalaam: "+180",
asiabangkok: "+420",
asiadili: "+540",
africalome: "0",
pacificfakaofo: "+780",
pacifictongatapu: "+780",
americaportofspain: "-240",
africatunis: "+60",
europeistanbul: "+180",
asiaashgabat: "+300",
americagrandturk: "-240",
pacificfunafuti: "+720",
africakampala: "+180",
europekiev: "+180",
europesimferopol: "+180",
europeuzhgorod: "+180",
europezaporozhye: "+180",
asiadubai: "+240",
europelondon: "+60",
americaadak: "-540",
americaanchorage: "-480",
americaboise: "-360",
americachicago: "-300",
americadenver: "-360",
americadetroit: "-240",
americaindianaindianapolis: "-240",
americaindianaknox: "-300",
americaindianamarengo: "-240",
americaindianapetersburg: "-240",
americaindianatellcity: "-300",
americaindianavevay: "-240",
americaindianavincennes: "-240",
americaindianawinamac: "-240",
americajuneau: "-480",
americakentuckylouisville: "-240",
americakentuckymonticello: "-240",
americalosangeles: "-420",
americamenominee: "-300",
americametlakatla: "-480",
americanewyork: "-240",
americanome: "-480",
americanorthdakotabeulah: "-300",
americanorthdakotacenter: "-300",
americanorthdakotanewsalem: "-300",
americaphoenix: "-420",
americasitka: "-480",
americayakutat: "-480",
pacifichonolulu: "-600",
pacificmidway: "-660",
pacificwake: "+720",
americamontevideo: "-180",
asiasamarkand: "+300",
asiatashkent: "+300",
pacificefate: "+660",
americacaracas: "-240",
asiahochiminh: "+420",
americatortola: "-240",
americastthomas: "-240",
pacificwallis: "+720",
africaelaaiun: "+60",
asiaaden: "+180",
africalusaka: "+120",
africaharare: "+120",
europemariehamn: "+180"
}



var w8rpbjdata;
var w8rhtmldata;

function updateW8rData() {

function getPbjData() {

    w8rpbjdata = getWatchPage().then(response => w8rpbjdata = response);

    function getPbjData2() {

        do {

            var datatwo = getWatchPage().then(response => w8rpbjdata = response);

        } while (w8rpbjdata == undefined);

    }

    getPbjData2();

}

getPbjData();
console.log(w8rpbjdata);

function getHTMLData() {

    w8rhtmldata = getHTMLWatchPage().then(response => w8rhtmldata = response);

    function getData2() {

    do {

        var datatwo = getHTMLWatchPage().then(response => w8rhtmldata = response);

    } while (w8rhtmldata == undefined);

    }

    getData2();

}

getHTMLData();
console.log(w8rhtmldata);

}



updateW8rData();

var htmlparser = new DOMParser().parseFromString(w8rhtmldata, "text/html");

async function getWatchPage(data = {})

    // thanks Valmoiiaa for writing this function :)
{

	// Request the current video page again and retrieve required data for loading comments.

	var response = await fetch(("https://www.youtube.com/watch?v=" + videoId + "&pbj=1"),
    {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
            'X-YOUTUBE-CLIENT-NAME': '1',
            'X-YOUTUBE-CLIENT-VERSION': '1.20200101.01.01'
        },
        redirect: 'follow',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: JSON.stringify(data)
    });

    return response.json();

}

async function getHTMLWatchPage()
{

    var response = await fetch(("https://www.youtube.com/watch?v=" + videoId),
                               {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'strict-origin-when-cross-origin'
    });

    return response.text();

}







function createScript(input, id) {
	a = document.body;
	var b = document.createElement("script");
	b.text = input;
	b.setAttribute("id", id);
	a.appendChild(b);
}

function polymerNavigateToVideo(videoId)
{
	document.querySelector('ytd-app').insertAdjacentHTML('beforeend',
	'<ytd-guide-entry-renderer class="ytd-guide-entry-renderer polymerNavigateToVideoTemp"></ytd-guide-entry-renderer>');
	createScript(
	`document.querySelector('.polymerNavigateToVideoTemp').data = {};
	document.querySelector('.polymerNavigateToVideoTemp').data.navigationEndpoint = {
		"clickTrackingParams": "CIwCENwwIhMIptzB_fzP8QIVUpDECh2QawSWMgpnLWhpZ2gtcmVjWg9GRXdoYXRfdG9fd2F0Y2iaAQYQjh4YngE=",
		"commandMetadata": {
			"webCommandMetadata": {
				"url": "/watch?v=` + videoId + `",
				"webPageType": "WEB_PAGE_TYPE_WATCH",
				"rootVe": 3832
			}
		},
		"watchEndpoint": {
			"videoId": "` + videoId + `"
		}
	};`,
	'polymerNavigationScript');
	document.querySelector('.polymerNavigateToVideoTemp').click();
	document.querySelector('.polymerNavigateToVideoTemp').remove();
	document.querySelector('#polymerNavigationScript').remove();
}



























function injectWatchPageClickListeners() {



for (var i = 0; i < document.querySelectorAll("a").length; i++) {

	var watchhref = false;

	function findWatchLink() {

		for (var o = 0; o < document.querySelectorAll("a")[i].href.split("/").length; o++) {

			if (document.querySelectorAll("a")[i].href.split("/")[o].search("watch") != "-1") {

				watchhref = true;

			}

		}

	}

	findWatchLink();

	if (watchhref == true) {

	document.querySelectorAll("a")[i].onclick = function(e) {

		e.preventDefault();

	}

	document.querySelectorAll("a")[i].addEventListener("click", function() {

		polymerNavigateToVideo(this.href.replace(/(((https)|(http)):\/\/|(www\.)|(youtube\.com)|\/watch\?v\=)|(&.*)/g, ""));

	});

	}

}

}

injectWatchPageClickListeners();


































          //)
    //document.getElementById("player").outerHTML = document.getElementById("player").outerHTML + watchTemplate[2];
    //injectVideoInformation();

function injectTemplate() {
    injectVideoInformation();
}

var reconstructErrors = ``;

function addReconstructError(error)
{

	var reconstructErrors = (`<div class="alerts-wrapper"><div id="alerts" class="content-alignment">    <div class="yt-alert yt-alert-default yt-alert-warn  " id="watch8-reconstruct-error">  <div class="yt-alert-icon">
    <span class="icon master-sprite yt-sprite"></span>
  </div><div class="yt-alert yt-alert-actionable yt-alert-error" id="error">  <div class="yt-alert-icon">
    <span class="icon master-sprite yt-sprite"></span>
  </div>
<div class="yt-alert-content" role="alert">    <div class="yt-alert-message" tabindex="0">` + error + `</div>
</div><div class="yt-alert-buttons">

</div></div>`);

    console.log(error);

    //document.getElementById("player").insertAdjacentHTML('beforebegin', reconstructErrors);

}

//function checkExist() {

var checkExist = setInterval(() => {
   if (document.querySelector("div#player.ytd-watch-flexy") && !document.getElementById("watch-header") /*&& document.querySelector("script#scriptTag.ytd-player-microformat-renderer")*/) {
      clearInterval(checkExist);
      injectVideoInformation();
   }
}, 10);

var checkForRecommendations = setInterval(() => {

if (document.getElementById("related") && window.location.pathname.toLowerCase() == "/watch") {
    clearInterval(checkForRecommendations);
    injRecommended();
}
}, 10);

var checkForPlaylist = setInterval(() => {

    if (document.getElementById('playlist') && window.location.pathname.toLowerCase() == "/watch") {
        clearInterval(checkForPlaylist);
        //injPlaylist();
    }

}, 10);

var checkForYtdMetadata = setInterval(() => {

    if (document.querySelector("ytd-watch-metadata.ytd-watch-flexy")) {
        clearInterval(checkForYtdMetadata);
        document.querySelector("ytd-watch-metadata.ytd-watch-flexy").remove();
    }
}, 10);




//var ytinitialdata;







/*

function grabJson()
{



    var parsed = new DOMParser().parseFromString(w8rhtmldata, "text/html");

    function findScriptWithAuth()
{

        for (var o = 0; o < parsed.scripts.length; o++)
        {

            if (parsed.scripts[o].innerHTML.startsWith("(function() {window.ytplayer={}"))
            {

                return o;

            }

        }

}

    var yettobefixedjson = parsed.scripts[findScriptWithAuth()].innerHTML.replace('(function() {window.ytplayer={};', '');

    var inthefixingjson = yettobefixedjson.replace('ytcfg.set(', '');

    var setmessageoccurence = inthefixingjson.search("var setMessage");

	var brokenoccurence = setmessageoccurence - 2;

	var fixedjson = inthefixingjson.slice(0, brokenoccurence);

    var parsedjson = JSON.parse(fixedjson);

	return parsedjson;


}
*/






function getSapisidhash()
{
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
	/* SHA-1 (FIPS 180-4) implementation in JavaScript                    (c) Chris Veness 2002-2019  */
	/*                                                                                   MIT Licence  */
	/* www.movable-type.co.uk/scripts/sha1.html                                                       */
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


	/**
	 * SHA-1 hash function reference implementation.
	 *
	 * This is an annotated direct implementation of FIPS 180-4, without any optimisations. It is
	 * intended to aid understanding of the algorithm rather than for production use.
	 *
	 * While it could be used where performance is not critical, I would recommend using the ‘Web
	 * Cryptography API’ (developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) for the browser,
	 * or the ‘crypto’ library (nodejs.org/api/crypto.html#crypto_class_hash) in Node.js.
	 *
	 * See csrc.nist.gov/groups/ST/toolkit/secure_hashing.html
	 *     csrc.nist.gov/groups/ST/toolkit/examples.html
	 */
	class Sha1 {

		/**
		 * Generates SHA-1 hash of string.
		 *
		 * @param   {string} msg - (Unicode) string to be hashed.
		 * @param   {Object} [options]
		 * @param   {string} [options.msgFormat=string] - Message format: 'string' for JavaScript string
		 *   (gets converted to UTF-8 for hashing); 'hex-bytes' for string of hex bytes ('616263' ≡ 'abc') .
		 * @param   {string} [options.outFormat=hex] - Output format: 'hex' for string of contiguous
		 *   hex bytes; 'hex-w' for grouping hex bytes into groups of (4 byte / 8 character) words.
		 * @returns {string} Hash of msg as hex character string.
		 *
		 * @example
		 *   import Sha1 from './sha1.js';
		 *   const hash = Sha1.hash('abc'); // 'a9993e364706816aba3e25717850c26c9cd0d89d'
		 */
		static hash(msg, options) {
			const defaults = { msgFormat: 'string', outFormat: 'hex' };
			const opt = Object.assign(defaults, options);

			switch (opt.msgFormat) {
				default: // default is to convert string to UTF-8, as SHA only deals with byte-streams
				case 'string':   msg = utf8Encode(msg);       break;
				case 'hex-bytes':msg = hexBytesToString(msg); break; // mostly for running tests
			}

			// constants [§4.2.1]
			const K = [ 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6 ];

			// initial hash value [§5.3.1]
			const H = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];

			// PREPROCESSING [§6.1.1]

			msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

			// convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
			const l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
			const N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
			const M = new Array(N);

			for (let i=0; i<N; i++) {
				M[i] = new Array(16);
				for (let j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
					M[i][j] = (msg.charCodeAt(i*64+j*4+0)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16)
							| (msg.charCodeAt(i*64+j*4+2)<< 8) | (msg.charCodeAt(i*64+j*4+3)<< 0);
				} // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
			}
			// add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
			// note: most significant word would be (len-1)*8 >>> 32, but since JS converts
			// bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
			M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
			M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

			// HASH COMPUTATION [§6.1.2]

			for (let i=0; i<N; i++) {
				const W = new Array(80);

				// 1 - prepare message schedule 'W'
				for (let t=0;  t<16; t++) W[t] = M[i][t];
				for (let t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

				// 2 - initialise five working variables a, b, c, d, e with previous hash value
				let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4];

				// 3 - main loop (use JavaScript '>>> 0' to emulate UInt32 variables)
				for (let t=0; t<80; t++) {
					const s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
					const T = (Sha1.ROTL(a, 5) + Sha1.f(s, b, c, d) + e + K[s] + W[t]) >>> 0;
					e = d;
					d = c;
					c = Sha1.ROTL(b, 30) >>> 0;
					b = a;
					a = T;
				}

				// 4 - compute the new intermediate hash value (note 'addition modulo 2^32' – JavaScript
				// '>>> 0' coerces to unsigned UInt32 which achieves modulo 2^32 addition)
				H[0] = (H[0]+a) >>> 0;
				H[1] = (H[1]+b) >>> 0;
				H[2] = (H[2]+c) >>> 0;
				H[3] = (H[3]+d) >>> 0;
				H[4] = (H[4]+e) >>> 0;
			}

			// convert H0..H4 to hex strings (with leading zeros)
			for (let h=0; h<H.length; h++) H[h] = ('00000000'+H[h].toString(16)).slice(-8);

			// concatenate H0..H4, with separator if required
			const separator = opt.outFormat=='hex-w' ? ' ' : '';

			return H.join(separator);

			/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

			function utf8Encode(str) {
				try {
					return new TextEncoder().encode(str, 'utf-8').reduce((prev, curr) => prev + String.fromCharCode(curr), '');
				} catch (e) { // no TextEncoder available?
					return unescape(encodeURIComponent(str)); // monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
				}
			}

			function hexBytesToString(hexStr) { // convert string of hex numbers to a string of chars (eg '616263' -> 'abc').
				const str = hexStr.replace(' ', ''); // allow space-separated groups
				return str=='' ? '' : str.match(/.{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
			}
		}


		/**
		 * Function 'f' [§4.1.1].
		 * @private
		 */
		static f(s, x, y, z)  {
			switch (s) {
				case 0: return (x & y) ^ (~x & z);          // Ch()
				case 1: return  x ^ y  ^  z;                // Parity()
				case 2: return (x & y) ^ (x & z) ^ (y & z); // Maj()
				case 3: return  x ^ y  ^  z;                // Parity()
			}
		}


		/**
		 * Rotates left (circular left shift) value x by n positions [§3.2.5].
		 * @private
		 */
		static ROTL(x, n) {
			return (x<<n) | (x>>>(32-n));
		}

	}


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


	function gethash()
	{
		function getCookie(cname)
		{

			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');

			for(var i = 0; i <ca.length; i++) {

				var c = ca[i];
				while (c.charAt(0) == ' ') {
				  c = c.substring(1);
				}
				if (c.indexOf(name) == 0)
				{
				  return c.substring(name.length, c.length);
				}

			}

			return "";

		}

		var time = (Math.round(new Date() / 1000));
		var xorigin = "https://www.youtube.com";
		var sapisid = getCookie("SAPISID");

		var hash = Sha1.hash(time + " " + sapisid + " " + xorigin);

		return ("SAPISIDHASH " + time + "_" + hash);

	}

	return gethash();
}






function generateAuthInformation(like, addto, subscribe, fetchcontinuation, updatemetadata, params, channelid, continuation)
{

    var innertubeapikey = yt.config_.INNERTUBE_API_KEY;

    var hl = yt.config_.HL;
    var gl = yt.config_.GL;
    var clientver = yt.config_.INNERTUBE_CONTEXT_CLIENT_VERSION;
    var remotehost = yt.config_.INNERTUBE_CONTEXT.client.remoteHost;
    var visitordata = yt.config_.VISITOR_DATA;
    var useragent = yt.config_.INNERTUBE_CONTEXT.client.userAgent;
    var clientname = yt.config_.INNERTUBE_CONTEXT.client.clientName;
    var os = yt.config_.INNERTUBE_CONTEXT.client.osName;
    var osversion = yt.config_.INNERTUBE_CONTEXT.client.osVersion;
    var ogurl = yt.config_.INNERTUBE_CONTEXT.client.originalUrl;
    var platform = yt.config_.INNERTUBE_CONTEXT.client.platform;
    var clientformfactor = yt.config_.INNERTUBE_CONTEXT.client.clientFormFactor;
    var timezone = yt.config_.INNERTUBE_CONTEXT.client.timeZone;
    var browsername = yt.config_.INNERTUBE_CONTEXT.client.browserName;
    var browserversion = yt.config_.INNERTUBE_CONTEXT.client.browserVersion;
    var grafturl = window.location.href;
    var lockedsafetymode = yt.config_.INNERTUBE_CONTEXT.user.lockedSafetyMode;
    var usessl = yt.config_.INNERTUBE_CONTEXT.request.useSsl;
    var clicktracking = yt.config_.INNERTUBE_CONTEXT.clickTracking.clickTrackingParams;
    if (document.querySelector("html").getAttribute("dark") == true)
        {

            var theme = "USER_INTERFACE_THEME_DARK";
        }
    else
    {

        var theme = "USER_INTERFACE_THEME_LIGHT";

    }


    var screenheight = document.querySelector("body").clientHeight;
    var screenwidth = document.querySelector("body").clientWidth;

    var utc = (function() {

        for (var i = 0; i < 12; i++)
        {

           var utctime = timezone.replace("/", "").replace(/\.|\,|\-|\_/g, "").replace(" ", "").toLowerCase().trim();


        }

        return utcoffsets[utctime];

    })();

    var screendensityfloat = window.devicePixelRatio;

    var payload = (`{
  "context": {
    "client": {
      "hl": "` + hl + `",
      "gl": "` + gl + `",
      "remoteHost": "` + remotehost + `",
      "deviceMake": "",
      "deviceModel": "",
      "visitorData": "` + visitordata + `",
      "userAgent": "` + useragent + `",
      "clientName": "` + clientname + `",
      "clientVersion": "` + clientver + `",
      "osName": "` + os + `",
      "osVersion": "` + osversion + `",
      "originalUrl": "` + ogurl + `",
      "platform": "` + platform + `",
      "clientFormFactor": "` + clientformfactor + `",
      "userInterfaceTheme": "` + theme + `",
      "timeZone": "` + timezone + `",
      "browserName": "` + browsername + `",
      "browserVersion": "` + browserversion + `",
      "screenWidthPoints": ` + screenwidth + `,
      "screenHeightPoints": ` + screenheight + `,
      "screenPixelDensity": 1,
      "screenDensityFloat": ` + screendensityfloat + `,
      "utcOffsetMinutes": ` + utc + `,
      "mainAppWebInfo": {
        "graftUrl": "` + grafturl + `",
        "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
        "isWebNativeShareAvailable": false
      }
     },
    "user": {
      "lockedSafetyMode": ` + lockedsafetymode + `
    },
    "request": {
      "useSsl": ` + usessl + `,
      "internalExperimentFlags": [],
      "consistencyTokenJars": []
    },
    "clickTracking": {
      "clickTrackingParams": "` + clicktracking + `"
    },
    "adSignalsInfo": {
      "params": [
        {
          "key": "dt",
          "value": "1623439544078"
        },
        {
          "key": "flash",
          "value": "0"
        },
        {
          "key": "frm",
          "value": "0"
        },
        {
          "key": "u_tz",
          "value": "-240"
        },
        {
          "key": "u_his",
          "value": "6"
        },
        {
          "key": "u_java",
          "value": "false"
        },
        {
          "key": "u_h",
          "value": "1080"
        },
        {
          "key": "u_w",
          "value": "1920"
        },
        {
          "key": "u_ah",
          "value": "1040"
        },
        {
          "key": "u_aw",
          "value": "1920"
        },
        {
          "key": "u_cd",
          "value": "24"
        },
        {
          "key": "u_nplug",
          "value": "0"
        },
        {
          "key": "u_nmime",
          "value": "0"
        },
        {
          "key": "bc",
          "value": "31"
        },
        {
          "key": "bih",
          "value": "938"
        },
        {
          "key": "biw",
          "value": "1403"
        },
        {
          "key": "brdim",
          "value": "-8,-8,-8,-8,1920,0,1936,1056,1420,938"
        },
        {
          "key": "vis",
          "value": "1"
        },
        {
          "key": "wgl",
          "value": "true"
        },
        {
          "key": "ca_type",
          "value": "image"
        }
      ]
    }
    },` + (like ? `
    "target": {
    "videoId": "` + videoId + `"
  },
  "params": "` + params + `"` :  (addto ? `"videoIds": [
    "` + videoId + `"
  ],
  "excludeWatchLater": false` : (subscribe ? `"channelIds": [
    "` + channelid + `"
  ],
  "params": "` + params + `"` : (fetchcontinuation ? `"videoId": "` + videoId + `"` : (updatemetadata ? `"continuation": ` + continuation + `"` : `"params":"` + params + `"`))))) + `}`);

    var jsonpayload = JSON.parse(payload);



    return jsonpayload;

}




async function videoAction(action, continuation)
{

    var innertubeapikey = yt.config_.INNERTUBE_API_KEY;
    var visitorid = yt.config_.INNERTUBE_CONTEXT.client.visitorData;
    var clientver = yt.config_.INNERTUBE_CONTEXT_CLIENT_VERSION;

    var ytinitialjson = ytinitialdata;

    /*

    function getYtInitialData() {

    var checkforytinitialdata = setInterval(function() {

        if (document.getElementById("w8rytinitialdata")) {
            clearInterval(checkforytinitialdata);
            var innerhtml = document.getElementById("w8rytinitialdata").innerHTML;
            ytinitialjson = JSON.parse(innerhtml);

        }

    }, 10);

    }

    var retrieveytinitialdata = await getYtInitialData();

    */

    var sapisid = await getSapisidhash();





    if (action == "like")
    {

     var likeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.defaultServiceEndpoint.commandExecutorCommand.commands[1].likeEndpoint.likeParams;

    var authinformation = await generateAuthInformation(true, false, false, false, false, likeparams, "", "").then(jsonpayload => authinformation = jsonpayload);

    var response = await fetch(("https://www.youtube.com/youtubei/v1/like/like?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }

    else if (action == "removelike")
    {

            var removelikeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.toggledServiceEndpoint.likeEndpoint.removeLikeParams;

    var authinformation = await generateAuthInformation(true, false, false, false, false, removelikeparams, "", "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/like/removelike?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }
    else if (action == "dislike")
    {

            var dislikeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[1].toggleButtonRenderer.defaultServiceEndpoint.commandExecutorCommand.commands[1].likeEndpoint.dislikeParams;

    var authinformation = await generateAuthInformation(true, false, false, false, false, dislikeparams, "", "").then(jsonpayload => authinformation = jsonpayload);

    var response = await fetch(("https://www.youtube.com/youtubei/v1/like/dislike?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });



    }
    else if (action == "removedislike")
    {

            var removedislikeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[1].toggleButtonRenderer.toggledServiceEndpoint.likeEndpoint.removeLikeParams;

    var authinformation = await generateAuthInformation(true, false, false, false, false, removedislikeparams, "", "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/like/removelike?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });
    }
    else if (action == "addto")
    {

    var authinformation = await generateAuthInformation(false, true, false, false, false, "", "", "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/playlist/get_add_to_playlist?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }
    else if (action == "report")
    {

        var reportparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.items[0].menuServiceItemRenderer.serviceEndpoint.getReportFormEndpoint.params;

    var authinformation = await generateAuthInformation(false, false, false, false, false, reportparams, "", "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/flag/get_form?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }
    else if (action == "transcript")
    {

        var transcriptparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[2].buttonRenderer.serviceEndpoint.shareEntityServiceEndpoint.serializedShareEntity;

    var authinformation = await generateAuthInformation(false, false, false, false, false, transcriptparams, "", "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/get_transcript?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });
    }
    else if (action == "subscribe")
    {

        var subscribeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.onSubscribeEndpoints[0].subscribeEndpoint.params;

        var channelid = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.channelId;

        var authinformation = await generateAuthInformation(false, false, true, false, false, subscribeparams, channelid, "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/subscription/subscribe?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

        //'X-YOUTUBE-CLIENT-VERSION': '2.20210603.07.00',

    }
    else if (action == "unsubscribe")
    {

        var unsubscribeparams = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.onUnsubscribeEndpoints[0].signalServiceEndpoint.actions[0].openPopupAction.popup.confirmDialogRenderer.confirmButton.buttonRenderer.serviceEndpoint.unsubscribeEndpoint.params;

        var channelid = ytinitialjson.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.channelId;

        var authinformation = await generateAuthInformation(false, false, true, false, false, unsubscribeparams, channelid, "").then(jsonpayload => authinformation = jsonpayload);

            var response = await fetch(("https://www.youtube.com/youtubei/v1/subscription/unsubscribe?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }
    else if (action == "updatemetadata")
    {

        var authinformation = await generateAuthInformation(false, false, false, true, false, "", "", continuation).then(jsonpayload => authinformation = jsonpayload);

      var response = await fetch(("https://www.youtube.com/youtubei/v1/updated_metadata?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });

    }
    else if (action == "fetchcontinuation")
    {

        var authinformation = await generateAuthInformation(false, false, false, true, false, "", "", "").then(jsonpayload => authinformation = jsonpayload);

      var response = await fetch(("https://www.youtube.com/youtubei/v1/updated_metadata?key=" + innertubeapikey),
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credientials: 'same-origin',
        headers:
        {
                ...((authinfo.LOGGED_IN) && {"Authorization": sapisid}),
                ...((authinfo.LOGGED_IN) && {"X-Goog-AuthUser": "0"}),
				'X-YOUTUBE-CLIENT-NAME': '1',
				'X-YOUTUBE-CLIENT-VERSION': clientver,
                'X-GOOG-VISITOR-ID': visitorid,
                ...((authinfo.DELEGATED_SESSION_ID ? true: false) && {"X-Goog-PageId": authinfo.DELEGATED_SESSION_ID}),
        },
        redirect: 'follow',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(authinformation)
    });


    }




    return response.json();

}















function generateVideoTemplate(data, playerjson)
{

	console.log(data);



    function genCreatorBar()
    {

        try
        {

        if (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.enabled == true)
        {

            return (``);

        }
        else
        {

            var videourl = window.location.href.split("?v=")[1].split("&")[0];

            return (`<div id="watch7-creator-bar" class="clearfix yt-uix-button-panel yt-card yt-card-has-padding">
<ul id="watch7-creator-bar-nav-buttons">  <li class="creator-bar-item ">
    <a href="https://www.youtube.com/analytics#;fi=v-` + videourl + `" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-content">Analytics
 </span></a>
  </li>
  <li class="creator-bar-item ">
    <a href="/my_videos" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-content">Video Manager</span></a>
  </li>
</ul><ul id="watch7-creator-bar-edit-buttons">  <li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" aria-labelledby="yt-uix-tooltip49-arialabel" title="Information and configuration" data-tooltip-text="Information and configuration">
    <a href="/edit?video_id=` + videourl + `&amp;video_referrer=watch" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-info"></span></a>
  </li>
  <li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" aria-labelledby="yt-uix-tooltip48-arialabel" title="Enhancements" data-tooltip-text="Enhancements">
    <a href="/enhance?v=` + videourl + `&amp;video_referrer=watch" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-enhance"></span></a>
  </li>
  <li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" title="Audio" data-tooltip-text="Audio" aria-labelledby="yt-uix-tooltip50-arialabel">
    <a href="/audio?v=` + videourl + `&amp;video_referrer=watch" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-audio"></span></a>
  </li>
  <li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" aria-labelledby="yt-uix-tooltip51-arialabel" title="Annotations" data-tooltip-text="Annotations">
    <a href="/my_videos_annotate?v=` + videourl + `&amp;video_referrer=watch" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-annotations"></span></a>
  </li><li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" aria-labelledby="yt-uix-tooltip45-arialabel" title="Cards" data-tooltip-text="Cards">
    <a href="/my_videos_annotate?v=` + videourl + `&amp;video_referrer=watch" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-cards"></span></a>
  </li>
  <li class="creator-bar-item yt-uix-tooltip yt-uix-tooltip-reverse" aria-labelledby="yt-uix-tooltip52-arialabel" title="Subtitles" data-tooltip-text="Subtitles">
    <a href="/timedtext?video_referrer=watch&amp;v=` + videourl + `&amp;action_view=1" class="yt-uix-button   yt-uix-sessionlink yt-uix-button-text-dark yt-uix-button-size-default yt-uix-button-empty" data-sessionlink="ei=2kSJU92ECIPFqQWbr4DgCA&amp;feature=mhsn"><span class="yt-uix-button-icon-wrapper"><img src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-captions"></span></a>
  </li>
</ul>  </div>`);
        }
        }
        catch(err)
        {

            addReconstructError(`Error in function genCreatorBar()`);

        }
    }

	function genVidTitle()
	{
		try
		{

		var title = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.title.runs;

		var initialvideotitle = '';

		for (i = 0; i < title.length; i++)
		{

			var finishedvideotitle = initialvideotitle += title[i].text;
			console.log(finishedvideotitle);

		}

		return (`<span id="eow-title" class="watch-title" dir="ltr" title="` + finishedvideotitle + `">

` + finishedvideotitle + `

</span>`);

		}
		catch(err)
		{
			addReconstructError("Error in function genVidTitle()");
		}
	}

	function genVidRedBadge()
	{
      try {

		if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.underTitleStandaloneBadge != 'undefined')
        {

            if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.underTitleStandaloneBadge.standaloneRedBadgeRenderer != 'undefined')
            {

                if (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.underTitleStandaloneBadge.standaloneRedBadgeRenderer.iconText == "Premium")
                {

                    var tempredcheck = 1;

                }
                else
                {

                    var tempredcheck = 0;

                }

            }
            else
            {

                var tempredcheck = 0;

            }

        }
        else
        {

            var tempredcheck = 0;

        }


		if (tempredcheck == 0)
		{

			return (``); // return nothing cuz no red

		}

		if (tempredcheck == 1)
		{

			return (`<span class="yt-badge standalone-collection-red-badge-renderer-icon">Red</span>
  <span class="standalone-collection-badge-renderer-red-text"></span>
  <span class="standalone-collection-badge-renderer-text">Get YouTube Red</span>`);

		}
      }
        catch(err)
        {

            addReconstructError(`Error in function genVidRedBadge()`);

        }

	}

	function genVidBadges()
	{
		try
		{

		// MAJOR TODO!!
		/* <span class="standalone-collection-badge-renderer-text">
       <b><a href="serieslinkplaceholder" class=" yt-uix-sessionlink      spf-link " id="youtube-red-series" data-sessionlink="ei=bhQpWeOSE9m0-wPa-p6wDA">seriesplaceholder</a></b> Sseasonnumberplaceholder • episodenumberplaceholder
   <a href="trendinglinkplaceholder" class=" yt-uix-sessionlink      spf-link " id="trending-indicator" data-sessionlink="ei=e408W9SXItaT-gOTs5D4Dg">trendingplaceholder</a>
<a href="hashtagoneurlplaceholder" class=" yt-uix-sessionlink " id="hashtag-one" data-url="hashtagoneurlplaceholder" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">hashtagoneplaceholder</a>
<a href="hashtagtwourlplaceholder" class=" yt-uix-sessionlink " id="hashtag-two" data-url="hashtagtwourlplaceholder" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">hashtagtwoplaceholder</a>
<a href="hashtagthreeurlplaceholder" class=" yt-uix-sessionlink " id="hashtag-three" data-url="hashtagthreeurlplaceholder" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">hashtagthreeplaceholder</a>
</span>*/

		if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge != 'undefined')
		{

			if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer !== 'undefined')
			{

				var label = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs[0].text;
                var labelarray = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs;

                    var labellength = labelarray.length;

                       if (label.search("on Trending") != "-1") {

                            if (label.search("on Trending for Gaming") == "-1")
                            {


				                  return (`<span class="standalone-collection-badge-renderer-text"><a href="https://www.youtube.com/feed/trending" class=" yt-uix-sessionlink      spf-link " id="trending-indicator" data-sessionlink="ei=e408W9SXItaT-gOTs5D4Dg">` + label + `</a></span>`);

                            }
                            else
                            {

                                  return (`<span class="standalone-collection-badge-renderer-text"><a href="https://www.youtube.com/gaming" class=" yt-uix-sessionlink      spf-link " id="trending-indicator" data-sessionlink="ei=e408W9SXItaT-gOTs5D4Dg">` + label + `</a></span>`);

                            }
                }
                else if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs[0].bold != 'undefined')
                {

					var seriesname = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs[0].text;

					var browsendpoint = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs[0].navigationEndpoint.browseEndpoint.browseId;

					var serieslink = "https://www.youtube.com/playlist?list=" + browsendpoint.slice(2);

					var sande = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.topStandaloneBadge.standaloneCollectionBadgeRenderer.label.runs[2].text;

					return (`<span class="standalone-collection-badge-renderer-text"><b><a href="` + serieslink + `" class=" yt-uix-sessionlink      spf-link " id="youtube-red-series" data-sessionlink="ei=bhQpWeOSE9m0-wPa-p6wDA">` + seriesname + `</a></b> ` + sande + `</span>`);

					//Sseasonnumberplaceholder • episodenumberplaceholder

                }
                else
                {

                    if (labellength == 5)
                    {


                        var firsthashtag = labelarray[0].text;

                        var firsthashtaglink = "https://www.youtube.com/hashtag/" + (firsthashtag.split("#")[1]);

                        var secondhashtag = labelarray[2].text;

                        var secondhashtaglink = "https://www.youtube.com/hashtag/" + (secondhashtag.split("#")[1]);

                        var thirdhashtag = labelarray[4].text;

                        var thirdhashtaglink = "https://www.youtube.com/hashtag/" + (thirdhashtag.split("#")[1]);

                                                    return (`<span class="standalone-collection-badge-renderer-text"><a href="` + firsthashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-one" data-url="` + firsthashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + firsthashtag + `</a><a href="` + secondhashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-two" data-url="` + secondhashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + secondhashtag + `</a><a href="` + thirdhashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-three" data-url="` + thirdhashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + thirdhashtag + `</a></span>`);

                    }
                    else if (labellength == 3)
                    {

                        var firsthashtag = labelarray[0].text;

                        var firsthashtaglink = "https://www.youtube.com/hashtag/" + (firsthashtag.split("#")[1]);

                        var secondhashtag = labelarray[2].text;

                        var secondhashtaglink = "https://www.youtube.com/hashtag/" + (secondhashtag.split("#")[1]);

                        return (`<span class="standalone-collection-badge-renderer-text"><a href="` + firsthashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-one" data-url="` + firsthashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + firsthashtag + `</a><a href="` + secondhashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-two" data-url="` + secondhashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + secondhashtag + `</a></span>`);

                    }
                    else if (labellength == 1)
                    {

                        var arraytostring = labelarray[0].text.toString();

                        if (arraytostring.search("#") != "-1")
                        {

                        var firsthashtag = labelarray[0].text;

                        var firsthashtaglink = "https://www.youtube.com/hashtag/" + (firsthashtag.split("#")[1]);

                        return (`<span class="standalone-collection-badge-renderer-text"><a href="` + firsthashtaglink + `" class=" yt-uix-sessionlink " id="hashtag-one" data-url="` + firsthashtaglink + `" data-sessionlink="ei=cYMsXIz9F5SNkgb1grH4Cg">` + firsthashtag + `</a></span>`);

                        }
                        else
                        {

                            var location = labelarray[0].text;

                            var locationparam = labelarray[0].navigationEndpoint.searchEndpoint.params;

                            var locationlink = "https://www.youtube.com/results?search_query=" + location + "&sp=" + locationparam;

                            return (`<span class="standalone-collection-badge-renderer-text"><span aria-label="Link to a location restricted search for videos geo tagged with ` + location + `">
	<a href="` + locationlink + `" class=" yt-uix-sessionlink      spf-link " data-sessionlink="ei=evUGXqXTB5WHkwa94I2ACA">` + location + `</a>
</span></span>`);

                    }

                }
                }



                }
                else
                {

                    return (``);

                }

			}
			else
			{

				return (``);

			}

		}
		catch(err)
		{
			addReconstructError("Error in function genVidBadges()");
		}

	}

	function genVidPrivacyBadge()
	{
		try
		{

		console.log("Called genVidPrivacyBadge()");

		console.log(data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer);

		try {
			var privacy = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.badges[0].privacyBadgeRenderer.privacyStatus;
			console.log(data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.badges[0].privacyBadgeRenderer.privacyStatus);

			if (privacy == "UNLISTED")
			{
				return (`<span id="watch-privacy-icon" class="yt-uix-tooltip yt-uix-tooltip-reverse unlisted" title="This video is unlisted. Only those with the link can see it." tabindex="0"><span class="privacy-icon yt-sprite"></span></span>`);
			}
			else if (privacy == "PRIVATE")
			{
				return (`<span id="watch-privacy-icon" class="yt-uix-tooltip yt-uix-tooltip-reverse private" title="This video is private. Only you can see it." tabindex="0"><span class="privacy-icon yt-sprite"></span></span>`);
			}
			else
			{
				return(``);
			}
		}
		catch(err)
		{
			return(``);
		}

		}
		catch(err)
		{
			addReconstructError("Error in function genVidPrivacyBadge()");
		}

	}

	function genVidUserInfo()
	{
		try
		{

		function gvuiIsVerified()
		{
			try
			{
			if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.badges !== 'undefined')
			{

				for (i = 0; i < (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.badges.length); i++)
				{


					if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.badges[i].verifiedBadge !== 'undefined')
					{

						return (`<span aria-label="Verified" class="yt-channel-title-icon-verified yt-uix-tooltip yt-sprite" data-tooltip-text="Verified"></span>`);

					}
					else
					{

						return (``);

					}

				}

			}
			else
			{

				return(``);

			}


		}
			catch(err)
			{

				addReconstructError("Error in function gvuiIsVerified()");

			}
		}

		function gvuiInitSubscribe()
		{
			try
			{

                if (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.enabled == true)
                {

			if (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.subscribed == true)
            {

                return (`yt-uix-button yt-uix-button-size-default yt-uix-button-subscribed-branded hover-enabled yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer`);

            }
                    else
                    {


                return (`yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer`);
                }
                }
                else
                {

                    return (`yt-uix-button channel-settings-link yt-uix-button-size-default yt-uix-button-default yt-uix-button-has-icon no-icon-markup yt-can-buffer`);

                }

			}
			catch(err)
			{

				addReconstructError("Error in function gvuiInitSubscribe()");

			}
		}

            function genSubButtonInner()
            {

                try
                {

                    if (data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.enabled == true)
                    {

                        return (`<span class="yt-uix-button-content"><span class="subscribe-label" aria-label="` + lang["subscribe"] + `">` + lang["subscribe"] + `</span><span class="subscribed-label" aria-label="` + lang["unsubscribe"] + `">` + lang["subscribed"] + `</span><span class="unsubscribe-label" aria-label="` + lang["unsubscribe"] + `">` + lang["unsubscribe"] + `</span></span>`);

                    }
                    else
                    {

                        return (`<span class="yt-uix-button-content">Channel settings</span>`);
                    }

                }
                catch(err)
                {

                    addReconstructError(`Error in function genSubButtonInner()`);

                }

            }

		var channelname = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.title.runs[0].text;
		var channelicon = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.thumbnail.thumbnails[0].url;
		var channelsurl = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl;

     if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.subscriberCountText.simpleText !== 'undefined')
     {

        var channelsubs = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.owner.videoOwnerRenderer.subscribeButton.subscribeButtonRenderer.subscriberCountText.simpleText;

            var subscriberenderer = `<span class="yt-subscription-button-subscriber-count-branded-horizontal yt-subscriber-count" id="subscriber-watch-count" tabindex="0" title="` + channelsubs + `" aria-label="` + channelsubs + `">` + channelsubs + `</span><span class="yt-subscription-button-subscriber-count-branded-horizontal yt-short-subscriber-count" tabindex="0" title="` + channelsubs + `" aria-label="` + channelsubs + `">` + channelsubs + `</span>`;

     }
     else
	{

			var subscriberenderer = ``;

	}



		}
		catch(err)
		{
			addReconstructError("Error in function genVidUserInfo()");

		}

		return (`<div id="watch7-user-header" class=" spf-link ">  <a class="yt-user-photo g-hovercard yt-uix-sessionlink      spf-link " data-ytid="UC38IQsAvIsxxjztdMZQtwHA" data-sessionlink="itct=CDQQ4TkiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0" href="` + channelsurl + `">
      <span class="video-thumb  yt-thumb yt-thumb-48 g-hovercard" data-ytid="UC38IQsAvIsxxjztdMZQtwHA">
    <span class="yt-thumb-square">
      <span class="yt-thumb-clip">

  <img data-ytimg="1" onload=";window.__ytRIL &amp;&amp; __ytRIL(this)" data-thumb="` + channelicon + `" alt="` + channelname + `" id="youtube-channel-icon" width="48" height="48" src="` + channelicon + `">

        <span class="vertical-align"></span>
      </span>
    </span>
  </span>

  </a>
  <div class="yt-user-info" id="yt-user-info-stuff">
    <a class="g-hovercard yt-uix-sessionlink       spf-link " data-ytid="UC38IQsAvIsxxjztdMZQtwHA" data-sessionlink="itct=CDQQ4TkiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0" id="channel-name-stuff" href="` + channelsurl + `">` + channelname + `</a>

      ` + gvuiIsVerified() + `
  </div>
<span id="watch7-subscription-container"><span class=" yt-uix-button-subscription-container"><span class="unsubscribe-confirmation-overlay-container">
  <div class="yt-uix-overlay " data-overlay-style="primary" data-overlay-shape="tiny">

        <div class="yt-dialog hid ">
    <div class="yt-dialog-base">
      <span class="yt-dialog-align"></span>
      <div class="yt-dialog-fg" role="dialog">
        <div class="yt-dialog-fg-content">
          <div class="yt-dialog-loading">
              <div class="yt-dialog-waiting-content">
      <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

  </div>

          </div>
          <div class="yt-dialog-content">
              <div class="unsubscribe-confirmation-overlay-content-container">
    <div class="unsubscribe-confirmation-overlay-content">
      <div class="unsubscribe-confirmation-message">
        Unsubscribe from ` + channelname + `?
      </div>
    </div>

    <div class="yt-uix-overlay-actions">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-overlay-close" type="button" onclick=";return false;"><span class="yt-uix-button-content">Cancel</span></button>
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-primary overlay-confirmation-unsubscribe-button yt-uix-overlay-close" type="button" onclick=";return false;"><span class="yt-uix-button-content">Unsubscribe</span></button>
    </div>
  </div>

          </div>
          <div class="yt-dialog-working">
              <div class="yt-dialog-working-overlay"></div>
  <div class="yt-dialog-working-bubble">
    <div class="yt-dialog-waiting-content">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
        Working...
    </span>
  </p>

      </div>
  </div>

          </div>
        </div>
        <div class="yt-dialog-focus-trap" tabindex="0"></div>
      </div>
    </div>
  </div>


  </div>

</span><button class="` + gvuiInitSubscribe() + `" type="button" onclick=";return false;" aria-busy="false" aria-live="polite" data-subscribed-timestamp="0" data-show-unsub-confirm-dialog="true" data-clicktracking="itct=CDUQmysiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0yBXdhdGNo" data-href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Fcontinue_action%3DQUFFLUhqbTA2MXc1eFBLdTE2Z1dSTWROMzJOQW5wQXB2Z3xBQ3Jtc0ttWEdOOEx0QWc0QkZPcjQ4SzRRNVRkMjBKNXo3OXBaNnVkY0YtZUR1SlI0U1BuaFZQQXdmdVN4ZmRuV3BqTHhEUTR6bzdNalF3bDNYRlZxOU9kdHVicTkzb2hELXZrTUVPVGhYd1FKYzFwVkpxWWU3ZzRTOFl3MWVQVENELXdQOUxGX2w4aHA0U3JpcjB2RmwyUDRON3BaempkUTN6Y05feGZ6ZS1IbGtUXzc2Y1NUdi1NS3FSTE51SERaNFBpTlRnaDF4N0dZUXRvaThYc1pCcnAxenRHd19UUXN3%26feature%3Dsubscribe%26app%3Ddesktop%26next%3D%252Fchannel%252FUC38IQsAvIsxxjztdMZQtwHA%26hl%3Den%26action_handle_signin%3Dtrue" data-channel-external-id="UC38IQsAvIsxxjztdMZQtwHA" data-show-unsub-confirm-time-frame="always" data-style-type="branded">` + genSubButtonInner() + `</button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon yt-uix-subscription-preferences-button" type="button" onclick=";return false;" aria-role="button" aria-busy="false" aria-label="Subscription preferences" aria-live="polite" data-channel-external-id="UC38IQsAvIsxxjztdMZQtwHA"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-subscription-preferences yt-sprite"></span></span></button>` + subscriberenderer + `<span class="subscription-preferences-overlay-container">`);


	}

    function genVidActionButtons()
    {
     if (typeof playerjson.playabilityStatus != 'undefined')
     {

      if (typeof playerjson.playabilityStatus.miniplayer.miniplayerRenderer.minimizedEndpoint != 'undefined')
      {


        if (typeof playerjson.playabilityStatus.miniplayer.miniplayerRenderer.minimizedEndpoint.openPopupAction != 'undefined')
        {

            if (typeof playerjson.playabilityStatus.miniplayer.miniplayerRenderer.minimizedEndpoint.openPopupAction.popup != 'undefined')
            {

                if (typeof playerjson.playabilityStatus.miniplayer.miniplayerRenderer.minimizedEndpoint.openPopupAction.popup.notificationActionRenderer != 'undefined')
                {

                    if (playerjson.playabilityStatus.miniplayer.miniplayerRenderer.minimizedEndpoint.openPopupAction.popup.notificationActionRenderer.responseText.simpleText == 'Miniplayer is off for videos made for kids. Tap play to resume.')
                    {

                        iskids = true;

                    }
                    else
                    {

                        iskids = false;

                    }

                }
                else
                {

                    iskids = false;

                }

            }
            else
            {

                iskids = false;

            }

        }
        else
        {

            iskids = false;

        }
      }
        else
        {

            iskids = false;

        }

     }
        else
        {

            iskids = false;

        }


        hastranscript = false;

        if (iskids == true)
        {

           return (`<div id="watch8-action-buttons" class="watch-action-buttons clearfix"><div id="watch8-secondary-actions" class="watch-secondary-actions yt-uix-button-group" data-button-toggle-group="optional">

<div class="yt-uix-menu ">  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip" type="button" onclick=";return false;" role="button" aria-pressed="false" aria-label="Action menu." title="More actions" id="action-panel-overflow-button" aria-haspopup="true"><span class="yt-uix-button-content">More</span></button>
<div class="yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden" role="menu"><ul id="action-panel-overflow-menu">  <li>
      <span class="yt-uix-clickcard" data-card-class="report-card">
          <button type="button" class="yt-ui-menu-item has-icon action-panel-trigger action-panel-trigger-report report-button yt-uix-clickcard-target" data-position="topright" data-orientation="horizontal">
    <span class="yt-ui-menu-item-label">Report</span>
  </button>

          <div class="signin-clickcard yt-uix-clickcard-content" style="display: none;">
    <h3 class="signin-clickcard-header">Need to report the video?</h3>
    <div class="signin-clickcard-message">
      Sign in to report inappropriate content.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

      </span>
  </li>
  <li>
        <button type="button" class="yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-stats" data-trigger-for="action-panel-stats">
    <span class="yt-ui-menu-item-label">Statistics</span>
  </button>

  </li>

  <a href="https://www.youtube.com/timedtext_video?bl=watch&amp;v=dQw4w9WgXcQ&amp;ref=wt&amp;auto=yes" class="yt-ui-menu-item has-icon action-panel-trigger-translate" rel="nofollow">
    <span class="yt-ui-menu-item-label">Add translations</span>
  </a>
</ul></div></div></div></div>`);

}
        else
        {

            return (`<div id="watch8-action-buttons" class="watch-action-buttons clearfix"><div id="watch8-secondary-actions" class="watch-secondary-actions yt-uix-button-group" data-button-toggle-group="optional"><span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup yt-uix-clickcard-target addto-button pause-resume-autoplay yt-uix-tooltip" type="button" onclick=";return false;" title="Add to" data-position="bottomleft" data-orientation="vertical"><span class="yt-uix-button-content">Add to</span></button>
        <div class="signin-clickcard yt-uix-clickcard-content hid">
    <h3 class="signin-clickcard-header">Want to watch this again later?</h3>
    <div class="signin-clickcard-message">
      Sign in to add this video to a playlist.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip" type="button" onclick=";return false;" title="Share
" data-trigger-for="action-panel-share" data-button-toggle="true"><span class="yt-uix-button-content">Share
</span></button>

<div class="yt-uix-menu ">  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip" type="button" onclick=";return false;" role="button" aria-pressed="false" aria-label="Action menu." title="More actions" id="action-panel-overflow-button" aria-haspopup="true"><span class="yt-uix-button-content">More</span></button>
<div class="yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden" role="menu"><ul id="action-panel-overflow-menu">  <li>
      <span class="yt-uix-clickcard" data-card-class="report-card">
          <button type="button" class="yt-ui-menu-item has-icon action-panel-trigger action-panel-trigger-report report-button yt-uix-clickcard-target" data-position="topright" data-orientation="horizontal">
    <span class="yt-ui-menu-item-label">Report</span>
  </button>

          <div class="signin-clickcard yt-uix-clickcard-content" style="display: none;">
    <h3 class="signin-clickcard-header">Need to report the video?</h3>
    <div class="signin-clickcard-message">
      Sign in to report inappropriate content.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

      </span>
  </li>
  <li>
        <button type="button" class="yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-stats" data-trigger-for="action-panel-stats">
    <span class="yt-ui-menu-item-label">Statistics</span>
  </button>

  </li>
    ` + (hastranscript ? `<li>
        <button type="button" class="yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-transcript" data-trigger-for="action-panel-transcript">
    <span class="yt-ui-menu-item-label">Transcript</span>
  </button>

  </li>` : ``) + `
  <a href="https://www.youtube.com/timedtext_video?bl=watch&amp;v=dQw4w9WgXcQ&amp;ref=wt&amp;auto=yes" class="yt-ui-menu-item has-icon action-panel-trigger-translate" rel="nofollow">
    <span class="yt-ui-menu-item-label">Add translations</span>
  </a>
</ul></div></div></div>` + genVidSentiment() + `</div>`);
        }
    }


	function genVidSentiment()
	{
		try
		{

                var likestatus = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.likeStatus;

                if (likestatus == "INDIFFERENT")
                {

                    var likeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-unclicked yt-uix-clickcard-target  yt-uix-tooltip`);
                    var likeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-clicked yt-uix-clickcard-target yt-uix-button-toggled  yt-uix-tooltip hid`);
                    var dislikeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-unclicked yt-uix-clickcard-target   yt-uix-tooltip`);
                    var dislikeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-clicked yt-uix-button-toggled  hid yt-uix-tooltip`);

                }
                else if (likestatus == "LIKE")
                {

                    var likeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-unclicked yt-uix-clickcard-target  yt-uix-tooltip hid`);
                    var likeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-clicked yt-uix-button-toggled yt-uix-clickcard-target  yt-uix-tooltip`);
                    var dislikeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-unclicked yt-uix-clickcard-target   yt-uix-tooltip`);
                    var dislikeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-clicked yt-uix-button-toggled  hid yt-uix-tooltip`);

                }
                else if (likestatus == "DISLIKE")
                {

                    var likeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-unclicked yt-uix-clickcard-target  yt-uix-tooltip`);
                    var likeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-clicked yt-uix-button-toggled yt-uix-clickcard-target hid  yt-uix-tooltip`);
                    var dislikeclasses = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-unclicked  hid yt-uix-tooltip`);
                    var dislikeclassessecondary = (`yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-clicked yt-uix-clickcard-target yt-uix-button-toggled   yt-uix-tooltip`);

                }

            if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.viewCount.videoViewCountRenderer.isLive != 'undefined')
            {

                var islive = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.viewCount.videoViewCountRenderer.isLive;

                if (islive == true)
                {

                var viewcountIndex = (``);

                for (var i = 0; i < data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.viewCount.videoViewCountRenderer.viewCount.runs.length; i++)
                {

                    var current = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.viewCount.videoViewCountRenderer.viewCount.runs[i].text;

                    viewcountIndex += current;

                }

                     var viewcount = isolatedViewCount ? viewcountIndex.replace(lang["isolateViewCount"], "") : viewcountIndex;

                }

            }
            else
            {

		var viewcountIndex = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.viewCount.videoViewCountRenderer.viewCount.simpleText;
		var viewcount = isolatedViewCount ? viewcountIndex.replace(lang["isolateViewCount"], "") : viewcountIndex;

            }


		var likes = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.allowRatings;


        var likesallowed = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.likesAllowed;
         if (likesallowed == true)
         {

			if (likes == false)
            {
				var initialikecountsfinal = (``);
				var initialdislikecountsfinal = (``);
                var likecountssecondaryfinal = (``);
                var dislikecountssecondaryfinal = (``);
				var sparkbars = (`</div>`);

			}
			else if (likes == true)
			{
				var likecounts = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.likeCount;
				var dislikecounts = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.dislikeCount;
                if (likestatus == "INDIFFERENT") {

                    var initialikecountsfinal = numberWithCommas(likecounts);
                    var initialdislikecountsfinal = numberWithCommas(dislikecounts);

                    var likecountssecondary = likecounts + 1;
                    var dislikecountssecondary = dislikecounts + 1;

                    var likecountssecondaryfinal = numberWithCommas(likecountssecondary);
                    var dislikecountssecondaryfinal = numberWithCommas(dislikecountssecondary);

                } else if (likestatus == "LIKE") {

                    var initialikecounts = likecounts - 1;
                    var initialdislikecountsfinal = numberWithCommas(dislikecounts);
                    var initialikecountsfinal = numberWithCommas(initialikecounts);

                    var likecountssecondary = likecounts;
                    var dislikecountssecondary = dislikecounts + 1;

                    var likecountssecondaryfinal = numberWithCommas(likecountssecondary);
                    var dislikecountssecondaryfinal = numberWithCommas(dislikecountssecondary);

                } else if (likestatus == "DISLIKE") {

                    var initialikecountsfinal = numberWithCommas(likecounts);
                    var initialdislikecounts = dislikecounts - 1;
                    var initialdislikecountsfinal = numberWithCommas(initialdislikecounts);

                    var likecountssecondary = likecounts + 1;
                    var dislikecountssecondary = dislikecounts;

                    var likecountssecondaryfinal = numberWithCommas(likecountssecondary);
                    var dislikecountssecondaryfinal = numberWithCommas(dislikecountssecondary);

                }

				// spark bar
				var added = likecounts + dislikecounts;
				var likedivision = likecounts / added;
				var likepercentage = (likedivision * 100 * 100) / 100;
				var likepercentagetostring = likepercentage.toString();

				if (likepercentagetostring.length > 13)
				{
					var sliced = likepercentagetostring.slice(0, 13);
					var likepercentagefinal = (sliced + "%");
				}
				else
				{
					var likepercentagefinal = (likepercentage + "%");
				}

				var dislikepercentage = 100 - likepercentage;
				var dislikepercentagetostring = dislikepercentage.toString();

				if (dislikepercentagetostring.length > 13)
				{
					var sliced = dislikepercentagetostring.slice(0, 13);
					var dislikepercentagefinal = (sliced + "%");
				}
				else
				{
					var dislikepercentagefinal = (dislikepercentage + "%");
				}

				var sparkbars = (`<div class="video-extras-sparkbars">
    <div class="video-extras-sparkbar-likes" style="width: ` + likepercentagefinal + `"></div>
    <div class="video-extras-sparkbar-dislikes" style="width: ` + dislikepercentagefinal + `"></div>
  </div>
</div>`);

			}



		return (`<div id="watch8-sentiment-actions"><div id="watch7-views-info"><div class="watch-view-count">` + viewcount + `</div>
  ` + sparkbars + `




  <span class="like-button-renderer " data-button-toggle-group="optional">
    <span class="yt-uix-clickcard">
      <button class="` + likeclasses + `" type="button" onclick=";return false;" aria-label="like this video along with ` + initialikecountsfinal + ` other people" title="I like this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content" id="like-count">` + initialikecountsfinal + `</span></button>
          <div class="signin-clickcard yt-uix-clickcard-content" style="display: none;">
    <h3 class="signin-clickcard-header">Like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>
    <span class="yt-uix-clickcard">
      <button class="` + likeclassessecondary + `" type="button" onclick=";return false;" aria-label="like this video along with ` + initialikecountsfinal + ` other people" title="Unlike" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">` + likecountssecondaryfinal + `</span></button>
    </span>
    <span class="yt-uix-clickcard">
      <button class="` + dislikeclasses + `" type="button" onclick=";return false;" aria-label="dislike this video along with ` + initialdislikecountsfinal + ` other people" title="I dislike this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content" id="dislike-count">` + initialdislikecountsfinal + `</span></button>
          <div class="signin-clickcard yt-uix-clickcard-content" style="display: none;">
    <h3 class="signin-clickcard-header">Don't like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>
    <span class="yt-uix-clickcard">
      <button class="` + dislikeclassessecondary + `" type="button" onclick=";return false;" aria-label="dislike this video along with ` + initialdislikecountsfinal + ` other people" title="I dislike this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">` + dislikecountssecondaryfinal + `</span></button>
    </span>
  </span>
</div></div>`);
         }
         else if (likesallowed == false)
         {

             return (``);

         }


		}
		catch(err)
		{

			addReconstructError("Error in function genVidSentiment()");

		}
	}

	function genVidDesDate()
	{
		try
		{

		var date = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.dateText.simpleText;
		return date;

		}
		catch(err)
		{
			addReconstructError("Error in function genVidDesDate()");
		}
	}

	function genVidDesDescription()
	{

		try
        {

		var description = data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.description.runs;
                        var finisheddescription = (``);
            if (typeof data[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.description.runs != 'undefined') {

			for (var i = 0; i < description.length; i++) {
				if (typeof description[i].navigationEndpoint != 'undefined') {
                    if (typeof description[i].navigationEndpoint.urlEndpoint != 'undefined') {
				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + description[i].navigationEndpoint.urlEndpoint.url + '">' + description[i].text + "</a><br>";
				finisheddescription += descriptionintheworks;
                    } else if (typeof description[i].navigationEndpoint.watchEndpoint != 'undefined') {
                        if (typeof description[i].navigationEndpoint.watchEndpoint.playlistId != 'undefined') {
                                                var url = "https://www.youtube.com/watch?v=" + description[i].navigationEndpoint.watchEndpoint.videoId + "&list=" + description[i].navigationEndpoint.watchEndpoint.playlistId;
                        				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + url + '">' + description[i].text + "</a><br>";
				finisheddescription += descriptionintheworks;
                        }
                        else
                        {
                                                var url = "https://www.youtube.com/watch?v=" + description[i].navigationEndpoint.watchEndpoint.videoId;
                        				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + url + '">' + description[i].text + "</a><br>";
				finisheddescription += descriptionintheworks;
                        }
                    } else if (typeof description[i].navigationEndpoint.browseEndpoint != 'undefined') {
                        if (typeof description[i].navigationEndpoint.canonicalBaseUrl == 'undefined') {
                        var hashtagtext = description[i].text;
                        var hashtagurl = "https://www.youtube.com/hashtag/" + (hashtagtext.split("#")[1]);
                        var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + hashtagurl + '">' + hashtagtext + "</a><br>";
				        finisheddescription += descriptionintheworks;
                    } else if (typeof description[i].navigationEndpoint.canonicalBaseUrl != 'undefined') {
                        var baseurl = "https://www.youtube.com" + description[i].navigationEndpoint.canonicalBaseUrl;
                       var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + baseurl + '">' + description[i].text + "</a><br>";
				        finisheddescription += descriptionintheworks;
                    }
				}
            }
                else
                {
					var descriptionwithouthref = description[i].text;

                    var descriptionsplit = descriptionwithouthref.split('\n');
                    var descriptionconstruction = (``);
                    if (descriptionsplit[1] != undefined) {

                        for (var g = 0; g < descriptionsplit.length; g++) {

                            if (descriptionsplit[g] == "") {

                                descriptionconstruction += "<br><br>";

                            } else {

                                descriptionconstruction += descriptionsplit[g];

                            }

                        }

                        descriptionconstruction += "<br>";

                        finisheddescription += descriptionconstruction;

                    } else {

                        finisheddescription += descriptionsplit[0];

                    }


				}
            }

		return (finisheddescription);

		}
            else {
                return (``);
            }
        }
		catch(err)
		{
			addReconstructError("Error in function genVidDesDescription()");
			}
	}

    function genVidCategory()
    {

        try
        {

        	var videoinfojson = document.querySelector("script#scriptTag.ytd-player-microformat-renderer").innerHTML;
			var obj = JSON.parse(videoinfojson);
			var category = obj.genre;
            return (category);

        } catch(err)
        {
            addReconstructError("Error in function genVidCategory()");
        }
    }

    function genVidLicense()
    {

        //try
        //{

        /*


        if (typeof ytinitial.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.metadataRowContainer.metadataRowContainerRenderer.rows[0].metadataRowRenderer.contents[0].runs[0].text != 'undefined')
        {

            return (`Creative Commons Attribution license (reuse allowed)`);

        }
            else
            {

                return (`Standard YouTube License`);

            }

        //}
        //catch(err)
        //{

            addReconstructError(`Error in function genVidLicense()`);
        //}

        */

        return (`WIP`);
    }//
            /*
	var proc0 = script.substring(index);
	var proc1 = proc0.substring(0, proc0.search(/(?:[",]){2}/g));
	var response = unicodeToChar(decodeURIComponent(proc1.replace(/(ID_TOKEN\":\")|("")/g, "")));
    */

	//return response;








	let finalTemplate = (reconstructErrors + genCreatorBar() + `<div id="watch-header" class="yt-card yt-card-has-padding">
      <div id="watch7-headline" class="clearfix">
       ` + genVidBadges() + `
    <div id="watch-headline-title">
      <h1 class="watch-title-container">

` + genVidPrivacyBadge() + `

  ` + genVidTitle() + `

      </h1>
    </div>
  </div>
  ` + genVidRedBadge() + `

    ` + genVidUserInfo() + `

  <div class="yt-uix-overlay " data-overlay-style="primary" data-overlay-shape="tiny">

        <div class="yt-dialog hid ">
    <div class="yt-dialog-base">
      <span class="yt-dialog-align"></span>
      <div class="yt-dialog-fg" role="dialog">
        <div class="yt-dialog-fg-content">
          <div class="yt-dialog-loading">
              <div class="yt-dialog-waiting-content">
      <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

  </div>

          </div>
          <div class="yt-dialog-content">
              <div class="subscription-preferences-overlay-content-container">
    <div class="subscription-preferences-overlay-loading ">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

    </div>
    <div class="subscription-preferences-overlay-content">
    </div>
  </div>

          </div>
          <div class="yt-dialog-working">
              <div class="yt-dialog-working-overlay"></div>
  <div class="yt-dialog-working-bubble">
    <div class="yt-dialog-waiting-content">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
        Working...
    </span>
  </p>

      </div>
  </div>

          </div>
        </div>
        <div class="yt-dialog-focus-trap" tabindex="0"></div>
      </div>
    </div>
  </div>


  </div>

  </span>
</span></span></div>
` + genVidActionButtons() + `
  </div><div id="action-panel-details" class="action-panel-content yt-uix-expander yt-card yt-card-has-padding yt-uix-expander-collapsed"><div id="watch-description" class="yt-uix-button-panel"><div id="watch-description-content"><div id="watch-description-clip"><div id="watch-uploader-info"><strong class="watch-time-text">` + genVidDesDate() + `</strong></div><div id="watch-description-text" class=""><p id="eow-description" class="">` + genVidDesDescription() + `</p></div>  <div id="watch-description-extras">
    <ul class="watch-extras-section">
            <li class="watch-meta-item yt-uix-expander-body">
    <h4 class="title">
      Category
    </h4>
    <ul class="content watch-info-tag-list">
        <li><a class="g-hovercard yt-uix-sessionlink      spf-link " data-ytid="UC-9-kyTW8ZkZNDHQJ6FgpwQ" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg" href="https://www.youtube.com/channel/UCM6FFmRAK_uTICRwyTubV0A">` + genVidCategory() + `</a></li>
    </ul>
  </li>

            <li class="watch-meta-item yt-uix-expander-body">
    <h4 class="title">
      License
    </h4>
    <ul class="content watch-info-tag-list">
        <li>` + genVidLicense() + `</li>
    </ul>
  </li>

    </ul>
  </div>
</div></div></div>  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-collapsed-body yt-uix-gen204" type="button" onclick=";return false;" data-gen204="feature=watch-show-more-metadata"><span class="yt-uix-button-content">` + lang["showmore"] + `</span></button>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-body" type="button" onclick=";return false;"><span class="yt-uix-button-content">` + lang["showless"] + `</span></button>
</div>`);

	return finalTemplate;

}














































function genVidPlaylist(data)
    {


        var loggedinvalue = data[1].response.responseContext.serviceTrackingParams[1].params[0].value;

        if (loggedinvalue == "1")
        {

            var loggedin = true;

        }
        else
        {

            var loggedin = false;

        }

        if (typeof data[1].response.contents.twoColumnWatchNextResults.playlist.playlist != 'undefined')
        {

            var mix = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.isInfinite;

            var playlistcontents = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist;

            var playlistbody = '';
            for (var i = 0; i < playlistcontents.length; i++)
            {

                if (typeof data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer == 'undefined')
                {

                    continue;

                }

                var videoid = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.videoId;
                var attribution = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.longBylineText.runs[0].text;
                var vidtitle = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.title.simpleText;
                var indextext = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.indexText.simpleText;
                var indexnum = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint.index;
                var listid = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint.playlistId;
                var channelid = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.contents[i].playlistPanelVideoRenderer.longBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId;

                function hasNumbers(t)
                {
                 var regex = /\d/g;
                 return regex.test(t);
                }

                if (hasNumbers(indextext) == false)
                {

                    var currentlyplaying = true;

                }
                else
                {

                    var currentlyplaying = false;

                }

                var iteminthemaking = (`<li class="yt-uix-scroller-scroll-unit  ` + (currentplaying ? `currently-playing` : ``) + `" data-thumbnail-url="https://i.ytimg.com/vi/` + videoid + `/maxresdefault.jpg" data-video-username="` + attribution + `" data-video-title="` + vidtitle + `" data-index="0" data-video-id="` + vidid + `" data-innertube-clicktracking="CCMQyCAYACITCPqyxL392NICFUtzfgodDz4Okij4HTIDQkZhSPu895DB3uP5Rg">
    <span class="index">
        ` + index + `
    </span>
      <a href="https://www.youtube.com/watch?v=` + videoid + `&amp;index=` + indexnum + `&amp;list=` + listid + `" class=" spf-link  playlist-video clearfix  yt-uix-sessionlink      spf-link " data-sessionlink="itct=CCMQyCAYACITCPqyxL392NICFUtzfgodDz4Okij4HTIDQkZhSPu895DB3uP5Rg">
      <span class="video-thumb  yt-thumb yt-thumb-72">
    <span class="yt-thumb-default">
      <span class="yt-thumb-clip">

  <img alt="" aria-hidden="true" width="72" data-ytimg="1" src="https://i.ytimg.com/vi/` + videoid + `/maxresdefault.jpg" onload=";window.__ytRIL &amp;&amp; __ytRIL(this)">

        <span class="vertical-align"></span>
      </span>
    </span>
  </span>

    <div class="playlist-video-description">
      <h4 class="yt-ui-ellipsis yt-ui-ellipsis-2">
          ` + vidtitle + `
      </h4>
        <span class="video-uploader-byline">
          <span class="" data-ytid="` + channelid + `">` + attribution + `</span>
        </span>
    </div>
  </a>

  </li>`);

                playlistbody += iteminthemaking;

            }



            var title = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.title;

            if (typeof data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.ownerName != 'undefined')
            {

                var owner = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.ownerName.simpleText;

            }
            else
            {

                var owner = (``);

            }



            var playlistid = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.playlistId;

            var currentindex = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.currentIndex;

            var playlistamount = data[1].response.contents.twoColumnWatchNextResults.playlist.playlist.totalVideos;



            let playlist = (`<div id="player-playlist" class="  content-alignment    watch-player-playlist  ">


  <div id="watch-appbar-playlist" class="watch-playlist player-height radio-playlist">
    <div class="main-content">
      <div class="playlist-header">
        <div class="playlist-header-content" data-list-author="" data-shareable="True" data-normal-auto-clicktracking="CBYQ0TkiEwjLgqmEzPLbAhVEnxUKHZ4uCroo-B0yCGF1dG9wbGF5SMS7ga29mI6GdQ" data-initial-loop-state="false" data-list-title="` + title + `" data-full-list-id="` + playlistid + `">
          <div class="appbar-playlist-controls clearfix">


    <span class="yt-uix-clickcard">
      <span class="yt-uix-clickcard-target" data-position="bottomright" data-orientation="vertical">
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-player-controls yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-playlistlike watch-playlist-like yt-uix-button-opacity yt-uix-tooltip" type="button" onclick=";return false;" id="gh-playlist-save" aria-label="Save to Playlists" title="Save to Playlists" data-unlike-label="" data-playlist-id="` + playlistid + `" data-toggle-class="yt-uix-button-toggled" data-token="QUFFLUhqa2NGVC05N2VMSjE0WGo3Y3VxNUw1alYySGNyUXxBQ3Jtc0ttd2VnYVlic2FXY2J3ZlV3UzdlZWxjUHlxVUtjUmdaaUh0OU1DNDg0QkJqQ3NxMU5ONnFZRWhxcUJjeGhFU1dNZFhqX2luZmR1YW9tMU02NmJVa1AyVXd1UWp0REFPR2swVy1UeXE1Q1B1cXl2TWJPYnlhSlBpV2YzWkxwQXVXR1o2TE1sQzBma2R0bERFRk5YOV9vSkdRX3dvYlE=" data-unlike-tooltip="Remove" data-like-tooltip="Save to Playlists" data-like-label=""></button>
    </span>
      <div class="signin-clickcard yt-uix-clickcard-content">
    <h3 class="signin-clickcard-header">Sign in to YouTube</h3>
    <div class="signin-clickcard-message">

    </div>
    <a href="https://web.archive.org/web/20180627003239/https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26feature%3D__FEATURE__%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ%2526start_radio%253D1%2526list%253DRDdQw4w9WgXcQ%26hl%3Den&amp;hl=en" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=J9syW4vTKcS-Vp7dqNAL"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>

          </div>
          <div class="playlist-info">
              ` + (mix ? `<span class="playlist-mix-icon yt-sprite"></span>` : ``) + `
            <h3 class="playlist-title">
                ` + title + `
            </h3>
            <ul class="playlist-details">
                <li class="author-attribution">
                  ` + owner + `
                </li>` + (mix ? `` : `
                <li class="playlist-progress">
                <span id="playlist-current-index">` + currentindex + `</span><span id="playlist-length">` + playlistamount + ` videos</span>
                </li>`) + `
            </ul>
          </div>
        </div>

` + (mix ? `` : `<div class="control-bar clearfix">
          <div class="playlist-nav-controls">
                  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-player-controls yt-uix-button-empty yt-uix-button-has-icon toggle-loop yt-uix-button-opacity yt-uix-tooltip yt-uix-tooltip" type="button" onclick=";return false;" title="Repeat playlist" data-button-toggle="true" data-tooltip-text="Repeat playlist" aria-labelledby="yt-uix-tooltip61-arialabel"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-autoplay yt-sprite"></span></span></button>


      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-player-controls yt-uix-button-empty yt-uix-button-has-icon shuffle-playlist yt-uix-button-opacity yt-uix-tooltip yt-uix-tooltip" type="button" onclick=";return false;" title="Shuffle" data-button-toggle="true" data-tooltip-text="Shuffle" aria-labelledby="yt-uix-tooltip57-arialabel"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-shuffle-video-list yt-sprite"></span></span></button>


          </div>

          <div class="playlist-behavior-controls">

              <a href="/web/20170315165743/https://www.youtube.com/watch?v=PTtw_twY8ro&amp;index=13&amp;list=EL3A_wgg-twWg" class="yt-uix-button  hid prev-playlist-list-item yt-uix-button-opacity yt-uix-tooltip yt-uix-tooltip-masked spf-link  yt-uix-button-player-controls yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty" data-normal-prev-clicktracking="" data-loop-prev-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX3ByZXZI-7z3kMHe4_lG" data-loop_shuffle-prev-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX3ByZXZI-7z3kMHe4_lG" data-shuffle-prev-clicktracking="" title="Previous video"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-play-prev yt-sprite"></span></span></a>


              <a href="/web/20170315165743/https://www.youtube.com/watch?v=M2jm7df-fkw&amp;index=2&amp;list=EL3A_wgg-twWg" class="yt-uix-button  hid next-playlist-list-item yt-uix-button-opacity yt-uix-tooltip spf-link  yt-uix-button-player-controls yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty" data-shuffle-next-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX25leHRI-7z3kMHe4_lG" data-normal-next-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX25leHRI-7z3kMHe4_lG" data-loop_shuffle-next-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX25leHRI-7z3kMHe4_lG" data-loop-next-clicktracking="CBQQ0TkiEwj6ssS9_djSAhVLc34KHQ8-DpIo-B0yB2JmX25leHRI-7z3kMHe4_lG" title="Next video"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-play-next yt-sprite"></span></span></a>

          </div>
        </div>`) + `
      </div>

      <div class="playlist-videos-container yt-scrollbar-dark yt-scrollbar">
        <ol id="playlist-autoscroll-list" class="playlist-videos-list yt-uix-scroller yt-viewport" data-scroll-action="yt.www.watch.lists.loadThumbnails" data-scroller-mousewheel-listener="" data-scroller-scroll-listener="">
                ` + playlistbody + `

        </ol>
        <script>try {var r = document.getElementById('playlist-autoscroll-list');r.scrollTop = r.querySelector('.currently-playing').offsetTop;} catch (e) {}</script>
      </div>
    </div>
  </div>



    </div>`);

         return playlist;

        }
        else
        {

            return;

        }

    }





































function generateSidebarTops(data)
{



}













































function generateRelatedTemplate(recommendationdata)

{
    try {

    if (recommendationdata.responseContext.serviceTrackingParams[1].params[0].value == "1")
    {

        var loggedin = true;

    }
    else
    {

        var loggedin = false;

    }

    function findFirstRenderer()
    {

        var o;
        var items = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
        for (o = 0; o < items.length; o++)
        {

            if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[o].compactVideoRenderer != 'undefined')
            {

                return o;

            }

        }

    }



    function genVidOne()
    {

        if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer != 'undefined')
        {


            var title = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[0].compactVideoRenderer.title.simpleText;
            var viewcount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[0].compactVideoRenderer.viewCountText.simpleText;
            var videolength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[0].compactVideoRenderer.lengthText.simpleText;
            var videoid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[0].compactVideoRenderer.videoId;
            var creator = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[0].compactVideoRenderer.longBylineText.runs[0].text;

        }
        else if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer == 'undefined')
        {

            var title = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[findFirstRenderer()].compactVideoRenderer.title.simpleText;
            var viewcount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[findFirstRenderer()].compactVideoRenderer.viewCountText.simpleText;
            var videolength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[findFirstRenderer()].compactVideoRenderer.lengthText.simpleText;
            var videoid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[findFirstRenderer()].compactVideoRenderer.videoId;
            var creator = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[findFirstRenderer()].compactVideoRenderer.longBylineText.runs[0].text;

        }

            let videoOne = ( `<div class="watch-sidebar-body">
    <ul class="video-list">
        <li class="video-list-item related-list-item">


    <div class="content-wrapper">
    <a href="https://www.youtube.com/watch?v=` + videoid + `" class=" content-link spf-link  yt-uix-sessionlink      spf-link " data-sessionlink="itct=CDAQpDAYACITCOf89P6fpNoCFQQefgodjPMHeSj4HTIHYXV0b25hdkiA2L6C7LO79ogB" title="` + title + `" rel=" spf-prefetch nofollow" data-visibility-tracking="CDAQpDAYACITCOf89P6fpNoCFQQefgodjPMHeSj4HUDIgMOny7DTnmE=">
  <span dir="ltr" class="title" aria-describedby="description-id-175460">
    ` + title + `
  </span>
  <span class="accessible-description" id="description-id-175460">
     - Duration: ` + videolength + `.
  </span>
  <span class="stat attribution"><span class="">` + creator + `</span></span>
  <span class="stat view-count">` + viewcount + `</span>
</a>
  </div>
  <div class="thumb-wrapper">

    <a href="https://www.youtube.com/watch?v=` + videoid + ` class="thumb-link spf-link yt-uix-sessionlink" data-sessionlink="itct=CDAQpDAYACITCOf89P6fpNoCFQQefgodjPMHeSj4HTIHYXV0b25hdkiA2L6C7LO79ogB" rel=" spf-prefetch nofollow" tabindex="-1" data-visibility-tracking="CDAQpDAYACITCOf89P6fpNoCFQQefgodjPMHeSj4HUDIgMOny7DTnmE=" aria-hidden="true"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related" tabindex="0" data-vid="` + videoid + `"><img alt="" height="94" width="168" aria-hidden="true" style="top: 0px" src="https://i.ytimg.com/vi/` + videoid + `/mqdefault.jpg"><span class="video-time">` + videolength + `</span></span></a>



  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button video-actions spf-nolink hide-until-delayloaded ` + (loggedin ? `addto-watch-later-button` : `addto-watch-later-button-sign-in`) + ` yt-uix-tooltip" type="button" onclick=";return false;" role="button" title="Watch later" data-video-ids="` + videoid + `" data-button-menu-id="shared-addto-watch-later-login"></button>
  <span class="thumb-menu dark-overflow-action-menu video-actions">
    <button class="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty" type="button" aria-haspopup="true" onclick=";return false;" aria-expanded="false"><ul class="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid"><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-next yt-uix-button-menu-item" data-action="play-next" onclick=";return false;" data-video-ids="` + videoid + `"><span class="addto-watch-queue-menu-text">Play next</span></li><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item" data-action="play-now" onclick=";return false;" data-video-ids="` + videoid + `"><span class="addto-watch-queue-menu-text">Play now</span></li></ul></button>
  </span>
  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button addto-queue-button video-actions spf-nolink hide-until-delayloaded addto-tv-queue-button yt-uix-tooltip" type="button" onclick=";return false;" title="Queue" data-video-ids="` + videoid + `" data-style="tv-queue"></button>
</div>


        </li>
    </ul>
  </div>` );

        return videoOne;


}


    function genVidRest()
    {


        //if (typeof contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.itemSectionRenderer.contents[1].compactRadioRenderer !== 'undefined')

        //{


        var i;
        var sidebarbody = "";
        if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer != 'undefined')
        {


        var recommendedvideolength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents;






                    for (i = 1; i < recommendedvideolength.length; i++) {

                        if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].continuationItemRenderer !== 'undefined')
                        {

                            break;

                        }

            if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer !== 'undefined')
            {


            var playlistid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.playlistId;
            var playlistname = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.title.simpleText;
            var playlisturl = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url;
            var playlistattribution = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.longBylineText.simpleText;
            var watchendpoint = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.navigationEndpoint.watchEndpoint.videoId;
            var videocount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactRadioRenderer.videoCountText.runs[0].text;

                if (videocount == "Mix")
                {

                    var mixboolean = "50+";

                }
                else
                {

                    var mixboolean = videocount;
                }

            var iteminthemaking = (`<li class="video-list-item related-list-item  show-video-time related-list-item-compact-radio"><a href="` + playlisturl + `" class="related-playlist yt-pl-thumb-link spf-link mix-playlist resumable-list yt-uix-sessionlink" data-sessionlink="itct=CCsQozAYASITCKDsmozKutsCFc7xfgodygULCCj4HTIKbGlzdF9vdGhlckjEu4GtvZiOhnU" rel="spf-prefetch" data-visibility-tracking="CCsQozAYASITCKDsmozKutsCFc7xfgodygULCCj4HQ==" data-secondary-video-url="` + playlisturl + `">  <span class=" yt-mix-thumb yt-pl-thumb">

    <span class="video-thumb  yt-thumb yt-thumb-168">
    <span class="yt-thumb-default">
      <span class="yt-thumb-clip">

  <img onload=";window.__ytRIL &amp;&amp; __ytRIL(this)" alt="" data-ytimg="1" aria-hidden="true" src="https://i.ytimg.com/vi/` + watchendpoint + `/mqdefault.jpg" width="168">

        <span class="vertical-align"></span>
      </span>
    </span>
  </span>


    <span class="sidebar">
      <span class="yt-pl-sidebar-content yt-valign">
        <span class="yt-valign-container">
            <span class="formatted-video-count-label">
      <b>` + mixboolean + `</b> videos
  </span>

            <span class="yt-pl-icon yt-pl-icon-mix yt-sprite"></span>
        </span>
      </span>
    </span>

      <span class="yt-pl-thumb-overlay">
        <span class="yt-pl-thumb-overlay-content">
          <span class="play-icon yt-sprite"></span>
          <span class="yt-pl-thumb-overlay-text">
Play all
          </span>
        </span>
      </span>

        <span class="yt-pl-watch-queue-overlay">
      <span class="thumb-menu dark-overflow-action-menu video-actions">
    <button type="button" onclick=";return false;" aria-haspopup="true" aria-expanded="false" class="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"><ul class="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid"><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item" data-action="play-now" onclick=";return false;" data-video-ids="` + watchendpoint + `" data-list-id="` + watchendpoint + `"><span class="addto-watch-queue-menu-text">Play now</span></li></ul></button>
  </span>

      <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button addto-queue-button video-actions spf-nolink hide-until-delayloaded addto-tv-queue-button yt-uix-tooltip" type="button" onclick=";return false;" title="Queue" data-video-ids="` + watchendpoint + `" data-style="tv-queue" data-list-id="` + watchendpoint + `"></button>

  </span>

  </span>
<span dir="ltr" class="title" title="` + playlistname + `">` + playlistname + `</span><span class="stat attribution">` + playlistattribution + `</span></a></li>`);



                sidebarbody += iteminthemaking;


        }
            else if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer !== 'undefined')
            {

                var vidname = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.title.simpleText;
                var vidattribution = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.longBylineText.runs[0].text;
                var vidviewcount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.viewCountText.simpleText;
                var vidlength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.lengthText.simpleText;
                var vidid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.videoId;

                var overlays = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.thumbnailOverlays;

                function find()
                {

                var g;
                for (g = 0; g < overlays.length; g++)
                {

                    if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.thumbnailOverlays[g].thumbnailOverlayResumePlaybackRenderer !== 'undefined')
                    {

                        return g;

                    }
                }
                }

                if (find() != undefined)
                {

                    var percentage = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents[i].compactVideoRenderer.thumbnailOverlays[find()].thumbnailOverlayResumePlaybackRenderer.percentDurationWatched;
                    var containsdurationwatched = true;

                    var progressbar = (`<span class="resume-playback-background"></span>
<span class="resume-playback-progress-bar" style="width:` + percentage + `%"></span>`);

                }
                else
                {

                    var containsdurationwatched = false;

                    var progressbar = (``);

                }

                var iteminthemaking = (`<li class="video-list-item related-list-item related-list-item-compact-video">

    <div class="content-wrapper">
    <a href="/watch?v=` + vidid + `" class=" content-link spf-link  yt-uix-sessionlink      spf-link " data-sessionlink="itct=CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HTIHcmVsYXRlZEjEu4GtvZiOhnU" rel=" spf-prefetch nofollow" title="` + vidname + `" data-visibility-tracking="CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HUCM-YaBo-OLtD0=">
  <span dir="ltr" class="title" aria-describedby="description-id-395892">
    ` + vidname + `
  </span>
  <span class="accessible-description" id="description-id-395892">
     - Duration: ` + vidlength + `.
  </span>
  <span class="stat attribution"><span class="">` + vidattribution + `</span></span>
  <span class="stat view-count">` + vidviewcount + `</span>
</a>
  </div>
  <div class="` + (containsdurationwatched ? `thumb-wrapper contains-percent-duration-watched` : `thumb-wrapper`) + `">

    <a href="/watch?v=` + vidid + `" class="thumb-link spf-link yt-uix-sessionlink" data-sessionlink="itct=CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HTIHcmVsYXRlZEjEu4GtvZiOhnU" rel=" spf-prefetch nofollow" tabindex="-1" data-visibility-tracking="CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HUCM-YaBo-OLtD0=" aria-hidden="true"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related" tabindex="0" data-vid="` + vidid + `"><img alt="" aria-hidden="true" src="https://i.ytimg.com/vi/` + vidid + `/mqdefault.jpg" style="top: 0px" width="168" height="94"><span class="video-time">` + vidlength + `</span></span></a>


` + progressbar + `
  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button video-actions spf-nolink hide-until-delayloaded ` + (loggedin ? `addto-watch-later-button` : `addto-watch-later-button-sign-in`) + ` yt-uix-tooltip" type="button" onclick=";return false;" title="Watch later" role="button" data-video-ids="` + vidid + `" data-button-menu-id="shared-addto-watch-later-login"></button>
  <span class="thumb-menu dark-overflow-action-menu video-actions">
    <button type="button" onclick=";return false;" aria-haspopup="true" aria-expanded="false" class="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"><ul class="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid"><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-next yt-uix-button-menu-item" data-action="play-next" onclick=";return false;" data-video-ids="` + vidid + `"><span class="addto-watch-queue-menu-text">Play next</span></li><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item" data-action="play-now" onclick=";return false;" data-video-ids="` + vidid + `"><span class="addto-watch-queue-menu-text">Play now</span></li></ul></button>
  </span>
  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button addto-queue-button video-actions spf-nolink hide-until-delayloaded addto-tv-queue-button yt-uix-tooltip" type="button" onclick=";return false;" title="Queue" data-video-ids="` + vidid + `" data-style="tv-queue"></button>
</div>
` + (loggedin ? `<div class="yt-uix-menu-container related-item-action-menu">

      <div class="yt-uix-menu yt-uix-menu-flipped hide-until-delayloaded">  ` + (loggedin ? `<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-menu-trigger" type="button" onclick=";return false;" aria-haspopup="true" aria-label="Action menu." aria-pressed="false" role="button" aria-controls="aria-menu-id-7" id="kbd-nav-518492"></button>` : `<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-menu-trigger yt-uix-menu-trigger-selected yt-uix-button-toggled" type="button" onclick=";return false;" aria-haspopup="true" aria-label="Action menu." aria-pressed="false" role="button" aria-controls="aria-menu-id-7" id="kbd-nav-518492"></button>`) + `
</div>
  </div>` : ``) + `

</li>`);

                sidebarbody += iteminthemaking;
            }
    }












        }
        else
        {

            var recommendedvideolength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;


                    for (i = findFirstRenderer() + 1; i < recommendedvideolength.length; i++) {

                        if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].continuationItemRenderer !== 'undefined')
                        {

                            break;

                        }

            if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer !== 'undefined')
            {

            var playlistid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.playlistId;
            var playlistname = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.title.simpleText;
            var playlisturl = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url;
            var playlistattribution = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.longBylineText.simpleText;
            var watchendpoint = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.navigationEndpoint.watchEndpoint.videoId;
            var videocount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactRadioRenderer.videoCountText.runs[0].text;

                if (videocount == "Mix")
                {

                    var mixboolean = "50+";

                }
                else
                {

                    var mixboolean = videocount;
                }

            var iteminthemaking = (`<li class="video-list-item related-list-item  show-video-time related-list-item-compact-radio"><a href="` + playlisturl + `" class="related-playlist yt-pl-thumb-link spf-link mix-playlist resumable-list yt-uix-sessionlink" data-sessionlink="itct=CCsQozAYASITCKDsmozKutsCFc7xfgodygULCCj4HTIKbGlzdF9vdGhlckjEu4GtvZiOhnU" rel="spf-prefetch" data-visibility-tracking="CCsQozAYASITCKDsmozKutsCFc7xfgodygULCCj4HQ==" data-secondary-video-url="` + playlisturl + `">  <span class=" yt-mix-thumb yt-pl-thumb">

    <span class="video-thumb  yt-thumb yt-thumb-168">
    <span class="yt-thumb-default">
      <span class="yt-thumb-clip">

  <img onload=";window.__ytRIL &amp;&amp; __ytRIL(this)" alt="" data-ytimg="1" aria-hidden="true" src="https://i.ytimg.com/vi/` + watchendpoint + `/mqdefault.jpg" width="168">

        <span class="vertical-align"></span>
      </span>
    </span>
  </span>


    <span class="sidebar">
      <span class="yt-pl-sidebar-content yt-valign">
        <span class="yt-valign-container">
            <span class="formatted-video-count-label">
      <b>` + mixboolean + `</b> videos
  </span>

            <span class="yt-pl-icon yt-pl-icon-mix yt-sprite"></span>
        </span>
      </span>
    </span>

      <span class="yt-pl-thumb-overlay">
        <span class="yt-pl-thumb-overlay-content">
          <span class="play-icon yt-sprite"></span>
          <span class="yt-pl-thumb-overlay-text">
Play all
          </span>
        </span>
      </span>

        <span class="yt-pl-watch-queue-overlay">
      <span class="thumb-menu dark-overflow-action-menu video-actions">
    <button type="button" onclick=";return false;" aria-haspopup="true" aria-expanded="false" class="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"><ul class="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid"><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item" data-action="play-now" onclick=";return false;" data-video-ids="` + watchendpoint + `" data-list-id="` + watchendpoint + `"><span class="addto-watch-queue-menu-text">Play now</span></li></ul></button>
  </span>

      <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button addto-queue-button video-actions spf-nolink hide-until-delayloaded addto-tv-queue-button yt-uix-tooltip" type="button" onclick=";return false;" title="Queue" data-video-ids="` + watchendpoint + `" data-style="tv-queue" data-list-id="` + watchendpoint + `"></button>

  </span>

  </span>
<span dir="ltr" class="title" title="` + playlistname + `>` + playlistname + `</span><span class="stat attribution">` + playlistattribution + `</span></a></li>`);



                sidebarbody += iteminthemaking;


        }
            else if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer !== 'undefined')
            {

                var vidname = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.title.simpleText;
                var vidattribution = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.longBylineText.runs[0].text;
                var vidviewcount = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.viewCountText.simpleText;
                var vidlength = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.lengthText.simpleText;
                var vidid = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.videoId;

                var overlays = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.thumbnailOverlays;

                function find()
                {

                var g;
                for (g = 0; g < overlays.length; g++)
                {

                    if (typeof recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.thumbnailOverlays[g].thumbnailOverlayResumePlaybackRenderer !== 'undefined')
                    {

                        return g;

                    }
                }
                }

                if (find() != undefined)
                {

                    var percentage = recommendationdata.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[i].compactVideoRenderer.thumbnailOverlays[find()].thumbnailOverlayResumePlaybackRenderer.percentDurationWatched;
                    var containsdurationwatched = true;

                    var progressbar = (`<span class="resume-playback-background"></span>
<span class="resume-playback-progress-bar" style="width:` + percentage + `%"></span>`);

                }
                else
                {

                    var containsdurationwatched = false;

                    var progressbar = (``);

                }

                var iteminthemaking = (`<li class="video-list-item related-list-item related-list-item-compact-video">

    <div class="content-wrapper">
    <a href="/watch?v=` + vidid + `" class=" content-link spf-link  yt-uix-sessionlink      spf-link " data-sessionlink="itct=CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HTIHcmVsYXRlZEjEu4GtvZiOhnU" rel=" spf-prefetch nofollow" title="` + vidname + `" data-visibility-tracking="CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HUCM-YaBo-OLtD0=">
  <span dir="ltr" class="title" aria-describedby="description-id-395892">
    ` + vidname + `
  </span>
  <span class="accessible-description" id="description-id-395892">
     - Duration: ` + vidlength + `.
  </span>
  <span class="stat attribution"><span class="">` + vidattribution + `</span></span>
  <span class="stat view-count">` + vidviewcount + `</span>
</a>
  </div>
  <div class="` + (containsdurationwatched ? `thumb-wrapper contains-percent-duration-watched` : `thumb-wrapper`) + `">

    <a href="/watch?v=` + vidid + `" class="thumb-link spf-link yt-uix-sessionlink" data-sessionlink="itct=CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HTIHcmVsYXRlZEjEu4GtvZiOhnU" rel=" spf-prefetch nofollow" tabindex="-1" data-visibility-tracking="CCkQpDAYAyITCKDsmozKutsCFc7xfgodygULCCj4HUCM-YaBo-OLtD0=" aria-hidden="true"><span class="yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related" tabindex="0" data-vid="` + vidid + `"><img alt="" aria-hidden="true" src="https://i.ytimg.com/vi/` + vidid + `/mqdefault.jpg" style="top: 0px" width="168" height="94"><span class="video-time">` + vidlength + `</span></span></a>


` + progressbar + `
  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button video-actions spf-nolink hide-until-delayloaded ` + (loggedin ? `addto-watch-later-button` : `addto-watch-later-button-sign-in`) + ` yt-uix-tooltip" type="button" onclick=";return false;" title="Watch later" role="button" data-video-ids="` + vidid + `" data-button-menu-id="shared-addto-watch-later-login"></button>
  <span class="thumb-menu dark-overflow-action-menu video-actions">
    <button type="button" onclick=";return false;" aria-haspopup="true" aria-expanded="false" class="yt-uix-button-reverse flip addto-watch-queue-menu spf-nolink hide-until-delayloaded yt-uix-button yt-uix-button-dark-overflow-action-menu yt-uix-button-size-default yt-uix-button-has-icon no-icon-markup yt-uix-button-empty"><ul class="watch-queue-thumb-menu yt-uix-button-menu yt-uix-button-menu-dark-overflow-action-menu hid"><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-next yt-uix-button-menu-item" data-action="play-next" onclick=";return false;" data-video-ids="` + vidid + `"><span class="addto-watch-queue-menu-text">Play next</span></li><li role="menuitem" class="overflow-menu-choice addto-watch-queue-menu-choice addto-watch-queue-play-now yt-uix-button-menu-item" data-action="play-now" onclick=";return false;" data-video-ids="` + vidid + `"><span class="addto-watch-queue-menu-text">Play now</span></li></ul></button>
  </span>
  <button class="yt-uix-button yt-uix-button-size-small yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup addto-button addto-queue-button video-actions spf-nolink hide-until-delayloaded addto-tv-queue-button yt-uix-tooltip" type="button" onclick=";return false;" title="Queue" data-video-ids="` + vidid + `" data-style="tv-queue"></button>
</div>
` + (loggedin ? `<div class="yt-uix-menu-container related-item-action-menu">

      <div class="yt-uix-menu yt-uix-menu-flipped hide-until-delayloaded">  ` + (loggedin ? `<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-menu-trigger" type="button" onclick=";return false;" aria-haspopup="true" aria-label="Action menu." aria-pressed="false" role="button" aria-controls="aria-menu-id-7" id="kbd-nav-518492"></button>` : `<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-action-menu yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-menu-trigger yt-uix-menu-trigger-selected yt-uix-button-toggled" type="button" onclick=";return false;" aria-haspopup="true" aria-label="Action menu." aria-pressed="false" role="button" aria-controls="aria-menu-id-7" id="kbd-nav-518492"></button>`) + `
</div>
  </div>` : ``) + `

</li>`);

                sidebarbody += iteminthemaking;
            }
    }

        }







        return sidebarbody;

    }



    let finalRecommendedTemplate = `<div id="watch7-sidebar" class="watch-sidebar"><div id="watch7-sidebar-contents" class="watch-sidebar-gutter   yt-card yt-card-has-padding    yt-uix-expander yt-uix-expander-collapsed">
      <div id="watch7-sidebar-offer">

      </div>

    <div id="watch7-sidebar-ads">
              <div id="watch-channel-brand-div" class="">
      <div id="watch-channel-brand-div-text">
Advertisement
      </div>
      <div id="google_companion_ad_div">
      </div>
    </div>


    </div>
    <div id="watch7-sidebar-modules">
            <div class="watch-sidebar-section">
    <div class="autoplay-bar">
      <div class="checkbox-on-off">
       <label for="autoplay-checkbox">Autoplay</label>
       <span class="autoplay-hovercard yt-uix-hovercard">
          <span class="autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite" data-orientation="vertical" data-position="topright"></span>
<span class="yt-uix-hovercard-content">When autoplay is enabled, a suggested video will automatically play next.</span>        </span>
          <span class="yt-uix-checkbox-on-off ">
<input id="autoplay-checkbox" class="" type="checkbox" name="" checked=""><label for="autoplay-checkbox" id="autoplay-checkbox-label"><span class="checked"></span><span class="toggle"></span><span class="unchecked"></span></label>  </span>

      </div>
      <h4 class="watch-sidebar-head">
        Up next
      </h4>
        ` + genVidOne() + `

    </div>
  </div>


          <div class="watch-sidebar-section">
      <hr class="watch-sidebar-separation-line">
    <div class="watch-sidebar-body">
      <ul id="watch-related" class="video-list">
          ` + genVidRest() + `
                <div id="watch-more-related" class="hid">
    <li id="watch-more-related-loading">
Loading more suggestions...
    </li>
  </div>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander" type="button" onclick=";return false;" id="watch-more-related-button" data-button-action="yt.www.watch.related.loadMore" data-continuation="CBQSJhILZFF3NHc5V2dYY1HAAQDIAQDgAQGiAg0o____________AUAAGAAq0wEI3u7ztte63Zp2COTB1M2NrNKG6AEI4NSkpfC0hvvIAQiw982Z4L2GxKQBCJamhLfA96z8Iwje4vrOxafy6W4IjPmGgaPji7Q9CPa14-r0ro3mqwEIwejdpODYxcatAQim0-bejfGGmhUIicP0zt3ezuYaCKzrx-nbqPyv1QEI0v7YpPa1satXCMmstZaA74boVwjIw724pLXB8akBCKiw6b6Dr_f84QEI7YOhh4Wq3IuhAQi05IPi3JnbvY8BCMCPhtCfot3ncQjdq5ft3JXjv-UB"><span class="yt-uix-button-content">Show more</span></button>

      </ul>
    </div>
  </div>

    </div>
  </div></div> `;

    return finalRecommendedTemplate;

    }
    catch(err)
    {

        var variable = 69;

    }
}





function injRecommended()
    {

        var parser = new DOMParser().parseFromString(w8rhtmldata, "text/html");

        console.log("Called injRecommended()");

        if (window.location.pathname.toLowerCase() == "/watch") {

            for (var i = 0; i < parser.scripts.length; i++)
{


   if (parser.scripts[i].innerHTML.startsWith("var ytInitialData"))
   {
       var stringifiedjson = parser.scripts[i].innerHTML.replace("var ytInitialData = ", "").replace(';', '');

       var ytinitialdata = JSON.parse(stringifiedjson);

   }

}

            //.then(response => watchresponse = response);



            var loop = setInterval(function() {

                console.log("Checking ytinitial data...");

                if (typeof ytinitialdata.currentVideoEndpoint != 'undefined') {

                    clearInterval(loop);
                    injReco2();

                }

            }, 100);


            function injReco2()
            {

            document.getElementById("related").outerHTML = document.getElementById("related").outerHTML + generateRelatedTemplate(ytinitialdata);

                var waitforrecommendedinject = setInterval(function() {

                    if (document.querySelector("li.video-list-item")) {

                        clearInterval(waitforrecommendedinject);
                        videoRecoLoaded = true;
                        injectRewrite2();

                    }

                }, 10);

            }



    }

    }

function injPlaylist()
{
    var data;

        var checkforytinitialdata = setInterval(() => {

        if (document.getElementById("w8rytinitialdata")) {
            clearInterval(checkforytinitialdata);
            var innerhtml = document.getElementById("w8rytinitialdata").innerHTML;
            data = JSON.parse(innerhtml);

        }

    }, 10);

    document.getElementById("playlist").outerHTML = document.getElementById("playlist").outerHTML + genVidPlaylist(data);

}




























































function injectVideoInformation()
{
    //try {
	console.log("Called injectVideoInformation()");

	//var data;
	//var datag = getWatchPage().then(response => data = response);


    //var data;
    //var datag = getWatchPage().then(response => data = response);

    var parsed = "";

    var loop = setInterval(function() {

		console.log("Checking watch data...");

		if (typeof w8rpbjdata !== 'undefined' && w8rpbjdata[0] !== 'undefined' && w8rpbjdata[0].page !== 'undefined')
		{

            //if (data[0].page === 'watch') {
			console.log("Watch data not undefined");
            clearInterval(loop);
			injVidInfo2();

            //}


		}

    }, 100);







	function injVidInfo2()
	{
		console.log("Called injVidInfo2()");

            //document.getElementById("clarify-box").outerHTML = document.getElementById("clarify-box").outerHTML + generateVideoTemplate(w8rpbjdata, parsed);

            document.querySelector("div#player.ytd-watch-flexy").insertAdjacentHTML('afterend', generateVideoTemplate(w8rpbjdata, parsed));



	//}


                var checkfortemplate = setInterval(function() {

            if (document.getElementById("eow-title")) {
                clearInterval(checkfortemplate);

            videoInfoCardLoaded = true;

            injectRewrite(w8rpbjdata);

            }

        }, 10);

}

}





















function injectRewrite(watchdata) {

    if (watchdata[1].response.responseContext.serviceTrackingParams[1].params[0].value == "1") {

        var loggedin = "1";

    } else {

        var loggedin = "0";

    }






    function injectMoreListener() {

        var checkformenuopen = setInterval(function() {

            if (document.getElementsByClassName("yt-uix-menu")[0] != undefined && document.getElementsByClassName("yt-uix-menu")[0].children[1].getAttribute("class").search("-hidden") == "-1") {
                clearInterval(checkformenuopen);

                actuallyDoIt();

            }

        }, 10);

        function actuallyDoIt() {

            function toggle(element) {
               if (element.target.classList[1] !== 'yt-ui-menu-content' && document.getElementsByClassName('yt-ui-menu-content')[0].getAttribute("class").search("-hidden") == "-1" && document.getElementsByClassName("yt-uix-more-button-context-menu-open-opened")[0] != undefined && element.target.classList[10] !== 'yt-uix-more-button-context-menu-open-opened'){
                  document.getElementsByClassName('yt-ui-menu-content')[0].setAttribute("class", (document.getElementsByClassName('yt-ui-menu-content')[0].getAttribute("class") + " yt-uix-menu-content-hidden"));

                       document.getElementsByClassName("yt-uix-more-button-context-menu-open-opened")[0].setAttribute("class", document.getElementsByClassName("yt-uix-more-button-context-menu-open-opened")[0].getAttribute("class").replace("yt-uix-more-button-context-menu-open-opened", ""));



                   var occurences = (document.getElementsByClassName("yt-uix-menu")[0].children[0].getAttribute("class").match(/yt-uix-menu-trigger-selected yt-uix-button-toggled/g) || []).length;

                   for (var i = 0; i <= occurences; i++)
                   {

                      document.getElementsByClassName("yt-uix-menu")[0].children[0].setAttribute("class", document.getElementsByClassName("yt-uix-menu")[0].children[0].getAttribute("class").replace(/yt-uix-menu-trigger-selected yt-uix-button-toggled/g, ''));

                   }




                   }
            };


                    window.addEventListener("click", toggle, false);



        var checkformenuclose = setInterval(function() {

            if (document.getElementsByClassName("yt-uix-menu")[0].children[0].getAttribute("class").search("yt-uix-menu-trigger-selected yt-uix-button-toggled") == "-1")
            {

                clearInterval(checkformenuclose);
                window.removeEventListener("click", toggle, false);

            }

        }, 10);

        }


    }

    var more = setInterval(injectMoreListener, 10);






if (loggedin == "0") {

    var clickcard = setInterval(injectClickcardListener, 10);

    var updateclickcard = setInterval(updateClickcards, 10);

}












    function injectClickcardListener() {

        var checkforclickcard = setInterval(function() {

            if (document.getElementById("yt-uix-clickcard-card44") || document.getElementById("yt-uix-clickcard-card47") || document.getElementById("yt-uix-clickcard-card49") || document.getElementById("yt-uix-clickcard-card51")) {
                clearInterval(checkforclickcard);

                actuallyInjectIt();

            }

        }, 10);


        function actuallyInjectIt() {


          function visibility(element) {
               if (element.target.classList[0] !== 'yt-uix-clickcard-card') {

                   if (document.getElementById("yt-uix-clickcard-card44")) {

                       document.getElementById("yt-uix-clickcard-card44").remove();

                   } else if (document.getElementById("yt-uix-clickcard-card47")) {

                       document.getElementById("yt-uix-clickcard-card47").remove();

                   } else if (document.getElementById("yt-uix-clickcard-card49")) {

                       document.getElementById("yt-uix-clickcard-card49").remove();

                   } else if (document.getElementById("yt-uix-clickcard-card51")) {

                       document.getElementById("yt-uix-clickcard-card51").remove();

                   }




                   }
        };



                                window.addEventListener("click", visibility, false);
                                window.addEventListener("contextmenu", visibility, false);



        var checkforclickcardclose = setInterval(function() {

            if (document.getElementById("yt-uix-clickcard-card44") == null && document.getElementById("yt-uix-clickcard-card47") == null && document.getElementById("yt-uix-clickcard-card49") == null && document.getElementById("yt-uix-clickcard-card51") == null)
            {

                clearInterval(checkforclickcardclose);
                window.removeEventListener("click", visibility, false);
                window.removeEventListener("contextmenu", visibility, false);

            }

        }, 10);

    }

    }







    function updateClickcards() {

           var olddeviceratio = window.devicePixelRatio;
        var checkforclickcard = setInterval(function() {
            if (document.getElementById("yt-uix-clickcard-card44") || document.getElementById("yt-uix-clickcard-card47") || document.getElementById("yt-uix-clickcard-card49") || document.getElementById("yt-uix-clickcard-card51")) {

                clearInterval(checkforclickcard);

            checkForClickcardUpdate();

        }
        }, 4);

        function checkForClickcardUpdate() {

             var checkforzoomupdate = setInterval(function() {

                 if (window.devicePixelRatio != olddeviceratio) {

                     clearInterval(checkforzoomupdate);

                     updateClickcardStyle();

                 }

             }, 5);

        }

        function updateClickcardStyle() {

            if (document.getElementById("yt-uix-clickcard-card44")) {



              var clientlikerectleft = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().left - 6).toPrecision(4);

            if (window.scrollY == 0) {

            var clientlikerecttop = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

            var clientlikerecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

                document.getElementById("yt-uix-clickcard-card44").setAttribute("style", "left: " + clientlikerectleft + "px; top:" + clientlikerecttop + "px;");

            } else if (document.getElementById("yt-uix-clickcard-card47")) {

              var clientdislikerectleft = (document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().left - 6).toPrecision(4);

            if (window.scrollY == 0) {

            var clientdislikerecttop = (document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

            var clientdislikerecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

                document.getElementById("yt-uix-clickcard-card47").setAttribute("style", "left: " + clientdislikerectleft + "px; top:" + clientdislikerecttop + "px;");

            } else if (document.getElementById("yt-uix-clickcard-card49")) {

              var clientaddtorectleft = (document.getElementsByClassName("addto-button")[0].getBoundingClientRect().left - 6).toPrecision(4);

            if (window.scrollY == 0) {

            var clientaddtorecttop = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

            var clientaddtorecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

                document.getElementById("yt-uix-clickcard-card49").setAttribute("style", "left: " + clientaddtorectleft + "px; top:" + clientaddtorecttop + "px;");

            }

        }

    }







    document.getElementById("watch7-subscription-container").innerHTML = document.getElementById("watch7-subscription-container").innerHTML.replace("undefined", "");

    //var corejs = document.createElement("script");
    //corejs.src = "https://s.ytimg.com/yts/jsbin/www-core-vflsvjhLF/www-core.js";
    //document.head.appendChild(corejs)

    function doNothing() {}








    // Working buttons
    document.getElementById("watch7-subscription-container").children[0].children[1].onclick = function() {
        document.getElementsByClassName("yt-uix-button-subscribe-branded")[0].blur();
        if (document.getElementById("watch7-subscription-container").children[0].children[1].getAttribute("class").search("yt-uix-button-subscribed-branded") == "-1") {
        document.getElementById("watch7-subscription-container").children[0].children[1].setAttribute("class", document.getElementById("watch7-subscription-container").children[0].children[1].getAttribute("class").replace("yt-uix-button-subscribe-branded", "yt-uix-button-subscribed-branded hover-enabled"));
            videoAction("subscribe", "");
        }
    }

    document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].blur();
        if (loggedin == "1") {
        videoAction("like", "");
        document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getAttribute("class") + " hid");
        document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].getAttribute("class").replace(" hid", ""));
        if (document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].getAttribute("class").search(" hid") == "-1") {
            document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].getAttribute("class") + " hid");
            document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getAttribute("class").replace(" hid", ""));
        }

        } else {

            var clientlikerectleft = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().left - 6).toPrecision(4);

            if (window.scrollY == 0) {

            var clientlikerecttop = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

            var clientlikerecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

            let likeclickcard = (`<div id="yt-uix-clickcard-card44" class="yt-uix-clickcard-card yt-uix-clickcard-card-flip yt-uix-clickcard-card-reverse yt-uix-kbd-nav yt-uix-clickcard-card-visible" style="left: ` + clientlikerectleft + `px; top: ` + clientlikerecttop + `px;" data-kbd-nav-move-out="kbd-nav-188546"><div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-vertical" style="left: 32px;"></div><div class="yt-uix-clickcard-card-border"><div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-vertical" style="left: 32px;"></div><div class="yt-uix-clickcard-card-body"><div class="signin-clickcard yt-uix-clickcard-card-content">
    <h3 class="signin-clickcard-header">Like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3D__FEATURE__%26next%3D%252Fwatch%253Fv%253DiOztnsBPrAA%26hl%3Den%26action_handle_signin%3Dtrue%26app%3Ddesktop&amp;passive=true" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=kKcAWcyXKY6L_AP1q5voBA"><span class="yt-uix-button-content">Sign in</span></a>
  </div></div></div></div>`);

        document.body.insertAdjacentHTML('beforeend', likeclickcard);


        }


    }


    //document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].onmouseenter = function() {

    document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].blur();
        videoAction("removelike", "");
        document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].getAttribute("class") + " hid");
        document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getAttribute("class").replace(" hid", ""));
    }
    document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].blur();
        if (loggedin == "1") {
        videoAction("dislike", "");
        document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getAttribute("class") + " hid");
        document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].getAttribute("class").replace(" hid", ""));

        if (document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].getAttribute("class").search("hid") == "-1") {
            document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[1].children[0].getAttribute("class") + " hid");
            document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getAttribute("class").replace(" hid", ""));
        }

        } else {


        var clientdislikerectleft = (document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().left - 6).toPrecision(6);

            if (window.scrollY == 0) {
        var clientdislikerecttop = (document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

                var clientdislikerecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

    let dislikeclickcard = (`<div id="yt-uix-clickcard-card47" class="yt-uix-clickcard-card yt-uix-clickcard-card-flip yt-uix-clickcard-card-reverse yt-uix-clickcard-card-visible yt-uix-kbd-nav" style="left: ` + clientdislikerectleft + `px; top: ` + clientdislikerecttop + `px;" data-kbd-nav-move-out="kbd-nav-877234"><div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-vertical" style="left: 29px;"></div><div class="yt-uix-clickcard-card-border"><div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-vertical" style="left: 29px;"></div><div class="yt-uix-clickcard-card-body"><div class="signin-clickcard yt-uix-clickcard-card-content">
    <h3 class="signin-clickcard-header">Don't like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3D__FEATURE__%26next%3D%252Fwatch%253Fv%253DiOztnsBPrAA%26hl%3Den%26action_handle_signin%3Dtrue%26app%3Ddesktop&amp;passive=true" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=kKcAWcyXKY6L_AP1q5voBA"><span class="yt-uix-button-content">Sign in</span></a>
  </div></div></div></div> `);

        document.body.insertAdjacentHTML('beforeend', dislikeclickcard);

        }

    }
    document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].blur();
        videoAction("removedislike", "");
        document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[3].children[0].getAttribute("class") + " hid");
        document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].setAttribute("class", document.getElementsByClassName("like-button-renderer")[0].children[2].children[0].getAttribute("class").replace(" hid", ""));
    }
    document.getElementsByClassName("addto-button")[0].onclick = function() {
        document.getElementsByClassName("addto-button")[0].blur();
        if (loggedin == "1") {
        document.querySelector("button#button.yt-icon-button[aria-label='Save to playlist']").click();

        } else {



        var clientaddtorectleft = (document.getElementsByClassName("addto-button")[0].getBoundingClientRect().left - 6).toPrecision(4);

            if (window.scrollY == 0) {
        var clientaddtorecttop = (document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4);

            } else {

                var clientaddtorecttop = (parseFloat((document.getElementsByClassName("like-button-renderer")[0].children[0].children[0].getBoundingClientRect().top + 40).toPrecision(4)) + window.scrollY).toString();

            }

    let addtoclickcard = (`<div id="yt-uix-clickcard-card49" class="yt-uix-clickcard-card yt-uix-clickcard-card-reverse yt-uix-kbd-nav yt-uix-clickcard-card-flip yt-uix-clickcard-card-visible" style="left: ` + clientaddtorectleft + `px; top: ` + clientaddtorecttop + `px;" data-kbd-nav-move-out="kbd-nav-358874"><div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-vertical" style="left: 33px;"></div><div class="yt-uix-clickcard-card-border"><div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-vertical" style="left: 33px;"></div><div class="yt-uix-clickcard-card-body"><div class="signin-clickcard yt-uix-clickcard-card-content">
    <h3 class="signin-clickcard-header">Want to watch this again later?</h3>
    <div class="signin-clickcard-message">
      Sign in to add this video to a playlist.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3D__FEATURE__%26next%3D%252Fwatch%253Fv%253DiOztnsBPrAA%26hl%3Den%26action_handle_signin%3Dtrue%26app%3Ddesktop&amp;passive=true" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=kKcAWcyXKY6L_AP1q5voBA"><span class="yt-uix-button-content">Sign in</span></a>
  </div></div></div></div> `);

            document.body.insertAdjacentHTML('beforeend', addtoclickcard);


        }

    }
    document.getElementsByClassName("action-panel-trigger-share")[0].onclick = function share() {
        if (document.getElementsByClassName("action-panel-trigger-share")[0].getAttribute("class").search("yt-uix-menu-trigger-selected yt-uix-button-toggled") == "-1") {
        document.getElementsByClassName("action-panel-trigger-share")[0].blur();
        document.getElementsByClassName("action-panel-trigger-share")[0].setAttribute("class", document.getElementsByClassName("action-panel-trigger-share")[0].getAttribute("class") + " yt-uix-menu-trigger-selected yt-uix-button-toggled")
        let shareBox = [ `<div id="watch-action-panels" class="watch-action-panels yt-uix-button-panel yt-card yt-card-has-padding">
      <div id="action-panel-share" class="action-panel-content" data-panel-loaded="true">
      <div id="watch-actions-share-loading">
    <div class="share-panel">
    <div class="yt-uix-tabs"> <span class="yt-uix-button-group" data-button-toggle-group="share-panels"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-services yt-uix-button-toggled yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Share</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-embed yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Embed</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-email yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Email</span></button> </span>
    </div>
    <div class="share-panel-show-loading hid">
        <p class="yt-spinner "> <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span> <span class="yt-spinner-message">Loading...    </span> </p>
    </div>
    <div class="share-panel-services-container">
        <div id="share-services-container" class="clearfix">
            <div class="share-panel-services ">
                <ul class="share-group ytg-box">
                    <li> <button title="Share to Facebook. Opens in a new window." data-toolttip-text="Share to Facebook. Opens in a new window." onclick="yt.window.popup(" http:="" www.facebook.com="" dialog="" share?app_id="87741124305\\&amp;href=https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;display=popup\\&amp;redirect_uri=https://www.youtube.com/facebook_redirect" ",="" {\&#39;height\&#39;:="" 560,\&#39;width\&#39;:="" 530,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=FACEBOOK\\&amp;share_source=watch\\&amp;id=10\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="FACEBOOK" class="yt-uix-tooltip share-service-button share-facebook-icon" data-tooltip-text="Share to Facebook. Opens in a new window." aria-labelledby="yt-uix-tooltip58-arialabel">      <span class="share-service-icon share-service-icon-facebook yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Twitter. Opens in a new window." data-toolttip-text="Share to Twitter. Opens in a new window." onclick="yt.window.popup(" http:="" twitter.com="" intent="" tweet?url="https%3A//youtu.be/nchHcCWWtkk\\&amp;text=Olympic%20athletes%20return%20to%20Canada\\&amp;via=YouTube\\&amp;related=YouTube,YouTubeTrends,YTCreators" ",="" {\&#39;height\&#39;:="" 420,\&#39;width\&#39;:="" 550,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=TWITTER\\&amp;share_source=watch\\&amp;id=31\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="TWITTER" class="yt-uix-tooltip share-service-button share-twitter-icon" data-tooltip-text="Share to Twitter. Opens in a new window." aria-labelledby="yt-uix-tooltip57-arialabel">      <span class="share-service-icon share-service-icon-twitter yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Google+. Opens in a new window." data-toolttip-text="Share to Google+. Opens in a new window." onclick="yt.window.popup(" https:="" plus.google.com="" share?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;source=yt\\&amp;hl=en\\&amp;soc-platform=1\\&amp;soc-app=130" ",="" {\&#39;height\&#39;:="" 620,\&#39;width\&#39;:="" 400,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=GOOGLEPLUS\\&amp;share_source=watch\\&amp;id=43\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="GOOGLEPLUS" class="yt-uix-tooltip share-service-button share-googleplus-icon" data-tooltip-text="Share to Google+. Opens in a new window." aria-labelledby="yt-uix-tooltip56-arialabel">      <span class="share-service-icon share-service-icon-googleplus yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Blogger. Opens in a new window." data-toolttip-text="Share to Blogger. Opens in a new window." onclick="yt.window.popup(" http:="" www.blogger.com="" blog-this.g?n="Olympic%20athletes%20return%20to%20Canada\\&amp;source=youtube\\&amp;b=%3Ciframe%20width%3D%22480%22%20height%3D%22270%22%20src%3D%22https%3A//www.youtube.com/embed/nchHcCWWtkk%22%20frameborder%3D%220%22%20allowfullscreen%3E%3C/iframe%3E\\&amp;eurl=https%3A//i.ytimg.com/vi/nchHcCWWtkk/hqdefault.jpg" ",="" {\&#39;height\&#39;:="" 468,\&#39;width\&#39;:="" 768,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=BLOGGER\\&amp;share_source=watch\\&amp;id=34\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="BLOGGER" class="yt-uix-tooltip share-service-button share-blogger-icon" data-tooltip-text="Share to Blogger. Opens in a new window." aria-labelledby="yt-uix-tooltip55-arialabel">      <span class="share-service-icon share-service-icon-blogger yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to reddit. Opens in a new window." data-toolttip-text="Share to reddit. Opens in a new window." onclick="yt.window.popup(" http:="" reddit.com="" submit?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;title=Olympic%20athletes%20return%20to%20Canada" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=REDDIT\\&amp;share_source=watch\\&amp;id=4\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="REDDIT" class="yt-uix-tooltip share-service-button share-reddit-icon" data-tooltip-text="Share to reddit. Opens in a new window." aria-labelledby="yt-uix-tooltip54-arialabel">      <span class="share-service-icon share-service-icon-reddit yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Tumblr. Opens in a new window." data-toolttip-text="Share to Tumblr. Opens in a new window." onclick="yt.window.popup(" http:="" www.tumblr.com="" share="" video?embed="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;caption=Olympic%20athletes%20return%20to%20Canada" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=TUMBLR\\&amp;share_source=watch\\&amp;id=40\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="TUMBLR" class="yt-uix-tooltip share-service-button share-tumblr-icon" data-tooltip-text="Share to Tumblr. Opens in a new window." aria-labelledby="yt-uix-tooltip53-arialabel">      <span class="share-service-icon share-service-icon-tumblr yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Pinterest. Opens in a new window." data-toolttip-text="Share to Pinterest. Opens in a new window." onclick="yt.window.popup(" http:="" pinterest.com="" pin="" create="" button="" ?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;description=Olympic%20athletes%20return%20to%20Canada\\&amp;is_video=true\\&amp;media=https%3A//i.ytimg.com/vi/nchHcCWWtkk/hqdefault.jpg" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=PINTEREST\\&amp;share_source=watch\\&amp;id=45\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="PINTEREST" class="yt-uix-tooltip share-service-button share-pinterest-icon" data-tooltip-text="Share to Pinterest. Opens in a new window." aria-labelledby="yt-uix-tooltip52-arialabel">      <span class="share-service-icon share-service-icon-pinterest yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to ВКонтакте. Opens in a new window." data-toolttip-text="Share to ВКонтакте. Opens in a new window." onclick="yt.window.popup(" http:="" vkontakte.ru="" share.php?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=VKONTAKTE\\&amp;share_source=watch\\&amp;id=36\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="VKONTAKTE" class="yt-uix-tooltip share-service-button share-vkontakte-icon" data-tooltip-text="Share to ВКонтакте. Opens in a new window." aria-labelledby="yt-uix-tooltip51-arialabel">      <span class="share-service-icon share-service-icon-vkontakte yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to LinkedIn. Opens in a new window." data-toolttip-text="Share to LinkedIn. Opens in a new window." onclick="yt.window.popup(" http:="" www.linkedin.com="" sharearticle?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;title=Olympic%20athletes%20return%20to%20Canada\\&amp;summary=Canada%27s%20Olympians%20were%20met%20by%20media%20and%20fans%20when%20they%20stepped%20into%20the%20arrivals%20hall%20at%20Toronto%27s%20Pearson%20airport%2C%20after%20a%20long%20flight%20from%20Rio.%20%0AClick%20here%20for%20the%20full%20story%3A%20http%3A//www.cbc.ca/news/canada/olympic-team-arrives-1.3731883%0A%C2%BB%C2%BB%C2%BB%20Subscribe%20to%20The%20National%20to%20watch%20more%20videos%20here%3A%20%20%20https%3A//www.youtube.com/user/CBCTheNational%3Fsub_...\\&amp;source=Youtube" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=LINKEDIN\\&amp;share_source=watch\\&amp;id=42\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="LINKEDIN" class="yt-uix-tooltip share-service-button share-linkedin-icon" data-tooltip-text="Share to LinkedIn. Opens in a new window." aria-labelledby="yt-uix-tooltip47-arialabel">      <span class="share-service-icon share-service-icon-linkedin yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to StumbleUpon . Opens in a new window." data-toolttip-text="Share to StumbleUpon. Opens in a new window." onclick="yt.window.popup(" http:="" www.stumbleupon.com="" submit?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;title=Olympic%20athletes%20return%20to%20Canada" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=STUMBLEUPON\\&amp;share_source=watch\\&amp;id=5\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="STUMBLEUPON" class="yt-uix-tooltip share-service-button share-stumbleupon-icon" data-tooltip-text="Share to StumbleUpon. Opens in a new window." aria-labelledby="yt-uix-tooltip46-arialabel">      <span class="share-service-icon share-service-icon-stumbleupon yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Одноклассники. Opens in a new window." data-toolttip-text="Share to Одноклассники. Opens in a new window." onclick="yt.window.popup(" http:="" www.odnoklassniki.ru="" dk?st.cmd="addShare\\&amp;st.noresize=on\\&amp;st._surl=https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=ODNOKLASSNIKI\\&amp;share_source=watch\\&amp;id=39\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="ODNOKLASSNIKI" class="yt-uix-tooltip share-service-button share-odnoklassniki-icon" data-tooltip-text="Share to Одноклассники. Opens in a new window." aria-labelledby="yt-uix-tooltip50-arialabel">      <span class="share-service-icon share-service-icon-odnoklassniki yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to LiveJournal. Opens in a new window." data-toolttip-text="Share to LiveJournal. Opens in a new window." onclick="yt.window.popup(" http:="" www.livejournal.com="" update.bml?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;subject=Olympic%20athletes%20return%20to%20Canada" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=LIVEJOURNAL\\&amp;share_source=watch\\&amp;id=38\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="LIVEJOURNAL" class="yt-uix-tooltip share-service-button share-livejournal-icon" data-tooltip-text="Share to LiveJournal. Opens in a new window." aria-labelledby="yt-uix-tooltip49-arialabel">      <span class="share-service-icon share-service-icon-livejournal yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                    <li> <button title="Share to Digg. Opens in a new window." data-toolttip-text="Share to Digg. Opens in a new window." onclick="yt.window.popup(" http:="" digg.com="" submit?url="https%3A//www.youtube.com/watch%3Fv%3DnchHcCWWtkk%26feature%3Dshare" ",="" {\&#39;height\&#39;:="" 650,\&#39;width\&#39;:="" 1024,\&#39;scrollbars\&#39;:="" true});yt.net.ping.send("="" sharing_services?relative_url="%2Fwatch%3Fv%3DnchHcCWWtkk%26feature%3Dshare\\&amp;v=nchHcCWWtkk\\&amp;name=DIGG\\&amp;share_source=watch\\&amp;id=1\\&amp;feature=share\\&amp;vertical=1" ");return="" false;"="" data-service-name="DIGG" class="yt-uix-tooltip share-service-button share-digg-icon" data-tooltip-text="Share to Digg. Opens in a new window." aria-labelledby="yt-uix-tooltip48-arialabel">      <span class="share-service-icon share-service-icon-digg yt-sprite"></span>      <span class="share-service-checkmark yt-sprite"></span>    </button> </li>
                </ul>
            </div>
        </div>
        <div class="share-panel-url-container share-panel-reverse"> <span class="share-panel-url-input-container yt-uix-form-input-container yt-uix-form-input-text-container  yt-uix-form-input-non-empty"><input class="yt-uix-form-input-text share-panel-url" name="share_url" value="https://youtu.be/videoidplaceholder" data-video-id="videoidplaceholder" title="Share link"></span> <span class="share-panel-start-at-container ">        <label>          <span class="yt-uix-form-input-checkbox-container">            <input class="share-panel-start-at" type="checkbox">            <span class="yt-uix-form-input-checkbox-element"></span> </span>Start at: </label> <input type="text" value="timestampplaceholder" title="Video start time" class="yt-uix-form-input-text share-panel-start-at-time"> </span>
        </div>
    </div>
    <div class="share-panel-embed-container hid">
        <div class="action-panel-loading">Loading... </div>
    </div>
    <div class="share-panel-email-container hid" data-disabled="true"> <strong><a href="https://accounts.google.com\/ServiceLogin?uilel=3\&amp;hl=en\&amp;passive=true\&amp;service=youtube\&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3Demail%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DnchHcCWWtkk%2526feature%253Dshare_email%26action_handle_signin%3Dtrue%26app%3Ddesktop">Sign in</a> now!</strong> </div>
</div>
  </div>
  <div id="watch-actions-share-panel"></div>

  </div>

        <div id="action-panel-transcript" class="action-panel-content hid">
    <div id="watch-actions-transcript-loading">
      <div class="action-panel-loading">
          <p class="yt-spinner ">
        <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

      </div>
    </div>
      <div id="watch-actions-transcript" class="hid">
    <h2 class="yt-card-title">
Transcript
    </h2>
      <div id="caption-line-template" class="hid">
    <!--
    <div class="caption-line-time">
      <div class="caption-line-start">__start__</div>
    </div>
    <div class="editable-line-text">
      <span class="editable-line-text-original">__original__</span>
      <label class="editable-line-text-current hid">__current__</label>
      <textarea class="editable-line-text-input hid">__input__</textarea>
    </div>
    -->
  </div>



    <div id="watch-transcript-container" class="yt-scrollbar">
      <div id="watch-transcript-not-found" class="hid">
The interactive transcript could not be loaded.
      </div>


    </div>
  </div>

  </div>

      <div id="action-panel-stats" class="action-panel-content hid">
    <div class="action-panel-loading">
        <p class="yt-spinner ">
        <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

    </div>
  </div>

      <div id="action-panel-report" class="action-panel-content hid" data-auth-required="true">
    <div class="action-panel-loading">
        <p class="yt-spinner ">
        <span title="Loading icon" class="yt-spinner-img  yt-sprite"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

    </div>
  </div>


  <div id="action-panel-rental-required" class="action-panel-content hid">
      <div id="watch-actions-rental-required">
    <strong>Rating is available when the video has been rented.</strong>
  </div>

  </div>

  <div id="action-panel-error" class="action-panel-content hid">
    <div class="action-panel-error">
      This feature is not available right now. Please try again later.
    </div>
  </div>

    <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-button-opacity yt-uix-close" type="button" onclick=";return false;" aria-label="Close" id="action-panel-dismiss" data-close-parent-id="watch8-action-panels"></button>
  </div>` ];
        var descriptionelement = document.getElementById("action-panel-details");
        descriptionelement.insertAdjacentHTML('beforebegin', shareBox);
            var locationhref = location.href;
            document.getElementsByClassName("share-panel-services-container")[0].innerHTML = document.getElementsByClassName("share-panel-services-container")[0].innerHTML.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                                if (document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.indexOf("&") == "28") {
                                                var tostring = document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.toString();
                        var videoid = location.href.replace("https://www.youtube.com/watch?v=", "");
                        var videoidsplit = videoid.split("&");
                        var final = videoidsplit[0];
                        var array = tostring.replace(final + "&", final + "?");
                        document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value = array;
                    }

            document.getElementsByClassName("share-group ytg-box")[0].children[0].children[0].onclick = function() {
                var facebookshare = "http://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&display=popup&redirect_uri=https://www.youtube.com/facebook_redirect";
                var facebooksharefix = facebookshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var facebookpopup = window.open(facebooksharefix, "_blank");
                facebookpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[1].children[0].onclick = function() {
                var twittershare = "http://twitter.com/intent/tweet?url=https%3A//youtu.be/videoidplaceholder&text=titleplaceholder&via=YouTube&related=YouTube,YouTubeTrends,YTCreators";
                var twittersharefix = twittershare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var twittersharefixtwo = twittersharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var twittersharepopup = window.open(twittersharefixtwo, "_blank");
                twittersharepopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[2].children[0].onclick = function() {
                var googleplusshare = "https://plus.google.com/share?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&source=yt&hl=en&soc-platform=1&soc-app=130";
                var googleplussharefix = googleplusshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var googlepluspopup = window.open(googleplussharefix, "_blank");
                googlepluspopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[3].children[0].onclick = function() {
                var bloggershare = "http://www.blogger.com/blog-this.g?n=titleplaceholder&source=youtube&b=%3Ciframe%20width%3D%22480%22%20height%3D%22270%22%20src%3D%22https%3A//www.youtube.com/embed/videoidplaceholder%22%20frameborder%3D%220%22%20allowfullscreen%3E%3C/iframe%3E&eurl=https%3A//i.ytimg.com/vi/videothumbnailidplaceholder/hqdefault.jpg";
                var bloggersharefix = bloggershare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var bloggersharefixtwo = bloggersharefix.replace("videothumbnailidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var bloggersharefixthree = bloggersharefixtwo.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var bloggerpopup = window.open(bloggersharefixthree, "_blank");
                bloggerpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[4].children[0].onclick = function() {
                var redditshare = "http://reddit.com/submit?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&title=titleplaceholder";
                var redditsharefix = redditshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var redditsharefixtwo = redditsharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var redditpopup = window.open(redditsharefixtwo, "_blank");
                redditpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[5].children[0].onclick = function() {
                var tumblrshare = "http://www.tumblr.com/share/video?embed=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&caption=titleplaceholder";
                var tumblrsharefix = tumblrshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var tumblrsharefixtwo = tumblrsharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var tumblrpopup = window.open(tumblrsharefixtwo, "_blank");
                tumblrpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[6].children[0].onclick = function() {
                var pinterestshare = "http://pinterest.com/pin/create/button/?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&description=titleplaceholder&is_video=true&media=https%3A//i.ytimg.com/vi/videothumbnailidplaceholder/hqdefault.jpg";
                var pinterestsharefix = pinterestshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var pinterestsharefixtwo = pinterestsharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var pinterestsharefixthree = pinterestsharefixtwo.replace("videothumbnailidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var pinterestpopup = window.open(pinterestsharefixthree, "_blank");
                pinterestpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[7].children[0].onclick = function() {
                var vkontakteshare = "http://vkontakte.ru/share.php?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare";
                var vkontaktesharefix = vkontakteshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var vkontaktesharepopup = window.open(vkontakteshare, "_blank");
                vkontaktesharepopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[8].children[0].onclick = function() {
                var linkedinshare = "http://www.linkedin.com/shareArticle?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&title=titleplaceholder&summary=descriptionplaceholder&source=Youtube";
                var linkedinsharefix = linkedinshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var linkedinsharefixtwo = linkedinsharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var linkedinsharefixthree = linkedinsharefixtwo.replace("descriptionplaceholder", document.getElementById("eow-description").innerText);
                var linkedinpopup = window.open(linkedinsharefixthree, "_blank");
                linkedinpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[9].children[0].onclick = function() {
                var stumbleupon = "http://www.stumbleupon.com/submit?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&title=titleplaceholder";
                var stumbleuponfix = stumbleupon.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var stumbleuponfixtwo = stumbleuponfix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var stumbleuponpopup = window.open(stumbleuponfixtwo, "_blank");
                stumbleuponpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[10].children[0].onclick = function() {
                var russianplatformthatnooneevenknowsorcaresabout = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.noresize=on&st._surl=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare";
                var russianplatformthatnooneevenknowsorcaresaboutfix = russianplatformthatnooneevenknowsorcaresabout.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var russianplatformthatnooneevenknowsorcaresaboutpopup = window.open(russianplatformthatnooneevenknowsorcaresaboutfix, "_blank");
                russianplatformthatnooneevenknowsorcaresaboutpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[11].children[0].onclick = function() {
                var livejournalshare = "http://www.livejournal.com/update.bml?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare&subject=titleplaceholder";
                var livejournalsharefix = livejournalshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var livejournalsharefixtwo = livejournalsharefix.replace("titleplaceholder", document.getElementById("eow-title").innerText);
                var livejournalpopup = window.open(livejournalsharefixtwo, "_blank");
                livejournalpopup.focus();
            }
            document.getElementsByClassName("share-group ytg-box")[0].children[12].children[0].onclick = function() {
                var diggshare = "http://digg.com/submit?url=https%3A//www.youtube.com/watch%3Fv%3Dvideoidplaceholder%26feature%3Dshare";
                var diggsharefix = diggshare.replace("videoidplaceholder", locationhref.replace("https://www.youtube.com/watch?v=", ""));
                var diggsharepopup = window.open(diggsharefix, "_blank");
                diggsharepopup.focus();
            }
            document.getElementsByClassName("yt-uix-form-input-text share-panel-start-at-time")[0].value = document.getElementsByClassName("ytp-time-current")[0].innerHTML;
            document.getElementsByClassName("share-panel-start-at")[0].value = "off";

            document.getElementsByClassName("share-panel-start-at")[0].onclick = function() {
                if (document.getElementsByClassName("share-panel-start-at")[0].value == "on") {
                    document.getElementsByClassName("share-panel-start-at")[0].value = "off";
                    removePlayerParameter();
                } else if (document.getElementsByClassName("share-panel-start-at")[0].value == "off") {
                    document.getElementsByClassName("share-panel-start-at")[0].value = "on";
                    getCurrentPlayerProgressInSeconds();
                }
            }

            function getCurrentPlayerProgressInSeconds()
            //thanks Valmoiiaa :)
            {

              //var progress = document.querySelector(".ytp-time-current").innerHTML.split(":"); // current progress
                var progressstring = document.getElementsByClassName("yt-uix-form-input-text share-panel-start-at-time")[0].value.toString();
                var progress = progressstring.split(":");
                const sec = ( (progress[0] * 60) + (progress[1] * 1) );

                //return sec;

              var string = document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.toString();
                if (document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.indexOf("&") == "-1") {
                var stringwithinjectedplayerprogress = string + "?t=" + sec + "s";
                document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value = stringwithinjectedplayerprogress;
            } else {
                                var stringwithinjectedplayerprogress = string + "&t=" + sec + "s";
                document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value = stringwithinjectedplayerprogress;
            }
            }

            function removePlayerParameter() {
                                var progressstring = document.getElementsByClassName("yt-uix-form-input-text share-panel-start-at-time")[0].value.toString();
                var progress = progressstring.split(":");
                const sec = ( (progress[0] * 60) + (progress[1] * 1) );
                if (document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.indexOf("&") == "-1") {
                var stringone = document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.toString();
                //String one and string two, string two and string one, they can do anything anything anything under the Sun! (anyone get the reference?)
                var stringtwo = stringone.replace("?t=" + sec + "s", "");

                document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value = stringtwo;
            } else {
                var stringone = document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value.toString();
                var stringtwo = stringone.replace("&t=" + sec + "s", "");

                document.getElementsByClassName("yt-uix-form-input-text share-panel-url")[0].value = stringtwo;
            }
            }

            document.getElementById("action-panel-dismiss").onclick = function() {
                document.getElementById("action-panel-dismiss").blur();
                document.getElementsByClassName("action-panel-trigger-share")[0].setAttribute("class", document.getElementsByClassName("action-panel-trigger-share")[0].getAttribute("class").replace(" yt-uix-menu-trigger-selected yt-uix-button-toggled"))
                document.getElementById("watch-action-panels").remove();
            }

            document.getElementById("watch-actions-share-loading").children[0].children[0].children[0].children[1].onclick = function() {
                if (document.getElementById("watch-actions-share-loading").children[0].children[0].children[0].children[1].getAttribute("class").search("yt-uix-button-toggled") == "-1") {
                    document.getElementById("watch-actions-share-loading").children[0].children[0].children[0].children[1].blur();
                    document.getElementById("watch-action-panels").remove();
                    let shareBoxEmbed = [ `<div id="watch-action-panels" class="watch-action-panels yt-uix-button-panel yt-card yt-card-has-padding">
      <div id="action-panel-share" class="action-panel-content" data-panel-loaded="true">
      <div id="watch-actions-share-loading">
    <div class="share-panel">
    <div class="yt-uix-tabs"> <span class="yt-uix-button-group" data-button-toggle-group="share-panels"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-services yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Share</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-embed  yt-uix-button-toggled yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Embed</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-email yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Email</span></button> </span>
    </div>
    <div class="share-panel-show-loading hid">
        <p class="yt-spinner "> <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span> <span class="yt-spinner-message">Loading...    </span> </p>
    </div>
<div class="yt-uix-expander" tabindex="0"> <span class=" yt-uix-form-input-container yt-uix-form-input-text-container "><input class="yt-uix-form-input-text share-embed-code" title="Embed code" dir="ltr"></span>
    <div class="yt-uix-expander-body">
        <div id="share-preview" class="share-embed-options"> <span>Preview:</span>
            <div id="video-preview"><iframe src="https://www.youtube.com/embed/videoidplaceholder" allowfullscreen="" width="560" height="315" frameborder="0"></iframe></div>
        </div>
        <div class="share-embed-options"> <label for="embed-layout-options">Video size:</label> <span class="yt-uix-form-input-select "><span class="yt-uix-form-input-select-content"><span class="yt-uix-form-input-select-arrow yt-sprite"></span><span class="yt-uix-form-input-select-value">560 × 315</span></span><select class="yt-uix-form-input-select-element " name="embed-options-dropdown" id="embed-layout-options">    <option value="default" data-width="560" data-height="315">560 × 315</option>    <option value="hd720" data-width="1280" data-height="720">1280 × 720</option>    <option value="large" data-width="853" data-height="480">853 × 480</option>    <option value="medium" data-width="640" data-height="360">640 × 360</option>  <option value="custom">Custom size</option></select></span> <span id="share-embed-customize" class="hid">            <input type="text" class="yt-uix-form-input-text share-embed-size-custom-width" maxlength="4">            ×            <input type="text" class="yt-uix-form-input-text share-embed-size-custom-height" maxlength="4">          </span> </div>
        <ul class="share-embed-options">
            <li> <label>              <input type="checkbox" class="share-embed-option" name="show-related" checked="">Show suggested videos when the video finishes            </label> </li>
            <li> <label>            <input type="checkbox" class="share-embed-option" name="show-controls" checked="">Show player controls          </label> </li>
            <li> <label>            <input type="checkbox" class="share-embed-option" name="show-info" checked="">Show video title and player actions          </label> </li>
            <li> <label>            <input type="checkbox" class="share-embed-option" name="delayed-cookies">Enable privacy-enhanced mode            [<a href="http://www.google.com/support/youtube/bin/answer.py?answer=171780&amp;expand=PrivacyEnhancedMode#privacy" target="_blank">?</a>]          </label> </li>
            <li>
                <p class="share-panel-embed-legal">By displaying YouTube videos on your site, you are agreeing to the <a href="https://developers.google.com/youtube/terms">YouTube API terms of service.</a></p>
            </li>
        </ul>
    </div> <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-collapsed-body yt-uix-gen204" type="button" onclick=";return false;"><span class="yt-uix-button-content">Show more</span></button> <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-body" type="button" onclick=";return false;"><span class="yt-uix-button-content">Show less</span></button> </div>
</div></div></div></div>`];
                    var videoid = locationhref.replace("https://www.youtube.com/watch?v=", "");
                    descriptionelement.insertAdjacentHTML('beforebegin', shareBoxEmbed);

                    function injectFocusListener() {

                        var waitfordropdownclick = setInterval(function() {

                            if (document.getElementsByClassName("yt-uix-form-input-select")[0] != undefined && document.getElementsByClassName("yt-uix-form-input-select")[0].getAttribute("class").search("focused") != "-1") {

                                clearInterval(waitfordropdownclick);

                                injectActualListeners();

                            }

                        }, 10);

                        function injectActualListeners() {

                        function toggleFocusClass(e) {

                            if (e.target.classList[0] !== 'yt-uix-form-input-select' && document.getElementsByClassName("yt-uix-form-input-select")[0].getAttribute("class").search("focused") != "-1") {

                                var occurences = (document.getElementsByClassName("yt-uix-form-input-select")[0].getAttribute("class").match(/focused/g) || []).length;

                                for (var i = 0; i <= occurences; i++) {

                                    document.getElementsByClassName("yt-uix-form-input-select")[0].setAttribute("class", document.getElementsByClassName("yt-uix-form-input-select")[0].getAttribute("class").replace("focused", ""));

                                }

                            }

                        }

                        window.addEventListener("click", toggleFocusClass, false);
                        window.addEventListener("contextmenu", toggleFocusClass, false);

                            var waitforfocusremove = setInterval(function() {

                                if (document.getElementsByClassName("yt-uix-form-input-select")[0].getAttribute("class").search("focused") == "-1") {

                                    clearInterval(waitforfocusremove);

                                    window.removeEventListener("click", toggleFocusClass, false);
                                    window.removeEventListener("contextmenu", toggleFocusClass, false);

                                }

                            }, 10);

                        }

                    }

                    var focuslistener = setInterval(injectFocusListener, 10);

                    var initialinputembedcodevalue = (`<iframe src="https://www.youtube.com/embed/` + videoId + `" allowfullscreen="" width="560" height="315" frameborder="0"></iframe>`);

                    document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("videoidplaceholder", location.href.replace("https://www.youtube.com/watch?v=", "")));
                    document.getElementsByClassName('yt-uix-form-input-text share-embed-code')[0].value = initialinputembedcodevalue;

                    document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0].value = "off";
                    document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0].value = "on";
                    document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0].value = "on";
                    document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0].value = "on";

                    function changeIframe(width, height) {

                    var iframe = document.getElementsByTagName("iframe")[0];

                    iframe.setAttribute("data-width", width);
                    iframe.setAttribute("data-height", height);

}

                    var widthvalue = "560";
                    var heightvalue = "315";
                    var querystringparameters = "";
                    var nocookieboolean = false;
                    var finalvalue = "";

                    function buildFinalValue() {

                        finalvalue = (`<iframe src="https://` + (nocookieboolean ? `www.youtube-nocookie.com` : `www.youtube.com`) + `/embed/` + videoId + querystringparameters + `" allowfullscreen="" width="` + widthvalue + `" height="` + heightvalue + `" frameborder="0"></iframe>`).replace(videoId + "&list", videoId + "?list");

                        document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = finalvalue;

                        document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].select();

                    }

                    var fixquerystringparameters = setInterval(function() {

                        if (querystringparameters.startsWith("&")) {

                            querystringparameters = querystringparameters.replace("&", "?");

                        }

                    }, 10);

                    function updateWidthHeightVars() {
                        if (document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value != "") {

                            if (document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("width=")[1] != undefined) {

                                    var firstoccurence = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("width=")[1].indexOf('"') + 1;

                                    var numberfirst = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("width=")[1].slice(firstoccurence);

                                    var secondoccurence = numberfirst.indexOf('"');

                                    var numberbyitself = numberfirst.slice(0, secondoccurence);

                                if (numberbyitself != "") {

                                    widthvalue = numberbyitself;

                                }

                            }

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("height=")[1] != undefined) {


                                    var firstoccurence2 = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("height=")[1].indexOf('"') + 1;

                                    var numberfirst2 = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.split("height=")[1].slice(firstoccurence2);

                                    var secondoccurence2 = numberfirst2.indexOf('"');

                                    var numberbyitself2 = numberfirst2.slice(0, secondoccurence2);

                                    if (numberbyitself2 != "") {

                                        heightvalue = numberbyitself2;

                                    }

                                }

                            }

                    }









                                                function InjectNoCookieDomain() {


                                                    nocookieboolean = true;
                                                    buildFinalValue();
                                                    updateWidthHeightVars();

                                                    document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("youtube.com/embed/", "youtube-nocookie.com/embed/"));
                                                }

                                                function InjectRegularDomain() {

                                                    nocookieboolean = false;
                                                    buildFinalValue();
                                                    updateWidthHeightVars();
                                                    document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("youtube-nocookie.com/embed/", "youtube.com/embed/"));
                                                }

                    function InjectQueryParameter(parameter) {
                        if (querystringparameters.indexOf("?") == "-1") {
                            var queryparameterfinish = "?" + parameter;
                            querystringparameters += queryparameterfinish;
                            buildFinalValue();
                            updateWidthHeightVars();
                            document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src") + "?" + parameter);
                        } else if (querystringparameters.indexOf("?") != "-1") {
                            var queryparameterfinish = "&" + parameter;
                            querystringparameters += queryparameterfinish;
                            buildFinalValue();
                            updateWidthHeightVars();
                            document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src") + "&" + parameter);
                        }
                    }
//(document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.search(videoid + "&") != "-1")
                    function removeQueryParameter(parameter) {
                        if (querystringparameters.indexOf("&") == "-1") {
                            var queryparameterfinish = "?" + parameter;
                            querystringparameters = querystringparameters.replace(queryparameterfinish, "");
                            buildFinalValue();
                            updateWidthHeightVars();
                            document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("?" + parameter, ""));
                        } else if (querystringparameters.indexOf("&") != "-1") {
                            if (querystringparameters.search("&" + parameter) != "-1") {
                                var queryparameterfinish = "&" + parameter;
                                querystringparameters = querystringparameters.replace(queryparameterfinish, "");
                                buildFinalValue();
                                updateWidthHeightVars();
                            document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("&" + parameter, ""));
                            } else {
                                //var videoid = location.href.replace("https://www.youtube.com/watch?v=", "");
                                                            //var shareembedinputclass = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.toString();
                            //var replacequestionmarkone = shareembedinputclass.replace("?", "");
                                //var replacequestionmarktwo = replacequestionmarkone.replace(parameter, "");
                                querystringparameters = querystringparameters.replace("?" + parameter + "&", "?");
                                //fixParameters();
                                buildFinalValue();
                                updateWidthHeightVars();
                                //document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = replacequestionmarktwo;
                                    //document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("?" + parameter, ""));
                                //fixParameters();
                        }
                    }
                    }


                    function fixParameters() {
                        //var videoid = location.href.replace("https://www.youtube.com/watch?v=", "");
                            //var parameterfixed = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.replace(videoid + "&", videoid + '?');
                                //document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = parameterfixed;
                        querystringparameters = querystringparameters.replace("&", "?");
                                    document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace(videoid + "&", videoid + "?"));
                                document.getElementsByTagName("iframe")[0].setAttribute("src", document.getElementsByTagName("iframe")[0].getAttribute("src").replace("?" + parameter, ""));
                    }

                    function changeWidthHeightValue(initialwidth, initialheight, newwidth, newheight) {
                        var sharecode = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.toString();
                        var sharecodeone = sharecode.replace(initialwidth, newwidth);
                        var sharecodetwo = sharecodeone.replace(initialheight, newheight);
                        document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = sharecodetwo;
                    }

                    document.getElementsByClassName("share-panel")[0].children[2].children[2].onclick = function() {
                                               document.getElementsByClassName("share-panel")[0].children[2].setAttribute("class", "yt-uix-expander");
                    }

                    document.getElementsByClassName("share-panel")[0].children[2].children[3].onclick = function() {
                                                document.getElementsByClassName("share-panel")[0].children[2].setAttribute("class", "yt-uix-expander yt-uix-expander-collapsed");
                    }

                    function findListParameter() {

                        for (var i = 0; i < window.location.search.split("&").length; i++) {

                            if (window.location.search.split("&")[i].startsWith("list=")) {

                                return i;

                            }

                        }

                    }

                    if (findListParameter() != undefined) {
                        let playlistoption = (`<div class="share-panel-playlist-options">
  <span class="yt-uix-form-input-checkbox-container  checked">
    <input type="checkbox" class="yt-uix-form-input-checkbox" name="embed-with-playlist" checked="checked" id="embed-with-playlist" value="1">
    <span class="yt-uix-form-input-checkbox-element">
    </span>
  </span>
  <label for=embed-with-playlist>Share with playlist starting from
  </label>
  <button type="button" aria-expanded="false" class=" yt-uix-button yt-uix-button-default yt-uix-button-size-default" onclick=";return false;" aria-haspopup="true" data-button-menu-indicate-selected="true">
    <span class="yt-uix-button-content">current video
    </span>
    <span class="yt-uix-button-arrow yt-sprite">
    </span>
    <ul class=" yt-uix-button-menu yt-uix-button-menu-default hid" role="menu" aria-haspopup="true">
      <li role="menuitem">
        <span id="embed-with-playlist-current" class=" yt-uix-button-menu-item" onclick=";return false;" >current video
        </span>
      </li>
      <li role="menuitem">
        <span id="embed-with-playlist-first" class=" yt-uix-button-menu-item" onclick=";return false;" >start of playlist
        </span>
      </li>
    </ul>
  </button>
</div>`);
                        document.getElementsByClassName("share-panel")[0].children[2].insertAdjacentHTML('afterbegin', playlistoption);
                        addListSupport();
                    }

                    function addListSupport() {

                        var current = true;
                        var first = false;

                        function injectPlaylistMenuListener() {

                            var checkformenu = setInterval(function() {

                                if (document.getElementById("div-aria-menu-id-90")) {

                                    clearInterval(checkformenu);

                                    actualListener();
                                    trackMenuClicks();

                                }

                            }, 10);

                            function trackMenuClicks() {


                                function getClick(e) {

                                    if (e.target.id === 'embed-with-playlist-current') {

                                        document.querySelector("div.share-panel-playlist-options").querySelector("button").querySelector(".yt-uix-button-content").innerHTML = "current video";
                                        current = true;
                                        first = false;

                                    } else if (e.target.id === 'embed-with-playlist-first') {

                                        document.querySelector("div.share-panel-playlist-options").querySelector("button").querySelector(".yt-uix-button-content").innerHTML = "start of playlist";
                                        current = false;
                                        first = true;

                                    }

                                }

                                window.addEventListener("click", getClick, false);
                                window.addEventListener("contextmenu", getClick, false);

                                var waitformenuclose = setInterval(function() {
                                    if (document.getElementById("div-aria-menu-id-90") == null) {

                                        clearInterval(waitformenuclose);

                                window.removeEventListener("click", getClick, false);
                                window.removeEventListener("contextmenu", getClick, false);
                                    }

                                }, 10);

                            }

                            function actualListener() {

                                function toggleMenu(e) {

                                    if (e.target.id !== 'div-aria-menu-id-90' && document.getElementById("div-aria-menu-id-90")) {

                                        document.getElementById("div-aria-menu-id-90").remove();

                                        document.querySelector("div.share-panel-playlist-options").querySelector("button").setAttribute("class", document.querySelector("div.share-panel-playlist-options").querySelector("button").getAttribute("class").replace(" yt-uix-button-active", ""));

                                    }

                                }

                                window.addEventListener("click", toggleMenu, false);
                                window.addEventListener("contextmenu", toggleMenu, false);


                                var waitformenuclose = setInterval(function() {
                                    if (document.getElementById("div-aria-menu-id-90") == null) {

                                        clearInterval(waitformenuclose);

                                window.removeEventListener("click", toggleMenu, false);
                                window.removeEventListener("contextmenu", toggleMenu, false);
                                    }

                                }, 10);

                            }

                        }

                        var playlistmenulistener = setInterval(injectPlaylistMenuListener, 10);

                        function loadMenu() {
                            var leftattribute = document.querySelector("div.share-panel-playlist-options").querySelector("button").getBoundingClientRect().x.toPrecision(6);

                            if (window.scrollY == 0) {

                        var topattribute = (parseInt(document.querySelector("div.share-panel-playlist-options").querySelector("button").getBoundingClientRect().y + 27 + window.scrollY)).toString();

                            } else {

                                var topattribute = (document.querySelector("div.share-panel-playlist-options").querySelector("button").getBoundingClientRect().y + 27 + window.scrollY).toPrecision(4);

                            }


      var playlistmenu = (`<ul id="div-aria-menu-id-90" class="yt-uix-button-menu yt-uix-button-menu-default" role="menu" aria-haspopup="true" style="min-width: 100px; left: ` + leftattribute + `px; top: ` + topattribute + `px;">
      <li class="` + (current ? `yt-uix-button-menu-item-selected"` : `"`) + ` role="menuitem">
        <span id="embed-with-playlist-current" class=" yt-uix-button-menu-item" onclick=";return false;">current video
        </span>
      </li>
      <li class="` + (first ? `yt-uix-button-menu-item-selected"` : `"`) + ` role="menuitem">
        <span id="embed-with-playlist-first" class=" yt-uix-button-menu-item" onclick=";return false;">start of playlist
        </span>
      </li>
    </ul>`);

    document.body.insertAdjacentHTML('beforeend', playlistmenu);

                            document.querySelector("div.share-panel-playlist-options").querySelector("button").setAttribute("class", document.querySelector("div.share-panel-playlist-options").querySelector("button").getAttribute("class") + " yt-uix-button-active");
                        }

                        document.querySelector("div.share-panel-playlist-options").querySelector("button").addEventListener("click", loadMenu, false);

                        document.querySelector("div.share-panel-playlist-options").querySelector("button").addEventListener("contextmenu", loadMenu, false);

                    }



                    document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0].onclick = function() {
                        if (document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0].value == "off") {
                            var privacycheckbox = document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0];
                            privacycheckbox.value = "on";
                            InjectNoCookieDomain();
                        } else if (document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0].value == "on") {
                            var privacycheckbox = document.getElementsByClassName("share-embed-options")[2].children[3].children[0].children[0];
                            privacycheckbox.value = "off";
                            InjectRegularDomain();
                    }
                    }
                    document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0].onclick = function() {
                        if (document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0].value == "off") {
                            var controlscheckbox = document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0];
                            controlscheckbox.value = "on";
                            removeQueryParameter("controls=0");
                        } else if (document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0].value == "on") {
                            var controlscheckbox = document.getElementsByClassName("share-embed-options")[2].children[1].children[0].children[0];
                            controlscheckbox.value = "off";
                            InjectQueryParameter("controls=0");
                            }
                    }
                    document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0].onclick = function() {
                        if (document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0].value == "off") {
                            var suggestioncheckbox = document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0];
                            suggestioncheckbox.value = "on";
                            removeQueryParameter("rel=0");
                        } else if (document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0].value == "on") {
                            var suggestioncheckbox = document.getElementsByClassName("share-embed-options")[2].children[0].children[0].children[0];
                            suggestioncheckbox.value = "off";
                            InjectQueryParameter("rel=0");
                        }
                    }
                    document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0].onclick = function() {
                        if (document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0].value == "off") {
                            var suggestioncheckbox = document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0];
                            suggestioncheckbox.value = "on";
                            removeQueryParameter("showinfo=0");
                        } else if (document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0].value == "on") {
                            var suggestioncheckbox = document.getElementsByClassName("share-embed-options")[2].children[2].children[0].children[0];
                            suggestioncheckbox.value = "off";
                            InjectQueryParameter("showinfo=0");

                        }
                    }

                    document.getElementById("embed-layout-options").onclick = function() {
                        document.getElementsByClassName("share-embed-options")[1].children[1].setAttribute("class", (document.getElementsByClassName("share-embed-options")[1].children[1].getAttribute("class") + " focused"));
                    }
                    document.getElementById("embed-layout-options").oncontextmenu = function() {
                        document.getElementsByClassName("share-embed-options")[1].children[1].setAttribute("class", (document.getElementsByClassName("share-embed-options")[1].children[1].getAttribute("class") + " focused"));
                    }



                    function updateWidthHeightValue(width, height) {

                        widthvalue = width;
                        heightvalue = height;
                        buildFinalValue();

                    }

                    //setInterval(changeIframeSize, 100);

                    var oldoptionvalue = document.getElementById("embed-layout-options").value;

                    function checkForEmbedLayoutOptionEvalChanges() {

                    var checkforvaluechanges = setInterval(function() {

                        if (oldoptionvalue != document.getElementById("embed-layout-options").value) {

                         clearInterval(checkforvaluechanges);

                          if (document.getElementById("embed-layout-options").value != "custom") {

                            changeIframeSize();

                              if (document.getElementById("share-embed-customize")) {

                                  document.getElementById("share-embed-customize").remove();
                              }

                            } else {
                                addCustomSupport();
                            }

                            oldoptionvalue = document.getElementById("embed-layout-options").value;

                            checkForEmbedLayoutOptionEvalChanges();



                        }

                    }, 100);

                    }

                    checkForEmbedLayoutOptionEvalChanges();

                    function changeIframeSize() {

                    if (document.getElementById("embed-layout-options").value == "hd720") {
                        updateWidthHeightValue(1280, 720);
                        document.getElementsByClassName("yt-uix-form-input-select-value")[0].innerHTML = "1280 × 720";
                    }

                    if (document.getElementById("embed-layout-options").value == "default") {
                           updateWidthHeightValue(560, 315);
                        document.getElementsByClassName("yt-uix-form-input-select-value")[0].innerHTML = "560 × 315";
                    }

                    if (document.getElementById("embed-layout-options").value == "large") {

                           updateWidthHeightValue(853, 480);
                        document.getElementsByClassName("yt-uix-form-input-select-value")[0].innerHTML = "853 × 480";
                    }

                    if (document.getElementById("embed-layout-options").value == "medium") {

                          updateWidthHeightValue(640, 360);
                        document.getElementsByClassName("yt-uix-form-input-select-value")[0].innerHTML = "640 × 360";
                    }
                    }





                    function addCustomSupport() {

                        var customsizeform = (`<span id="share-embed-customize" class="">
            <input type="text" class="yt-uix-form-input-text share-embed-size-custom-width" maxlength="4">
            ×
            <input type="text" class="yt-uix-form-input-text share-embed-size-custom-height" maxlength="4">
          </span>`);

                        document.getElementsByClassName("yt-uix-form-input-select")[0].insertAdjacentHTML('afterend', customsizeform);

                        document.getElementsByClassName("yt-uix-form-input-select-value")[0].innerHTML = "Custom size";

                        var sharecode = document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value.toString();

                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].setAttribute("data-focused", "false");
                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].setAttribute("data-focused", "false");


                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].onclick = function() {

                            document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].setAttribute("data-focused", "true");


                            var waitforblur = setInterval(function() {

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].getAttribute("data-focused") == "false" && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value != "") {
                                    clearInterval(waitforblur);
                            addDataFocusLossListener2();
                                }
                            }, 100);

                        }

                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].onclick = function() {

                            document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].setAttribute("data-focused", "true");
                            var waitforblur = setInterval(function() {

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].getAttribute("data-focused") == "false" && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value != "") {
                                    clearInterval(waitforblur);
                            addDataFocusLossListener1();
                                }
                            }, 100);

                        }


                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].oncontextmenu = function() {

                            document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].setAttribute("data-focused", "true");
                            var waitforblur = setInterval(function() {

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].getAttribute("data-focused") == "false" && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value != "") {
                                    clearInterval(waitforblur);
                            addDataFocusLossListener2();
                                }
                            }, 100);

                        }

                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].oncontextmenu = function() {

                            document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].setAttribute("data-focused", "true");
                            var waitforblur = setInterval(function() {

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].getAttribute("data-focused") == "false" && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value != "") {
                                    clearInterval(waitforblur);
                            addDataFocusLossListener1();
                                }
                            }, 100);

                        }

                        function addBlurs() {

                                var waitforblur = setInterval(function() {

                                    if (document.activeElement.getAttribute("class") != 'yt-uix-form-input-text share-embed-size-custom-width' && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].getAttribute("data-focused") == "true") {
                                        clearInterval(waitforblur);

                                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].setAttribute("data-focused", "false");

                                    }

                                }, 10);

                                var waitforblur2 = setInterval(function() {

                                    if (document.activeElement.getAttribute("class") != 'yt-uix-form-input-text share-embed-size-custom-height' && document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].getAttribute("data-focused") == "true") {

                                        clearInterval(waitforblur2);

                                        document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].setAttribute("data-focused", "false");
                                    }

                                }, 10);
                        }

                       function addFocus() {

                        var waitforfocus = setInterval(function() {

                            if (document.activeElement.getAttribute("class") == 'yt-uix-form-input-text share-embed-size-custom-height' || document.activeElement.getAttribute("class") == 'yt-uix-form-input-text share-embed-size-custom-width') {

                                clearInterval(waitforfocus);
                                addBlurs();

                            }

                        }, 10);

                       }

                        var datafocus = setInterval(addFocus, 100);

                        function addDataFocusLossListener1() {


                        var checkfordatafocusloss1 = setInterval(function() {

                            if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].getAttribute("data-focused") == "false") {

                                clearInterval(checkfordatafocusloss1);

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value != "" ) {

                                var iframeheight = document.querySelector("iframe").getAttribute("data-height");
                                var iframewidth = document.querySelector("iframe").getAttribute("data-width");

                                var heightvalue = document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value;

                                var widthvalue = (parseInt(parseInt(document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value) * 1.7777777777777777777777777777778)).toString();

                                document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value = widthvalue;

                                if (sharecode.search(iframeheight) != "-1") {

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = sharecode.replace(iframeheight, heightvalue);

                                } else {

                                    var firstoccurence = sharecode.split("width=")[1].indexOf('"') + 1;

                                    var numberfirst = sharecode.split("width=")[1].slice(firstoccurence);

                                    var secondoccurence = numberfirst.indexOf('"');

                                    var numberbyitself = numberfirst.slice(0, secondoccurence);


                                    var firstoccurence2 = sharecode.split("height=")[1].indexOf('"') + 1;

                                    var numberfirst2 = sharecode.split("height=")[1].slice(firstoccurence2);

                                    var secondoccurence2 = numberfirst2.indexOf('"');

                                    var numberbyitself2 = numberfirst2.slice(0, secondoccurence2);

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = sharecode.replace(numberbyitself, widthvalue).replace(numberbyitself2, heightvalue);

                                }

                                } else {

                                var iframeheight = document.querySelector("iframe").getAttribute("data-height");
                                var iframewidth = document.querySelector("iframe").getAttribute("data-width");

                                var heightvalue = document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value;

                                var widthvalue = (parseInt(parseInt(document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value) * 1.7777777777777777777777777777778)).toString();

                                document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value = widthvalue;

                                if (storedvalue.search(iframeheight) != "-1") {

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = storedvalue.replace(iframeheight, heightvalue);

                                } else {

                                    var firstoccurence = storedvalue.split("width=")[1].indexOf('"') + 1;

                                    var numberfirst = storedvalue.split("width=")[1].slice(firstoccurence);

                                    var secondoccurence = numberfirst.indexOf('"');

                                    var numberbyitself = numberfirst.slice(0, secondoccurence);


                                    var firstoccurence2 = storedvalue.split("height=")[1].indexOf('"') + 1;

                                    var numberfirst2 = storedvalue.split("height=")[1].slice(firstoccurence2);

                                    var secondoccurence2 = numberfirst2.indexOf('"');

                                    var numberbyitself2 = numberfirst2.slice(0, secondoccurence2);

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = storedvalue.replace(numberbyitself, widthvalue).replace(numberbyitself2, heightvalue);

                                }

                            }


                            }

                        }, 10);

                        }




                        function addDataFocusLossListener2() {

                                                    var checkfordatafocusloss2 = setInterval(function() {

                            if (document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].getAttribute("data-focused") == "false") {

                                clearInterval(checkfordatafocusloss2);

                                if (document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value != "" ) {

                                var iframeheight = document.querySelector("iframe").getAttribute("data-height");
                                var iframewidth = document.querySelector("iframe").getAttribute("data-width");

                                var heightvalue = (parseInt(parseInt(document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value) / 1.7777777777777777777777777777778)).toString();

                                var widthvalue = document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value;

                                document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-height")[0].value = heightvalue;

                                if (sharecode.search(iframewidth) != "-1") {

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = sharecode.replace(iframewidth, widthvalue);

                                } else {

                                    var firstoccurence = sharecode.split("width=")[1].indexOf('"') + 1;

                                    var numberfirst = sharecode.split("width=")[1].slice(firstoccurence);

                                    var secondoccurence = numberfirst.indexOf('"');

                                    var numberbyitself = numberfirst.slice(0, secondoccurence);


                                    var firstoccurence2 = sharecode.split("height=")[1].indexOf('"') + 1;

                                    var numberfirst2 = sharecode.split("height=")[1].slice(firstoccurence2);

                                    var secondoccurence2 = numberfirst2.indexOf('"');

                                    var numberbyitself2 = numberfirst2.slice(0, secondoccurence2);

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = sharecode.replace(numberbyitself, widthvalue).replace(numberbyitself2, heightvalue);

                                }

                                } else {

                                var iframeheight = document.querySelector("iframe").getAttribute("data-height");
                                var iframewidth = document.querySelector("iframe").getAttribute("data-width");

                                var widthvalue = document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value;

                                var heighthvalue = (parseInt(parseInt(document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value) / 1.7777777777777777777777777777778)).toString();

                                document.getElementsByClassName("yt-uix-form-input-text share-embed-size-custom-width")[0].value = widthvalue;

                                if (storedvalue.search(iframewidth) != "-1") {

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = storedvalue.replace(iframewidth, widthvalue);;

                                } else {

                                    var firstoccurence = storedvalue.split("width=")[1].indexOf('"') + 1;

                                    var numberfirst = storedvalue.split("width=")[1].slice(first);

                                    var secondoccurence = numberfirst.indexOf('"');

                                    var numberbyitself = numberfirst.slice(0, secondoccurence);


                                    var firstoccurence2 = storedvalue.split("height=")[1].indexOf('"') + 1;

                                    var numberfirst2 = storedvalue.split("height=")[1].slice(firstoccurence2);

                                    var secondoccurence2 = numberfirst2.indexOf('"');

                                    var numberbyitself2 = numberfirst2.slice(0, secondoccurence2);

                                    document.getElementsByClassName("yt-uix-form-input-text share-embed-code")[0].value = storedvalue.replace(numberbyitself, widthvalue).replace(numberbyitself2, heightvalue);

                                }

                            }


                            }

                        }, 10);


                        }


                    }

                                document.getElementById("watch-actions-share-loading").children[0].children[0].children[0].children[0].onclick = function() {
            if (document.getElementById("watch-actions-share-loading").children[0].children[0].children[0].children[0].getAttribute("class").search("yt-uix-button-toggled") == "-1") {
                document.getElementById("watch8-secondary-actions").children[1].click();
                document.getElementById("watch8-secondary-actions").children[1].click();
            }
            }




                }

            }

            document.getElementsByClassName("share-panel-email")[0].onclick = function() {

                if (loggedin == "1") {

                let loadingActionPanel = `<div id="action-panel-report" class="action-panel-content" data-auth-required="true">
    <div class="action-panel-loading">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

    </div>
  </div>`;

                document.getElementById("watch-action-panels").innerHTML = loadingActionPanel;
                                    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 404) {
       // Typical action to be performed when the document is ready:

       let actionPanelError = `  <div id="action-panel-error" class="action-panel-content">
    <div class="action-panel-error">
      This feature is not available right now. Please try again later.
    </div>
  </div>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-button-opacity yt-uix-close" type="button" onclick=";return false;" id="action-panel-dismiss" aria-label="Close" data-close-parent-id="watch8-action-panels"></button>`;
       document.getElementById("watch-action-panels").innerHTML = actionPanelError;
        document.getElementById("action-panel-dismiss").onclick = function() {
            document.getElementById("watch-action-panels").remove();
            document.getElementById("watch8-secondary-actions").children[1].setAttribute("class", document.getElementById("watch8-secondary-actions").children[1].getAttribute("class").replace("yt-uix-button-toggled", ""));
        }
    } else if (this.readyState == 4 && this.status == 200) {

        document.getElementById("watch-action-panels").innerHTML = xhttp.responseText;
    } else if (this.readyState == 4 && this.status == 400) {
        document.getElementById("watch-action-panels").innerHTML = "Status code for https://www.youtube.com/share_ajax: 400 Bad Request";
};
            }
            var request = "https://www.youtube.com/share_ajax";
            xhttp.open("GET", request, true);
            xhttp.send();
            }

                else {

                document.getElementById("watch-action-panels").remove();

                let registernowmsg = (`<div id="watch-action-panels" class="watch-action-panels yt-uix-button-panel yt-card yt-card-has-padding">
      <div id="action-panel-share" class="action-panel-content" data-panel-loaded="true">

  <div id="watch-actions-share-panel">


  <div class="share-panel">
        <div class="yt-uix-tabs">
    <span class="yt-uix-button-group" data-button-toggle-group="share-panels">
<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-services yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Share</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-embed yt-card-title" type="button" onclick=";return false;" data-button-toggle="true"><span class="yt-uix-button-content">Embed</span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-text share-panel-email yt-card-title yt-uix-button-toggled" type="button" onclick=";return false;" data-button-toggle="true" aria-pressed="true" id="kbd-nav-131516"><span class="yt-uix-button-content">Email</span></button>    </span>
  </div>







        <div class="share-panel-email-container" data-disabled="true">
        <strong><a href="https://accounts.google.com/ServiceLogin?hl=de&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Fapp%3Ddesktop%26action_handle_signin%3Dtrue%26hl%3Dde%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253D` + videoId + `%2526feature%253Dshare_email%26feature%3Demail&amp;passive=true&amp;service=youtube&amp;uilel=3">Register now</a>!
</strong>

  </div>


  </div>
</div>

  </div>












    <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-button-opacity yt-uix-close" type="button" onclick=";return false;" id="action-panel-dismiss" aria-label="Schließen" data-close-parent-id="watch8-action-panels"></button>
  </div>`);


                    document.getElementById("action-panel-details").insertAdjacentHTML('beforebegin', registernowmsg);

                }

            }




        } else if (document.getElementsByClassName("action-panel-trigger-share")[0].getAttribute("class").search("yt-uix-menu-trigger-selected yt-uix-button-toggled") != "-1") {
        document.getElementsByClassName("action-panel-trigger-share")[0].blur();
        document.getElementsByClassName("action-panel-trigger-share")[0].setAttribute("class", document.getElementsByClassName("action-panel-trigger-share")[0].getAttribute("class").replace(" yt-uix-menu-trigger-selected yt-uix-button-toggled"))
            document.getElementById("watch-action-panels").remove();
        }
    }
    // - description "show more"
    document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].onclick = function() {
        document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].blur();
        document.getElementById("action-panel-details").setAttribute("class", document.getElementById("action-panel-details").getAttribute("class").replace(" yt-uix-expander-collapsed", ""))
    }
    document.getElementsByClassName("yt-uix-expander-body")[2].onclick = function() {
        document.getElementsByClassName("yt-uix-expander-body")[2].blur();
        document.getElementById("action-panel-details").setAttribute("class", document.getElementById("action-panel-details").getAttribute("class") + " yt-uix-expander-collapsed")
    }

    // More button
    //document.getElementsByClassName("yt-uix-button-content")[6].onclick = function() {
    document.getElementById("action-panel-overflow-button").onclick = function() {
        if (document.getElementById("action-panel-overflow-button").getAttribute("class").search("yt-uix-menu-trigger-selected yt-uix-button-toggled yt-uix-more-button-context-menu-open-opened") == "-1") {
        document.getElementById("action-panel-overflow-button").blur();
        document.getElementById("action-panel-overflow-button").setAttribute("class", document.getElementById("action-panel-overflow-button").getAttribute("class") + " yt-uix-menu-trigger-selected yt-uix-button-toggled yt-uix-more-button-context-menu-open-opened")
        document.getElementsByClassName("yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden")[0].setAttribute("class", document.getElementsByClassName("yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden")[0].getAttribute("class").replace("-hidden", ""))







            document.getElementById("action-panel-overflow-menu").children[0].children[0].children[0].onclick = function() {
                document.getElementById("action-panel-overflow-menu").children[0].children[0].children[0].blur();

if (loggedin == "0") {

        var clientreportrectleft = (document.getElementById("watch8-secondary-actions").children[0].children[0].getBoundingClientRect().left + 166).toPrecision(6);
        var clientreportrecttop = (document.getElementById("watch8-secondary-actions").children[0].children[0].getBoundingClientRect().top - 105).toPrecision(4);


        let reportclickcard = (`<div id="yt-uix-clickcard-card51" class="yt-uix-clickcard-card report-card yt-uix-clickcard-card-flip yt-uix-kbd-nav yt-uix-clickcard-card-visible" style="left: ` + clientreportrectleft + `px; top: ` + clientreportrecttop + `px;" data-kbd-nav-move-out="kbd-nav-93343"><div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-horizontal" style="bottom: 6px;"></div><div class="yt-uix-clickcard-card-border"><div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-horizontal" style="bottom: 6px;"></div><div class="yt-uix-clickcard-card-body"><div class="signin-clickcard yt-uix-clickcard-card-content">
    <h3 class="signin-clickcard-header">Need to report the video?</h3>
    <div class="signin-clickcard-message">
      Sign in to report inappropriate content.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3D__FEATURE__%26next%3D%252Fwatch%253Fv%253DiOztnsBPrAA%26hl%3Den%26action_handle_signin%3Dtrue%26app%3Ddesktop&amp;passive=true" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=kKcAWcyXKY6L_AP1q5voBA"><span class="yt-uix-button-content">Sign in</span></a>
  </div></div></div></div>`);


        document.body.insertAdjacentHTML('beforeend', reportclickcard);

} else {


                document.getElementById("watch8-secondary-actions").children[2].children[0].click();
                document.getElementById("watch8-secondary-actions").children[2].children[0].blur();

}
            }

            document.getElementById("action-panel-overflow-menu").children[2].children[0].onclick = function() {
                if (document.getElementById("watch-action-panels") != null) {
                    document.getElementById("watch-action-panels").remove();
                }
            }

            document.getElementById("action-panel-overflow-menu").children[1].children[0].onclick = function() {


                var ajaxrequest = "https://www.youtube.com/insight_ajax?action_get_statistics_and_data=1&v=" + videoId;

let loadingActionPanel = `<div id="watch-action-panels" class="watch-action-panels yt-uix-button-panel yt-card yt-card-has-padding">      <div id="action-panel-report" class="action-panel-content" data-auth-required="true">
    <div class="action-panel-loading">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title="Loading icon"></span>

    <span class="yt-spinner-message">
Loading...
    </span>
  </p>

    </div>
  </div>
  </div>`;

var d = document.getElementById("action-panel-details")
d.insertAdjacentHTML("beforebegin", loadingActionPanel);

                var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 404) {
       // Typical action to be performed when the document is ready:
       let actionPanelError = `  <div id="action-panel-error" class="action-panel-content">
    <div class="action-panel-error">
      This feature is not available right now. Please try again later.
    </div>
  </div>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon no-icon-markup yt-uix-button-opacity yt-uix-close" type="button" onclick=";return false;" id="action-panel-dismiss" aria-label="Close" data-close-parent-id="watch8-action-panels"></button>`;
       document.getElementById("watch-action-panels").innerHTML = actionPanelError;
        document.getElementById("action-panel-dismiss").onclick = function() {
            document.getElementById("watch-action-panels").remove();
        }
    } else if (this.readyState == 4 && this.status == 200) {

        document.getElementById("watch-action-panels").innerHTML = xhttp.responseText;
    }
};
           xhttp.open("GET", ajaxrequest, true);
           xhttp.send();

        }


                }else if (document.getElementById("action-panel-overflow-button").getAttribute("class").search("yt-uix-menu-trigger-selected yt-uix-button-toggled yt-uix-more-button-context-menu-open-opened") != "-1") {
            //document.getElementsByClassName("yt-uix-more-button-context-menu-open-opened")[0].onclick = function() {
        document.getElementById("action-panel-overflow-button").blur();
        document.getElementById("action-panel-overflow-button").setAttribute("class", document.getElementById("action-panel-overflow-button").getAttribute("class").replace(" yt-uix-menu-trigger-selected yt-uix-button-toggled yt-uix-more-button-context-menu-open-opened", ""))
        document.getElementsByClassName("yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content")[0].setAttribute("class", "yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden")
        }
  }


    // Notifications
    document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon yt-uix-subscription-preferences-button")[0].onclick = function() {
        document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon yt-uix-subscription-preferences-button")[0].blur();
        document.getElementById("notification-preference-button").children[0].children[0].children[0].children[0].click();
    }



    async function updateMetadata(continuation) {

        var ytinitial;

            var checkforytinitialdata = setInterval(() => {

        if (document.getElementById("w8rytinitialdata")) {
            clearInterval(checkforytinitialdata);
            var innerhtml = document.getElementById("w8rytinitialdata").innerHTML;
            ytinitial = JSON.parse(innerhtml);

        }

    }, 10);

        if (typeof ytinitial.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive != 'undefined') {

            var islive = ytinitial.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive;

            if (islive == true) {

                var youtubeidata = await videoAction("updatemetadata", continuation).then(response => youtubeidata = response);

                var actionarray = youtubeidata.actions;

                for (var i = 0; i < actionarray.length; i++) {

                    if (typeof youtubeidata.actions[i].updateViewershipAction != undefined) {

                var viewcount = youtubeidata.actions[i].updateViewershipAction.viewCount.viewCountRenderer.viewCount.simpleText;

                document.getElementsByClassName("watch-view-count")[0].innerHTML = viewcount;

                    }

                    if (typeof youtubeidata.actions[i].updateDateTextAction != undefined) {

                var date = youtubeidata.actions[i].updateDateTextAction.dateText.simpleText;

                document.getElementsByClassName("watch-time-text")[0].innerHTML = date;

                    }

                    if (typeof youtubeidata.actions[i].updateTitleAction != undefined) {

                        var title = youtubeidata.actions[i].updateTitleAction.title.runs[0].text;

                        document.getElementById("eow-title").setAttribute("title", title);
                        document.getElementById("eow-title").innerHTML = title;

                    }

                    if (typeof youtubeidata.actions[i].updateDescriptionAction != undefined) {


             var description = youtubeidata.actions[i].updateDescriptionAction.description.runs;
			var initialdescription = (``);
                        var finisheddescription = (``);
			for (i = 0; i < description.length; i++) {
				if (typeof description[i].navigationEndpoint != 'undefined') {
                    if (typeof description[i].navigationEndpoint.urlEndpoint != 'undefined') {
				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + description[i].navigationEndpoint.urlEndpoint.url + '">' + description[i].text + "</a><br>";
				var almostdescription = initialdescription += descriptionintheworks;
				finisheddescription += almostdescription;
                    } else if (typeof description[i].navigationEndpoint.watchEndpoint != 'undefined') {
                        if (typeof description[i].navigationEndpoint.watchEndpoint.playlistId != 'undefined') {
                                                var url = "https://www.youtube.com/watch?v=" + description[i].navigationEndpoint.watchEndpoint.videoId + "&list=" + description[i].navigationEndpoint.watchEndpoint.playlistId;
                        				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + url + '">' + description[i].text + "</a><br>";
				var almostdescription = initialdescription += descriptionintheworks;
				finisheddescription += almostdescription;
                        }
                        else
                        {
                                                var url = "https://www.youtube.com/watch?v=" + description[i].navigationEndpoint.watchEndpoint.videoId;
                        				var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + url + '">' + description[i].text + "</a><br>";
				var almostdescription = initialdescription += descriptionintheworks;
				finisheddescription += almostdescription;
                        }
                    } else if (typeof description[i].navigationEndpoint.browseEndpoint != 'undefined') {
                        if (typeof description[i].navigationEndpoint.canonicalBaseUrl == 'undefined') {
                        var hashtagtext = description[i].text;
                        var hashtagurl = "https://www.youtube.com/hashtag/" + (hashtagtext.split("#")[1]);
                        var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + hashtagurl + '">' + hashtagtext + "</a><br>";
				        var almostdescription = initialdescription += descriptionintheworks;
				        finisheddescription += almostdescription;
                    } else if (typeof description[i].navigationEndpoint.canonicalBaseUrl != 'undefined') {
                        var baseurl = "https://www.youtube.com" + description[i].navigationEndpoint.canonicalBaseUrl;
                       var descriptionintheworks = '<a class="g-hovercard yt-uix-sessionlink      spf-link " href="' + baseurl + '">' + description[i].text + "</a><br>";
				        var almostdescription = initialdescription += descriptionintheworks;
				        finisheddescription += almostdescription;
                    }
				}
            }
                else
                {
					var descriptionwithouthref = description[i].text;

                    finisheddescription += almostdescription += "<br>";
				}
            }


                        document.getElementById("eow-description").innerHTML = finisheddescription;


                    }






                    var watchdata = getWatchPage().then(response => watchdata = response);

                    if (document.getElementById("like-count")) {

                    var like = watchdata[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.likeCount;

                        var likecounts = like.toString();

                        var likecountswithcommas = numberWithCommas(likecounts);

                        document.getElementById("like-count").innerHTML = likecountswithcommas;

                        var dislike = watchdata[1].response.contents.twoColumnWatchNextResults.results.results.contents[0].itemSectionRenderer.contents[0].videoMetadataRenderer.likeButton.likeButtonRenderer.dislikeCount;

                        var dislikecounts = dislike.toString();

                        var dislikecountswithcommas = numberWithCommas(dislikecounts);


                        document.getElementById("dislike-count").innerHTML = dislikecountswithcommas;
                    }

                }

            }

        }

    }

    async function fetchContinuation() {

        var youtubeiresponse = await videoAction("fetchcontinuation").then(response => youtubeiresponse = response);

        var continuation = youtubeiresponse.continuation.timedContinuationData.continuation;

        updateMetadata(continuation);

    }

    var initialhtml = document.getElementById("w8rytinitialdata").innerHTML;

    var ytinitial = JSON.parse(initialhtml);

        if (typeof ytinitial.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive != 'undefined') {

            var islive = ytinitial.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive;

            if (islive == true) {


    var updatemetadata = setInterval(fetchContinuation, 4000);

            }

        }













}




    function injectRewrite2() {
        //this function is for playlist rewrites; often putting this code into the first injectRewrite() function errors out because by the time the function is called, the watch next results are not injected yet
                document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].onmouseenter = function() {

        var autoplayleft = document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].getBoundingClientRect().left - 251;

            if (window.scrollY == 0) {

        var autoplaytopmaybe = (document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].getBoundingClientRect().top - 86).toString();

            } else {

        var autoplaytopmaybe = ((document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].getBoundingClientRect().top - 86) + window.scrollY).toString();

            }

        if (Math.sign(autoplaytopmaybe) == "-1") {

            if (window.scrollY == 0) {

              var autoplaytop = (document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].getBoundingClientRect().top + 29).toString();

              } else {

                  var autoplaytop = (document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].getBoundingClientRect().top + 92).toString();

              }

            var autoplayclickcard = (`<div id="yt-uix-hovercard-card50" class="yt-uix-hovercard-card yt-uix-kbd-nav yt-uix-hovercard-card-reverse yt-uix-hovercard-card-visible" data-kbd-nav-move-out="body" tabindex="-1" style="left: ` + autoplayleft + `px; top: ` + autoplaytop + `px;">
    <div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-vertical" style="right: 6px;"></div>
    <div class="yt-uix-hovercard-card-border">
        <div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-vertical" style="right: 6px;"></div>
        <div class="yt-uix-hovercard-card-body"><span class="yt-uix-hovercard-card-content">When autoplay is enabled, a suggested video will automatically play next.</span></div>
    </div>
</div>`);

        } else {

            var autoplaytop = autoplaytopmaybe;

        var autoplayclickcard = (`<div id="yt-uix-hovercard-card50" class="yt-uix-hovercard-card yt-uix-kbd-nav yt-uix-clickcard-card-visible" style="left: ` + autoplayleft + `px; top: ` + autoplaytop + `px;" data-kbd-nav-move-out="yt-uix-hovercard-card50" tabindex="-1">
    <div class="yt-uix-card-border-arrow yt-uix-card-border-arrow-vertical" style="right: 6px;"></div>
    <div class="yt-uix-hovercard-card-border">
        <div class="yt-uix-card-body-arrow yt-uix-card-body-arrow-vertical" style="right: 6px;"></div>
        <div class="yt-uix-hovercard-card-body"><span class="yt-uix-hovercard-card-content">When autoplay is enabled, a suggested video will automatically play next.</span></div>
    </div>
</div>`);



        }




        setTimeout(function() {

        document.body.insertAdjacentHTML('beforeend', autoplayclickcard);

        }, 500);

    }

        document.getElementsByClassName("autoplay-info-icon yt-uix-button-opacity yt-uix-hovercard-target yt-sprite")[0].onmouseleave = function(e) {

            if (document.getElementById("yt-uix-hovercard-card50") && e.target.id != "yt-uix-hovercard-card50") {

       document.getElementById("yt-uix-hovercard-card50").remove();

            }

    }

    }



window.addEventListener('load', function () {
    console.log('load');
});

var oldhref = window.location.href;

/*

window.addEventListener('yt-page-data-updated', function() {

    if (window.location.pathname.toLowerCase() == "/watch") {

        if (!videoInfoCardLoaded) {

            injectVideoInformation();

        } else {

            resetVideoInfoCard();
            injectVideoInformation();

        }

        if (!videoRecoLoaded) {

            injRecommended();

        } else {

            resetReco();
            injRecommended();

        }

    } else {

        resetOverallWatch();

    }

});


*/

//window.addEventListener('yt-page-data-updated', resetWatch);

// check if URL changes; reset if so.
window.addEventListener('load', function () {
    var checkLoadState;
    checkLoadState++;
    if (checkLoadState == 1) {
        window.location.reload();
        checkLoadState = 0;
    }
    console.log('load');
});



function addStyle(styleString, id) {
try {

  const style = document.createElement('style');
  style.id = id;
  style.textContent = styleString;
  document.head.append(style);

} catch(err) {

    const style2 = (`<style id="` + id + `">` + styleString + `</style>`);
    document.head.insertAdjacentHTML('beforeend', style2);

   }
}



function resetW8rData() {
    updateW8rData();
}


function resetWatch() {

    for (var i = 0; i < 200; i++) {

        document.getElementById("watch-header").remove();
        document.getElementById("action-panel-details").remove();
        document.getElementById("watch7-sidebar").remove();
        document.getElementById("watch-action-panels").remove();
        document.getElementById("watch7-creator-bar").remove();

        injectVideoInformation();

    }

    //templateLoaded = false;

}





window.onload = addStyle(`.title.ytd-video-primary-info-renderer {
    font-size: 20px;
    font-weight: normal;
}

.standalone-collection-badge-renderer-text a{background-color:#f1f1f1;border-radius:2px;color:#000;padding:0 4px;margin-right:6px;text-transform:none}.standalone-collection-red-badge-renderer-icon{background-color:#f1f1f1;border-radius:2px;border:1px solid #f1f1f1;color:#e62117;margin:3px 0;text-transform:none}.standalone-collection-badge-renderer-text{font-size:11px;color:#555}

div#items.ytd-watch-next-secondary-results-renderer {
display: none !important;
}

#watch7-subscription-container .channel-settings-link{height:24px}#watch7-subscription-container .channel-settings-link:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -364px -141px;background-size:auto;width:20px;height:20px}

.share-button-renderer-panel-container .yt-uix-clickcard-card-content{width:600px}.share-button-renderer-panel-container #share-panel-buttons .yt-uix-button.share-panel-email{margin-right:0}.share-button-renderer-panel-container .share-panel-url{width:580px;color:#333;font-size:12px;padding:7px}.share-button-renderer-panel-container .yt-uix-clickcard-card-content{padding-bottom:10px}.yt-uix-clickcard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-clickcard-card-flip .yt-uix-card-body-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-body-arrow-horizontal{right:auto;border-right-width:12px;border-left-width:0;border-left-color:transparent}.yt-uix-clickcard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-border-arrow-horizontal{left:-12px;border-right-color:#c5c5c5}.yt-uix-clickcard-card-flip .yt-uix-card-body-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-body-arrow-horizontal{left:-11px;border-right-color:#fff}.yt-uix-clickcard-card-reverse .yt-uix-card-border-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0;top:-10px}.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0}.yt-uix-hovercard-card-reverse .yt-uix-card-border-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0;top:-10px}.yt-uix-hovercard-card-reverse .yt-uix-card-body-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0}.yt-uix-clickcard-card-reverse .yt-uix-card-border-arrow-vertical,.yt-uix-hovercard-card-reverse .yt-uix-card-border-arrow-vertical{border-bottom-color:#c5c5c5;margin-top:-1px}.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical,.yt-uix-hovercard-card-reverse .yt-uix-card-body-arrow-vertical{top:-10px;border-bottom-color:#fff}.yt-uix-clickcard-close{float:right;margin:-5px -5px 5px 5px}#ie .yt-uix-card-body-arrow-vertical{border-top-color:#fff}.yt-uix-hovercard-target,.yt-uix-clickcard-target{cursor:pointer}.yt-uix-clickcard-promo .yt-uix-clickcard-card-border{background:#2793e6;border-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-card-body-arrow-vertical{border-top-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-card-body-arrow-horizontal{border-right-color:#2793e6}.yt-uix-clickcard-promo.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical{border-bottom-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-clickcard-close{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -256px -21px;background-size:auto;width:20px;height:20px}.yt-uix-clickcard-promo .yt-uix-clickcard-card-body{color:#fff}.yt-uix-clickcard-promo.guide-hint{position:fixed}.yt-uix-form-fielset{display:block;margin:10px 0}

.yt-uix-form-input-select-element{position:relative;height:26px;padding:0 16px;-webkit-appearance:none;-moz-appearance:none;opacity:0;filter:alpha(opacity=0);_filter:none}#ie .yt-uix-form-input-select-element,.ie .yt-uix-form-input-select-element{min-width:100px;padding:0;font-size:13px}.yt-uix-form-input-select-element option{padding:0}.yt-uix-form-input-select-content{position:absolute;top:0;left:0;width:100%;height:100%;line-height:26px}.yt-uix-form-input-select-value{display:block;margin:0 10px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}#ie .yt-uix-form-input-select-value,.ie .yt-uix-form-input-select-value{margin:0 5px;*margin:0 0 0 5px}.yt-uix-form-input-select-arrow{float:right;width:0;height:0;border:1px solid transparent;border-width:4px 4px 0;border-top-color:#666;margin-top:11px;margin-right:10px}.yt-uix-form-input-text{width:250px;padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px}.yt-uix-form-input-textarea{padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px;width:550px;resize:vertical}


.yt-alert-warn .yt-alert-content,.yt-alert-warn .yt-alert-buttons .yt-uix-button-content{color:#333;text-shadow:none}

.yt-alert .close .yt-uix-button-content{display:none}

.yt-alert-watch-promo-text{padding-top:7px}.yt-alert-watch-promo .yt-alert-watch-promo-title{display:inline;position:absolute;top:-9px}.yt-uix-button-alert-error .yt-uix-button-content,.yt-uix-button-alert-info .yt-uix-button-content,.yt-uix-button-alert-success .yt-uix-button-content,.yt-uix-button-alert-warn .yt-uix-button-content{color:#fff}

.yt-uix-button-default:hover,.yt-uix-button-text:hover{border-color:#c6c6c6;background:#f0f0f0;box-shadow:0 1px 0 rgba(0,0,0,0.10)}.yt-uix-button-default:active,.yt-uix-button-default.yt-uix-button-toggled,.yt-uix-button-default.yt-uix-button-active,.yt-uix-button-default.yt-uix-button-active:focus,.yt-uix-button-text:active{border-color:#c6c6c6;background:#e9e9e9;box-shadow:inset 0 1px 0 #ddd}.yt-uix-button-default.yt-uix-button-toggled:hover{border-color:#b9b9b9;background:#e5e5e5;box-shadow:inset 0 1px 0 #ddd}.yt-uix-button-default,.yt-uix-button-default[disabled],.yt-uix-button-default[disabled]:hover,.yt-uix-button-default[disabled]:active,.yt-uix-button-default[disabled]:focus{border-color:#d3d3d3;background:#f8f8f8;color:#333}.yt-uix-button-default:before,.yt-uix-button-default .yt-uix-button-icon{opacity:.5;filter:alpha(opacity=50)}.yt-uix-button-default:hover .yt-uix-button-icon,.yt-uix-button-default:hover:before{opacity:.6;filter:alpha(opacity=60)}.yt-uix-button-default:active .yt-uix-button-icon,.yt-uix-button-default:active:before,.yt-uix-button-default.yt-uix-button-active .yt-uix-button-icon,.yt-uix-button-default.yt-uix-button-active:before,.yt-uix-button-default.yt-uix-button-toggled .yt-uix-button-icon,.yt-uix-button-default.yt-uix-button-toggled:before{opacity:.8;filter:alpha(opacity=80)}.yt-uix-button-default:active:hover .yt-uix-button-icon,.yt-uix-button-default:active:hover:before,.yt-uix-button-default.yt-uix-button-active:hover .yt-uix-button-icon,.yt-uix-button-default.yt-uix-button-active:hover:before,.yt-uix-button-default.yt-uix-button-toggled:hover .yt-uix-button-icon,.yt-uix-button-default.yt-uix-button-toggled:hover:before{opacity:1;filter:alpha(opacity=100)}.yt-uix-button-dark .yt-uix-button-icon,.yt-uix-button-dark:before{opacity:.4;filter:alpha(opacity=40)}.yt-uix-button-dark:hover .yt-uix-button-icon,.yt-uix-button-dark:hover:before{opacity:.55;filter:alpha(opacity=55)}.yt-uix-button-dark:active .yt-uix-button-icon,.yt-uix-button-dark:active:before,.yt-uix-button-dark.yt-uix-button-active .yt-uix-button-icon,.yt-uix-button-dark.yt-uix-button-active:before,.yt-uix-button-dark.yt-uix-button-toggled .yt-uix-button-icon,.yt-uix-button-dark.yt-uix-button-toggled:before{opacity:.85;filter:alpha(opacity=85)}.yt-uix-button-dark:active:hover .yt-uix-button-icon,.yt-uix-button-dark:active:hover:before,.yt-uix-button-dark.yt-uix-button-active:hover .yt-uix-button-icon,.yt-uix-button-dark.yt-uix-button-active:hover:before,.yt-uix-button-dark.yt-uix-button-toggled:hover .yt-uix-button-icon .yt-uix-button-dark.yt-uix-button-toggled:hover:before{opacity:1;filter:alpha(opacity=100)}.yt-uix-button-opacity,.yt-uix-button-opacity:hover,.yt-uix-button-dark-opacity,.yt-uix-button-dark-opacity:hover{box-shadow:none}.yt-uix-button-opacity{opacity:.5;filter:alpha(opacity=50)}.yt-uix-menu-top-level-flow-button .yt-uix-button-opacity{opacity:.4;filter:alpha(opacity=40)}.yt-uix-button-opacity:hover{opacity:.6;filter:alpha(opacity=60)}.yt-uix-menu-top-level-flow-button .yt-uix-button-opacity:hover{opacity:.5;filter:alpha(opacity=50)}.yt-uix-button-opacity:active,.yt-uix-button-opacity.yt-uix-button-active,.yt-uix-button-opacity.yt-uix-button-toggled,.yt-uix-menu-top-level-flow-button .yt-uix-button-opacity[disabled]{opacity:.8;filter:alpha(opacity=80)}.yt-uix-button-opacity:active:hover,.yt-uix-button-opacity.yt-uix-button-active:hover,.yt-uix-button-opacity.yt-uix-button-toggled:hover,.yt-uix-menu-top-level-flow-button .yt-uix-button-opacity[disabled]:hover{opacity:1;filter:alpha(opacity=100)}.yt-uix-button-opacity-dark{opacity:.4;filter:alpha(opacity=40)}.yt-uix-button-opacity-dark:hover{opacity:.55;filter:alpha(opacity=55)}.yt-uix-button-opacity-dark:active,.yt-uix-button-opacity-dark.yt-uix-button-active,.yt-uix-button-opacity-dark.yt-uix-button-toggled{opacity:.85;filter:alpha(opacity=85)}.yt-uix-button-opacity-dark:active:hover,.yt-uix-button-opacity-dark.yt-uix-button-active:hover,.yt-uix-button-opacity-dark.yt-uix-button-toggled:hover{opacity:1;filter:alpha(opacity=100)}.yt-uix-button-primary,.yt-uix-button-primary[disabled],.yt-uix-button-primary[disabled]:hover,.yt-uix-button-primary[disabled]:active,.yt-uix-button-primary[disabled]:focus{border-color:#167ac6;background:#167ac6;color:#fff}.yt-uix-button-primary:hover{background:#126db3}.yt-uix-button-primary:active,.yt-uix-button-primary.yt-uix-button-toggled,.yt-uix-button-primary.yt-uix-button-active,.yt-uix-button-primary.yt-uix-button-active:focus{background:#095b99;box-shadow:inset 0 1px 0 rgba(0,0,0,0.5)}.yt-uix-button-primary[disabled]:active,.yt-uix-button-primary[disabled].yt-uix-button-toggled{box-shadow:none}.yt-uix-button-destructive,.yt-uix-button-destructive[disabled],.yt-uix-button-destructive[disabled]:hover,.yt-uix-button-destructive[disabled]:active,.yt-uix-button-destructive[disabled]:focus{border-color:#cc181e;background:#cc181e;color:#fff}.yt-uix-button-destructive:hover{background:#b31217}.yt-uix-button-destructive:active,.yt-uix-button-destructive.yt-uix-button-toggled,.yt-uix-button-destructive.yt-uix-button-active,.yt-uix-button-destructive.yt-uix-button-active:focus{background:#990c11;box-shadow:inset 0 1px 0 rgba(0,0,0,0.5)}.yt-uix-button-destructive[disabled]:active,.yt-uix-button-destructive[disabled].yt-uix-button-toggled{box-shadow:none}.yt-uix-button-dark,.yt-uix-button-dark[disabled],.yt-uix-button-dark[disabled]:hover,.yt-uix-button-dark[disabled]:active,.yt-uix-button-dark[disabled]:focus{border-color:#333;background:#333;color:#fff}.yt-uix-button-dark:hover{background:#3c3c3c}.yt-uix-button-dark:active,.yt-uix-button-dark.yt-uix-button-toggled,.yt-uix-button-dark.yt-uix-button-active,.yt-uix-button-dark.yt-uix-button-active:focus{background:#1a1a1a;box-shadow:inset 0 1px 0 rgba(0,0,0,0.5)}.yt-uix-button-dark[disabled]:active,.yt-uix-button-dark[disabled].yt-uix-button-toggled{box-shadow:none}.yt-uix-button-light,.yt-uix-button-light[disabled],.yt-uix-button-light[disabled]:hover,.yt-uix-button-light[disabled]:active,.yt-uix-button-light[disabled]:focus{border-color:#666;background:#666;color:#fff}.yt-uix-button-light:hover{background:#6f6f6f}.yt-uix-button-light:active,.yt-uix-button-light.yt-uix-button-toggled,.yt-uix-button-light.yt-uix-button-active,.yt-uix-button-light.yt-uix-button-active:focus{background:#4d4d3d;box-shadow:inset 0 1px 0 rgba(0,0,0,0.5)}.yt-uix-button-light[disabled]:active,.yt-uix-button-light[disabled].yt-uix-button-toggled{box-shadow:none}.yt-uix-button-payment,.yt-uix-button-payment[disabled],.yt-uix-button-payment[disabled]:hover,.yt-uix-button-payment[disabled]:active,.yt-uix-button-payment[disabled]:focus{border-color:#61ad15;background:#61ad15;color:#fff}.yt-uix-button-payment:hover{background:#54900f}.yt-uix-button-payment:active,.yt-uix-button-payment.yt-uix-button-toggled,.yt-uix-button-payment.yt-uix-button-active,.yt-uix-button-payment.yt-uix-button-active:focus{background:#478509;box-shadow:inset 0 1px 0 rgba(0,0,0,0.5)}.yt-uix-button-payment[disabled]:active,.yt-uix-button-payment[disabled].yt-uix-button-toggled{box-shadow:none}.yt-uix-button-text,.yt-uix-button-text[disabled]{border:solid 1px transparent;outline:0;background:none;color:#333;box-shadow:none}.yt-uix-button-blue-text{border:solid 1px transparent;outline:0;background:none;box-shadow:none}.yt-uix-button-blue-text[disabled]{border:solid 1px transparent;outline:0;background:none;color:#333;box-shadow:none}.yt-uix-button-blue-text{color:#167ac6}.yt-uix-button-link{padding:0;border:none;height:auto;background:transparent;color:#167ac6;font-weight:normal;font-size:inherit;text-decoration:none;box-shadow:none}.yt-uix-button-link:active,.yt-uix-button-link:hover{background:transparent;text-decoration:underline;box-shadow:none}.yt-uix-button-link-strong{font-weight:500;font-size:12px}a.yt-uix-button{text-decoration:none;-moz-box-sizing:border-box;box-sizing:border-box}.yt-uix-button-group{display:inline-block;white-space:nowrap;vertical-align:middle}.yt-uix-button-group .yt-uix-button{margin-right:-1px;border-radius:0}.yt-uix-button-group .yt-uix-button:hover{position:relative;z-index:2147483645}.yt-uix-button-group .start{-moz-border-radius-topleft:2px;border-top-left-radius:2px;-moz-border-radius-bottomleft:2px;border-bottom-left-radius:2px}.yt-uix-button-group .end{margin-right:0;-moz-border-radius-topright:2px;border-top-right-radius:2px;-moz-border-radius-bottomright:2px;border-bottom-right-radius:2px}.yt-uix-button-arrow{margin-top:-3px;margin-left:5px;border:1px solid transparent;border-top-color:#333;border-width:4px 4px 0;width:0;height:0}.yt-uix-button-reverse .yt-uix-button-arrow{border-width:0 4px 4px;border-top-color:transparent;border-bottom-color:#333}.yt-uix-button-empty .yt-uix-button-arrow{margin-left:0}.yt-uix-button-primary .yt-uix-button-arrow,.yt-uix-button-destructive .yt-uix-button-arrow,.yt-uix-button-dark .yt-uix-button-arrow,.yt-uix-button-light .yt-uix-button-arrow,.yt-uix-button-payment .yt-uix-button-arrow{border-top-color:#fff}.yt-uix-button-primary.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-destructive.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-dark.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-light.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-payment.yt-uix-button-reverse .yt-uix-button-arrow{border-bottom-color:#fff}.yt-uix-button .yt-uix-button-menu{display:none}.yt-uix-button .yt-uix-button-menu:focus{outline:none}.yt-uix-button-menu{outline:none;padding:8px 0;position:absolute;border:1px solid #ccc;z-index:2147483647;overflow:auto;background:#fff;border-radius:2px}.yt-uix-button-menu-external{overflow:visible}.yt-uix-button-menu li{margin:0;padding:0}.yt-uix-button-menu li.yt-uix-button-menu-new-section-separator{padding-top:8px;margin-top:8px;border-top:1px solid #b8b8b8}.yt-uix-button-menu .yt-uix-button-menu-item{display:block;margin:0;padding:0 25px;color:#333;font-size:13px;text-decoration:none;white-space:nowrap;word-wrap:normal;line-height:25px;cursor:pointer;cursor:hand}.yt-uix-button-menu-item-selected .yt-uix-button-menu-item{font-weight:500}.yt-uix-button-menu .yt-uix-button-menu-item.selected,.yt-uix-button-menu .yt-uix-button-menu-item-highlight .yt-uix-button-menu-item,.yt-uix-button-menu .yt-uix-button-menu-item:hover{background-color:#333;color:#fff}.yt-uix-button-menu-mask{position:absolute;z-index:2147483646;opacity:0;filter:alpha(opacity=0);border:0;padding:0;margin:0}div.yt-uix-button-menu>table{background:#ebebeb;border-collapse:separate;border-spacing:1px}.yt-uix-button-menu .yt-uix-button-icon-checkbox{float:left;padding:5px 0 5px 4px}.yt-uix-button-menu .yt-uix-button-icon-dropdown-checked{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -718px -107px;background-size:auto;width:15px;height:14px}.yt-uix-button-menu li:hover .yt-uix-button-icon-dropdown-checked{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -16px -36px;background-size:auto;width:15px;height:14px}.yt-uix-button-icon-trash{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -63px -167px;background-size:auto;width:12px;height:16px}.yt-uix-button-icon-channel-back{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -546px -88px;background-size:auto;width:15px;height:10px}.rtl .yt-uix-button-icon-channel-back{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) 0 -134px;background-size:auto;width:15px;height:10px}.yt-uix-button-icon-dismissal{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -520px -149px;background-size:auto;width:20px;height:20px}.yt-uix-button-icon-settings{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -418px -116px;background-size:auto;width:16px;height:16px}.yt-uix-button-icon-settings-material{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -284px -193px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-view-list{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -284px -221px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-view-module{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -846px -204px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-close{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -512px -88px;background-size:auto;width:10px;height:10px}.yt-uix-button-icon-search{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -694px -43px;background-size:auto;width:15px;height:15px}.yt-uix-button-disabled-aria-label{display:none;opacity:0}.yt-uix-button[disabled]+.yt-uix-button-disabled-aria-label{display:block;position:absolute}.yt-uix-button.yt-uix-button-nakedicon{padding:0}.yt-uix-expander-arrow{vertical-align:middle;float:right;margin:0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -751px -176px;background-size:auto;width:16px;height:16px}.yt-uix-expander-arrow-left{vertical-align:middle;float:left;margin:0 5px 0 0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -751px -176px;background-size:auto;width:16px;height:16px}

.yt-uix-clickcard-content,.yt-uix-hovercard-content,* html .yt-uix-card-border-arrow,* html .yt-uix-card-body-arrow{display:none}.yt-uix-clickcard-card,.yt-uix-hovercard-card{position:absolute;z-index:2000000006;-moz-transition:opacity .2s ease-out;-webkit-transition:opacity .2s ease-out;transition:opacity .2s ease-out}.yt-uix-card-iframe-mask{position:absolute;z-index:2000000005}.yt-uix-clickcard-card-border,.yt-uix-hovercard-card-border{float:left;background:#fff;border:1px solid #c5c5c5;box-shadow:0 0 15px rgba(0,0,0,.18)}.yt-uix-clickcard-card-body,.yt-uix-hovercard-card-body{min-height:54px;overflow:hidden;font-size:13px;color:#555}.yt-uix-clickcard-card-content,.yt-uix-hovercard-card-content{display:block;padding:20px;width:235px;line-height:1.3em}.yt-uix-clickcard-title,.yt-uix-hovercard-title{margin-bottom:20px;font-weight:500;font-size:15px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-uix-hovercard-card-reverse .yt-uix-card-arrow{display:block}.ie7 .yt-uix-card-arrow,.ie8 .yt-uix-card-arrow{display:none}.yt-uix-card-arrow{position:absolute;display:none;top:-11px;width:24px;height:24px;margin-left:12px;overflow:hidden;-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-webkit-transform:rotate(45deg);transform:rotate(45deg);-moz-transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0}.yt-uix-card-arrow-background{position:absolute;top:0;-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-moz-transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0}.yt-uix-card-border-arrow,.yt-uix-card-body-arrow{position:absolute;width:0;height:0;vertical-align:top;background:none;border:12px solid transparent}.yt-uix-card-border-arrow-horizontal,.yt-uix-card-body-arrow-horizontal{border-right-width:0}.yt-uix-card-border-arrow-vertical,.yt-uix-card-body-arrow-vertical{bottom:-10px;border-bottom-width:0}.yt-uix-card-border-arrow-horizontal{right:-12px;border-left-color:#c5c5c5}.yt-uix-card-body-arrow-horizontal{right:-11px;border-left-color:#fff}.yt-uix-card-border-arrow-vertical{margin-bottom:-1px;border-top-color:#c5c5c5}.yt-uix-card-body-arrow-vertical{border-top-color:#fff}.yt-uix-clickcard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-clickcard-card-flip .yt-uix-card-body-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-body-arrow-horizontal{right:auto;border-right-width:12px;border-left-width:0;border-left-color:transparent}.yt-uix-clickcard-card-flip .yt-uix-card-border-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-border-arrow-horizontal{left:-12px;border-right-color:#c5c5c5}.yt-uix-clickcard-card-flip .yt-uix-card-body-arrow-horizontal,.yt-uix-hovercard-card-flip .yt-uix-card-body-arrow-horizontal{left:-11px;border-right-color:#fff}.yt-uix-clickcard-card-reverse .yt-uix-card-border-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0;top:-10px}.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0}.yt-uix-hovercard-card-reverse .yt-uix-card-border-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0;top:-10px}.yt-uix-hovercard-card-reverse .yt-uix-card-body-arrow-vertical{bottom:auto;border-bottom-width:12px;border-top-color:transparent;border-top-width:0}.yt-uix-clickcard-card-reverse .yt-uix-card-border-arrow-vertical,.yt-uix-hovercard-card-reverse .yt-uix-card-border-arrow-vertical{border-bottom-color:#c5c5c5;margin-top:-1px}.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical,.yt-uix-hovercard-card-reverse .yt-uix-card-body-arrow-vertical{top:-10px;border-bottom-color:#fff}.yt-uix-clickcard-close{float:right;margin:-5px -5px 5px 5px}#ie .yt-uix-card-body-arrow-vertical{border-top-color:#fff}.yt-uix-hovercard-target,.yt-uix-clickcard-target{cursor:pointer}.yt-uix-clickcard-promo .yt-uix-clickcard-card-border{background:#2793e6;border-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-card-body-arrow-vertical{border-top-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-card-body-arrow-horizontal{border-right-color:#2793e6}.yt-uix-clickcard-promo.yt-uix-clickcard-card-reverse .yt-uix-card-body-arrow-vertical{border-bottom-color:#2793e6}.yt-uix-clickcard-promo .yt-uix-clickcard-close{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -256px -21px;background-size:auto;width:20px;height:20px}.yt-uix-clickcard-promo .yt-uix-clickcard-card-body{color:#fff}.yt-uix-clickcard-promo.guide-hint{position:fixed}.signin-clickcard.yt-uix-clickcard-card-content{width:auto}.signin-clickcard-header{margin-bottom:15px;font-size:15px}.signin-clickcard-message{margin-bottom:10px;font-size:13px;line-height:1.3em}.signin-button.yt-uix-button{padding:0 40px;font-size:15px;height:35px}.signin-clickcard-header{margin-bottom:15px;font-size:15px}.signin-clickcard-message{margin-bottom:10px;font-size:13px;line-height:1.3em}.signin-button.yt-uix-button{padding:0 40px;font-size:15px;height:35px}.yt-commentbox{position:relative;margin:0 0 30px}

div#meta.ytd-watch-flexy {
display:none !important;
}

div#merch-shelf.ytd-watch-flexy {
display:none !important;
}

div#info.ytd-watch-flexy {
display:none !important;
}


div.yt-ui-menu-content {
left: 0px !important;
top: 27px !important;

}

/*

div#contentWrapper.tp-yt-iron-dropdown {
visibility: hidden !important;
}

ytd-comments {
display:none !important;
}

ytd-watch-metadata {
display:none !important;
}

*/

iframe {
    align:center;
}

#sandboxwatch {
visibility:hidden;
}

.subscribe-label,.subscribed-label,.unsubscribe-label,.unavailable-label,.yt-uix-button-subscribed-branded.hover-enabled:hover .subscribed-label,.yt-uix-button-subscribed-unbranded.hover-enabled:hover .subscribed-label{display:none;-moz-box-sizing:border-box;box-sizing:border-box}.yt-uix-button-subscribe-branded .subscribe-label,.yt-uix-button-subscribe-branded .unavailable-label,.yt-uix-button-subscribed-branded .subscribed-label,.yt-uix-button-subscribed-branded.hover-enabled:hover .unsubscribe-label,.yt-uix-button-subscribe-unbranded .subscribe-label,.yt-uix-button-subscribe-unbranded .unavailable-label,.yt-uix-button-subscribed-unbranded .subscribed-label,.yt-uix-button-subscribed-unbranded.hover-enabled:hover .unsubscribe-label{display:inline}.fixed-width .subscribe-label,.fixed-width .subscribed-label,.fixed-width .unsubscribe-label,.fixed-width .unavailable-label,.yt-uix-button-subscribed-branded.fixed-width.hover-enabled:hover .subscribed-label,.yt-uix-button-subscribed-unbranded.fixed-width.hover-enabled:hover .subscribed-label{display:block;height:0;visibility:hidden;-moz-box-sizing:border-box;box-sizing:border-box}.yt-uix-button-subscribe-branded.fixed-width .subscribe-label,.yt-uix-button-subscribe-branded.fixed-width .unavailable-label,.yt-uix-button-subscribed-branded.fixed-width .subscribed-label,.yt-uix-button-subscribed-branded.fixed-width.hover-enabled:hover .unsubscribe-label,.yt-uix-button-subscribe-unbranded.fixed-width .subscribe-label,.yt-uix-button-subscribe-unbranded.fixed-width .unavailable-label,.yt-uix-button-subscribed-unbranded.fixed-width .subscribed-label,.yt-uix-button-subscribed-unbranded.fixed-width.hover-enabled:hover .unsubscribe-label{height:auto;visibility:visible}.yt-uix-button-subscription-container.yt-uix-button-subscribe-branded.ypc-enabled.ypc-music-subscription-button:before,.yt-uix-button-subscribe-branded.ypc-enabled.ypc-freetrial-eligible:before{display:none}.yt-uix-button-subscribe-branded.ypc-enabled.ypc-freetrial-eligible .yt-uix-button-content{vertical-align:middle}.yt-uix-button-subscribe-unbranded .yt-uix-button-icon-wrapper,.yt-uix-button-subscribed-unbranded .yt-uix-button-icon-wrapper,.yt-uix-button-subscribe-unbranded .yt-uix-button-valign,.yt-uix-button-subscribed-unbranded .yt-uix-button-valign{display:none}.yt-uix-button-subscribe-unbranded.ypc-enabled .yt-uix-button-icon-wrapper,.yt-uix-button-subscribe-unbranded.ypc-enabled .yt-uix-button-valign{display:inline-block}.yt-uix-button-subscribe-unbranded.ypc-enabled.ypc-music-subscription-button:before,.yt-uix-button-subscribe-unbranded.ypc-enabled.ypc-freetrial-eligible:before{display:none}.yt-uix-button-subscribe-branded:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -721px -88px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-branded.ypc-enabled:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -19px -134px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-branded.ypc-unavailable:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -153px 0;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-unbranded.ypc-enabled:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -861px -232px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-unbranded.ypc-enabled:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -228px -72px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -898px -128px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.hover-enabled:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -479px -214px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.external:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -898px -112px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.hover-enabled.external:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -186px -28px;background-size:auto;width:16px;height:12px}


.exp-responsive .yt-lockup-tile .yt-lockup-byline .yt-uix-sessionlink{white-space:normal;word-wrap:break-word}

.watch-meta-item{clear:both}.yt-uix-expander-collapsed #watch-description-text{max-height:42px;overflow:hidden;padding-top:4px}.watch-info-tag-list a{white-space:nowrap}.watch-meta-item .watch-info-tag-list li{display:inline}.watch-meta-item .watch-info-tag-list li:after{content:normal;}.watch-meta-item .watch-info-tag-list li:last-child:after{content:normal;}.watch-meta-item.has-image .watch-info-tag-list li{display:list-item;line-height:15px}.watch-meta-item.has-image .watch-info-tag-list li:after{content:content:normal;}.watch-meta-item.has-image .metadata-row-image{float:left;margin-right:10px}.watch-meta-item.has-image .metadata-row-image img{width:40px}#limited-state-header{margin-bottom:8px}#watch-limited-actions{float:right;margin-top:10px}#watch-limited-actions a:not(:last-child){margin-right:4px}@media screen and (max-width:656px)

.yt-card .yt-card-title{font-size:15px;margin-bottom:10px}

a.yt-uix-button-epic-nav-item:hover,a.yt-uix-button-epic-nav-item.selected,a.yt-uix-button-epic-nav-item.yt-uix-button-toggled{height:29px;line-height:29px;border-bottom:3px solid;border-color:#cc181e;padding-bottom:0;display:inline-block}a.yt-uix-button-epic-nav-item.partially-selected{height:29px;line-height:29px;border-bottom:3px solid;padding-bottom:0;display:inline-block}a.yt-uix-button-epic-nav-item.partially-selected:hover,button.yt-uix-button-epic-nav-item:hover,button.yt-uix-button-epic-nav-item.selected,button.yt-uix-button-epic-nav-item.yt-uix-button-toggled,.epic-nav-item:hover,.epic-nav-item.selected,.epic-nav-item.yt-uix-button-toggled,.epic-nav-item-heading{height:29px;line-height:29px;border-bottom:3px solid;border-color:#cc181e;padding-bottom:0;display:inline-block}a.yt-uix-button-epic-nav-item.partially-selected{border-color:#767676}a.yt-uix-button-epic-nav-item.selected,a.yt-uix-button-epic-nav-item.yt-uix-button-toggled,button.yt-uix-button-epic-nav-item.selected,button.yt-uix-button-epic-nav-item.yt-uix-button-toggled,.epic-nav-item.selected,.epic-nav-item.yt-uix-button-toggled,.epic-nav-item-heading{color:#333;font-weight:500}.feed-header-feed-filter .yt-uix-button-epic-nav-item.selected,.feed-header-feed-filter .yt-uix-button-epic-nav-item:hover{border-bottom:3px solid;border-color:#cc181e;padding-bottom:0}.feed-header-feed-filter .yt-uix-button-epic-nav-item.selected{color:#333}.epic-nav-item-heading-icon{vertical-align:middle}.secondary-nav.yt-uix-button-epic-nav-item:hover,.secondary-nav.epic-nav-item:hover{border-bottom:0;color:#666}.yt-uix-button-group .start.epic-nav-item-heading,.yt-uix-button-group .end.epic-nav-item-heading,.yt-uix-button-group .start.yt-uix-button-epic-nav-item,.yt-uix-button-group .end.yt-uix-button-epic-nav-item{border-radius:0}.yt-uix-button-epic-nav-item .yt-uix-button-arrow{border:none;margin-right:-2px;margin-left:1px;margin-top:-1px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -571px -156px;background-size:auto;width:13px;height:13px}.yt-uix-button-epic-nav-item.selected:hover .yt-uix-button-arrow,.yt-uix-button-epic-nav-item.yt-uix-button-toggled:hover .yt-uix-button-arrow,.yt-uix-button-epic-nav-item:hover .yt-uix-button-arrow{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -63px -150px;background-size:auto;width:13px;height:13px}

#share-email .share-email{margin-top:50px}.share-embed-code{box-sizing:border-box;width:100%}.share-panel-embed-container hr{border-color:#ccc;border-style:solid;margin:1em 0}.share-embed-options{margin-top:10px}.share-embed-options li{margin-top:6px}.share-panel-embed-container form{overflow:auto}.share-size-options .yt-uix-form-input-select{margin:0 15px 0 10px}.share-panel-embed-legal{color:#767676;font-size:11px;line-height:3;vertical-align:middle}#share-embed-customize input{width:50px}#video-preview{text-align:center}@media screen and (max-width:656px){#share-preview{display:none}}.trimmer{visibility:hidden;position:absolute;top:-2px;bottom:-2px;background-color:#126db3;width:11px}.selected .trimmer{visibility:inherit}.trimmer,.trimmer *{font-size:0;padding:0;margin:0;border:0;z-index:3}.left-trimmer{left:-11px}.right-trimmer{right:-11px}.trimmer .trimmer-component-icon{opacity:.75}.trimmer button:hover .trimmer-component-icon,.trimmer .trimmer-component-icon:hover{opacity:1}.trimmer button.nudge-left,.trimmer button.nudge-right,.trimmer .knurling-grip,.trimmer .bottom-edge,.trimmer .top-edge{position:absolute}.trimmer .knurling-grip{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) 0 -29px;background-size:auto;width:5px;height:7px;top:50%;margin-top:-3.5px;left:3px}.trimmer .knurling-area{position:absolute;left:0;right:0;top:10px;bottom:10px;cursor:col-resize}.trimmer .knurling-area:hover .trimmer-component-icon{opacity:1}.trimmer button.nudge-left,.trimmer button.nudge-right{padding:3px;left:1px}button.nudge-left .nudge-left-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) -7px 0;background-size:auto;width:3px;height:5px}button.nudge-right .nudge-right-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) 0 0;background-size:auto;width:3px;height:5px}.left-trimmer .bottom-edge,.left-trimmer .top-edge{opacity:1;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) -7px -21px;background-size:auto;width:3px;height:4px;right:-3px}.right-trimmer .bottom-edge,.right-trimmer .top-edge{opacity:1;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) 0 -21px;background-size:auto;width:3px;height:4px;left:-3px}.trimmer .bottom-edge{bottom:0}.trimmer .top-edge{top:0}.trimmer button.nudge-left::-moz-focus-inner,.trimmer button.nudge-right::-moz-focus-inner{border:0;padding:0;margin:0}.trimmer button.nudge-left{top:3px;cursor:pointer}.trimmer button.nudge-right{bottom:7px;cursor:pointer}.trimmer .start-time,.trimmer .end-time{position:absolute;bottom:-20px;background:#126db3;color:#fff;font-size:9px;font-weight:500;padding:0 2px;height:12px;line-height:12px;visibility:hidden}.trimmer .start-time{left:0}.trimmer .end-time{right:0}.trimmer .tooltip-arrow{position:absolute;bottom:-8px;visibility:hidden}.left-trimmer .tooltip-arrow{left:0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) 0 -9px;background-size:auto;width:9px;height:8px}.right-trimmer .tooltip-arrow{right:0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfl1I-DMX.png) 0 -9px;background-size:auto;width:9px;height:8px}.clip-trimmer-container{width:500px;margin-bottom:15px}.clip-trimmer{width:482px;height:75px;background-color:#999;position:relative;top:10px;margin:0 auto;text-align:left;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.clip-trimmer .framestrip-slice{width:40px;height:75px;display:block;float:left;overflow:hidden;position:relative}.clip-trimmer .framestrip-slice.slice4,.clip-trimmer .framestrip-slice.slice8{width:41px}.clip-trimmer .framestrip-slice img{position:relative;margin-top:-7px;margin-left:-41px}.clip-trimmer .trimmer{visibility:visible}.clip-trimmer .grayout{background-color:#fff;opacity:.65;z-index:1;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=65)";filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=65);position:absolute;top:0;height:75px;box-shadow:inset 0 2px 5px #666;-moz-box-shadow:inset 0 2px 5px #666;-webkit-box-shadow:inset 0 2px 5px #666}.clip-trimmer .start-grayout{left:0}.clip-trimmer .end-grayout{right:0}.clip-trimmer .readout{font-size:11px;width:5em;position:absolute;text-align:left}.share-panel-gif-right{color:#333;margin-left:10px;position:relative;top:10px;float:left}.share-panel-gif-left{max-width:270px;float:left;margin:10px 20px 0}.share-panel-gif-time{display:inline-block;width:130px}.share-panel-gif-end-at{padding-left:6px}.share-panel-gif-time label{display:block;width:130px}.share-panel-gif-time span input{display:block;width:110px}.share-panel-gif-start-at,.share-panel-gif-end-at,.share-panel-gif-text{margin-bottom:10px}.share-panel-gif-time-input{width:50px}.share-panel-gif-times{margin-bottom:10px}#share-panel-gif-trimmer-container{margin-left:5px;width:600px}.share-panel-gif-bold{text-transform:uppercase;font-weight:500;margin-right:10px}.share-panel-gif-iframe-container,.share-panel-gif-url-container{height:22px;width:250px;color:#666;margin-right:5px}.share-panel-gif-services-container,.share-panel-gif-button{margin-bottom:10px}.share-panel-gif-url-container,.share-panel-gif-iframe-container{margin-bottom:40px}.gif-suggestion-loading-spinner.loading{display:inline-block;height:34px}.gif-suggestion-loading-spinner .yt-spinner-img{margin-bottom:10px;margin-left:4px}.gif-suggestion-loading-spinner{display:none}.gif-preview-container{width:320px}.gif-preview-container .loading-gif-preview{display:none}.gif-preview-container.loading .loading-gif-preview{display:block}.gif-preview-container.loading .loading-gif-preview .yt-spinner{padding-top:70px}.gif-preview-container .animated-gif-preview-img{display:block}.gif-preview-container.loading .animated-gif-preview-img{display:none}.loading-gif-result .yt-spinner{padding-top:100px;padding-bottom:100px;width:600px}.animated-gif-preview-img{display:block;max-width:268px;max-height:152px;width:auto;height:auto}.share-panel-gif-options label{display:inline-block;min-width:90px}#share-panel-gif-trimmer{width:560px;margin-left:15px;margin-bottom:10px}#share-panel-gif-trimmer .clip-trimmer{width:560px}#share-panel-gif-trimmer .framestrip-slice{width:47px}#share-panel-gif-trimmer .framestrip-slice.slice1,#share-panel-gif-trimmer .framestrip-slice.slice4,#share-panel-gif-trimmer .framestrip-slice.slice7,#share-panel-gif-trimmer .framestrip-slice.slice10{width:46px}#share-panel-gif-trimmer .readout{display:none}

#watch7-subscription-container .channel-settings-link{height:24px}#watch7-subscription-container .channel-settings-link:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -20px -161px;background-size:auto;width:20px;height:20px}

span.yt-view-count-renderer {
    line-height: 24px;
    max-height: 24px;
    text-align: right;
    font-size: 19px;
    color: #666;
    white-space: nowrap;
    margin-bottom: 2px;
}
#watch-action-panels{position:relative}#action-panel-dismiss{position:absolute;top:3px;right:3px}#action-panel-stats.action-panel-content{padding:0;width:100%}#action-panel-details a{color:#333}#action-panel-details:hover a{color:#167ac6}.action-panel-login,.action-panel-loading,.action-panel-error{padding:20px;text-align:center}.action-panel-loading,.action-panel-error{color:#666}
.yt-uix-button-menu-item-selected .yt-uix-button-menu-item{font-weight:500 !important;}
.yt-uix-form-label .yt-uix-form-input-text,.yt-uix-form-label .yt-uix-form-input-textarea{display:block}.yt-uix-form-label .yt-uix-form-input-text-container,.yt-uix-form-label .yt-uix-form-input-textarea-container,.yt-uix-form-label .yt-uix-form-input-select{margin-top:5px}.yt-uix-form-error{font-weight:normal;color:#e52d27}.yt-uix-form-error .yt-uix-form-error-message{display:block}.yt-uix-form-error input,.yt-uix-form-error input:hover,.yt-uix-form-error textarea,.yt-uix-form-error textarea:hover,.yt-uix-form-error .yt-uix-form-input-checkbox-element,.yt-uix-form-error.yt-uix-form-input-checkbox-container:hover .yt-uix-form-input-checkbox-element,.yt-uix-form-error .yt-uix-form-input-radio-element,.yt-uix-form-error.yt-uix-form-input-radio-container:hover .yt-uix-form-input-radio-element{border-color:#e52d27}.yt-uix-form-error .yt-uix-form-input-text,.yt-uix-form-error .yt-uix-form-input-textarea{margin-bottom:5px;margin-right:5px}.yt-uix-form-input-select,.yt-uix-form-input-text,.yt-uix-form-input-textarea{border:1px solid #d3d3d3;color:#333}.yt-uix-form-input-select:hover,.yt-uix-form-input-text:hover,.yt-uix-form-input-textarea:hover{border-color:#b9b9b9}.yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-element,.yt-uix-form-input-text,.yt-uix-form-input-textarea{box-shadow:inset 0 0 1px rgba(0,0,0,.05)}.yt-uix-form-input-checkbox-container:hover .yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-container:hover .yt-uix-form-input-radio-element{border-color:#b9b9b9}.yt-uix-form-input-select.focused,.yt-uix-form-input-checkbox:focus+.yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio:focus+.yt-uix-form-input-radio-element,.yt-uix-form-input-text:focus,.yt-uix-form-input-textarea:focus{outline:0;border-color:#167ac6;box-shadow:inset 0 0 1px rgba(0,0,0,.1)}.yt-uix-form-input-select{position:relative;display:inline-block;font-weight:500;font-size:11px;vertical-align:middle;cursor:pointer;text-shadow:0 1px 0 rgba(255,255,255,.5);background-color:#f8f8f8;filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#fffcfcfc,EndColorStr=#fff8f8f8);background-image:-moz-linear-gradient(top,#fcfcfc 0,#f8f8f8 100%);background-image:-ms-linear-gradient(top,#fcfcfc 0,#f8f8f8 100%);background-image:-o-linear-gradient(top,#fcfcfc 0,#f8f8f8 100%);background-image:-webkit-linear-gradient(top,#fcfcfc 0,#f8f8f8 100%);background-image:linear-gradient(to bottom,#fcfcfc 0,#f8f8f8 100%)}.yt-uix-form-input-select.hid{display:none}body .yt-uix-form-input-select-disabled{opacity:.6;filter:alpha(opacity=60)}.yt-uix-form-input-select-element{position:relative;height:26px;padding:0 16px;-webkit-appearance:none;-moz-appearance:none;opacity:0;filter:alpha(opacity=0);_filter:none}#ie .yt-uix-form-input-select-element,.ie .yt-uix-form-input-select-element{min-width:100px;padding:0;font-size:13px}.yt-uix-form-input-select-element option{padding:0}.yt-uix-form-input-select-content{position:absolute;top:0;left:0;width:100%;height:100%;line-height:26px}.yt-uix-form-input-select-value{display:block;margin:0 10px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}#ie .yt-uix-form-input-select-value,.ie .yt-uix-form-input-select-value{margin:0 5px;*margin:0 0 0 5px}.yt-uix-form-input-select-arrow{float:right;width:0;height:0;border:1px solid transparent;border-width:4px 4px 0;border-top-color:#666;margin-top:11px;margin-right:10px}.yt-uix-form-input-text{width:250px;padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px}.yt-uix-form-input-textarea{padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px;width:550px;resize:vertical}.yt-uix-form-input-textarea[disabled],.yt-uix-form-input-text[disabled]{opacity:.4;filter:alpha(opacity=40)}.yt-uix-form-input-text::-webkit-input-placeholder{color:#767676}.yt-uix-form-input-textarea::-webkit-input-placeholder{color:#767676}.yt-uix-form-input-text:-moz-placeholder,.yt-uix-form-input-textarea:-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-text::-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-textarea::-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-text:-ms-input-placeholder,.yt-uix-form-input-textarea:-ms-input-placeholder,.yt-uix-form-input-placeholder{color:#767676}.yt-uix-form-input-placeholder-container{position:relative;display:inline-block}.ie .yt-uix-form-input-placeholder{display:inline}.ie.ie10 .yt-uix-form-input-placeholder,.ie.ie11 .yt-uix-form-input-placeholder{display:none}.ie .yt-uix-form-input-container.yt-uix-form-input-fluid-container,.ie .yt-uix-form-label .yt-uix-form-input-container,.yt-uix-form-input-fluid.yt-uix-form-input-placeholder-container{display:block}.yt-uix-form-input-placeholder-container{overflow:hidden}.yt-uix-form-input-placeholder{display:none;position:absolute;top:8px;left:9px;font-weight:normal;line-height:13px;font-size:13px;text-transform:none}.ie .yt-uix-form-error .yt-uix-form-input-text,.ie .yt-uix-form-error .yt-uix-form-input-textarea{margin-bottom:0;margin-right:0}.ie .yt-uix-form-error .yt-uix-form-input-placeholder-container{margin-bottom:5px;margin-right:5px}.ie .yt-uix-form-input-non-empty .yt-uix-form-input-placeholder,.ie .yt-uix-form-input-text:focus+.yt-uix-form-input-placeholder,.ie .yt-uix-form-input-textarea:focus+.yt-uix-form-input-placeholder{display:none}.yt-uix-form-input-text+.yt-uix-form-input-placeholder{white-space:nowrap}.yt-uix-form-input-radio{width:14px;height:14px}.yt-uix-form-input-radio-element{width:14px;height:14px;border-radius:50%}#ie .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.ie8 .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.ie7 .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -469px -139px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox,.yt-uix-form-input-checkbox-element{width:14px;height:14px}#ie .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element,.ie8 .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element,.ie7 .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -42px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element{border:1px solid #36649c;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -42px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox-container.partial .yt-uix-form-input-checkbox-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -238px -522px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-radio-container,.yt-uix-form-input-checkbox-container{position:relative;display:inline-block;height:20px;line-height:0;font-size:0;vertical-align:middle}.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-element{border:1px solid #c6c6c6;display:inline-block;vertical-align:middle;cursor:pointer}.ie8 .yt-uix-form-input-radio-element{border:0}.yt-uix-form-input-radio-container input:focus+.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-container input:focus+.yt-uix-form-input-checkbox-element{border:1px solid #4496e7;margin:0}.yt-uix-form-input-radio-container input[disabled]+.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-container input[disabled]+.yt-uix-form-input-checkbox-element{cursor:default;opacity:.4;filter:alpha(opacity=40)}.yt-uix-form-input-radio-container input,.yt-uix-form-input-checkbox-container input{cursor:pointer;position:absolute;top:1px;left:1px;border:0;outline:0;margin:0;padding:0;-moz-appearance:none;-webkit-appearance:none}.yt-uix-form-input-container.yt-uix-form-input-fluid-container{display:block;overflow:hidden;padding-bottom:1px}.yt-uix-form-input-fluid{display:block;overflow:hidden;padding-bottom:1px;padding-right:22px}.yt-uix-form-input-fluid .yt-uix-form-input-text,.yt-uix-form-input-fluid .yt-uix-form-input-textarea{width:100%}.yt-uix-form-select-fluid{overflow:hidden;padding-right:2px}.yt-uix-form-select-fluid .yt-uix-form-input-select,.yt-uix-form-select-fluid select{width:100%}.yt-uix-checkbox-on-off{position:relative;display:inline-block;width:35px;height:15px;padding-right:2px;overflow:hidden;vertical-align:middle;cursor:pointer}.yt-uix-checkbox-on-off input[type=checkbox]{position:absolute;margin:0;width:37px;height:15px;opacity:0}.yt-uix-checkbox-on-off label{display:inline-block;border:1px solid transparent;height:13px;width:100%;background:#b8b8b8;border-radius:20px}.yt-uix-checkbox-on-off input[type=checkbox]:checked+label{background-color:#167ac6}.yt-uix-checkbox-on-off label>*{display:inline-block;height:100%;vertical-align:top;-moz-transition:width .1s;-webkit-transition:width .1s;transition:width .1s}.yt-uix-checkbox-on-off .checked{text-align:center;line-height:13px}.yt-uix-checkbox-on-off .checked:before{content:'';display:inline-block;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -407px;background-size:auto;width:10px;height:7px}.yt-uix-checkbox-on-off .toggle{background:#fbfbfb;width:13px;border-radius:13px}.yt-uix-checkbox-on-off .checked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .unchecked{width:0}.yt-uix-checkbox-on-off .unchecked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .checked{width:22px}.yt-uix-checkbox-on-off input[type=checkbox]:disabled+label{opacity:.5}.yt-uix-checkbox-on-off.large{width:54px;height:24px}.yt-uix-checkbox-on-off.large input[type=checkbox]{width:56px;height:24px}.yt-uix-checkbox-on-off.large label{height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .checked{line-height:22px}.yt-uix-checkbox-on-off.large label .toggle{width:22px;height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .unchecked,.yt-uix-checkbox-on-off.large input[type=checkbox]:checked+label .checked{width:32px}.yt-uix-form-input-paper-toggle-container{display:inline-block;vertical-align:baseline;position:relative;top:5px;width:36px;height:14px}.yt-uix-form-input-paper-toggle-container:hover{cursor:pointer}.yt-uix-form-input-paper-toggle-container input{position:absolute;width:0;height:0;opacity:0}.yt-uix-form-input-paper-toggle-bar{position:absolute;height:100%;width:100%;border-radius:8px;background-color:#000;opacity:.26;-moz-transition:background-color linear .08s;-webkit-transition:background-color linear .08s;transition:background-color linear .08s}.yt-uix-form-input-paper-toggle-button{position:absolute;top:-3px;height:20px;width:20px;border-radius:50%;box-shadow:0 1px 5px 0 rgba(0,0,0,.4);background-color:#f1f1f1;-moz-transition:transform linear .08s,background-color linear .08s;-webkit-transition:transform linear .08s,background-color linear .08s;transition:transform linear .08s,background-color linear .08s}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-bg{background-color:#4285f4}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-bar{opacity:.5}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-button{-moz-transform:translate(16px,0);-ms-transform:translate(16px,0);-webkit-transform:translate(16px,0);transform:translate(16px,0)}.yt-uix-menu-container,.yt-uix-menu{display:inline-block;position:relative}.yt-uix-menu-content{position:absolute;z-index:2000000100}.yt-uix-menu-content .yt-uix-menu,.yt-uix-menu-trigger{width:100%}.yt-uix-menu-content-hidden{display:none}.yt-uix-menu .yt-uix-menu-mask,.yt-uix-menu .yt-uix-menu-content{left:100%;top:0}.yt-uix-menu.yt-uix-menu-sibling-content>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-sibling-content>.yt-uix-menu-content{left:auto;top:0}.yt-uix-menu.yt-uix-menu-reversed>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-reversed>.yt-uix-menu-content{top:auto;bottom:0}.yt-uix-menu.yt-uix-menu-flipped>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-flipped>.yt-uix-menu-content{right:100%;left:auto}.yt-uix-menu-mask{border:0;filter:alpha(opacity=0);margin:0;opacity:0;overflow:visible;padding:0;position:absolute;z-index:2000000099}.yt-uix-menu-top-level-button-container,.yt-uix-menu-top-level-button{display:inline-block}.yt-uix-menu-top-level-flow-button{margin-left:4px}.yt-uix-menu-top-level-button .yt-uix-button-opacity{padding:0}

.attachment-editor-poll-option.yt-uix-form-error .yt-uix-form-input-text:focus{border-color:#e52d27}

.yt-alert-actionable .yt-uix-button-alert-warn:hover{background:#edc947}.yt-alert-actionable .yt-uix-button-alert-warn:active,.yt-alert-actionable .yt-uix-button-alert-warn.yt-uix-button-toggled{background:#a55e1a;border-color:#8a4f16;box-shadow:0 0 0 #000,0 0 1px rgba(255,255,255,.25),inset 0 1px 3px rgba(0,0,0,.25)}.yt-alert-default.yt-alert-success,.yt-alert-actionable.yt-alert-success,.yt-alert-naked.yt-alert-success .yt-alert-icon,.yt-alert-small.yt-alert-success{background:#167ac6}.yt-alert-actionable.yt-alert-success .icon,.yt-alert-default.yt-alert-success .icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -544px -127px;background-size:auto;width:20px;height:21px}.yt-alert-naked.yt-alert-success .icon,.yt-alert-small.yt-alert-success .icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -106px 0;background-size:auto;width:19px;height:20px}.yt-alert-actionable .yt-uix-button-alert-success{border:1px solid rgba(0,0,0,.2);background:transparent}.yt-alert-actionable .yt-uix-button-alert-success:hover{background:#126db3}.yt-alert-actionable .yt-uix-button-alert-success:active,.yt-alert-actionable .yt-uix-button-alert-success.yt-uix-button-toggled{background:#356d9b;border-color:#4d6c2e;box-shadow:0 0 0 #000,0 0 1px rgba(255,255,255,.25),inset 0 1px 3px rgba(0,0,0,.25)}.yt-alert-default.yt-alert-info,.yt-alert-actionable.yt-alert-info,.yt-alert-naked.yt-alert-info .yt-alert-icon,.yt-alert-small.yt-alert-info{background:#167ac6}.yt-alert-default.yt-alert-info .icon,.yt-alert-actionable.yt-alert-info .icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -36px -86px;background-size:auto;width:20px;height:21px}.yt-alert-naked.yt-alert-info .icon,.yt-alert-small.yt-alert-info .icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -822px -112px;background-size:auto;width:20px;height:20px}.yt-alert-actionable .yt-uix-button-alert-info{border:1px solid rgba(0,0,0,.2);background:transparent}.yt-alert-actionable .yt-uix-button-alert-info:hover{background:#126db3}.yt-alert-actionable .yt-uix-button-alert-info:active,.yt-alert-actionable .yt-uix-button-alert-info.yt-uix-button-toggled{border-color:#2c5b82;background:#356d9b;box-shadow:0 0 0 #000,0 0 1px rgba(255,255,255,.25),inset 0 1px 3px rgba(0,0,0,.25)}

.yt-alert-actionable .yt-alert-buttons .yt-uix-button-toggled .yt-uix-button-arrow{border-top-color:transparent;border-bottom-color:#fff;border-width:0 4px 4px}.yt-alert-panel{padding:10px 20px;margin:0 2px 2px;background:#fff}.yt-alert .close{padding:0;margin:6px 0;border:none;overflow:hidden;cursor:pointer;box-shadow:none;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -256px -21px;background-size:auto;width:20px;height:20px}.yt-alert.yt-alert-warn .close{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -479px -136px;background-size:auto;width:20px;height:20px}.yt-alert .close .yt-uix-button-content{display:none}.yt-alert .close:hover{background-color:rgba(0,0,0,.15);border-radius:3px}.yt-alert.yt-alert-actionable .close{margin-left:6px;padding:0}.yt-alert-error-multiple-list{font-weight:500;line-height:1.4;list-style:disc;margin-left:20px}#yt-lang-alert-container .yt-alert-icon .master-sprite{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -692px -88px;background-size:auto;width:25px;height:15px}#yt-lang-alert-content{overflow:hidden;line-height:20px}#yt-lang-alert-content .yt-lang-alert-controls{float:right;margin-left:10px;line-height:normal;font-size:11px}#yt-lang-alert-content .yt-uix-button{margin-top:-2px}#yt-lang-alert-content .view-all{white-space:nowrap}.yt-card{margin:0 0 10px;border:0;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.1);-moz-box-sizing:border-box;box-sizing:border-box}.kevlar-homepage .yt-card.kevlar-homepage-styling{box-shadow:none}.yt-card.yt-card-has-padding{padding:15px}.yt-card .yt-card-title{font-size:15px;margin-bottom:10px}.yt-card.yt-card-has-padding .yt-alert{margin:-15px -15px 15px}.yt-card.yt-card-has-padding .yt-alert.yt-alert-naked{margin:0}.yt-card .yt-uix-button-expander{display:block;width:100%;text-transform:uppercase;color:#767676;border-top:1px solid #e2e2e2;box-shadow:none}.yt-card .yt-uix-button-expander:hover{color:#222}.yt-card.yt-uix-expander .yt-uix-button-expander,.yt-card .yt-uix-expander .yt-uix-button-expander{margin:10px 0 -15px}.watch-inline-edit-active button.yt-uix-button-expander{display:none}.yt-card .yt-uix-tabs{margin-bottom:15px;border-bottom:1px solid #e2e2e2}.yt-card .yt-uix-tabs .yt-uix-button{margin-right:40px;margin-bottom:-1px;padding:0 0 8px;border-width:0 0 2px;border-radius:0;opacity:.5;filter:alpha(opacity=50)}.yt-card .yt-uix-tabs .yt-uix-button:hover,.yt-card .yt-uix-tabs .yt-uix-button:active,.yt-card .yt-uix-tabs .yt-uix-button.yt-uix-button-active,.yt-card .yt-uix-tabs .yt-uix-button.yt-uix-button-toggled{border-bottom-color:#cc181e;background:none;opacity:1;filter:none}

.subscribe-label,.subscribed-label,.unsubscribe-label,.unavailable-label,.yt-uix-button-subscribed-branded.hover-enabled:hover .subscribed-label,.yt-uix-button-subscribed-unbranded.hover-enabled:hover .subscribed-label{display:none;-moz-box-sizing:border-box;box-sizing:border-box}.yt-uix-button-subscribe-branded .subscribe-label,.yt-uix-button-subscribe-branded .unavailable-label,.yt-uix-button-subscribed-branded .subscribed-label,.yt-uix-button-subscribed-branded.hover-enabled:hover .unsubscribe-label,.yt-uix-button-subscribe-unbranded .subscribe-label,.yt-uix-button-subscribe-unbranded .unavailable-label,.yt-uix-button-subscribed-unbranded .subscribed-label,.yt-uix-button-subscribed-unbranded.hover-enabled:hover .unsubscribe-label{display:inline}.fixed-width .subscribe-label,.fixed-width .subscribed-label,.fixed-width .unsubscribe-label,.fixed-width .unavailable-label,.yt-uix-button-subscribed-branded.fixed-width.hover-enabled:hover .subscribed-label,.yt-uix-button-subscribed-unbranded.fixed-width.hover-enabled:hover .subscribed-label{display:block;height:0;visibility:hidden;-moz-box-sizing:border-box;box-sizing:border-box}.yt-uix-button-subscribe-branded.fixed-width .subscribe-label,.yt-uix-button-subscribe-branded.fixed-width .unavailable-label,.yt-uix-button-subscribed-branded.fixed-width .subscribed-label,.yt-uix-button-subscribed-branded.fixed-width.hover-enabled:hover .unsubscribe-label,.yt-uix-button-subscribe-unbranded.fixed-width .subscribe-label,.yt-uix-button-subscribe-unbranded.fixed-width .unavailable-label,.yt-uix-button-subscribed-unbranded.fixed-width .subscribed-label,.yt-uix-button-subscribed-unbranded.fixed-width.hover-enabled:hover .unsubscribe-label{height:auto;visibility:visible}.yt-uix-button-subscription-container.yt-uix-button-subscribe-branded.ypc-enabled.ypc-music-subscription-button:before,.yt-uix-button-subscribe-branded.ypc-enabled.ypc-freetrial-eligible:before{display:none}.yt-uix-button-subscribe-branded.ypc-enabled.ypc-freetrial-eligible .yt-uix-button-content{vertical-align:middle}.yt-uix-button-subscribe-unbranded .yt-uix-button-icon-wrapper,.yt-uix-button-subscribed-unbranded .yt-uix-button-icon-wrapper,.yt-uix-button-subscribe-unbranded .yt-uix-button-valign,.yt-uix-button-subscribed-unbranded .yt-uix-button-valign{display:none}.yt-uix-button-subscribe-unbranded.ypc-enabled .yt-uix-button-icon-wrapper,.yt-uix-button-subscribe-unbranded.ypc-enabled .yt-uix-button-valign{display:inline-block}.yt-uix-button-subscribe-unbranded.ypc-enabled.ypc-music-subscription-button:before,.yt-uix-button-subscribe-unbranded.ypc-enabled.ypc-freetrial-eligible:before{display:none}.yt-uix-button-subscribe-branded:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -256px -470px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-branded.ypc-enabled:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -313px -139px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-branded.ypc-unavailable:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -14px -525px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-unbranded.ypc-enabled:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -417px -43px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribe-unbranded.ypc-enabled:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -111px -443px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -256px -24px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.hover-enabled:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -241px -293px;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.external:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -200px 0;background-size:auto;width:16px;height:12px}.yt-uix-button-subscribed-branded.hover-enabled.external:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -342px -293px;background-size:auto;width:16px;height:12px}.yt-subscription-button-disabled-mask-container{position:relative;display:inline-block}.yt-subscription-button-disabled-mask{display:none;position:absolute;top:0;right:0;bottom:0;left:0}.yt-subscription-button-disabled-mask-container .yt-subscription-button-disabled-mask{display:block}.yt-uix-subscription-preferences-button{display:none;margin-left:-2px;padding:0 4px;height:24px;border-radius:0 2px 2px 0}.yt-uix-button-subscribed-branded+.yt-uix-subscription-preferences-button{display:inline-block}.yt-uix-subscription-preferences-button .yt-uix-button-icon-wrapper{height:13px}.yt-uix-subscription-preferences-button:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -106px -122px;background-size:auto;width:18px;height:18px}.yt-uix-subscription-preferences-button.yt-uix-subscription-notifications-all:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -264px 0;background-size:auto;width:18px;height:18px}.yt-uix-subscription-preferences-button.yt-uix-subscription-notifications-none:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -84px -139px;background-size:auto;width:18px;height:18px}.yt-subscription-button-subscriber-count-branded-horizontal,.yt-subscription-button-subscriber-count-unbranded-horizontal{display:none;margin-left:-2px;border:1px solid #ccc;background-color:#fafafa;vertical-align:middle;border-radius:0 2px 2px 0}.yt-subscription-button-subscriber-count-branded-horizontal.yt-uix-tooltip,.yt-subscription-button-subscriber-count-unbranded-horizontal.yt-uix-tooltip{display:none}.yt-uix-button-subscribe-branded+.yt-subscription-button-subscriber-count-branded-horizontal,.yt-uix-button-subscribe-unbranded+.yt-subscription-button-subscriber-count-unbranded-horizontal,.yt-uix-button-subscribe-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal,.yt-uix-button-subscribed-branded+.yt-subscription-button-subscriber-count-branded-horizontal.subscribed,.yt-uix-button-subscribed-unbranded+.yt-subscription-button-subscriber-count-unbranded-horizontal.subscribed,.yt-uix-button-subscribed-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal.subscribed{display:inline-block}.yt-subscription-button-subscriber-count-branded-horizontal,.yt-subscription-button-subscriber-count-unbranded-horizontal{padding:0 6px;color:#737373;font-size:11px;text-align:center}.yt-subscription-button-subscriber-count-branded-horizontal{height:22px;line-height:24px}.yt-subscription-button-subscriber-count-unbranded-horizontal{height:18px;line-height:20px}.yt-uix-button-subscribe-branded+.yt-subscription-button-subscriber-count-branded-horizontal,.yt-uix-button-subscribe-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal,.yt-uix-button-subscribed-branded.external+.yt-subscription-button-subscriber-count-branded-horizontal,.yt-uix-button-subscribed-branded.external+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal{border-left:none;padding-left:7px}.yt-subscribe-button-right{float:right}.yt-material-subscribe-button .yt-uix-button.yt-uix-button-subscribe-branded,.yt-material-subscribe-button .yt-uix-button.yt-uix-button-subscribed-branded{border:none;padding:10px 16px;height:initial}.yt-material-subscribe-button .yt-uix-button-subscribe-branded:before,.yt-material-subscribe-button .yt-uix-button-subscribed-branded:before{display:none}.yt-material-subscribe-button .yt-uix-button-subscribe-branded .yt-uix-button-content,.yt-material-subscribe-button .yt-uix-button-subscribed-branded .yt-uix-button-content{font-size:14px;font-weight:500;letter-spacing:.007px;text-transform:uppercase}.yt-material-subscribe-button .yt-subscriber-count{margin:0 0 0 4px;padding:0;background:initial;border:initial;line-height:initial;vertical-align:initial;font-size:inherit}.yt-material-subscribe-button .yt-uix-button.yt-uix-button-subscribe-branded{background-color:hsl(3,81.8%,49.6%);color:#fff}.yt-material-subscribe-button .yt-uix-button.yt-uix-button-subscribed-branded{background-color:hsl(0,0%,93.3%);color:hsla(0,0%,6.7%,.6)}.yt-material-subscribe-button .yt-subscriber-count:before{content:' '}.yt-material-subscribe-button .yt-uix-button-subscribe-branded .yt-subscription-button-subscriber-count-branded-horizontal.yt-subscriber-count{color:rgba(255,255,255,0.8)}.yt-material-subscribe-button .yt-uix-button-subscribed-branded .yt-subscription-button-subscriber-count-branded-horizontal.yt-subscriber-count{color:rgba(17,17,17,0.6)}.yt-material-subscribe-button .yt-uix-button-subscribed-branded.hover-enabled:hover .subscribed-label{display:initial}.yt-material-subscribe-button .yt-uix-button-subscribed-branded.hover-enabled:hover .unsubscribe-label{display:none}.yt-material-subscribe-button .yt-uix-subscription-preferences-button{margin-left:10px}

#legal-report-details-form-renderer .yt-dialog-content{font-size:13px;line-height:1.5em;padding-top:5px;width:340px;word-wrap:break-word}#legal-report-details-form-renderer label{padding:3px 0}#legal-report-details-form-renderer .yt-dialog-footer{padding-top:16px}#legal-report-details-form-renderer .yt-dialog-footer button{margin-left:8px}#legal-report-details-form-renderer .legal-report-details-form-renderer-description-label{margin-bottom:8px}#legal-report-details-form-renderer .legal-report-details-form-renderer-description{width:310px}#legal-report-details-form-renderer .legal-report-details-form-renderer-issue-type-label,#legal-report-details-form-renderer .legal-report-details-form-renderer-affiliation-label,#legal-report-details-form-renderer .legal-report-details-form-renderer-name-label{margin-top:12px;margin-bottom:8px}#legal-report-details-form-renderer .legal-report-details-form-renderer-name{width:310px}#legal-report-details-form-renderer .legal-report-details-form-renderer-footer-text{margin-top:18px;font-size:11px;color:#b8b8b8;line-height:normal}.options-renderer-captcha,.options-renderer-form,.options-renderer-confirmation,.options-renderer-message-abuse,.options-renderer-message-continue,.options-renderer-message-required,.options-renderer-message-confirm,.options-renderer-message-review,.options-renderer-message-redirect,.options-renderer-form-other,.options-renderer-button-back,.options-renderer-button-submit,.options-renderer-button-continue{display:none}.options-renderer-step1 .options-renderer-captcha,.options-renderer-step1 .options-renderer-message-review,.options-renderer-step1 .options-renderer-button-continue,.options-renderer-step2 .options-renderer-form,.options-renderer-step2 .options-renderer-message-review,.options-renderer-step2 .options-renderer-message-required,.options-renderer-step2 .options-renderer-button-submit,.options-renderer-step3 .options-renderer-confirmation,.options-renderer-step3 .options-renderer-message-confirm,.options-renderer-step3 .options-renderer-button-continue,.options-renderer-step4 .options-renderer-button-continue,.options-renderer-step4 .options-renderer-form-other,.options-renderer-step4 .options-renderer-message-abuse,.options-renderer-step4 .options-renderer-message-continue,.options-renderer-step4 .options-renderer-message-required,.options-renderer-step4 .options-renderer-button-back,.options-renderer-step5 .options-renderer-message-redirect{display:block}.options-renderer{position:relative;width:100%}.options-renderer-info{position:relative;border-bottom:1px solid #ddd;padding:5px 0 15px 160px;height:75px}.options-renderer-step3 .options-renderer-info{margin-top:5px;border-bottom:none;padding-bottom:0}.options-renderer-info p{padding:2px 0}.options-renderer-info .video-thumb{position:absolute;top:0;left:10px}.options-renderer-captcha-hint{padding:10px 0}.options-renderer-captcha .captcha-container{margin-left:0}.options-renderer-message-review{bottom:48px;color:#555;font-size:11px}.options-renderer-message-abuse{margin-bottom:15px;border-bottom:1px solid #ddd;padding-bottom:15px}.options-renderer-message-captcha,.options-renderer-message-failed{padding-bottom:10px}.options-renderer-message-continue{float:right;margin-right:10px;width:300px;font-size:11px;text-align:right}.options-renderer-buttons{bottom:0;padding-top:15px;width:100%}.options-renderer-button-submit,.options-renderer-button-continue,.options-renderer-submit-button{float:right}.options-renderer-button-back{float:left}.options-renderer-message-required{font-size:11px;line-height:32px}.options-renderer-step4 .options-renderer-message-required{margin-left:63px}.options-renderer-step2 .options-renderer-message-required{float:right;margin-right:15px}.options-renderer-form{position:relative}.options-renderer-categories{width:250px}.options-renderer-category{padding:5px 0}.options-renderer-category.clearfix .yt-uix-form-input-radio-container,.options-renderer-category.clearfix label,.options-renderer-category.clearfix .yt-uix-tooltip{float:left}.options-renderer-category .yt-uix-form-input-radio-container{margin-right:3px}.options-renderer-category-label{float:left;margin-top:2px}.options-renderer-question-mark{margin-left:15px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -161px -167px;background-size:auto;width:15px;height:16px}.options-renderer-type-select{display:none;padding:5px 0 5px 20px;width:152px}.options-renderer-type-select .yt-uix-form-input-select{width:150px}.options-renderer-type-select .yt-uix-form-input-select .yt-uix-form-input-select-element{min-width:150px}.options-renderer-category-selected .options-renderer-type-select{display:block}.options-renderer-addition{position:absolute;top:10px;left:300px;width:300px}.options-renderer-addition p{padding:5px 0;color:#555;font-size:11px}.options-renderer-details{width:280px;font-size:11px}.options-renderer-timestamp{width:20px}.options-renderer-details{height:50px}.options-renderer-form-other{position:relative;padding:10px}.options-renderer-confirmation{padding:10px;line-height:18px}.options-renderer-confirmation p{color:#555;font-size:11px}.options-renderer-message-confirm{padding-bottom:10px}.options-renderer-title{line-height:20px;display:inline-block}.options-renderer-captcha{padding:0}.options-renderer-buttons{border-top:none}.options-renderer-confirmation{background-color:#efefef}.options-renderer-step3 .options-renderer-buttons{display:none}.options-renderer{height:auto}.options-renderer-categories,.options-renderer-other-categories{margin-top:10px}.options-renderer-form{padding:0}.options-renderer-message-review{position:static;padding:10px 0}.options-renderer-buttons{position:static}.options-renderer-a11y-container{clip:rect(0,0,0,0);position:absolute}.options-renderer-content{font-size:13px;line-height:1.5em;padding:20px 0;width:300px;word-wrap:break-word}.options-renderer-content li{padding:3px 0}.options-renderer-content li:first-child{padding-top:0}.options-renderer-content li:last-child{padding-bottom:0}.options-renderer-content .yt-uix-form-input-radio-container{margin-right:6px;height:15px;width:15px;vertical-align:text-top}.options-renderer-content .yt-uix-form-input-radio-container input{top:0;left:0;height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-element{height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element{background:none;height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element:after{content:'';display:block;position:relative;top:4px;left:4px;width:7px;height:7px;background:#555;border-radius:50%}.option-item-supported-renderers-sub-options{padding:10px 0 0 19px}#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close{margin-top:8px;margin-right:-18px}#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content{background:no-repeat url(https://www.gstatic.com/images/icons/material/system/1x/close_black_24dp.png);height:24px;width:24px}#report-form-modal-renderer .yt-dialog-fg-content{padding:0 16px 20px}#report-form-modal-renderer .yt-dialog-fg-content .yt-dialog-title{line-height:initial;padding-top:24px}#report-form-modal-renderer .yt-dialog-content{font-size:13px;line-height:1.5em;padding-top:5px;width:340px;word-wrap:break-word}#report-form-modal-renderer .options-renderer-content{padding:0;width:auto}#report-form-modal-renderer .legal-report-checkbox-container{border-top:1px solid #b8b8b8;margin-top:24px;padding-top:24px}#report-form-modal-renderer label{padding:3px 0}#report-form-modal-renderer .legal-report-checkbox{float:left;margin:3px 6px 0 0;height:15px;width:15px;vertical-align:text-top}#report-form-modal-renderer .legal-report-checkbox-label{margin-left:24px}#report-form-modal-renderer .yt-dialog-footer{padding-top:16px}#report-form-modal-renderer .yt-dialog-footer button{margin-left:8px}

.yt-uix-form-input-select-disabled{opacity:.6;filter:alpha(opacity=60)}.yt-uix-form-input-select-element{position:relative;height:26px;padding:0 16px;-webkit-appearance:none;-moz-appearance:none;opacity:0;filter:alpha(opacity=0);_filter:none}#ie .yt-uix-form-input-select-element,.ie .yt-uix-form-input-select-element{min-width:100px;padding:0;font-size:13px}.yt-uix-form-input-select-element option{padding:0}.yt-uix-form-input-select-content{position:absolute;top:0;left:0;width:100%;height:100%;line-height:26px}.yt-uix-form-input-select-value{display:block;margin:0 10px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}#ie .yt-uix-form-input-select-value,.ie .yt-uix-form-input-select-value{margin:0 5px;*margin:0 0 0 5px}.yt-uix-form-input-select-arrow{float:right;width:0;height:0;border:1px solid transparent;border-width:4px 4px 0;border-top-color:#666;margin-top:11px;margin-right:10px}.yt-uix-form-input-text{width:250px;padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px}.yt-uix-form-input-textarea{padding:5px 10px 6px;margin-top:0;margin-bottom:0;font-size:13px;width:550px;resize:vertical}.yt-uix-form-input-textarea[disabled],.yt-uix-form-input-text[disabled]{opacity:.4;filter:alpha(opacity=40)}.yt-uix-form-input-text::-webkit-input-placeholder{color:#767676}.yt-uix-form-input-textarea::-webkit-input-placeholder{color:#767676}.yt-uix-form-input-text:-moz-placeholder,.yt-uix-form-input-textarea:-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-text::-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-textarea::-moz-placeholder{color:#767676;opacity:1}.yt-uix-form-input-text:-ms-input-placeholder,.yt-uix-form-input-textarea:-ms-input-placeholder,.yt-uix-form-input-placeholder{color:#767676}.yt-uix-form-input-placeholder-container{position:relative;display:inline-block}.ie .yt-uix-form-input-placeholder{display:inline}.ie.ie10 .yt-uix-form-input-placeholder,.ie.ie11 .yt-uix-form-input-placeholder{display:none}.ie .yt-uix-form-input-container.yt-uix-form-input-fluid-container,.ie .yt-uix-form-label .yt-uix-form-input-container,.yt-uix-form-input-fluid.yt-uix-form-input-placeholder-container{display:block}.yt-uix-form-input-placeholder-container{overflow:hidden}.yt-uix-form-input-placeholder{display:none;position:absolute;top:8px;left:9px;font-weight:normal;line-height:13px;font-size:13px;text-transform:none}.ie .yt-uix-form-error .yt-uix-form-input-text,.ie .yt-uix-form-error .yt-uix-form-input-textarea{margin-bottom:0;margin-right:0}.ie .yt-uix-form-error .yt-uix-form-input-placeholder-container{margin-bottom:5px;margin-right:5px}.ie .yt-uix-form-input-non-empty .yt-uix-form-input-placeholder,.ie .yt-uix-form-input-text:focus+.yt-uix-form-input-placeholder,.ie .yt-uix-form-input-textarea:focus+.yt-uix-form-input-placeholder{display:none}.yt-uix-form-input-text+.yt-uix-form-input-placeholder{white-space:nowrap}.yt-uix-form-input-radio{width:14px;height:14px}.yt-uix-form-input-radio-element{width:14px;height:14px;border-radius:50%}#ie .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.ie8 .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.ie7 .yt-uix-form-input-radio-container.checked .yt-uix-form-input-radio-element,.yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -469px -139px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox,.yt-uix-form-input-checkbox-element{width:14px;height:14px}#ie .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element,.ie8 .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element,.ie7 .yt-uix-form-input-checkbox-container.checked .yt-uix-form-input-checkbox-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -42px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element{border:1px solid #36649c;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -42px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-checkbox-container.partial .yt-uix-form-input-checkbox-element{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -238px -522px;background-size:auto;width:14px;height:14px}.yt-uix-form-input-radio-container,.yt-uix-form-input-checkbox-container{position:relative;display:inline-block;height:20px;line-height:0;font-size:0;vertical-align:middle}.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-element{border:1px solid #c6c6c6;display:inline-block;vertical-align:middle;cursor:pointer}.ie8 .yt-uix-form-input-radio-element{border:0}.yt-uix-form-input-radio-container input:focus+.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-container input:focus+.yt-uix-form-input-checkbox-element{border:1px solid #4496e7;margin:0}.yt-uix-form-input-radio-container input[disabled]+.yt-uix-form-input-radio-element,.yt-uix-form-input-checkbox-container input[disabled]+.yt-uix-form-input-checkbox-element{cursor:default;opacity:.4;filter:alpha(opacity=40)}.yt-uix-form-input-radio-container input,.yt-uix-form-input-checkbox-container input{cursor:pointer;position:absolute;top:1px;left:1px;border:0;outline:0;margin:0;padding:0;-moz-appearance:none;-webkit-appearance:none}.yt-uix-form-input-container.yt-uix-form-input-fluid-container{display:block;overflow:hidden;padding-bottom:1px}.yt-uix-form-input-fluid{display:block;overflow:hidden;padding-bottom:1px;padding-right:22px}.yt-uix-form-input-fluid .yt-uix-form-input-text,.yt-uix-form-input-fluid .yt-uix-form-input-textarea{width:100%}.yt-uix-form-select-fluid{overflow:hidden;padding-right:2px}.yt-uix-form-select-fluid .yt-uix-form-input-select,.yt-uix-form-select-fluid select{width:100%}.yt-uix-checkbox-on-off{position:relative;display:inline-block;width:35px;height:15px;padding-right:2px;overflow:hidden;vertical-align:middle;cursor:pointer}.yt-uix-checkbox-on-off input[type=checkbox]{position:absolute;margin:0;width:37px;height:15px;opacity:0}.yt-uix-checkbox-on-off label{display:inline-block;border:1px solid transparent;height:13px;width:100%;background:#b8b8b8;border-radius:20px}.yt-uix-checkbox-on-off input[type=checkbox]:checked+label{background-color:#167ac6}.yt-uix-checkbox-on-off label>*{display:inline-block;height:100%;vertical-align:top;-moz-transition:width .1s;-webkit-transition:width .1s;transition:width .1s}.yt-uix-checkbox-on-off .checked{text-align:center;line-height:13px}.yt-uix-checkbox-on-off .checked:before{content:'';display:inline-block;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) 0 -407px;background-size:auto;width:10px;height:7px}.yt-uix-checkbox-on-off .toggle{background:#fbfbfb;width:13px;border-radius:13px}.yt-uix-checkbox-on-off .checked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .unchecked{width:0}.yt-uix-checkbox-on-off .unchecked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .checked{width:22px}.yt-uix-checkbox-on-off input[type=checkbox]:disabled+label{opacity:.5}.yt-uix-checkbox-on-off.large{width:54px;height:24px}.yt-uix-checkbox-on-off.large input[type=checkbox]{width:56px;height:24px}.yt-uix-checkbox-on-off.large label{height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .checked{line-height:22px}.yt-uix-checkbox-on-off.large label .toggle{width:22px;height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .unchecked,.yt-uix-checkbox-on-off.large input[type=checkbox]:checked+label .checked{width:32px}.yt-uix-form-input-paper-toggle-container{display:inline-block;vertical-align:baseline;position:relative;top:5px;width:36px;height:14px}.yt-uix-form-input-paper-toggle-container:hover{cursor:pointer}.yt-uix-form-input-paper-toggle-container input{position:absolute;width:0;height:0;opacity:0}.yt-uix-form-input-paper-toggle-bar{position:absolute;height:100%;width:100%;border-radius:8px;background-color:#000;opacity:.26;-moz-transition:background-color linear .08s;-webkit-transition:background-color linear .08s;transition:background-color linear .08s}.yt-uix-form-input-paper-toggle-button{position:absolute;top:-3px;height:20px;width:20px;border-radius:50%;box-shadow:0 1px 5px 0 rgba(0,0,0,.4);background-color:#f1f1f1;-moz-transition:transform linear .08s,background-color linear .08s;-webkit-transition:transform linear .08s,background-color linear .08s;transition:transform linear .08s,background-color linear .08s}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-bg{background-color:#4285f4}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-bar{opacity:.5}.yt-uix-form-input-paper-toggle-container.checked .yt-uix-form-input-paper-toggle-button{-moz-transform:translate(16px,0);-ms-transform:translate(16px,0);-webkit-transform:translate(16px,0);transform:translate(16px,0)}.yt-uix-menu-container,.yt-uix-menu{display:inline-block;position:relative}.yt-uix-menu-content{position:absolute;z-index:2000000100}.yt-uix-menu-content .yt-uix-menu,.yt-uix-menu-trigger{width:100%}.yt-uix-menu-content-hidden{display:none}.yt-uix-menu .yt-uix-menu-mask,.yt-uix-menu .yt-uix-menu-content{left:100%;top:0}.yt-uix-menu.yt-uix-menu-sibling-content>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-sibling-content>.yt-uix-menu-content{left:auto;top:0}.yt-uix-menu.yt-uix-menu-reversed>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-reversed>.yt-uix-menu-content{top:auto;bottom:0}.yt-uix-menu.yt-uix-menu-flipped>.yt-uix-menu-mask,.yt-uix-menu.yt-uix-menu-flipped>.yt-uix-menu-content{right:100%;left:auto}.yt-uix-menu-mask{border:0;filter:alpha(opacity=0);margin:0;opacity:0;overflow:visible;padding:0;position:absolute;z-index:2000000099}.yt-uix-menu-top-level-button-container,.yt-uix-menu-top-level-button{display:inline-block}.yt-uix-menu-top-level-flow-button{margin-left:4px}.yt-uix-menu-top-level-button .yt-uix-button-opacity{padding:0}.service-endpoint-replace-enclosing-action-notification{text-align:center;color:#555;font-size:13px;line-height:1.3em}.yt-lockup .service-endpoint-replace-enclosing-action-notification{padding:15px 5px}.service-endpoint-replace-enclosing-action-notification .undo-replace-action{vertical-align:baseline;margin-top:10px}.replace-enclosing-action-options{margin-top:20px}.service-endpoint-replace-enclosing-action-notification .replace-enclosing-action-options .undo-replace-action{margin-top:0}.service-endpoint-replace-enclosing-action-notification .replace-enclosing-action-options .dismissal-follow-up-dialog-target{padding-top:10px}body.yt-dialog-active{height:100%;overflow:hidden}.yt-dialog-base,.yt-uix-overlay-base{position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:2000000004;overflow:auto;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.yt-dialog-base .yt-uix-button-menu,.yt-uix-overlay-base .yt-uix-button-menu{text-align:left}.yt-dialog-fg,.yt-uix-overlay-fg{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.no-focus-outline .yt-dialog-fg:focus{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;vertical-align:middle;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.yt-dialog-fg:focus{box-shadow:0 0 0 2px rgba(27,127,204,0.4)}.yt-dialog-bg,.yt-uix-overlay-bg{position:absolute;top:0;left:0;width:100%;border:none;z-index:2000000002;background-color:#fff;opacity:.8;filter:alpha(opacity=80)}.yt-dialog-bg{*display:none}.yt-dialog-align,.yt-dialog-fg,.yt-uix-overlay-align{vertical-align:middle;display:inline-block}.yt-uix-overlay-fg{vertical-align:middle;display:inline-block;*width:680px}.yt-dialog-align,.yt-uix-overlay-align{height:100%}.yt-dialog-focus-trap{height:0}.yt-dialog-base .yt-dialog-header .yt-dialog-title,.yt-uix-overlay-base .yt-uix-overlay-header .yt-dialog-title{margin:0;font-weight:500;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-base .yt-dialog-header .yt-dialog-close,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close{float:right;border:0;background:none;height:auto;margin-top:10px;margin-right:-20px}.yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close .yt-uix-button-content{display:block;text-indent:-9999em;color:#000;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -409px -485px;background-size:auto;width:9px;height:9px;border-radius:3px}.yt-dialog-close .yt-uix-button-content{opacity:.5}.yt-dialog-close:hover .yt-uix-button-content{opacity:inherit}.yt-dialog-footer{clear:both;padding-top:20px;text-align:right}.yt-dialog-footer button{margin-left:10px}.yt-uix-overlay-content{display:none}.yt-dialog-fg-content,.yt-uix-overlay-fg-content{overflow:hidden;padding:0 20px 20px;color:#333}.yt-dialog-fg-content .yt-dialog-title,.yt-uix-overlay-fg-content .yt-dialog-title{color:#333;font-weight:500;font-size:15px;margin:0 -20px;padding-top:18px;padding-bottom:16px;vertical-align:middle;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-fg-content .close-small,.yt-uix-overlay-fg-content .close-small{background-color:#ccc;overflow:hidden;position:absolute;right:2px;top:2px;text-indent:-9999em}.yt-dialog-close,.yt-dialog-close:hover,.yt-dialog-close:focus{border-color:transparent;box-shadow:none}.yt-uix-overlay-actions{margin:20px -20px -20px;padding:15px 20px;text-align:right;background:#f1f1f1}.yt-uix-overlay-actions button{margin:0 3px}.yt-dialog-loading,.yt-dialog-working{display:none}.yt-dialog-show-content .yt-dialog-content,.yt-dialog-show-loading .yt-dialog-loading,.yt-dialog-show-working .yt-dialog-working,.yt-dialog-show-working .yt-dialog-content{display:block;line-height:1.3em;visibility:visible}.yt-dialog-waiting-content{position:absolute;top:50%;left:50%;margin-left:-50px}.yt-dialog-loading .yt-dialog-waiting-content{margin-top:-20px;font-size:14px;text-align:center}.yt-dialog-working-bubble .yt-dialog-waiting-content{margin-top:-25px}.yt-dialog-waiting-text{float:left;color:#000;margin-top:2px}.yt-dialog-working-overlay{position:absolute;height:100%;width:100%;top:-1px;left:-1px;border:1px solid #fff;background-color:#fff;opacity:.7;filter:alpha(opacity=70)}.yt-dialog-working-bubble{position:absolute;height:100px;width:200px;top:50%;left:50%;margin:-50px 0 0 -100px;background-color:#f1f1f1;border:1px solid #ddd;text-align:center;border-radius:6px}.yt-uix-overlay-simple .yt-dialog-header{background:#f1f1f1}.yt-uix-overlay-primary .yt-dialog-header{border-bottom:0;background-color:#fff}.yt-uix-overlay-primary .yt-dialog-header h2{color:#000}.yt-uix-overlay-tiny .yt-dialog-header{height:35px;margin-bottom:20px}.yt-uix-overlay-tiny .yt-dialog-header .yt-dialog-title{font-size:15px;font-weight:500}.yt-uix-slider-body,.yt-uix-shelfslider-body{position:relative;overflow:hidden}.yt-uix-slider-list,.yt-uix-shelfslider-list{position:relative;left:0;white-space:nowrap;font-size:0;vertical-align:top;-moz-transition:left .3s ease-in-out;-webkit-transition:left .3s ease-in-out;transition:left .3s ease-in-out;display:inline-block}.yt-uix-slider-item,.yt-uix-shelfslider-item{white-space:normal;vertical-align:top;display:inline-block}.yt-uix-slider-next-arrow,.yt-uix-slider-prev-arrow{width:0;height:0;border:1px solid transparent;vertical-align:middle}.yt-uix-slider-next-arrow{border-width:10px 0 10px 10px;border-left-color:#999}.yt-uix-slider-prev-arrow{border-width:10px 10px 10px 0;border-right-color:#999}.yt-uix-button:hover .yt-uix-slider-next-arrow,.yt-uix-button:focus .yt-uix-slider-next-arrow{border-left-color:#333}.yt-uix-button:hover .yt-uix-slider-prev-arrow,.yt-uix-button:focus .yt-uix-slider-prev-arrow{border-right-color:#333}.yt-uix-button[disabled]:hover .yt-uix-slider-next-arrow,.yt-uix-button[disabled]:focus .yt-uix-slider-next-arrow{border-left-color:#999}.yt-uix-button[disabled]:hover .yt-uix-slider-prev-arrow,.yt-uix-button[disabled]:focus .yt-uix-slider-prev-arrow{border-right-color:#999}.yt-uix-tile{cursor:pointer}.yt-tile-default{display:block;padding:6px;font-size:11px;border-radius:3px;-moz-transition:background-color .18s;-webkit-transition:background-color .18s;transition:background-color .18s}.yt-tile-static{display:block;padding:6px;color:#666;font-size:11px;border-radius:3px;-moz-transition:background-color .18s;-webkit-transition:background-color .18s;transition:background-color .18s}.yt-tile-visible{display:block;padding:6px;font-size:11px;border-radius:3px;-moz-transition:background-color .18s;-webkit-transition:background-color .18s;transition:background-color .18s}.yt-tile-default,.yt-tile-default a,.yt-tile-visible,.yt-tile-visible a{color:#333}.yt-tile-default h3,.yt-tile-visible h3{font-weight:500;font-size:13px;margin-bottom:5px}.yt-tile-default h3,.yt-tile-default h3 a,.yt-tile-visible h3,.yt-tile-visible h3 a{color:#333}.yt-tile-default h3 a:visited,.yt-tile-visible h3 a:visited{color:#036!important}.yt-tile-static,.yt-tile-visible{background:#fff;box-shadow:0 1px 2px #ccc}.yt-tile-default:hover{background:#fff;box-shadow:0 1px 2px #ccc;-moz-transition:none;-webkit-transition:none;transition:none}.yt-tile-visible:hover{box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #fff;background-image:-moz-linear-gradient(top,#fff 0,#f0f0f0 100%);background-image:-ms-linear-gradient(top,#fff 0,#f0f0f0 100%);background-image:-o-linear-gradient(top,#fff 0,#f0f0f0 100%);background-image:-webkit-linear-gradient(top,#fff 0,#f0f0f0 100%);background-image:linear-gradient(to bottom,#fff 0,#f0f0f0 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#fff,EndColorStr=#f0f0f0)}#ie .yt-tile-default{border-bottom:2px solid transparent}#ie .yt-tile-static,#ie .yt-tile-visible,#ie .yt-tile-default:hover{border-bottom:2px solid #ccc}#ie .yt-tile-visible:hover{border-bottom-color:#aaa}.yt-tile-static a,.yt-tile-visible:hover a,.yt-tile-default:hover a{color:#167ac6}.yt-uix-tooltip{display:inline-block}.yt-uix-tooltip.hid{display:none}.yt-uix-range-tooltip-tip,.yt-uix-tooltip-tip{position:absolute;z-index:2147483647;opacity:0;-moz-transition:opacity .2s ease-out;-o-transition:opacity .2s ease-out;-webkit-transition:opacity .2s ease-out}.yt-uix-range-tooltip-tip-visible,.yt-uix-tooltip-tip-visible{opacity:1;filter:alpha(opacity=100)}.yt-uix-range-tooltip-tip-body,.yt-uix-tooltip-tip-body,.yt-uix-tooltip-tip-mask{position:absolute;bottom:4px}.yt-uix-range-tooltip-tip-body,.yt-uix-tooltip-tip-body{z-index:2147483647}.yt-uix-tooltip-tip-mask{z-index:999999;border:0;padding:0;margin:0;opacity:0;filter:alpha(opacity=0);height:0;width:0;left:0}.yt-uix-range-tooltip-tip-arrow,.yt-uix-tooltip-tip-arrow{position:absolute;z-index:2147483647;bottom:-1px;width:0;height:0;vertical-align:top;border:1px solid transparent;border-width:5px 5px 0;border-top-color:#000;opacity:1;filter:alpha(opacity=100)}* html .yt-uix-range-tooltip-tip-arrow,* html .yt-uix-tooltip-tip-arrow{display:none}.yt-uix-range-tooltip-tip-content,.yt-uix-tooltip-tip-content{position:relative;padding:6px;color:#fff;background:#000;font-size:11px;font-weight:500;white-space:nowrap;border-radius:2px;box-shadow:0 1px 1px rgba(0,0,0,.25)}@-moz-document url-prefix(){.yt-uix-tooltip-tip-mask+.yt-uix-tooltip-tip-body>.yt-uix-tooltip-tip-content{background:#000;-moz-border-radius:0}.yt-uix-tooltip-tip-mask+.yt-uix-tooltip-tip-body+.yt-uix-tooltip-tip-arrow{border-top-color:#000}}.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-body,.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-mask{bottom:auto;top:4px}.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-arrow{bottom:auto;top:0;border-width:0 5px 5px;border-color:#000;border-left-color:transparent;border-top-color:transparent;border-right-color:transparent}.yt-uix-tooltip-normal-wrap{white-space:normal;word-wrap:normal}.yt-uix-tooltip-tip .tooltip-label{font-weight:500}.yt-uix-tooltip-arialabel{position:absolute;top:-100px;opacity:0}.captcha-container{display:block;margin-left:10px}.captcha-image{border:1px solid #ccc;margin-right:10px;float:left}.captcha-input-label{display:block;color:#666}.captcha-input-container{float:left}.captcha-help{color:#4272db;font-size:90%;cursor:pointer}#hats-container{position:fixed;bottom:24px;right:24px;z-index:2000000001}#hats-container.hats-categorical-style-horizontal{background-color:#fff;box-shadow:0 8px 32px 0 rgba(0,0,0,0.5)}#hats-container.hats-categorical-style-vertical{background-color:#fff;box-shadow:0 8px 32px 0 rgba(0,0,0,0.5);width:325px}.hats-header{padding:16px;overflow:hidden;line-height:20px;background-color:#3d3d3d}.hats-categorical-style-horizontal .hats-header,.hats-categorical-style-vertical .hats-header{padding:24px 24px 20px;background-color:#fff}.hats-title,.hats-thanks{float:left;max-width:300px;color:#fff;font-size:13px;font-weight:normal;line-height:20px}.hats-categorical-style-vertical .hats-title,.hats-categorical-style-vertical .hats-thanks{max-width:250px}.hats-categorical-style-horizontal .hats-title,.hats-categorical-style-horizontal .hats-thanks,.hats-categorical-style-vertical .hats-title,.hats-categorical-style-vertical .hats-thanks{color:#333}.hats-categorical-style-horizontal .hats-title,.hats-categorical-style-vertical .hats-title{font-weight:500;font-size:18px;line-height:26px}.hats-thanks a{color:#03a9f4;font-weight:500;text-transform:uppercase}.hats-dismiss{float:right;padding-left:16px;line-height:20px}.hats-categorical-style-vertical .hats-dismiss{padding-left:0}.hats-dismiss-text-button{height:auto;background:transparent}.hats-dismiss-icon-button{opacity:.5;cursor:pointer}.hats-dismiss-icon-button:hover{opacity:.6}.hats-dismiss-button,.hats-dismiss-button:hover,.hats-dismiss-button:active{padding:0;border:0;color:#03a9f4;font-size:13px;font-weight:500;text-transform:uppercase;box-shadow:none}.hats-content{padding:16px;background-color:#e9e9e9}.hats-categorical-style-horizontal .hats-content,.hats-categorical-style-vertical .hats-content{padding:0;background-color:#fff}.hats-options{display:block;text-align:justify}.hats-options:after{display:inline-block;width:100%;content:''}.hats-categorical-style-vertical .hats-options:after{display:none}.hats-categorical-style-horizontal .hats-options{padding:0 24px}.hats-categorical-style-vertical .hats-options{margin-bottom:24px}.hats-option{display:inline-block}.hats-categorical-style-horizontal .hats-option:hover,.hats-categorical-style-vertical .hats-option:hover{background-color:#eee;cursor:pointer}.hats-categorical-style-horizontal .hats-option{color:#767676}.hats-categorical-style-vertical .hats-option{display:list-item;color:#767676;font-size:16px;line-height:24px;vertical-align:middle;padding:6px 0}.hats-categorical-style-horizontal .hats-option label{cursor:pointer}.hats-categorical-style-vertical .hats-option label{display:block;cursor:pointer;padding:0 24px}.hats-categorical-style-vertical .hats-option .hats-option-button{padding:0 24px}button.hats-option-button{display:block;color:inherit;font-size:inherit;width:100%;line-height:inherit;text-align:inherit;cursor:pointer}.hats-categorical-style-vertical .hats-option .hats-option-checkbox-container{padding-right:16px}.hats-categorical-style-horizontal .hats-footer,.hats-categorical-style-vertical .hats-footer{padding:8px 24px;height:36px;line-height:36px;vertical-align:middle}.hats-categorical-style-horizontal .hats-footer button,.hats-categorical-style-vertical .hats-footer button{height:36px;line-height:36px;vertical-align:middle;text-transform:uppercase}.hats-categorical-style-horizontal .hats-submit-text-button,.hats-categorical-style-vertical .hats-submit-text-button{float:right;outline:0;height:48px;border-color:transparent;padding:0;background:none;color:#4285f4;font-size:14px;line-height:48px;box-shadow:none}.hats-categorical-style-horizontal .hats-submit-text-button[disabled],.hats-categorical-style-horizontal .hats-submit-text-button[disabled]:hover,.hats-categorical-style-vertical .hats-submit-text-button[disabled],.hats-categorical-style-vertical .hats-submit-text-button[disabled]:hover{background:none;cursor:default;color:#4285f4;opacity:.3}.hats-categorical-style-horizontal .hats-submit-text-button:active,.hats-categorical-style-horizontal .hats-submit-text-button:hover,.hats-categorical-style-vertical .hats-submit-text-button:active,.hats-categorical-style-vertical .hats-submit-text-button:hover{cursor:pointer;border-color:transparent;background-color:#fff;box-shadow:none}.hats-spacer{display:inline-block;width:12px}.hats-legend{margin-top:8px;overflow:hidden;line-height:1.3em}.hats-categorical-style-horizontal .hats-legend,.hats-categorical-style-vertical .hats-legend{color:#767676;margin:0 0 8px;padding:0 24px}.hats-legend-first{float:left;max-width:150px;word-spacing:150px;overflow:visible;text-align:left}.hats-legend-last{float:right;max-width:150px;word-spacing:150px;overflow:visible;text-align:right}.hats-categorical-style-horizontal .hats-legend-first,.hats-categorical-style-horizontal .hats-legend-last,.hats-categorical-style-vertical .hats-legend-first,.hats-categorical-style-vertical .hats-legend-last{word-spacing:normal}.hats-option-icon,.hats-option-icon:hover,.hats-option-icon:active{padding:0;border:0;background:transparent;box-shadow:none}.hats-option-icon::before{opacity:1;filter:alpha(opacity=100)}.hats-option-icon:hover::before{opacity:1;filter:alpha(opacity=100)}.hats-option-icon:active::before{opacity:1;filter:alpha(opacity=100)}.hats-option-icon-very-happy::before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -28px -94px;background-size:auto;width:24px;height:24px}.hats-option-icon-happy::before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -83px -471px;background-size:auto;width:24px;height:24px}.hats-option-icon-meh::before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -173px -209px;background-size:auto;width:24px;height:24px}.hats-option-icon-sad::before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -409px -433px;background-size:auto;width:24px;height:24px}.hats-option-icon-very-sad::before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -320px -24px;background-size:auto;width:24px;height:24px}.hats-logo{vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -220px -361px;background-size:auto;width:38px;height:15px}


.yt-dialog-base,.yt-uix-overlay-base{position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:2000000004;overflow:auto;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.yt-dialog-base .yt-uix-button-menu,.yt-uix-overlay-base .yt-uix-button-menu{text-align:left}.yt-dialog-fg,.yt-uix-overlay-fg{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.no-focus-outline .yt-dialog-fg:focus{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;vertical-align:middle;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.yt-dialog-fg:focus{box-shadow:0 0 0 2px rgba(27,127,204,0.4)}.yt-dialog-bg,.yt-uix-overlay-bg{position:absolute;top:0;left:0;width:100%;border:none;z-index:2000000002;background-color:#fff;opacity:.8;filter:alpha(opacity=80)}.yt-dialog-bg{*display:none}.yt-dialog-align,.yt-dialog-fg,.yt-uix-overlay-align{vertical-align:middle;display:inline-block}.yt-uix-overlay-fg{vertical-align:middle;display:inline-block;*width:680px}.yt-dialog-align,.yt-uix-overlay-align{height:100%}.yt-dialog-focus-trap{height:0}.yt-dialog-base .yt-dialog-header .yt-dialog-title,.yt-uix-overlay-base .yt-uix-overlay-header .yt-dialog-title{margin:0;font-weight:500;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-base .yt-dialog-header .yt-dialog-close,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close{float:right;border:0;background:none;height:auto;margin-top:10px;margin-right:-20px}.yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close .yt-uix-button-content{display:block;text-indent:-9999em;color:#000;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -114px -245px;background-size:auto;width:9px;height:9px;border-radius:3px}.yt-dialog-close .yt-uix-button-content{opacity:.5}.yt-dialog-close:hover .yt-uix-button-content{opacity:inherit}.yt-dialog-footer{clear:both;padding-top:20px;text-align:right}.yt-dialog-footer button{margin-left:10px}.yt-uix-overlay-content{display:none}.yt-dialog-fg-content,.yt-uix-overlay-fg-content{overflow:hidden;padding:0 20px 20px;color:#333}.yt-dialog-fg-content .yt-dialog-title,.yt-uix-overlay-fg-content .yt-dialog-title{color:#333;font-weight:500;font-size:15px;margin:0 -20px;padding-top:18px;padding-bottom:16px;vertical-align:middle;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-fg-content .close-small,.yt-uix-overlay-fg-content .close-small{background-color:#ccc;overflow:hidden;position:absolute;right:2px;top:2px;text-indent:-9999em}.yt-dialog-close,.yt-dialog-close:hover,.yt-dialog-close:focus{border-color:transparent;box-shadow:none}.yt-uix-overlay-actions{margin:20px -20px -20px;padding:15px 20px;text-align:right;background:#f1f1f1}.yt-uix-overlay-actions button{margin:0 3px}.yt-dialog-loading,.yt-dialog-working{display:none}.yt-dialog-show-content .yt-dialog-content,.yt-dialog-show-loading .yt-dialog-loading,.yt-dialog-show-working .yt-dialog-working,.yt-dialog-show-working .yt-dialog-content{display:block;line-height:1.3em;visibility:visible}.yt-dialog-waiting-content{position:absolute;top:50%;left:50%;margin-left:-50px}.yt-dialog-loading .yt-dialog-waiting-content{margin-top:-20px;font-size:14px;text-align:center}.yt-dialog-working-bubble .yt-dialog-waiting-content{margin-top:-25px}.yt-dialog-waiting-text{float:left;color:#000;margin-top:2px}.yt-dialog-working-overlay{position:absolute;height:100%;width:100%;top:-1px;left:-1px;border:1px solid #fff;background-color:#fff;opacity:.7;filter:alpha(opacity=70)}.yt-dialog-working-bubble{position:absolute;height:100px;width:200px;top:50%;left:50%;margin:-50px 0 0 -100px;background-color:#f1f1f1;border:1px solid #ddd;text-align:center;border-radius:6px}.yt-uix-overlay-simple .yt-dialog-header{background:#f1f1f1}.yt-uix-overlay-primary .yt-dialog-header{border-bottom:0;background-color:#fff}.yt-uix-overlay-primary .yt-dialog-header h2{color:#000}.yt-uix-overlay-tiny .yt-dialog-header{height:35px;margin-bottom:20px}.yt-uix-overlay-tiny .yt-dialog-header .yt-dialog-title{font-size:15px;font-weight:500}.unsubscribe-confirmation-overlay-content .unsubscribe-confirmation-message{margin-top:20px}

#yt-keyboard-shortcuts-close .yt-uix-button-content{line-height:2em}

.yt-uix-range-tooltip-tip-body,.yt-uix-tooltip-tip-body,.yt-uix-tooltip-tip-mask{position:absolute;bottom:4px}.yt-uix-range-tooltip-tip-body,.yt-uix-tooltip-tip-body{z-index:2147483647}.yt-uix-tooltip-tip-mask{z-index:999999;border:0;padding:0;margin:0;opacity:0;filter:alpha(opacity=0);height:0;width:0;left:0}.yt-uix-range-tooltip-tip-arrow,.yt-uix-tooltip-tip-arrow{position:absolute;z-index:2147483647;bottom:-1px;width:0;height:0;vertical-align:top;border:1px solid transparent;border-width:5px 5px 0;border-top-color:#000;opacity:1;filter:alpha(opacity=100)}* html .yt-uix-range-tooltip-tip-arrow,* html .yt-uix-tooltip-tip-arrow{display:none}.yt-uix-range-tooltip-tip-content,.yt-uix-tooltip-tip-content{position:relative;padding:6px;color:#fff;background:#000;font-size:11px;font-weight:500;white-space:nowrap;border-radius:2px;box-shadow:0 1px 1px rgba(0,0,0,.25)}@-moz-document url-prefix(){.yt-uix-tooltip-tip-mask+.yt-uix-tooltip-tip-body>.yt-uix-tooltip-tip-content{background:#000;-moz-border-radius:0}.yt-uix-tooltip-tip-mask+.yt-uix-tooltip-tip-body+.yt-uix-tooltip-tip-arrow{border-top-color:#000}}.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-body,.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-mask{bottom:auto;top:4px}.yt-uix-tooltip-tip-reverse .yt-uix-tooltip-tip-arrow{bottom:auto;top:0;border-width:0 5px 5px;border-color:#000;border-left-color:transparent;border-top-color:transparent;border-right-color:transparent}.yt-uix-tooltip-normal-wrap{white-space:normal;word-wrap:normal}.yt-uix-tooltip-tip .tooltip-label{font-weight:500}.yt-uix-tooltip-arialabel{position:absolute;top:-100px;opacity:0}

ytd-playlist-panel-renderer {
display: none !important;
}


#share-panel-buttons .yt-uix-button.share-panel-email {
	margin-right: 0
}

#yt-consent-dialog .yt-dialog-base{top:64px;bottom:64px;height:inherit;overflow:hidden;min-width:640px}#yt-consent-dialog .yt-dialog-fg{box-sizing:border-box;height:100%}@media (max-height:575px){#yt-consent-dialog .yt-dialog-base{top:0;bottom:0}#yt-consent-dialog .yt-dialog-fg{max-height:448px}}@media (max-width:645px){#yt-consent-dialog .yt-dialog-base{overflow:initial}#yt-consent-dialog .yt-dialog-align{height:0}#yt-consent-dialog .yt-dialog-fg{display:inline}}#yt-consent-dialog .yt-dialog-fg-content{height:100%;padding:0}#yt-consent-dialog .yt-dialog-content{height:100%}

#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close{margin-top:8px;margin-right:-18px}#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content{background:no-repeat url(https://www.gstatic.com/images/icons/material/system/1x/close_black_24dp.png);height:24px;width:24px}#report-form-modal-renderer .yt-dialog-fg-content{padding:0 16px 20px}#report-form-modal-renderer .yt-dialog-fg-content .yt-dialog-title{line-height:initial;padding-top:24px}#report-form-modal-renderer .yt-dialog-content{font-size:13px;line-height:1.5em;padding-top:24px;width:340px;word-wrap:break-word}#report-form-modal-renderer .options-renderer-content{padding:0;width:auto}#report-form-modal-renderer .yt-dialog-footer{padding-top:16px}#report-form-modal-renderer .yt-dialog-footer button{margin-left:8px}

body.yt-dialog-active{height:100%;overflow:hidden}.yt-dialog-base,.yt-uix-overlay-base{position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:2000000004;overflow:auto;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.yt-dialog-base .yt-uix-button-menu,.yt-uix-overlay-base .yt-uix-button-menu{text-align:left}.yt-dialog-fg,.yt-uix-overlay-fg{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.no-focus-outline .yt-dialog-fg:focus{position:relative;background:#fff;border:1px solid #e2e2e2;outline:0;text-align:left;vertical-align:middle;z-index:2000000003;box-shadow:0 0 15px rgba(0,0,0,.18);display:inline-block;-moz-user-select:text;-ms-user-select:text;-webkit-user-select:text}.yt-dialog-fg:focus{box-shadow:0 0 0 2px rgba(27,127,204,0.4)}.yt-dialog-bg,.yt-uix-overlay-bg{position:absolute;top:0;left:0;width:100%;border:none;z-index:2000000002;background-color:#fff;opacity:.8;filter:alpha(opacity=80)}.yt-dialog-bg{*display:none}.yt-dialog-align,.yt-dialog-fg,.yt-uix-overlay-align{vertical-align:middle;display:inline-block}.yt-uix-overlay-fg{vertical-align:middle;display:inline-block;*width:680px}.yt-dialog-align,.yt-uix-overlay-align{height:100%}.yt-dialog-focus-trap{height:0}.yt-dialog-base .yt-dialog-header .yt-dialog-title,.yt-uix-overlay-base .yt-uix-overlay-header .yt-dialog-title{margin:0;font-weight:500;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-base .yt-dialog-header .yt-dialog-close,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close{float:right;border:0;background:none;height:auto;margin-top:10px;margin-right:-20px}.yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content,.yt-uix-overlay-base .yt-uix-overlay-header .yt-uix-overlay-close .yt-uix-button-content{display:block;text-indent:-9999em;color:#000;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -114px -245px;background-size:auto;width:9px;height:9px;border-radius:3px}.yt-dialog-close .yt-uix-button-content{opacity:.5}.yt-dialog-close:hover .yt-uix-button-content{opacity:inherit}.yt-dialog-footer{clear:both;padding-top:20px;text-align:right}.yt-dialog-footer button{margin-left:10px}.yt-uix-overlay-content{display:none}.yt-dialog-fg-content,.yt-uix-overlay-fg-content{overflow:hidden;padding:0 20px 20px;color:#333}.yt-dialog-fg-content .yt-dialog-title,.yt-uix-overlay-fg-content .yt-dialog-title{color:#333;font-weight:500;font-size:15px;margin:0 -20px;padding-top:18px;padding-bottom:16px;vertical-align:middle;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-dialog-fg-content .close-small,.yt-uix-overlay-fg-content .close-small{background-color:#ccc;overflow:hidden;position:absolute;right:2px;top:2px;text-indent:-9999em}.yt-dialog-close,.yt-dialog-close:hover,.yt-dialog-close:focus{border-color:transparent;box-shadow:none}.yt-uix-overlay-actions{margin:20px -20px -20px;padding:15px 20px;text-align:right;background:#f1f1f1}.yt-uix-overlay-actions button{margin:0 3px}.yt-dialog-loading,.yt-dialog-working{display:none}.yt-dialog-show-content .yt-dialog-content,.yt-dialog-show-loading .yt-dialog-loading,.yt-dialog-show-working .yt-dialog-working,.yt-dialog-show-working .yt-dialog-content{display:block;line-height:1.3em;visibility:visible}.yt-dialog-waiting-content{position:absolute;top:50%;left:50%;margin-left:-50px}.yt-dialog-loading .yt-dialog-waiting-content{margin-top:-20px;font-size:14px;text-align:center}.yt-dialog-working-bubble .yt-dialog-waiting-content{margin-top:-25px}.yt-dialog-waiting-text{float:left;color:#000;margin-top:2px}.yt-dialog-working-overlay{position:absolute;height:100%;width:100%;top:-1px;left:-1px;border:1px solid #fff;background-color:#fff;opacity:.7;filter:alpha(opacity=70)}.yt-dialog-working-bubble{position:absolute;height:100px;width:200px;top:50%;left:50%;margin:-50px 0 0 -100px;background-color:#f1f1f1;border:1px solid #ddd;text-align:center;border-radius:6px}.yt-uix-overlay-simple .yt-dialog-header{background:#f1f1f1}.yt-uix-overlay-primary .yt-dialog-header{border-bottom:0;background-color:#fff}.yt-uix-overlay-primary .yt-dialog-header h2{color:#000}.yt-uix-overlay-tiny .yt-dialog-header{height:35px;margin-bottom:20px}.yt-uix-overlay-tiny .yt-dialog-header .yt-dialog-title{font-size:15px;font-weight:500}

.yt-dialog-fg{width:300px}#watch-header .mealbar-promo-renderer .yt-dialog-base{height:initial;left:initial;padding-left:5px;position:absolute;right:0;top:-5px;width:initial;z-index:1999999998}.ie #watch-header .mealbar-promo-renderer .yt-dialog-base{height:auto;left:auto;width:auto}#watch-header .mealbar-promo-renderer .yt-dialog-fg{bottom:5px;box-shadow:0 4px 4px rgba(0,0,0,.24);right:5px}#watch-header .yt-dialog-content{padding-top:18px}#watch-header .yt-dialog-content:empty{padding-top:0}.ad-blocker-messaging{min-width:350px;max-width:530px}@media screen and (max-width:656px){#watch-header .mealbar-promo-renderer .yt-dialog-fg{max-width:421px}}.confirm-dialog-renderer .yt-dialog-show-content .yt-dialog-content{width:340px}.comments-settings.confirm-dialog-renderer .yt-dialog-show-content .yt-dialog-content{width:320px}.comments-settings.confirm-dialog-renderer .yt-dialog-header{margin-bottom:20px}

.share-button-renderer-panel-container .share-panel-url{width:580px;color:#333;font-size:12px;padding:7px}.share-button-renderer-panel-container .yt-uix-clickcard-card-content{padding-bottom:10px}.share-panel{color:#555}.share-panel-playlist-options{margin:12px 0}.share-panel-start-at-container{display:block;margin-top:10px}.share-panel-url-container.share-panel-reverse{clear:left;margin-bottom:0;margin-top:10px}.share-panel-url-label{float:left;margin-right:0.5em;max-width:400px;width:100%}.share-panel-url-label span{color:#666;display:block;margin-bottom:0.25em}.ie .share-panel-url-input-container{display:inline}.share-panel-url{color:#666;font-size:1.6em;padding:3px;width:385px}.share-panel-url-container .yt-uix-expander-head{display:block;line-height:2em}.share-panel-url-options{float:right;line-height:2.2;width:200px}.share-panel-show-url-options{color:#333;display:block;text-align:right}.share-panel .yt-uix-expander .collapsed-message{display:none}.share-panel .yt-uix-expander .expanded-message,.share-panel .yt-uix-expander.yt-uix-expander-collapsed .collapsed-message{display:inline}.share-panel .yt-uix-expander.yt-uix-expander-collapsed .expanded-message{display:none}.share-panel .arrow{border:1px solid transparent;margin-bottom:1px}.share-panel .collapsed-message .arrow{border-top-color:#8d8d8d;border-width:4px 4px 0}.share-panel .expanded-message .arrow{border-bottom-color:#8d8d8d;border-width:0 4px 4px}.share-panel-start-at-time{width:50px}#hangout-popout-icon{display:inline-block;margin-left:6px;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflYl91Hr.webp") -98px -161px;background-size:auto;width:11px;height:11px}.share-panel-embed{font-weight:500}.share-panel .share-email{width:auto}.share-panel .yt-share-verticals{margin-bottom:10px}.share-panel-services{clear:both}.share-panel-services.watch-top-level{float:right}.share-panel-services.watch-top-level .share-service-icon{-moz-transform:scale(0.45);-ms-transform:scale(0.45);-webkit-transform:scale(0.45);transform:scale(0.45)}.share-panel-services.watch-top-level .share-group li{margin-right:0}.share-panel-services .share-service-button{background:none;border:none;cursor:pointer;text-align:left}.clicked-service-button{position:relative}.clicked-service-button .share-service-icon{opacity:0.3}.share-service-checkmark{display:none;position:absolute;top:0}.clicked-service-button .share-service-checkmark{display:inline-block;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -348px;background-size:auto;width:32px;height:32px}.share-group{float:left}.share-group li{float:left;margin-right:5px}@media screen and (max-width:656px){.share-group li{margin-right:0}}.share-panel-show-more{color:#333;display:block;line-height:2em;margin-left:0}.share-service-icon{vertical-align:middle;margin:-1px}.share-service-icon-ameba{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -72px;background-size:auto;width:32px;height:32px}.share-service-icon-bebo{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -528px;background-size:auto;width:32px;height:32px}.share-service-icon-blogger{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1112px;background-size:auto;width:32px;height:32px}.share-service-icon-cyworld{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1004px;background-size:auto;width:32px;height:32px}.share-service-icon-delicious{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -240px;background-size:auto;width:32px;height:32px}.share-service-icon-digg{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -276px;background-size:auto;width:32px;height:32px}.share-service-icon-facebook{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -180px;background-size:auto;width:32px;height:32px}.share-service-icon-fotka{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -636px;background-size:auto;width:32px;height:32px}.share-service-icon-goo{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1184px;background-size:auto;width:32px;height:32px}.share-service-icon-googleplus{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -420px;background-size:auto;width:32px;height:32px}.share-service-icon-grono{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1421px;background-size:auto;width:32px;height:32px}.share-service-icon-hi5{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -36px;background-size:auto;width:32px;height:32px}.share-service-icon-hyves{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1529px;background-size:auto;width:32px;height:32px}.share-service-icon-linkedin{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -932px;background-size:auto;width:32px;height:32px}.share-service-icon-livejournal{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -492px;background-size:auto;width:32px;height:32px}.share-service-icon-kakao{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -788px;background-size:auto;width:32px;height:32px}.share-service-icon-mail{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1256px;background-size:auto;width:32px;height:32px}.share-service-icon-meneame{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -968px;background-size:auto;width:32px;height:32px}.share-service-icon-mixi{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1493px;background-size:auto;width:32px;height:32px}.share-service-icon-mixx{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -600px;background-size:auto;width:32px;height:32px}.share-service-icon-myspace{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -860px;background-size:auto;width:32px;height:32px}.share-service-icon-naver{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -564px;background-size:auto;width:32px;height:32px}.share-service-icon-nujij{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1148px;background-size:auto;width:32px;height:32px}.share-service-icon-odnoklassniki{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 0;background-size:auto;width:32px;height:32px}.share-service-icon-pinterest{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -108px;background-size:auto;width:32px;height:32px}.share-service-icon-rakuten{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1076px;background-size:auto;width:32px;height:32px}.share-service-icon-reddit{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1220px;background-size:auto;width:32px;height:32px}.share-service-icon-skyblog{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1457px;background-size:auto;width:32px;height:32px}.share-service-icon-skype{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -456px;background-size:auto;width:32px;height:32px}.share-service-icon-sledzik{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -732px;background-size:auto;width:32px;height:32px}.share-service-icon-stumbleupon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -312px;background-size:auto;width:32px;height:32px}.share-service-icon-tuenti{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1328px;background-size:auto;width:32px;height:32px}.share-service-icon-tumblr{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -384px;background-size:auto;width:32px;height:32px}.share-service-icon-twitter{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1385px;background-size:auto;width:32px;height:32px}.share-service-icon-vkontakte{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -896px;background-size:auto;width:32px;height:32px}.share-service-icon-webryblog{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1292px;background-size:auto;width:32px;height:32px}.share-service-icon-weibo{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -144px;background-size:auto;width:32px;height:32px}.share-service-icon-wykop{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -824px;background-size:auto;width:32px;height:32px}.share-service-icon-yahoo{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -1040px;background-size:auto;width:32px;height:32px}.share-service-icon-yigg{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-sharing-vfln1IZka.webp") 0 -672px;background-size:auto;width:32px;height:32px}#share-email .share-email{margin-top:50px}.share-embed-code{box-sizing:border-box;width:100%}.share-panel-embed-container hr{border-color:#ccc;border-style:solid;margin:1em 0}.share-embed-options{margin-top:10px}.share-embed-options li{margin-top:6px}.share-panel-embed-container form{overflow:auto}.share-size-options .yt-uix-form-input-select{margin:0 15px 0 10px}.share-panel-embed-legal{color:#767676;font-size:11px;line-height:3;vertical-align:middle}#share-embed-customize input{width:50px}#action-panel-dismiss{position:absolute;top:3px;right:3px}#action-panel-stats.action-panel-content{padding:0;width:100%}#action-panel-details a{color:#333}#action-panel-details:hover a{color:#167ac6}.action-panel-error,.action-panel-loading,.action-panel-login{padding:20px;text-align:center}.action-panel-error,.action-panel-loading{color:#666}#watch8-sentiment-actions{float:right}#watch8-secondary-actions{position:relative;left:-10px}#watch8-sentiment-actions .like-button-renderer .yt-uix-button{margin-right:0;padding-right:0}#action-panel-dismiss,#action-panel-dismiss:hover,#watch8-action-buttons .yt-uix-button,#watch8-action-buttons .yt-uix-button:hover{background:none;border:none}#action-panel-add-transcript p{margin-bottom:10px;font-size:13px;color:#333}.alloffers-button{color:#167ac6;box-shadow:none}.alloffers-button:hover{box-shadow:none;color:#126db3}.alloffers-icon:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -209px -48px;background-size:auto;width:24px;height:24px}.alloffers-icon:hover:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -14px -66px;background-size:auto;width:24px;height:24px}.action-panel-trigger-stats:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -108px -161px;background-size:auto;width:16px;height:16px}.action-panel-trigger-details:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -323px -309px;background-size:auto;width:20px;height:20px}.addto-button:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -349px -60px;background-size:auto;width:20px;height:20px}.action-panel-trigger-share:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") 0 -185px;background-size:auto;width:20px;height:20px}#action-panel-overflow-button:before,.action-panel-trigger-overflow:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -434px 0;background-size:auto;width:20px;height:20px}.action-panel-trigger-report:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -220px 0;background-size:auto;width:16px;height:16px}.action-panel-trigger-transcript:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -92px -564px;background-size:auto;width:16px;height:16px}.action-panel-trigger-translate:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -371px -522px;background-size:auto;width:16px;height:16px}#action-panel-dismiss:before,.action-panel-trigger-dismiss:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -123px -564px;background-size:auto;width:10px;height:10px}#action-panel-report #flag-video-panel{margin-bottom:0}#flag-video-panel h3,#flag-video-panel p{margin-bottom:10px}.share-panel-url-container .yt-uix-expander-head{display:block;line-height:2em}.share-panel-url-options{float:right;line-height:2.2;width:200px}.share-panel-show-url-options{color:#333;display:block;text-align:right}.share-panel .yt-uix-expander .collapsed-message{display:none}.share-panel .yt-uix-expander .expanded-message,.share-panel .yt-uix-expander.yt-uix-expander-collapsed .collapsed-message{display:inline}.share-panel .yt-uix-expander.yt-uix-expander-collapsed .expanded-message{display:none}.share-panel .arrow{border:1px solid transparent;margin-bottom:1px}.share-panel .collapsed-message .arrow{border-top-color:#8d8d8d;border-width:4px 4px 0}.share-panel .expanded-message .arrow{border-bottom-color:#8d8d8d;border-width:0 4px 4px}.share-panel-start-at-time{width:50px}#video-preview{text-align:center}@media screen and (max-width:656px){#share-preview{display:none}}.trimmer{visibility:hidden;position:absolute;top:-2px;bottom:-2px;background-color:#126db3;width:11px}.selected .trimmer{visibility:inherit}.trimmer,.trimmer *{font-size:0;padding:0;margin:0;border:0;z-index:3}.left-trimmer{left:-11px}.right-trimmer{right:-11px}.trimmer .trimmer-component-icon{opacity:0.75}.trimmer .trimmer-component-icon:hover,.trimmer button:hover .trimmer-component-icon{opacity:1}.trimmer .bottom-edge,.trimmer .knurling-grip,.trimmer .top-edge,.trimmer button.nudge-left,.trimmer button.nudge-right{position:absolute}.trimmer .knurling-grip{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") 0 -29px;background-size:auto;width:5px;height:7px;top:50%;margin-top:-3.5px;left:3px}.trimmer .knurling-area{position:absolute;left:0;right:0;top:10px;bottom:10px;cursor:col-resize}.trimmer .knurling-area:hover .trimmer-component-icon{opacity:1}.trimmer button.nudge-left,.trimmer button.nudge-right{padding:3px;left:1px}button.nudge-left .nudge-left-icon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") -7px 0;background-size:auto;width:3px;height:5px}button.nudge-right .nudge-right-icon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") 0 0;background-size:auto;width:3px;height:5px}.left-trimmer .bottom-edge,.left-trimmer .top-edge{opacity:1;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") -7px -21px;background-size:auto;width:3px;height:4px;right:-3px}.right-trimmer .bottom-edge,.right-trimmer .top-edge{opacity:1;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") 0 -21px;background-size:auto;width:3px;height:4px;left:-3px}.trimmer .bottom-edge{bottom:0}.trimmer .top-edge{top:0}.trimmer button.nudge-left::-moz-focus-inner,.trimmer button.nudge-right::-moz-focus-inner{border:0;padding:0;margin:0}.trimmer button.nudge-left{top:3px;cursor:pointer}.trimmer button.nudge-right{bottom:7px;cursor:pointer}.trimmer .end-time,.trimmer .start-time{position:absolute;bottom:-20px;background:#126db3;color:#fff;font-size:9px;font-weight:500;padding:0 2px;height:12px;line-height:12px;visibility:hidden}.trimmer .start-time{left:0}.trimmer .end-time{right:0}.trimmer .tooltip-arrow{position:absolute;bottom:-8px;visibility:hidden}.left-trimmer .tooltip-arrow{left:0;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") 0 -9px;background-size:auto;width:9px;height:8px}.right-trimmer .tooltip-arrow{right:0;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-timeline-trimmer-vfly1oyv8.webp") 0 -9px;background-size:auto;width:9px;height:8px}.clip-trimmer-container{width:500px;margin-bottom:15px}.clip-trimmer{width:482px;height:75px;background-color:#999;position:relative;top:10px;margin:0 auto;text-align:left;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.clip-trimmer .framestrip-slice{width:40px;height:75px;display:block;float:left;overflow:hidden;position:relative}.clip-trimmer .framestrip-slice.slice4,.clip-trimmer .framestrip-slice.slice8{width:41px}.clip-trimmer .framestrip-slice img{position:relative;margin-top:-7px;margin-left:-41px}.clip-trimmer .trimmer{visibility:visible}.clip-trimmer .grayout{background-color:#fff;opacity:0.65;z-index:1;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=65)";filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=65);position:absolute;top:0;height:75px;box-shadow:inset 0 2px 5px #666;-moz-box-shadow:inset 0 2px 5px #666;-webkit-box-shadow:inset 0 2px 5px #666}.clip-trimmer .start-grayout{left:0}.clip-trimmer .end-grayout{right:0}.clip-trimmer .readout{font-size:11px;width:5em;position:absolute;text-align:left}.share-panel-gif-right{color:#333;margin-left:10px;position:relative;top:10px;float:left}.share-panel-gif-left{max-width:270px;float:left;margin:10px 20px 0}.share-panel-gif-time{display:inline-block;width:130px}.share-panel-gif-end-at{padding-left:6px}.share-panel-gif-time label{display:block;width:130px}.share-panel-gif-time span input{display:block;width:110px}.share-panel-gif-end-at,.share-panel-gif-start-at,.share-panel-gif-text{margin-bottom:10px}.share-panel-gif-time-input{width:50px}.share-panel-gif-times{margin-bottom:10px}#share-panel-gif-trimmer-container{margin-left:5px;width:600px}.share-panel-gif-bold{text-transform:uppercase;font-weight:500;margin-right:10px}.share-panel-gif-iframe-container,.share-panel-gif-url-container{height:22px;width:250px;color:#666;margin-right:5px}.share-panel-gif-button,.share-panel-gif-services-container{margin-bottom:10px}.share-panel-gif-iframe-container,.share-panel-gif-url-container{margin-bottom:40px}.gif-suggestion-loading-spinner.loading{display:inline-block;height:34px}.gif-suggestion-loading-spinner .yt-spinner-img{margin-bottom:10px;margin-left:4px}.gif-suggestion-loading-spinner{display:none}.gif-preview-container{width:320px}.gif-preview-container .loading-gif-preview{display:none}.gif-preview-container.loading .loading-gif-preview{display:block}.gif-preview-container.loading .loading-gif-preview .yt-spinner{padding-top:70px}.gif-preview-container .animated-gif-preview-img{display:block}.gif-preview-container.loading .animated-gif-preview-img{display:none}.loading-gif-result .yt-spinner{padding-top:100px;padding-bottom:100px;width:600px}.animated-gif-preview-img{display:block;max-width:268px;max-height:152px;width:auto;height:auto}.share-panel-gif-options label{display:inline-block;min-width:90px}#share-panel-gif-trimmer{width:560px;margin-left:15px;margin-bottom:10px}#share-panel-gif-trimmer .clip-trimmer{width:560px}#share-panel-gif-trimmer .framestrip-slice{width:47px}#share-panel-gif-trimmer .framestrip-slice.slice1,#share-panel-gif-trimmer .framestrip-slice.slice10,#share-panel-gif-trimmer .framestrip-slice.slice4,#share-panel-gif-trimmer .framestrip-slice.slice7{width:46px}#share-panel-gif-trimmer .readout{display:none}.yt-uix-button-group .end.epic-nav-item-heading,.yt-uix-button-group .end.yt-uix-button-epic-nav-item,.yt-uix-button-group .start.epic-nav-item-heading,.yt-uix-button-group .start.yt-uix-button-epic-nav-item{border-radius:0}.yt-uix-button-epic-nav-item .yt-uix-button-arrow{border:none;margin-right:-2px;margin-left:1px;margin-top:-1px;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -423px -547px;background-size:auto;width:13px;height:13px}.yt-uix-button-epic-nav-item.selected:hover .yt-uix-button-arrow,.yt-uix-button-epic-nav-item.yt-uix-button-toggled:hover .yt-uix-button-arrow,.yt-uix-button-epic-nav-item:hover .yt-uix-button-arrow{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -183px 0;background-size:auto;width:13px;height:13px}.yt-uix-button-epic-nav-item .yt-uix-button-icon{margin-right:3px}.yt-ui-menu-content:focus{outline:none}.yt-ui-menu-content{background:#fff;border:1px solid #d3d3d3;outline:none;overflow:visible;padding:10px 0;box-shadow:0 2px 4px rgba(0, 0, 0, .2)}.yt-ui-menu-item{position:relative;color:#333;cursor:pointer;display:block;font-size:13px;line-height:25px;margin:0;padding:0 15px;text-align:left;text-decoration:none;white-space:nowrap;width:100%;word-wrap:normal;-moz-box-sizing:border-box;box-sizing:border-box}a.yt-ui-menu-item{text-decoration:none}.yt-ui-menu-item-label,.yt-ui-menu-item.has-icon:before{display:inline-block;vertical-align:middle}.yt-ui-menu-item.has-icon:before{margin-right:10px;content:""}.yt-ui-menu-item-checked:before{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -208px -457px;background-size:auto;width:15px;height:14px}.yt-ui-menu-item-checked-hid:before{width:15px;height:14px}.yt-ui-menu-item.has-icon:before{opacity:0.5;filter: alpha(opacity=50)}.yt-ui-menu-item.has-icon:hover:before{opacity:0.6;filter: alpha(opacity=60)}.yt-ui-menu-item.has-icon:active:before{opacity:0.8;filter: alpha(opacity=80)}.yt-ui-menu-item.has-icon:hover:active:before{opacity:1;filter: alpha(opacity=100)}.yt-ui-menu-item:hover,.yt-uix-menu-trigger-selected .yt-ui-menu-item{background:#eee}.yt-ui-menu-item:focus{outline:none;background:#eee}.yt-ui-menu-content ul:focus{outline:none}.yt-ui-menu-content li.yt-ui-menu-new-section-separator{border-top:1px solid #b8b8b8;margin-top:10px;padding-top:10px}.overflow-container.empty-overflow-list{position:absolute;left:-19999px}.yt-default h1,.yt-default h2,.yt-default h3,.yt-default h4,.yt-default h5,.yt-default h6,h1.yt,h2.yt,h3.yt,h4.yt,h5.yt,h6.yt{margin-top:0;margin-bottom:13px;color:#222}.yt-default h1,h1.yt{font-size:24px;font-weight:normal}.yt-default h2,h2.yt{font-size:13px}.yt-default h3,h3.yt{font-size:13px;font-weight:normal}.yt-default h4,h4.yt{font-size:12px}.yt-default h5,h5.yt{font-size:12px;font-weight:normal}.yt-default h6,h6.yt{font-size:11px;font-weight:500;text-transform:uppercase}.yt-default h2 small,.yt-default h4 small,h2.yt small,h4.yt small{color:#555;font-size:12px;font-weight:normal}.yt-default h6 small,h6.yt small{color:#555;font-size:11px;font-weight:normal;text-transform:none}.yt-badge-ypc{border:1px solid #73c421;color:#73c421;text-transform:none}.yt-badge-ypc-free,.yt-badge-ypc-purchased,.yt-badge-ypc-seasonpass{border:1px solid #757575;color:#757575;text-transform:uppercase}.yt-badge.standalone-ypc-badge-renderer-icon{border:0;padding:0 5px;color:#fff;line-height:16px;height:16px;font-size:12px;border-radius:2px}.yt-badge.standalone-ypc-badge-renderer-icon-available{background:#2793e6}.yt-badge.standalone-ypc-badge-renderer-icon-not-available{background:#b8b8b8}.yt-badge.standalone-ypc-badge-renderer-icon-purchased{background:#767676}.standalone-ypc-badge-renderer-label{color:#767676;font-size:12px}.standalone-ypc-badge-renderer-secondary-label{font-weight:500;color:#767676;border-radius:2px;padding-left:4px;padding-right:4px;margin-right:4px;text-align:center}.rotten-rotomatoes-fresh-icon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -286px 0;background-size:auto;width:13px;height:13px}.rotten-rotomatoes-splat-icon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -455px -364px;background-size:auto;width:13px;height:13px}.rotten-rotomatoes-certified-icon{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -84px -122px;background-size:auto;width:13px;height:13px}.review-aggregate-badge-renderer-icon{vertical-align:top;padding-right:2px}.grid-movie-renderer-meta-info{padding-top:6px;padding-bottom:5px}.grid-movie-renderer-metadata,.review-aggregate-badge-renderer-text,.review-aggregate-badge-renderer-text a:link,.review-aggregate-badge-renderer-text a:visited{color:#767676;font-size:12px}.yt-badge{border:1px solid #ddd;padding:0 4px;height:13px;color:#444;font-size:11px;font-weight:normal;text-transform:uppercase;text-decoration:none;line-height:13px;display:inline-block}.yt-badge-beta-noframe{border:none}.yt-badge-list{color:#555;line-height:100%;vertical-align:middle;text-transform:uppercase;font-size:0;display:inline-block}.yt-badge-item{margin-right:4px;vertical-align:middle;display:inline-block}.yt-badge-item:last-child{margin-right:0}.yt-badge-ad{background:#e6bc27;border:0;border-radius:2px;color:#fff;font-size:13px;height:16px;line-height:16px;padding:0 5px;text-transform:none;vertical-align:middle}.yt-badge-live{border:1px solid #e62117;color:#e62117}.yt-music-pass-badge-container{display:inline-block;vertical-align:middle}.yt-badge-music{text-transform:none;border:none;color:#fff;background-color:#2793e6}.music-pass-icon{margin-top:3px;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -286px -339px;background-size:auto;width:13px;height:13px}.yt-badge-mde-recoupment{margin:5px;color:#2793e6;border:1px solid #2793e6;text-transform:uppercase}.yt-uix-button-group{display:inline-block;white-space:nowrap;vertical-align:middle}.yt-uix-button-group .yt-uix-button{margin-right:-1px;border-radius:0}.yt-uix-button-group .yt-uix-button:hover{position:relative;z-index:2147483645}.yt-uix-button-group .start{-moz-border-radius-topleft:2px;border-top-left-radius:2px;-moz-border-radius-bottomleft:2px;border-bottom-left-radius:2px}.yt-uix-button-group .end{margin-right:0;-moz-border-radius-topright:2px;border-top-right-radius:2px;-moz-border-radius-bottomright:2px;border-bottom-right-radius:2px}.yt-uix-button-arrow{margin-top:-3px;margin-left:5px;border:1px solid transparent;border-top-color:#333;border-width:4px 4px 0;width:0;height:0}.yt-uix-button-reverse .yt-uix-button-arrow{border-width:0 4px 4px;border-top-color:transparent;border-bottom-color:#333}.yt-uix-button-empty .yt-uix-button-arrow{margin-left:0}.yt-uix-button-dark .yt-uix-button-arrow,.yt-uix-button-destructive .yt-uix-button-arrow,.yt-uix-button-light .yt-uix-button-arrow,.yt-uix-button-payment .yt-uix-button-arrow,.yt-uix-button-primary .yt-uix-button-arrow{border-top-color:#fff}.yt-uix-button-dark.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-destructive.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-light.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-payment.yt-uix-button-reverse .yt-uix-button-arrow,.yt-uix-button-primary.yt-uix-button-reverse .yt-uix-button-arrow{border-bottom-color:#fff}.yt-uix-button .yt-uix-button-menu{display:none}.yt-uix-button .yt-uix-button-menu:focus{outline:none}.yt-uix-button-menu{outline:none;padding:8px 0;position:absolute;border:1px solid #ccc;z-index:2147483647;overflow:auto;background:#fff;border-radius:2px}.yt-uix-button-menu-external{overflow:visible}.yt-uix-button-menu li{margin:0;padding:0}.yt-uix-button-menu li.yt-uix-button-menu-new-section-separator{padding-top:8px;margin-top:8px;border-top:1px solid #b8b8b8}.yt-uix-button-menu .yt-uix-button-menu-item{display:block;margin:0;padding:0 25px;color:#333;font-size:13px;text-decoration:none;white-space:nowrap;word-wrap:normal;line-height:25px;cursor:pointer;cursor:hand}.yt-uix-button-menu-item-selected .yt-uix-button-menu-item{font-weight:500}.yt-uix-button-menu .yt-uix-button-menu-item-highlight .yt-uix-button-menu-item,.yt-uix-button-menu .yt-uix-button-menu-item.selected,.yt-uix-button-menu .yt-uix-button-menu-item:hover{background-color:#333;color:#fff}.yt-uix-button-menu-mask{position:absolute;z-index:2147483646;opacity:0;filter: alpha(opacity=0);border:0;padding:0;margin:0}div.yt-uix-button-menu > table{background:#ebebeb;border-collapse:separate;border-spacing:1px}.yt-uix-button-menu .yt-uix-button-icon-checkbox{float:left;padding:5px 0 5px 4px}.yt-uix-button-menu .yt-uix-button-icon-dropdown-checked{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -208px -457px;background-size:auto;width:15px;height:14px}.yt-uix-button-menu li:hover .yt-uix-button-icon-dropdown-checked{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") 0 -443px;background-size:auto;width:15px;height:14px}.yt-uix-button-icon-trash{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -130px -42px;background-size:auto;width:12px;height:16px}.yt-uix-button-icon-channel-back{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -323px -293px;background-size:auto;width:15px;height:10px}.rtl .yt-uix-button-icon-channel-back{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -35px -291px;background-size:auto;width:15px;height:10px}.yt-uix-button-icon-dismissal{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -104px -381px;background-size:auto;width:20px;height:20px}.yt-uix-button-icon-settings{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -300px -40px;background-size:auto;width:16px;height:16px}.yt-uix-button-icon-settings-material{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -453px -494px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-view-list{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -208px -429px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-view-module{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -97px -235px;background-size:auto;width:24px;height:24px}.yt-uix-button-icon-close{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -123px -564px;background-size:auto;width:10px;height:10px}.yt-uix-button-icon-search{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -417px -24px;background-size:auto;width:15px;height:15px}.yt-uix-button-disabled-aria-label{display:none;opacity:0}.yt-uix-button[disabled]+.yt-uix-button-disabled-aria-label{display:block;position:absolute}.yt-uix-button.yt-uix-button-nakedicon{padding:0}.yt-uix-expander-arrow{vertical-align:middle;float:right;margin:0;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -131px -443px;background-size:auto;width:16px;height:16px}.yt-uix-expander-arrow-left{vertical-align:middle;float:left;margin:0 5px 0 0;background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -131px -443px;background-size:auto;width:16px;height:16px}.yt-uix-expander-head{cursor:pointer;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none}.yt-uix-expander-collapsed .yt-uix-expander-arrow,.yt-uix-expander-collapsed .yt-uix-expander-arrow-left{background:no-repeat url("//s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png") -88px -161px;background-size:auto;width:16px;height:16px}

.signin-clickcard.yt-uix-clickcard-card-content{width:auto}.signin-clickcard-header{margin-bottom:15px;font-size:15px}.signin-clickcard-message{margin-bottom:10px;font-size:13px;line-height:1.3em}.signin-button.yt-uix-button{padding:0 40px;font-size:15px;height:35px}

.watch-extras-section .title,.watch-extras-section .content{font-size:11px;line-height:11px;margin-bottom:5px}.watch-extras-section .title{float:left;font-weight:500;width:100px;margin-right:10px}.watch-meta-item{clear:both}.yt-uix-expander-collapsed #watch-description-text{max-height:42px;overflow:hidden;padding-top:4px}.watch-info-tag-list a{white-space:nowrap}.watch-meta-item .watch-info-tag-list li{display:inline}.watch-meta-item .watch-info-tag-list li:after{content:normal;}.watch-meta-item .watch-info-tag-list li:last-child:after{content:normal;}.watch-meta-item.has-image .watch-info-tag-list li{display:list-item;line-height:15px}.watch-meta-item.has-image .watch-info-tag-list li:after{content:normal;}.watch-meta-item.has-image .metadata-row-image{float:left;margin-right:10px}.watch-meta-item.has-image .metadata-row-image img{width:40px}#limited-state-header{margin-bottom:8px}#watch-limited-actions{float:right;margin-top:10px}#watch-limited-actions a:not(:last-child){margin-right:4px}

#watch-privacy-icon{float:left;margin-right:5px}#watch7-headline #watch-privacy-icon .privacy-icon{vertical-align:middle}#watch7-headline #watch-privacy-icon.public .privacy-icon{background:no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -453px -470px;background-size:auto;width:24px;height:20px}#watch7-headline #watch-privacy-icon.private .privacy-icon{background:no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -381px -454px;background-size:auto;width:24px;height:20px}#watch7-headline #watch-privacy-icon.unlisted .privacy-icon{background:no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vflgGT3Hj.png) -276px -470px;background-size:auto;width:24px;height:20px}
#dot.ytd-video-primary-info-renderer {
    display: none;
}
#toast.yt-notification-action-renderer {
    display: none;
}

tp-yt-iron-dropdown.style-scope ytd-popup-container {
display: none !important;
}

button:focus {
outline: none !important;
box-shadow: none !important;
}
button:active {
outline: none !important;
box-shadow: none !important;
}
html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#player.style-scope.ytd-watch-flexy {
    margin-bottom: 10px;
}
html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#meta.style-scope.ytd-watch-flexy {
    display: flex;
    width: 0px;
    height: 0px;
    position: absolute;
    z-index: -2000;
}
html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#meta.style-scope.ytd-watch-flexy div#meta-contents.style-scope.ytd-watch-flexy ytd-video-secondary-info-renderer.style-scope.ytd-watch-flexy div#container.style-scope.ytd-video-secondary-info-renderer div#top-row.style-scope.ytd-video-secondary-info-renderer {
    display: flex;
    width: 0px;
    height: 0px;
    position: absolute;
    z-index: -2000;
}

html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#info.style-scope.ytd-watch-flexy {
    display: none;
}


.yt-card {
    margin: 0 0 10px;
    border: 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.yt-card.yt-card-has-padding {
    padding: 15px;
        padding-bottom: 15px;
}

#watch-header {
    min-height: 150px;
    padding-bottom: 5px;
    position: relative;
}
#watch7-headline h1 {
    line-height: normal;
    word-wrap: break-word;
}
.watch-title-container {
    vertical-align: top;
    display: inline-block;
    width: 75%;
}
#watch7-headline h1 {
    font-size: 20px;
}
#watch7-headline h1, #watch7-headline h2 {
    font-weight: normal;
}
#watch7-headline h1 {
    line-height: normal;
    word-wrap: break-word;
}
#watch7-user-header {
    position: relative;
    padding-bottom: 10px;
    padding-top: 10px;
    overflow: hidden;
}


div#related.ytd-watch-flexy {
display: none !important;
}

/*
* RECOMMENDATIONS CSS
*/




.yt-lockup-grid .yt-uix-menu-container.yt-lockup-action-menu{right:-8px}.yt-lockup-mini .yt-lockup-badges{margin:1px 0 0}.yt-lockup-meta{display:block}.yt-lockup-description{line-height:1.3em;word-wrap:break-word}.gecko .yt-lockup-description .yt-ui-ellipsis:before{content:''}.yt-lockup-thumbnail{line-height:0;position:relative}.yt-lockup.yt-lockup-tile .yt-lockup-thumbnail{float:left;margin-right:10px;text-align:center;width:196px}.fluid.yt-lockup-tile .yt-lockup-thumbnail{max-width:480px;width:60%}.yt-lockup.yt-lockup-mini .yt-lockup-thumbnail{display:inline-block;float:left;margin-right:8px;text-align:right}.yt-lockup-clip{overflow:hidden;padding-bottom:56.25%}.yt-thumb.yt-lockup-clip{display:block}.yt-lockup-clip img{margin-top:-9.375%;position:absolute}.yt-lockup.yt-lockup-mini .yt-lockup-badges{float:right}.yt-lockup .yt-lockup-content{overflow:hidden;position:relative}.yt-lockup-meta-info>li{line-height:1.3em;display:inline-block}.yt-lockup-meta-info>li:first-child:before{display:none}.yt-lockup-meta-info>li:last-child{margin-right:0}.yt-lockup-grid .yt-uix-button-subscription-container.vertical{margin-top:2px}.yt-lockup-movie-vertical-poster{height:223px}.yt-lockup-movie-vertical-poster .yt-lockup-movie-top-content{height:85%}.yt-lockup-movie-vertical-poster .yt-lockup-movie-bottom-content{height:15%}.yt-lockup-movie-vertical-poster .yt-lockup-content .yt-lockup-byline,.yt-lockup-movie-vertical-poster .yt-lockup-content .yt-lockup-meta{margin-top:5px;margin-bottom:5px}.yt-lockup-movie-vertical-poster .yt-lockup-content .yt-lockup-description,.yt-lockup-movie-vertical-poster .yt-lockup-content .yt-lockup-cast{margin-top:13px;margin-bottom:8px}.yt-lockup-movie-vertical-poster .yt-lockup-content .yt-lockup-meta li{margin-bottom:3px}.yt-lockup-movie-regular-thumbnail{height:138px}.yt-lockup-movie-regular-thumbnail .yt-lockup-movie-top-content{height:80%}.yt-lockup-movie-regular-thumbnail .yt-lockup-movie-bottom-content{height:20%}.yt-lockup-movie-regular-thumbnail .yt-lockup-content .yt-lockup-byline,.yt-lockup-movie-regular-thumbnail .yt-lockup-content .yt-lockup-meta{margin-top:2px;margin-bottom:2px}.yt-bottom-aligned-button{position:absolute;bottom:0;left:0}.yt-lockup-tile .yt-badge-list{margin-right:5px}.yt-standalone-badge-item{margin-right:10px;vertical-align:middle;display:inline-block}.yt-standalone-badge-item:last-child{margin-right:0}.yt-bottom-aligned-badge-list{position:absolute;bottom:0;left:0}.exp-responsive .yt-lockup-tile .yt-badge-list{display:inline;margin-right:4px}.view-count .yt-badge-list{margin-left:5px;vertical-align:bottom}.yt-lockup-badge-item{margin-right:4px;vertical-align:middle;display:inline-block}.yt-lockup-badge-item:last-child{margin-right:0}.yt-lockup-badge-link{vertical-align:middle}.yt-lockup-notifications-container{border:1px solid #e2e2e2}.yt-lockup-playlist-items{font-size:12px;margin:4px 0;white-space:nowrap}.yt-lockup-playlist-item{border-bottom:1px solid #e2e2e2;padding:1px 0}.yt-lockup-playlist-item-title{display:block;font-weight:normal;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-lockup-playlist-item-length{float:right}.yt-lockup-playlist-item-ypc-badge{float:right;margin-right:4px}.yt-lockup-channel-subscriber-count{width:100%;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.yt-lockup-channel.yt-lockup-grid .qualified-channel-title,.yt-lockup-channel.yt-lockup-tile .qualified-channel-title{line-height:18px}.yt-lockup-channel.yt-lockup-grid .yt-channel-title-autogenerated,.yt-lockup-channel.yt-lockup-grid .yt-channel-title-icon-verified,.yt-lockup-channel.yt-lockup-tile .yt-channel-title-autogenerated,.yt-lockup-channel.yt-lockup-tile .yt-channel-title-icon-verified{margin-bottom:0;vertical-align:inherit}#browse-items-primary .item-section>li>.yt-lockup-tile.yt-lockup-notification,.yt-lockup-notification{padding:15px;min-height:71px;box-sizing:border-box}.yt-lockup.yt-lockup-notification{font-size:11px}.yt-lockup-notification .notification-avatar{position:absolute;left:0;top:0;padding:15px}.yt-lockup-notification .unread-dot{position:absolute;left:7.5px;top:50%;width:4px;height:4px;border-radius:50%;background:#167ac6;-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.yt-lockup-notification .notification-avatar .yt-thumb{line-height:normal;border-radius:50%}.yt-lockup-notification .yt-lockup-content{display:inline-block;margin-left:55px;margin-right:92px}.yt-lockup-notification .yt-lockup-title a{color:#222;font-size:13px;font-weight:normal}.yt-lockup-notification .yt-lockup-byline li{display:inline-block}.yt-lockup-notification .yt-lockup-byline li:last-child:after{content:''}.yt-lockup-notification .notification-thumb{position:absolute;width:72px;right:5px;top:0;padding:15px}.yt-lockup-notification .notification-thumb .yt-thumb{display:block;height:41px;background:transparent}.yt-lockup-notification .notification-thumb .yt-thumb img{position:absolute;top:50%;transform:translateY(-50%);height:auto}.yt-lockup-notification .yt-uix-menu-container{top:12px}
.watch-sidebar-body .yt-uix-simple-thumb-wrap.watched>img{opacity:.7;filter:alpha(opacity=70)}.watched .video-thumb{opacity:.7;filter:alpha(opacity=70)}.is-small .yt-pl-thumb-overlay .yt-pl-thumb-overlay-text{font-size:11px}.yt-pl-thumb-overlay .play-icon{margin-right:3px;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -389px -74px;background-size:auto;width:9px;height:12px}.yt-pl-thumb-overlay-text{vertical-align:middle;font-weight:normal;font-size:13px}
.yt-thumb-clip img,.yt-thumb-clip .vertical-align{display:inline-block;vertical-align:middle}.yt-thumb-poster,.yt-thumb-square,.yt-thumb-feed,.yt-thumb-related-playlist,.yt-thumb-default{display:block;height:auto}.yt-thumb-poster{padding-bottom:142.857143%}.yt-thumb-square{padding-bottom:100%}.yt-thumb-feed{padding-bottom:67.027027%}.yt-thumb-related-playlist{padding-bottom:63.333333%}.yt-thumb-default{padding-bottom:56.25%}.yt-pl-thumb .yt-thumb-43 .yt-thumb-default{padding-bottom:46.511628%}.yt-thumb-10{width:10px}.yt-thumb-18{width:18px}.yt-thumb-20{width:20px}.yt-thumb-23{width:23px}.yt-thumb-24{width:24px}.yt-thumb-26{width:26px}.yt-thumb-27{width:27px}.yt-thumb-28{width:28px}.yt-thumb-31{width:31px}.yt-thumb-32{width:32px}.yt-thumb-33{width:33px}.yt-thumb-34{width:34px}.yt-thumb-36{width:36px}.yt-thumb-40{width:40px}.yt-thumb-43{width:43px}.yt-thumb-46{width:46px}.yt-thumb-48{width:48px}.yt-thumb-54{width:54px}.yt-thumb-56{width:56px}.yt-thumb-60{width:60px}.yt-thumb-64{width:64px}.yt-thumb-65{width:65px}.yt-thumb-68{width:68px}.yt-thumb-72{width:72px}.yt-thumb-74{width:74px}.yt-thumb-75{width:75px}.yt-thumb-76{width:76px}.yt-thumb-77{width:77px}.yt-thumb-80{width:80px}.yt-thumb-84{width:84px}.yt-thumb-88{width:88px}.yt-thumb-90{width:90px}.yt-thumb-91{width:91px}.yt-thumb-96{width:96px}.yt-thumb-100{width:100px}.yt-thumb-104{width:104px}.yt-thumb-106{width:106px}.yt-thumb-110{width:110px}.yt-thumb-120{width:120px}.yt-thumb-168{height:94px;width:168px}.yt-thumb-124{width:124px}.yt-thumb-126{width:126px}.yt-thumb-128{width:128px}.yt-thumb-138{width:138px}.yt-thumb-141{width:141px}.yt-thumb-145{width:145px}.yt-thumb-150{width:150px}.yt-thumb-152{width:152px}.yt-thumb-154{width:154px}.yt-thumb-160{width:160px}.yt-thumb-162{width:162px}.yt-thumb-165{width:165px}.yt-thumb-167{width:167px}.yt-thumb-169{width:169px}.yt-thumb-175{width:175px}.yt-thumb-176{width:176px}.yt-thumb-182{width:182px}.yt-thumb-185{width:185px}.yt-thumb-185 .yt-thumb-feed img{height:124px;width:auto}.yt-thumb-189{width:189px}.yt-thumb-194{width:194px}.yt-thumb-196{width:196px}.yt-thumb-224{width:224px}.yt-thumb-234{width:234px}.yt-thumb-250{width:250px}.yt-thumb-279{width:279px}.yt-thumb-288{width:288px}.yt-thumb-320{width:320px}.yt-thumb-350{width:350px}.yt-thumb-370{width:370px}.yt-thumb-380{width:380px}.yt-thumb-527{width:527px}.yt-thumb-640{width:640px}.yt-fluid-thumb-link,.yt-thumb-fluid{width:100%}.yt-thumb-fluid .yt-thumb-clip{left:0;right:0}.yt-thumb-fluid img{width:100%}.exp-mouseover-img .yt-lockup-thumbnail .video-actions,.exp-mouseover-img .thumb-wrapper .video-actions{z-index:3}.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-img{z-index:2}.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play{height:48px;width:48px;margin:auto;z-index:1}.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-img,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play{display:none;opacity:0;position:absolute}.exp-mouseover-img .yt-uix-mouseover-img-wrap:hover .mouseover-img,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-img:focus,.exp-mouseover-img .yt-uix-mouseover-img-wrap:hover .mouseover-play,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play:focus{display:block;bottom:0;left:0;right:0;top:0}.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play svg{filter:drop-shadow(0px 0px 4px rgba(0,0,0,0.5));-webkit-filter:drop-shadow(0px 0px 4px rgba(0,0,0,0.5));opacity:.8}.ux-thumb-wrap{position:relative;overflow:hidden;display:inline-block}a.ux-thumb-wrap{text-decoration:none;*cursor:pointer}#results-main-content .playlist-video .ux-thumb-wrap{float:none;vertical-align:middle;margin-bottom:3px}.contains-percent-duration-watched .video-time,.contains-percent-duration-watched .video-time-overlay,.contains-percent-duration-watched .addto-button,.contains-percent-duration-watched .addto-queue-button{margin-bottom:4px}.contains-addto{display:block;position:relative;height:100%;overflow:hidden}a:hover .contains-addto .video-time,.contains-addto:hover .video-time,a:hover .contains-addto .video-time-overlay,.contains-addto:hover .video-time-overlay{display:none}.contains-addto:hover .video-actions,.ux-thumb-wrap:hover .video-actions,a:hover .video-actions,.video-actions:focus,.video-actions.yt-uix-button-active{right:2px}.video-list-item .ux-thumb-wrap,.video-list-item .yt-pl-thumb{float:left;margin:0 8px 0 0}.video-thumb{position:relative}.ux-thumb-wrap .yt-uix-button-arrow{margin:0}.video-actions{position:absolute;bottom:2px}.video-time,.video-time-overlay{position:absolute;right:2px;bottom:2px}.video-actions{display:block;right:-60px;cursor:pointer;cursor:hand}.video-time{margin-top:0;margin-right:0;padding:0 4px;font-weight:500;font-size:11px;background-color:#000;color:#fff!important;height:14px;line-height:14px;opacity:.75;filter:alpha(opacity=75);display:-moz-inline-stack;vertical-align:top;display:inline-block}.watched-badge{position:absolute;top:10px;left:10px;padding:2px 4px;line-height:1.3em;text-align:left;color:#fff;font-size:11px;font-weight:500;background-color:#000;opacity:.5;filter:alpha(opacity=50);overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.watched .video-thumb{opacity:.7;filter:alpha(opacity=70)}.resume-playback-background,.resume-playback-progress-bar{bottom:0;height:4px;left:0;position:absolute}.resume-playback-background{background:#eee;opacity:.6;width:100%}.resume-playback-progress-bar{background:#e62117;opacity:1}.video-time-overlay{margin-top:0;margin-right:0;padding:0 4px;font-weight:500;font-size:11px;color:#fff;height:14px;line-height:14px;display:-moz-inline-stack;vertical-align:top;display:inline-block}.video-time-overlay-live{background-color:#e62117}.video-time-overlay-upcoming{background-color:#000}.video-time-overlay-default{background-color:#000;opacity:.75;filter:alpha(opacity=75)}.yt-valign{white-space:nowrap}.yt-valign-center{white-space:nowrap;text-align:center}.yt-valign:before,.yt-valign-container{vertical-align:middle;display:inline-block}
#watch7-sidebar .watch-sidebar-section{position:relative;z-index:2;margin:0 0 15px 5px}#watch7-sidebar .watch-sidebar-section:last-child{margin-bottom:0}#watch-sidebar-discussion .live-chat-widget{visibility:hidden}#watch-sidebar-discussion .unavailable{color:#555;text-align:center}#watch-sidebar-live-chat{background:#f8f8f8;padding:0}#watch-sidebar-live-chat #hide-live-comments{margin:0 12px}#watch-sidebar-live-chat .yt-uix-button-expander{margin:0}#watch-sidebar-live-chat .yt-uix-expander-collapsed{background:#fff}#watch-sidebar-live-chat .yt-uix-expander-collapsed-body{border-top:none}#watch7-sidebar .live-chat-iframe{width:100%;height:500px;margin-bottom:-3px}#watch7-sidebar .watch-sidebar-head{margin:0 5px 10px;font-size:13px;color:#222;line-height:1.3em;width:290px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}#watch7-sidebar .watch-sidebar-head.shelf-renderer-sidebar-head{margin-top:-5px}#watch7-sidebar .watch-sidebar-head a{color:#444}#watch7-sidebar .watch-sidebar-head:hover a{color:#1c62b9}#watch7-sidebar .watch-sidebar-section .watch-sidebar-play-all{padding-left:10px;margin-top:-3px;position:absolute;right:0;top:0}#watch7-sidebar .watch-sidebar-separation-line{border-bottom:1px solid #e2e2e2;margin:0 5px 15px}.video-list-item{position:relative;margin-bottom:15px}#watch7-sidebar .watch-sidebar-body .video-list-item:last-child{margin-bottom:0}#watch7-sidebar .video-list-item a:hover{background:none}#watch7-sidebar .video-list-item a .title .yt-deemphasized-text{color:#222;font-style:italic;font-weight:normal}#watch7-sidebar .video-list-item:hover .title,#watch7-sidebar .video-list-item:hover .title .yt-deemphasized-text{color:#167ac6;text-decoration:none}#watch7-sidebar .video-list-item a:visited .title,#watch7-sidebar .video-list-item a:visited .title .yt-deemphasized-text{color:#333}#watch7-sidebar .video-list-item a:hover .title,#watch7-sidebar .video-list-item a:hover .title .yt-deemphasized-text{color:#167ac6}#watch7-sidebar .video-list-item a:hover:visited .title,#watch7-sidebar .video-list-item a:hover:visited .title .yt-deemphasized-text{color:#036}#watch7-sidebar hr.yt-horizontal-rule{margin:7px 0 15px}#watch7-sidebar .watch-sidebar-home-promo-head{display:inline;text-decoration:none}#watch7-sidebar .watch-sidebar-home-promo-head h4{display:inline;margin:0}#watch7-sidebar .watch-sidebar-home-promo-link{color:#128ee9;display:inline;float:right}#watch7-sidebar .watch-sidebar-home-promo-related-wrapper{position:relative;margin-bottom:15px;margin-top:10px}#watch_companion_legal_text{position:relative;margin:0 0 15px 10px;border:1px solid #e2e2e2;padding:5px;width:300px;height:250px;overflow:auto}#watch-channel-brand-div{position:relative;text-align:center;margin-left:10px;max-height:265px;width:300px}#google_companion_ad_div>div,#google_companion_ad_div>iframe,#google_companion_ad_div>table{margin-bottom:15px}#watch-channel-brand-div-text{display:none;position:absolute;top:-10px;height:10px;text-align:center;line-height:10px;font-size:10px;color:#767676;width:300px}#watch-channel-brand-div.with-label #watch-channel-brand-div-text{display:block}#watch-related>.yt-spinner{opacity:.5;filter:alpha(opacity=50)}.video-list-item.button-list-item .title{margin-right:15px}#watch7-sidebar .video-list-item .close{position:absolute;left:-9999px;z-index:1;padding:0}#watch7-sidebar .video-list-item .close .yt-uix-button-arrow{display:none}#watch7-sidebar .video-list-item:hover .close,#watch7-sidebar .video-list-item .close:focus{left:auto;right:0}.yt-uix-button-icon-related-close{opacity:.8;filter:alpha(opacity=80);background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -479px -175px;background-size:auto;width:17px;height:17px}.yt-uix-button-icon-related-close:hover{opacity:1;filter:none}.yt-uix-button-active .yt-uix-button-icon-related-close{opacity:1;filter:none;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -186px -164px;background-size:auto;width:17px;height:17px}#watch7-sidebar.spf-animate .spf-animate-old{position:relative}.remote-connected #watch7-sidebar-modules .autoplay-bar{display:none}.autoplay-bar .autoplay-info-icon{cursor:pointer;margin-left:4px;margin-right:4px;margin-top:-1px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -565px -88px;background-size:auto;width:16px;height:16px}.autoplay-bar .checkbox-on-off{position:absolute;top:0;right:0;vertical-align:top;font-size:13px;font-weight:500;color:#767676}.autoplay-hovercard{display:inline-block;vertical-align:middle}.yt-channel-title-autogenerated,.yt-channel-title-icon-verified{vertical-align:middle;margin-bottom:2px;*margin-right:6px;-webkit-user-drag:none;display:inline-block}.channel-header-autogenerated-label a{color:#dfdfdf}.yt-channel-title-autogenerated{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -926px -132px;background-size:auto;width:12px;height:9px}.yt-channel-title-icon-verified{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) 0 0;background-size:auto;width:12px;height:9px}.yt-channel-title-icon-verified:hover{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -158px -210px;background-size:auto;width:12px;height:9px}.qualified-channel-title.ellipsized{width:100%;white-space:nowrap;display:inline-block}.qualified-channel-title.ellipsized .qualified-channel-title-wrapper{max-width:100%;display:inline-block}.qualified-channel-title.ellipsized .qualified-channel-title-text{display:block;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.qualified-channel-title.ellipsized.has-badge .qualified-channel-title-text{margin-right:15px}.qualified-channel-title-badge{margin-left:5px}.qualified-channel-title.ellipsized .qualified-channel-title-badge{position:relative;left:-15px;vertical-align:top;display:inline-block}.persistent-ypc-module .ypc-transact-offer{display:none}.ypc-transact-offer{margin:0 0 15px 10px;overflow:hidden;color:#505050;font-size:11px;line-height:16px}.ypc-transact-offer .help-link,.ypc-transact-offer .ypc-offer-rating-score a{color:#767676}.ypc-transact-offer .ypc-offer-thumbnail{float:left;margin:0 10px 0 0}.ypc-transact-offer .ypc-offer-metadata-container{float:left;width:255px}.ypc-transact-offer .ypc-offer-title{margin:0 0 5px;font-size:15px;font-weight:500;line-height:15px}.ypc-transact-offer .ypc-offer-rating-scores{margin-bottom:10px}.ypc-transact-offer .ypc-offer-rating-score{margin:0 0 2px}.ypc-transact-offer .ypc-offer-star-rating-bg{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -605px -163px;background-size:auto;width:66px;height:13px;display:inline-block;position:relative;top:1px}.ypc-transact-offer .ypc-offer-star-rating-fg{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -294px -92px;background-size:auto;width:66px;height:13px;display:inline-block;overflow:hidden}.ypc-transact-offer .ypc-offer-badge{margin:10px 0}.ypc-transact-offer .ypc-offer-duration{font-weight:500}.ypc-transact-offer .ypc-offer-metadata{display:block}.ytr-transact-offer .ytr-offer-title{color:#333;font-size:15px;font-weight:500;margin:0 0 10px}.ytr-transact-offer .ytr-offer-subtitle{display:block;color:#767676;font-size:13px;font-weight:normal;margin:5px 0 0}.ytr-transact-offer .ytr-purchase-button{float:right;margin:0 0 0 5px}.ytr-transact-offer .ytr-offer-thumbnail{display:block}.ytr-transact-offer .ytr-offer-thumbnail .yt-thumb-default{margin-top:-1px}#watch-offer .ypc-wide-button{padding-left:30px;padding-right:30px}#watch-offer .ypc-spaced-button{margin-left:10px}#watch-offer.ypc-transact-offer .ypc-offer-metadata-container{font-size:13px;width:auto}#watch-header .ypc-transact-offer{margin:0;float:right}#watch-metadata-description-offer .ypc-stacked-button{width:200px;margin-top:20px;text-transform:uppercase}.offer-module-menu{display:table;width:100%;table-layout:fixed}.offer-module-menu span{display:table-cell;height:48px;vertical-align:middle;text-transform:uppercase;background-color:#fafafa;border-bottom:1px solid #e2e2e2}.offer-module-menu>span:hover{background-color:#eee;cursor:pointer}.offer-module-menu>span.active-tab{border-bottom:2px solid #167ac6;color:#167ac6}.offer-module-tab-content{display:none}#watch-metadata-description-purchase{float:right}#watch-metadata-description-offer div.active-tab{display:block;background-color:#fafafa}#watch-metadata-header .ypc-channel-icon{float:right}#watch-metadata{color:#333}#watch-metadata-header{height:56px}#watch-metadata-description{margin-top:10px;overflow:hidden}#watch-metadata-description-poster{display:table-cell;margin-right:15px}#watch-metadata-description-text{line-height:16px;display:table-cell;vertical-align:top;width:100%;max-width:475px}#watch-metadata-description-text.offer-module-present{max-width:204px;padding-right:15px}#watch-metadata-description-offer{display:table-cell;text-align:center;width:256px;min-width:256px}.alloffer-button-wrapper{height:38px;padding-top:10px;background-color:#fafafa}li.metadata-item{margin-top:10px}div.yt-uix-expander-collapsed li.metadata-item.metadata-item-is-hidden{display:none}div.yt-uix-expander-collapsed #watch-metadata-description-text-synopsis{max-height:112px;overflow:hidden}#watch-metadata-header .review-aggregate-badge-renderer-text a{color:#333;font-size:13px}#movie-upsell-card{display:table;width:100%;padding:15px}.movie-upsell-column-left{float:left;display:table-cell;margin-right:15px}.movie-upsell-column-right{display:table-cell;width:100%;vertical-align:top}.movie-upsell-column-content{width:100%;height:171px}.movie-upsell-content{position:relative;overflow:hidden;height:100%}.movie-upsell-offer-button{position:absolute;bottom:0;left:0}.movie-upsell-offer-button-top{position:absolute;top:0;right:0}.movie-upsell-header{font-size:13px;color:#333;margin-bottom:5px}.movie-upsell-title{margin-bottom:6px;max-width:65%;font-size:17px;height:20px}.movie-upsell-title-compact{margin-bottom:5px;max-width:65%;font-size:16px;height:19px}.movie-upsell-title-compact a,.movie-upsell-title a{color:#333}.movie-upsell-title-compact a:hover,.movie-upsell-title a:hover{color:#167ac6;text-decoration:none}.movie-upsell-subtitle{font-size:13px;color:#333}.movie-upsell-subtitle .standalone-ypc-badge-renderer .review-aggregate-badge-renderer-text a:visited,.movie-upsell-subtitle .standalone-ypc-badge-renderer .review-aggregate-badge-renderer-text a:link{font-weight:400;font-size:13px;color:#333}.movie-upsell-description{color:#333;line-height:14px;overflow:hidden;position:relative}.movie-upsell-description-compact p{max-height:28px;overflow:hidden;padding-top:15px}.movie-upsell-description-large p{max-height:42px;overflow:hidden;padding-top:15px}#movie-upsell-description-extras{margin-top:15px}.movie-upsell-extras-section .title,.movie-upsell-extras-section .content{line-height:14px}.movie-upsell-extras-section .title{float:left;width:100px;margin-right:10px;color:#000}.movie-upsell-title.yt-ui-ellipsis,.movie-upsell-subtitle.yt-ui-ellipsis,.content.watch-info-tag-list.yt-ui-ellipsis{-webkit-line-clamp:1;max-height:1.3em}.movie-upsell-info-icon{position:absolute;top:0;right:0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -565px -88px;background-size:auto;width:16px;height:16px}.movie-upsell-info-yt-bottom{position:absolute;bottom:0;left:20px;padding-bottom:2px;color:#767676;font-size:10px;font-weight:500}.movie-upsell-info-icon-bottom{position:absolute;bottom:0;left:0;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -565px -88px;background-size:auto;width:16px;height:16px}.yt-uix-button-icon-calendar-plus{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -771px -156px;background-size:auto;width:16px;height:16px;opacity:.6;filter:alpha(opacity=60)}.yt-uix-button:hover .yt-uix-button-icon-calendar-plus{opacity:1;filter:alpha(opacity=100)}.live-badge,.hoa-badge{border:1px solid #b91f1f;padding:0 4px;color:#b91f1f;font-size:10px;background-color:#fff;line-height:1.5em;text-transform:uppercase;display:inline-block}
.accessible-description{display:none}
.yt-uix-button-action-menu,.yt-uix-button-action-menu:focus:hover,.yt-uix-button-lockup-action-menu,.yt-uix-button-lockup-action-menu:focus:hover{box-shadow:none}.yt-uix-button-action-menu .yt-uix-button-arrow{display:none}.yt-uix-button-action-menu:before,.yt-uix-button-lockup-action-menu:before{opacity:.8;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -38px -900px;background-size:auto;width:13px;height:13px}.yt-uix-button-action-menu:hover:before,.yt-uix-button-active.yt-uix-button-lockup-action-menu:before{opacity:1;filter:alpha(opacity=100)}.yt-uix-button-action-menu,.yt-uix-button-lockup-action-menu{width:20px;height:20px;border:none;padding:0;background:transparent;cursor:pointer}#browse-items-primary .item-section>li>.yt-lockup-tile .yt-uix-menu-top-level-button,.yt-section-hover-container .yt-uix-button-action-menu,.yt-section-hover-container .yt-uix-menu-top-level-button{opacity:.5;filter:alpha(opacity=50)}.yt-lockup .yt-uix-button-action-menu,.yt-lockup .yt-uix-button-lockup-action-menu,.video-list-item .related-item-action-menu .yt-uix-button{opacity:0;filter:alpha(opacity=0)}#browse-items-primary .item-section>li>.yt-lockup-tile:hover .yt-uix-menu-top-level-button,.yt-section-hover-container .yt-uix-button-action-menu.yt-uix-button-active,.yt-section-hover-container .yt-uix-menu-top-level-flow-button,.yt-section-hover-container:hover .yt-uix-button-action-menu,.yt-section-hover-container:hover .yt-uix-menu-top-level-button,.yt-lockup .yt-uix-button-action-menu.yt-uix-button-active,.yt-lockup:hover .yt-uix-button-action-menu,.yt-uix-menu-trigger.yt-uix-menu-trigger-selected .yt-uix-button-action-menu,.yt-uix-button-action-menu:focus,.yt-lockup .yt-uix-button-lockup-action-menu.yt-uix-button-active,.yt-lockup:hover .yt-uix-button-lockup-action-menu,.yt-uix-button-lockup-action-menu:focus,.yt-uix-menu-trigger.yt-uix-menu-trigger-selected .yt-uix-button-lockup-action-menu,.video-list-item:hover .related-item-action-menu .yt-uix-button{opacity:1;filter:alpha(opacity=100)}
body .addto-watch-later-button,.addto-watch-later-button-sign-in,.addto-watch-later-button-loading,.addto-watch-later-button-error,.addto-watch-later-button-success,.addto-watch-later-button-remove{width:22px;height:22px;padding:0;border-radius:2px}.addto-watch-later-button-error,.addto-watch-later-button-success,.addto-watch-later-button-remove{border:none}.addto-watch-later-button:before,.addto-watch-later-button-sign-in:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -239px -48px;background-size:auto;width:13px;height:13px}.addto-watch-later-button-sign-in .yt-uix-button-arrow{display:none}.addto-watch-later-button-loading:before{height:20px;width:19px;background:url(//s.ytimg.com/yts/img/loader-vflff1Mjj.gif) no-repeat}.yt-uix-button.addto-watch-later-button-success{background-image:-moz-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-ms-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-o-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-webkit-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:linear-gradient(to bottom,#74a446 0,#4d7730 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#74a446,EndColorStr=#4d7730)}.addto-watch-later-button-success:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -56px -342px;background-size:auto;width:19px;height:20px}.yt-uix-button.addto-watch-later-button-remove,.yt-uix-button.addto-watch-later-button-error{background-image:-moz-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-ms-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-o-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-webkit-linear-gradient(top,#c95145 0,#913d37 100%);background-image:linear-gradient(to bottom,#c95145 0,#913d37 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#c95145,EndColorStr=#913d37)}.addto-watch-later-button-remove:before,.addto-watch-later-button-error:before{width:22px;height:22px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -242px -687px}#shared-addto-watch-later-login{padding:7px}.addto-watch-queue-button,.addto-watch-queue-button-loading,.addto-watch-queue-button-success,.addto-watch-queue-button-error,body .addto-tv-queue-button{width:22px;height:22px;padding:0;border-radius:2px}.addto-watch-queue-button:before,.addto-tv-queue-button:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) 0 -190px;background-size:auto;width:20px;height:20px}.yt-uix-button.addto-watch-queue-button-loading:before{height:20px;background:url(//s.ytimg.com/yts/img/loader-vflff1Mjj.gif) no-repeat}.yt-uix-button.addto-watch-queue-button-success,.yt-uix-button.addto-watch-queue-button-error{color:#fff;border:none}.yt-uix-button.addto-watch-queue-button-success{background:#167ac6}.addto-watch-queue-button-success:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -56px -342px;background-size:auto;width:19px;height:20px}.yt-uix-button.addto-watch-queue-button-error{background-image:-moz-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-ms-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-o-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-webkit-linear-gradient(top,#c95145 0,#913d37 100%);background-image:linear-gradient(to bottom,#c95145 0,#913d37 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#c95145,EndColorStr=#913d37)}.addto-watch-queue-button-error:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vflU8QvQi.png) -242px -687px;background-size:auto;width:20px;height:20px}body .addto-tv-queue-button,.remote-connected .addto-watch-queue-button{display:none}.remote-connected .addto-tv-queue-button{display:inline-block}.remote-connected .addto-watch-later-button,.remote-connected .addto-watch-later-button-sign-in{display:none}
.addto-button:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -813px -232px;background-size:auto;width:20px;height:20px}
.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-img,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play{display:none;opacity:0;position:absolute}.exp-mouseover-img .yt-uix-mouseover-img-wrap:hover .mouseover-img,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-img:focus,.exp-mouseover-img .yt-uix-mouseover-img-wrap:hover .mouseover-play,.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play:focus{display:block;bottom:0;left:0;right:0;top:0}.exp-mouseover-img .yt-uix-mouseover-img-wrap .mouseover-play svg{filter:drop-shadow(0px 0px 4px rgba(0,0,0,0.5));-webkit-filter:drop-shadow(0px 0px 4px rgba(0,0,0,0.5));opacity:.8}.ux-thumb-wrap{position:relative;overflow:hidden;display:inline-block}a.ux-thumb-wrap{text-decoration:none;*cursor:pointer}#results-main-content .playlist-video .ux-thumb-wrap{float:none;vertical-align:middle;margin-bottom:3px}.contains-percent-duration-watched .video-time,.contains-percent-duration-watched .video-time-overlay,.contains-percent-duration-watched .addto-button,.contains-percent-duration-watched .addto-queue-button{margin-bottom:4px}.contains-addto{display:block;position:relative;height:100%;overflow:hidden}a:hover .contains-addto .video-time,.contains-addto:hover .video-time,a:hover .contains-addto .video-time-overlay,.contains-addto:hover .video-time-overlay{display:none}.contains-addto:hover .video-actions,.ux-thumb-wrap:hover .video-actions,a:hover .video-actions,.video-actions:focus,.video-actions.yt-uix-button-active{right:2px}.video-list-item .ux-thumb-wrap,.video-list-item .yt-pl-thumb{float:left;margin:0 8px 0 0}.video-thumb{position:relative}.ux-thumb-wrap .yt-uix-button-arrow{margin:0}.video-actions{position:absolute;bottom:2px}.video-time,.video-time-overlay{position:absolute;right:2px;bottom:2px}.video-actions{display:block;right:-60px;cursor:pointer;cursor:hand}.video-time{margin-top:0;margin-right:0;padding:0 4px;font-weight:500;font-size:11px;background-color:#000;color:#fff!important;height:14px;line-height:14px;opacity:.75;filter:alpha(opacity=75);display:-moz-inline-stack;vertical-align:top;display:inline-block}.watched-badge{position:absolute;top:10px;left:10px;padding:2px 4px;line-height:1.3em;text-align:left;color:#fff;font-size:11px;font-weight:500;background-color:#000;opacity:.5;filter:alpha(opacity=50);overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.watched .video-thumb{opacity:.7;filter:alpha(opacity=70)}.resume-playback-background,.resume-playback-progress-bar{bottom:0;height:4px;left:0;position:absolute}.resume-playback-background{background:#eee;opacity:.6;width:100%}.resume-playback-progress-bar{background:#e62117;opacity:1}.video-time-overlay{margin-top:0;margin-right:0;padding:0 4px;font-weight:500;font-size:11px;color:#fff;height:14px;line-height:14px;display:-moz-inline-stack;vertical-align:top;display:inline-block}.video-time-overlay-live{background-color:#e62117}.video-time-overlay-upcoming{background-color:#000}.video-time-overlay-default{background-color:#000;opacity:.75;filter:alpha(opacity=75)}.yt-valign{white-space:nowrap}.yt-valign-center{white-space:nowrap;text-align:center}.yt-valign:before,.yt-valign-container{vertical-align:middle;display:inline-block}.yt-valign:before{content:'';height:100%}.music-pass-badge-renderer-logo{margin:10px auto;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -607px -232px;background-size:auto;width:132px;height:23px}.music-pass-badge-renderer-ad-free-button{text-transform:uppercase}.music-pass-badge-renderer-upsell-text{text-align:center}.music-pass-badge-renderer-upsell-enabled-video{margin-bottom:10px;font-size:13px}.music-pass-badge-renderer-upsell-join{font-size:11px}.options-renderer-captcha,.options-renderer-form,.options-renderer-confirmation,.options-renderer-message-abuse,.options-renderer-message-continue,.options-renderer-message-required,.options-renderer-message-confirm,.options-renderer-message-review,.options-renderer-message-redirect,.options-renderer-form-other,.options-renderer-button-back,.options-renderer-button-submit,.options-renderer-button-continue{display:none}.options-renderer-step1 .options-renderer-captcha,.options-renderer-step1 .options-renderer-message-review,.options-renderer-step1 .options-renderer-button-continue,.options-renderer-step2 .options-renderer-form,.options-renderer-step2 .options-renderer-message-review,.options-renderer-step2 .options-renderer-message-required,.options-renderer-step2 .options-renderer-button-submit,.options-renderer-step3 .options-renderer-confirmation,.options-renderer-step3 .options-renderer-message-confirm,.options-renderer-step3 .options-renderer-button-continue,.options-renderer-step4 .options-renderer-button-continue,.options-renderer-step4 .options-renderer-form-other,.options-renderer-step4 .options-renderer-message-abuse,.options-renderer-step4 .options-renderer-message-continue,.options-renderer-step4 .options-renderer-message-required,.options-renderer-step4 .options-renderer-button-back,.options-renderer-step5 .options-renderer-message-redirect{display:block}.options-renderer{position:relative;width:100%}.options-renderer-info{position:relative;border-bottom:1px solid #ddd;padding:5px 0 15px 160px;height:75px}.options-renderer-step3 .options-renderer-info{margin-top:5px;border-bottom:none;padding-bottom:0}.options-renderer-info p{padding:2px 0}.options-renderer-info .video-thumb{position:absolute;top:0;left:10px}.options-renderer-captcha-hint{padding:10px 0}.options-renderer-captcha .captcha-container{margin-left:0}.options-renderer-message-review{bottom:48px;color:#555;font-size:11px}.options-renderer-message-abuse{margin-bottom:15px;border-bottom:1px solid #ddd;padding-bottom:15px}.options-renderer-message-captcha,.options-renderer-message-failed{padding-bottom:10px}.options-renderer-message-continue{float:right;margin-right:10px;width:300px;font-size:11px;text-align:right}.options-renderer-buttons{bottom:0;padding-top:15px;width:100%}.options-renderer-button-submit,.options-renderer-button-continue,.options-renderer-submit-button{float:right}.options-renderer-button-back{float:left}.options-renderer-message-required{font-size:11px;line-height:32px}.options-renderer-step4 .options-renderer-message-required{margin-left:63px}.options-renderer-step2 .options-renderer-message-required{float:right;margin-right:15px}.options-renderer-form{position:relative}.options-renderer-categories{width:250px}.options-renderer-category{padding:5px 0}.options-renderer-category.clearfix .yt-uix-form-input-radio-container,.options-renderer-category.clearfix label,.options-renderer-category.clearfix .yt-uix-tooltip{float:left}.options-renderer-category .yt-uix-form-input-radio-container{margin-right:3px}.options-renderer-category-label{float:left;margin-top:2px}.options-renderer-question-mark{margin-left:15px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -605px -143px;background-size:auto;width:15px;height:16px}.options-renderer-type-select{display:none;padding:5px 0 5px 20px;width:152px}.options-renderer-type-select .yt-uix-form-input-select{width:150px}.options-renderer-category-selected .options-renderer-type-select{display:block}.options-renderer-addition{position:absolute;top:10px;left:300px;width:300px}.options-renderer-addition p{padding:5px 0;color:#555;font-size:11px}.options-renderer-details{width:280px;font-size:11px}.options-renderer-timestamp{width:20px}.options-renderer-details{height:50px}.options-renderer-form-other{position:relative;padding:10px}.options-renderer-confirmation{padding:10px;line-height:18px}.options-renderer-confirmation p{color:#555;font-size:11px}.options-renderer-message-confirm{padding-bottom:10px}.options-renderer-title{line-height:20px;display:inline-block}.options-renderer-captcha{padding:0}.options-renderer-buttons{border-top:none}.options-renderer-confirmation{background-color:#efefef}.options-renderer-step3 .options-renderer-buttons{display:none}.options-renderer{height:auto}.options-renderer-categories,.options-renderer-other-categories{margin-top:10px}.options-renderer-form{padding:0}.options-renderer-message-review{position:static;padding:10px 0}.options-renderer-buttons{position:static}.options-renderer-a11y-container{clip:rect(0,0,0,0);position:absolute}.options-renderer-content{font-size:13px;line-height:1.5em;padding:20px 0;width:300px;word-wrap:break-word}.options-renderer-content li{padding:3px 0}.options-renderer-content li:first-child{padding-top:0}.options-renderer-content li:last-child{padding-bottom:0}.options-renderer-content .yt-uix-form-input-radio-container{margin-right:6px;height:15px;width:15px;vertical-align:text-top}.options-renderer-content .yt-uix-form-input-radio-container input{top:0;left:0;height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-element{height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element{background:none;height:15px;width:15px}.options-renderer-content .yt-uix-form-input-radio-container input:checked+.yt-uix-form-input-radio-element:after{content:'';display:block;position:relative;top:4px;left:4px;width:7px;height:7px;background:#555;border-radius:50%}.option-item-supported-renderers-sub-options{padding:10px 0 0 19px}#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close{margin-top:8px;margin-right:-18px}#report-form-modal-renderer .yt-dialog-base .yt-dialog-header .yt-dialog-close .yt-uix-button-content{background:no-repeat url(https://www.gstatic.com/images/icons/material/system/1x/close_black_24dp.png);height:24px;width:24px}#report-form-modal-renderer .yt-dialog-fg-content{padding:0 16px 20px}#report-form-modal-renderer .yt-dialog-fg-content .yt-dialog-title{line-height:initial;padding-top:24px}#report-form-modal-renderer .yt-dialog-content{font-size:13px;line-height:1.5em;padding-top:24px;width:340px;word-wrap:break-word}#report-form-modal-renderer .options-renderer-content{padding:0;width:auto}#report-form-modal-renderer .yt-dialog-footer{padding-top:16px}#report-form-modal-renderer .yt-dialog-footer button{margin-left:8px}.add-to-button-renderer-icon:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -813px -232px;background-size:auto;width:20px;height:20px}
.yt-uix-form-input-fluid .yt-uix-form-input-text,.yt-uix-form-input-fluid .yt-uix-form-input-textarea{width:100%}.yt-uix-form-select-fluid{overflow:hidden;padding-right:2px}.yt-uix-form-select-fluid .yt-uix-form-input-select,.yt-uix-form-select-fluid select{width:100%}.yt-uix-checkbox-on-off{position:relative;display:inline-block;width:35px;height:15px;padding-right:2px;overflow:hidden;vertical-align:middle;cursor:pointer}.yt-uix-checkbox-on-off input[type=checkbox]{position:absolute;margin:0;width:37px;height:15px;opacity:0}.yt-uix-checkbox-on-off label{display:inline-block;border:1px solid transparent;height:13px;width:100%;background:#b8b8b8;border-radius:20px}.yt-uix-checkbox-on-off input[type=checkbox]:checked+label{background-color:#167ac6}.yt-uix-checkbox-on-off label>*{display:inline-block;height:100%;vertical-align:top;-moz-transition:width .1s;-webkit-transition:width .1s;transition:width .1s}.yt-uix-checkbox-on-off .checked{text-align:center;line-height:13px}.yt-uix-checkbox-on-off .checked:before{content:'';display:inline-block;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -86px -193px;background-size:auto;width:10px;height:7px}.yt-uix-checkbox-on-off .toggle{background:#fbfbfb;width:13px;border-radius:13px}.yt-uix-checkbox-on-off .checked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .unchecked{width:0}.yt-uix-checkbox-on-off .unchecked,.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .checked{width:22px}.yt-uix-checkbox-on-off input[type=checkbox]:disabled+label{opacity:.5}.yt-uix-checkbox-on-off.large{width:54px;height:24px}.yt-uix-checkbox-on-off.large input[type=checkbox]{width:56px;height:24px}.yt-uix-checkbox-on-off.large label{height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .checked{line-height:22px}.yt-uix-checkbox-on-off.large label .toggle{width:22px;height:22px;border-radius:22px}.yt-uix-checkbox-on-off.large .unchecked,.yt-uix-checkbox-on-off.large input[type=checkbox]:checked+label .checked{width:32px}.autoplay-bar .checkbox-on-off{position:absolute;top:0;right:0;vertical-align:top;font-size:13px;font-weight:500;color:#767676}.autoplay-hovercard{display:inline-block;vertical-align:middle}
.related-list-item .related-item-action-menu{position:absolute;top:0;right:0}.related-item-dismissed-container{border:1px solid #e2e2e2;height:100%}.service-endpoint-replace-enclosing-action-notification{height:92px}.related-list-item .replace-enclosing-action-message{padding-top:26px}.related-list-item .replace-enclosing-action-options{margin-top:10px}.related-item-dismissable .title{margin-right:15px}.related-item-dismissable .related-item-action-menu .yt-uix-button{margin-top:-10px;margin-right:-1px;height:10px;width:10px}.related-item-dismissable{height:100%}.exp-wfv-wn .video-list .video-list-item .title{font-weight:normal;line-height:1.3em;max-height:3.9em}.exp-wfv-wn-2 .video-list .video-list-item .title{font-size:15px;font-weight:normal;line-height:1.3em;max-height:3.9em}.ac-renderer{position:absolute;color:#03c;background-color:#fff;border:1px solid #999;z-index:199}.ac-renderer .active{color:#03c;background-color:#eff4fc}.ac-renderer .active b{color:#000}
.video-list-item a:visited .title{color:#408}.video-list-item a:hover .title{text-decoration:underline}.video-list-item a:visited .video-thumb .img{opacity:.75;filter:alpha(opacity=75)}.video-list-item a:hover .video-thumb .img{opacity:1;filter:none}.video-list-item .title{display:block;font-size:1.1666em;font-weight:normal;line-height:1.2;color:#03c;max-height:3.6em;margin-bottom:2px;overflow:hidden;cursor:pointer;cursor:hand}.video-list-item .episodic-item .title{overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.video-list-item .stat{display:block;font-size:.9166em;color:#666;line-height:1.4em;height:1.4em;white-space:nowrap}.video-list-item .stat .time-created{margin-left:.25em;padding-left:.5em;border-left:1px solid #ccc;white-space:nowrap}.video-list-item .mix-playlist .stat{white-space:normal}.video-list-item .stat strong{color:#333}.video-list-item .views{color:#333;font-weight:500}.video-list-item .alt{float:right;margin-right:5px}.video-list-item .playlist-video-count{margin-left:10px}.video-list-item .playlist-video{height:15px;overflow:hidden}.video-list-item .ux-thumb-wrap .video-count{position:absolute;top:2px;right:2px;padding:2px;background:rgba(0,0,0,.8);color:#fff;font-weight:normal;font-size:90%;line-height:1;text-align:center}.video-list-item .ux-thumb-wrap .video-count strong{display:block}.video-grid .video-list-item{float:left;clear:none;width:116px}.video-grid .video-list-item .video-thumb{float:none;margin:0}.video-grid .video-list-item .title{width:100%;max-height:3.6em;overflow:hidden}.ad-badge-byline{margin-right:3px}.video-list .video-list-item .title{color:#333;font-size:14px;font-weight:500}.video-list .video-list-item .title:hover{text-decoration:underline}.video-list .video-list-item .title:visited{color:#036}.video-list .video-list-item .description,.video-list .video-list-item .stat{color:#767676;font-size:11px}.video-list .video-list-item .description{line-height:1.2em;max-height:2.4em;overflow:hidden}.video-list .video-list-item a.related-channel{padding-left:61px}.video-list .yt-thumb-64 .yt-thumb-square{background-color:#333}.video-list .related-list-item-compact-movie-vertical-poster a.related-movie{text-align:center}.video-list .related-list-item-compact-movie-vertical-poster .content-wrapper,.video-list .related-list-item-compact-movie-vertical-poster .content-wrapper .content-link{height:100%}.video-list .movie-data{font-size:11px;line-height:1.4em;color:#767676;text-overflow:ellipsis;overflow:hidden}.video-list .movie-data li{white-space:nowrap}.video-list .related-list-item-compact-movie-vertical-poster .movie-data{margin-top:2px}.video-list .movie-description{margin-top:4px}.video-list .related-list-item-compact-movie-vertical-poster .movie-description{margin-top:7px}.video-list .movie-bottom-aligned-badge{position:absolute;bottom:0;left:0}.related-list-item .content-wrapper{margin-left:181px}.related-list-item .content-link{display:block;min-height:94px;text-decoration:none}.related-list-item .thumb-wrapper{position:absolute;top:0;margin:0 5px;width:168px;height:94px;overflow:hidden}.related-list-item.related-list-item-compact-movie,.related-list-item.related-list-item-compact-movie .thumb-wrapper{height:94px}.related-list-item.related-list-item-compact-movie-vertical-poster,.related-list-item.related-list-item-compact-movie-vertical-poster .thumb-wrapper{height:174px}.related-list-item .thumb-wrapper a{padding:0}.related-list-item .video-actions{position:absolute;right:-60px;bottom:2px}.related-list-item .video-time,.related-list-item .video-time-overlay,.related-list-item .video-actions:focus,.related-list-item:hover .video-actions{right:2px}.related-list-item:hover .video-time,.related-list-item:hover .video-time-overlay{right:-60px}.related-list-item.show-video-time:hover .video-time,.related-list-item.show-video-time:hover .video-time-overlay{right:2px}@media screen and (-webkit-min-device-pixel-ratio:0){.thumb-normal .video-list .yt-thumb-64 .yt-thumb-square .clip img{position:relative;left:-1px}}.video-list .video-list-item .yt-uix-button-subscription-container{position:absolute;left:133px;bottom:4px}.related-list-item .related-item-action-menu{position:absolute;top:0;right:0}.related-item-dismissed-container{border:1px solid #e2e2e2;height:100%}.service-endpoint-replace-enclosing-action-notification{height:92px}.related-list-item .replace-enclosing-action-message{padding-top:26px}.related-list-item .replace-enclosing-action-options{margin-top:10px}.related-item-dismissable .title{margin-right:15px}.related-item-dismissable .related-item-action-menu .yt-uix-button{margin-top:-10px;margin-right:-1px;height:10px;width:10px}.related-item-dismissable{height:100%}.exp-wfv-wn .video-list .video-list-item .title{font-weight:normal;line-height:1.3em;max-height:3.9em}.exp-wfv-wn-2 .video-list .video-list-item .title{font-size:15px;font-weight:normal;line-height:1.3em;max-height:3.9em}
.vertical-align{display:inline-block;vertical-align:middle}.yt-thumb-poster,.yt-thumb-square,.yt-thumb-feed,.yt-thumb-related-playlist,.yt-thumb-default{display:block;height:auto}.yt-thumb-poster{padding-bottom:142.857143%}.yt-thumb-square{padding-bottom:100%}.yt-thumb-feed{padding-bottom:67.027027%}.yt-thumb-related-playlist
.video-list-item .mix-playlist .stat{white-space:normal}.exp-mix-as-radio .yt-pl-thumb.yt-mix-thumb .sidebar{width:100%;background:rgba(0,0,0,.6)}}.yt-pl-thumb .yt-pl-sidebar-content{display:block;opacity:.8;filter:alpha(opacity=80);text-align:center}.yt-pl-thumb .formatted-video-count-label{display:block;margin:0 .75em;font-size:10px;line-height:1.25em;word-break:break-word;white-space:normal;text-transform:uppercase}.yt-pl-thumb .formatted-video-count-label b{display:block;font-weight:normal;font-size:18px;line-height:22px}.yt-pl-thumb.is-small .formatted-video-count-label{font-size:8px}.yt-pl-thumb.is-small .formatted-video-count-label b{font-size:14px}.yt-pl-thumb .yt-pl-sidebar-content{height:100%;color:#cfcfcf}.yt-pl-thumb-link{display:block;position:relative;text-align:left}.yt-pl-thumb-link:hover{text-decoration:none}.yt-pl-thumb-link .yt-pl-thumb-overlay{display:none;position:absolute;left:0;right:0;min-width:120px;top:0;bottom:0;background:rgba(0,0,0,.7);background:progid:DXImageTransform.Microsoft.gradient(startColorStr='#B2000000',endColorStr='#B2000000')}.yt-pl-thumb-link:hover .yt-pl-thumb-overlay,.yt-pl-thumb-link:focus .yt-pl-thumb-overlay{display:block}.remote-connected .yt-pl-thumb-link:hover .yt-pl-thumb-overlay{display:none}.yt-pl-thumb-overlay .yt-pl-thumb-overlay-content{position:absolute;text-align:center;top:50%;margin-top:-9px;width:100%;height:18px;font-size:16px;font-weight:500;color:#fff;text-shadow:0 1px 1px rgba(255,255,255,.6);text-transform:uppercase}.is-small .yt-pl-thumb-overlay .yt-pl-thumb-overlay-text{font-size:11px}.yt-pl-thumb-overlay .play-icon{margin-right:3px;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -389px -74px;background-size:auto;width:9px;height:12px}.yt-pl-thumb-overlay-text{vertical-align:middle;font-weight:normal;font-size:13px}.yt-pl-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -173px 0;background-size:auto;width:24px;height:24px}.is-small .yt-pl-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -206px -46px;background-size:auto;width:18px;height:18px}.yt-pl-icon.yt-pl-icon-mix{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -16px 0;background-size:auto;width:32px;height:32px}.is-small .yt-pl-icon.yt-pl-icon-mix{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -334px -193px;background-size:auto;width:24px;height:24px}.yt-pl-icon.yt-pl-icon-mix-blue{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -694px 0;background-size:auto;width:39px;height:39px}.yt-pl-icon.yt-pl-icon-mix-white{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -901px -24px;background-size:auto;width:58px;height:58px}.yt-pl-icon.yt-pl-icon-mix-circle{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -775px 0;background-size:auto;width:54px;height:54px}.is-small .yt-pl-icon.yt-pl-icon-mix-circle{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -142px -28px;background-size:auto;width:40px;height:40px}.yt-pl-thumb-link:hover .yt-pl-thumb .sidebar{background:rgba(0,0,0,.85);background:progid:DXImageTransform.Microsoft.gradient(startColorStr='#D8000000',endColorStr='#D8000000')}.yt-pl-thumb .yt-thumb-default-43{height:20px;width:43px}.yt-lockup .yt-lockup-meta .yt-pl-thumb .video-count-text b{font-weight:normal;color:#555}.yt-rounded{border-radius:2px}.yt-rounded-top{-moz-border-radius-topleft:2px;border-top-left-radius:2px;-moz-border-radius-topright:2px;border-top-right-radius:2px}.yt-rounded-bottom{-moz-border-radius-bottomleft:2px;border-bottom-left-radius:2px;-moz-border-radius-bottomright:2px;border-bottom-right-radius:2px}
.yt-thumb-poster,.yt-thumb-square,.yt-thumb-feed,.yt-thumb-related-playlist,.yt-thumb-default{display:block;height:auto}.yt-thumb-poster{padding-bottom:142.857143%}.yt-thumb-square{padding-bottom:100%}.yt-thumb-feed{padding-bottom:67.027027%}.yt-thumb-related-playlist{padding-bottom:63.333333%}

#watch7-sidebar .related-tweaks-normal a span.title{font-weight:normal}#watch7-sidebar .related-tweaks-large a span.title{font-size:15px}#watch7-sidebar .related-tweaks-larger a span.title{font-size:17px}#watch7-sidebar .related-tweaks-largest a span.title{font-size:19px}#watch7-sidebar .related-tweaks-alternate a span.title{color:#167ac6}#watch7-sidebar .related-tweaks-alternate a:hover span.title{color:#333}#watch7-main{position:relative;margin-top:0;margin-bottom:30px}#player-playlist{position:relative}@media screen and (max-width:656px){#player-playlist{width:426px}}#watch7-sidebar{position:relative;-moz-transition:margin-top .3s ease-in-out,padding-top .3s ease-in-out;-webkit-transition:margin-top .3s ease-in-out,padding-top .3s ease-in-out;transition:margin-top .3s ease-in-out,padding-top .3s ease-in-out}#watch-more-related-loading{color:#767676;font-size:11px;font-weight:500;text-align:center;text-transform:uppercase}#watch7-preview{position:relative;z-index:1000}.watch-sidebar-gutter{padding-left:10px;padding-right:10px}#watch7-sidebar-contents{padding-left:5px}#watch7-content{z-index:0}@media screen and (max-width:656px)
.video-time-overlay-upcoming{background-color:#000}.video-time-overlay-default{background-color:#000;opacity:.75;filter:alpha(opacity=75)}.yt-valign{white-space:nowrap}.yt-valign-center{white-space:nowrap;text-align:center}.yt-valign:before,.yt-valign-container{vertical-align:middle;display:inline-block}.yt-valign:before{content:'';height:100%}

.yt-pl-thumb .yt-pl-sidebar-content{display:block;opacity:.8;filter:alpha(opacity=80);text-align:center}.yt-pl-thumb .formatted-video-count-label{display:block;margin:0 .75em;font-size:10px;line-height:1.25em;word-break:break-word;white-space:normal;text-transform:uppercase}.yt-pl-thumb .formatted-video-count-label b{display:block;font-weight:normal;font-size:18px;line-height:22px}.yt-pl-thumb.is-small .formatted-video-count-label{font-size:8px}.yt-pl-thumb.is-small .formatted-video-count-label b{font-size:14px}.yt-pl-thumb .yt-pl-sidebar-content{height:100%;color:#cfcfcf}

div#secondary.ytd-watch-flexy {
margin-left: -14px !important;
}






.add-to-widget.yt-uix-clickcard-card-content{width:auto;padding:0}.add-to-widget .yt-scrollbar ::-webkit-scrollbar{width:9px}.add-to-widget .yt-scrollbar ::-webkit-scrollbar-thumb,.add-to-widget .yt-scrollbar ::-webkit-scrollbar-track{border-left-width:0}.add-to-widget .menu-panel{display:none}.add-to-widget .menu-panel.active-panel{display:block}.add-to-widget .playlists{width:260px;max-height:245px;padding-bottom:10px;overflow-x:hidden;overflow-y:auto;border-bottom:1px solid #ccc}.add-to-widget .addto-playlist-item{position:relative;display:block;padding:0 10px;line-height:25px;color:#333;white-space:nowrap;cursor:pointer}.add-to-widget .addto-playlist-item-subtitle{color:#adadad;margin-left:25px;width:190px;font-size:11px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.add-to-widget .create-playlist-item{display:none;width:100%;text-align:left;padding:5px 0 5px 16px;margin:10px 0;color:#333;white-space:nowrap;cursor:pointer}.addto-playlist-item.icon-hidden{padding-left:16px}.add-to-widget .addto-playlist-item.hid{display:none}.add-to-widget .addto-playlist-item:hover,.add-to-widget .create-playlist-item:hover,.add-to-widget .addto-playlist-item.yt-uix-kbd-nav-highlight{background-color:#eee}.add-to-widget .addto-playlist-item .playlist-status:focus{outline:none}.add-to-widget .create-playlist-item:focus{outline:none;background-color:#eee}.add-to-widget .addto-playlist-item.pending-change-actions:hover{background-color:transparent}.add-to-widget .playlist-name{display:inline-block;vertical-align:middle;line-height:21px;max-width:190px;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.add-to-widget .playlist-status,.add-to-widget .contains-all-selected-videos.to-be-removed .playlist-status,.add-to-widget .contains-some-selected-videos.to-be-removed .playlist-status{margin-right:3px;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -38px -27px;background-size:auto;width:21px;height:21px}.add-to-widget .contains-all-selected-videos .playlist-status,.add-to-widget .to-be-added .playlist-status{margin-right:0;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -206px -699px;background-size:auto;width:24px;height:21px}.add-to-widget .contains-some-selected-videos .playlist-status{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -123px -432px;background-size:auto;width:21px;height:21px}.add-to-widget .loading .playlist-status,.add-to-widget .to-be-removed.loading .playlist-status,.add-to-widget .to-be-added.loading .playlist-status{margin-right:3px;vertical-align:middle;width:21px;height:21px;background:url(//s.ytimg.com/yts/img/loader-vflff1Mjj.gif) no-repeat left center}.add-to-widget .public-icon,.add-to-widget .private-icon,.add-to-widget .unlisted-icon{position:absolute;right:15px;top:5px;opacity:.3;filter:alpha(opacity=30)}.add-to-widget .private-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -211px -122px;background-size:auto;width:16px;height:16px}.add-to-widget .unlisted-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -76px -474px;background-size:auto;width:16px;height:16px}.add-to-widget .public-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) 0 -918px;background-size:auto;width:16px;height:16px}.add-to-widget .pending-change-actions .playlist-status{visibility:hidden}.add-to-widget .pending-change-actions .yt-uix-button{margin-right:10px}.add-to-widget .create-playlist-widget-form{position:relative;width:260px}.add-to-widget .addto-create-playlist-section{padding:15px}.add-to-widget .addto-search-playlist-section{position:relative;padding:10px 15px}.add-to-widget .yt-uix-form-input-text.addto-search-box{padding:5px 0 6px 20px}.add-to-widget .addto-search-playlist-section .search-icon{position:absolute;top:17px;left:18px;opacity:.5;filter:alpha(opacity=50);background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -28px -66px;background-size:auto;width:15px;height:15px}.add-to-widget .addto-create-playlist-section.addto-create-playlist-bottom-section{position:relative;padding-top:0}.add-to-widget .addto-create-playlist-widget-form .yt-uix-form-label{margin:10px 0;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.add-to-widget .create-playlist-widget-form .privacy-button[data-privacy-state="privacy-public"]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) 0 -918px;background-size:auto;width:16px;height:16px}.add-to-widget .create-playlist-widget-form .privacy-button[data-privacy-state="privacy-unlisted"]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -76px -474px;background-size:auto;width:16px;height:16px}.add-to-widget .create-playlist-widget-form .privacy-button[data-privacy-state="privacy-private"]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -211px -122px;background-size:auto;width:16px;height:16px}.add-to-widget-clickcard .yt-uix-clickcard-card-body{overflow:visible}.create-playlist-widget{position:relative}.create-playlist-widget-button .yt-uix-button-arrow{display:none}.create-playlist-widget-button .add-new-pl-btn:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -130px -862px;background-size:auto;width:16px;height:16px}.create-playlist-widget-dialog{width:auto;padding:0}.create-playlist-widget-form{width:360px}.create-playlist-widget-form .create-playlist-section{padding:15px}.create-playlist-widget-form .create-playlist-bottom-section{overflow:hidden;background-color:#f6f6f6;min-width:250px}.create-playlist-widget-form .yt-uix-form-label{margin:10px 0;overflow:hidden;white-space:nowrap;word-wrap:normal;-o-text-overflow:ellipsis;text-overflow:ellipsis}.create-playlist-widget-form .privacy-button{float:left}.create-playlist-widget-form .create-playlist-buttons{float:right}.create-playlist-widget-form .create-playlist-buttons .yt-uix-button{margin-left:10px}.create-playlist-widget-form .yt-uix-menu.privacy-button-container{position:static;width:auto}.create-playlist-widget-form .yt-uix-button-has-icon[data-privacy-state=privacy-public]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) 0 -918px;background-size:auto;width:16px;height:16px}.create-playlist-widget-form .yt-uix-button-has-icon[data-privacy-state=privacy-unlisted]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -76px -474px;background-size:auto;width:16px;height:16px}.create-playlist-widget-form .yt-uix-button-has-icon[data-privacy-state=privacy-private]:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -211px -122px;background-size:auto;width:16px;height:16px}.create-playlist-widget-privacy-menu .yt-ui-menu-item.has-icon:before{margin-right:3px;padding-bottom:1px}.create-playlist-widget-privacy-menu .is-selected.has-icon:before{opacity:1;filter:alpha(opacity=100)}#yt-uix-videoactionmenu-menu{padding:0;z-index:1999999997}.yt-uix-menu-mask.yt-uix-videoactionmenu-mask{z-index:1999999996}#yt-uix-videoactionmenu-menu h3{color:#333;font-size:13px;font-weight:500;padding:15px 15px 5px}#yt-uix-videoactionmenu-menu .add-to-widget .addto-playlist-panel{padding:0}body .addto-watch-later-button,.addto-watch-later-button-sign-in,.addto-watch-later-button-loading,.addto-watch-later-button-error,.addto-watch-later-button-success,.addto-watch-later-button-remove{width:22px;height:22px;padding:0;border-radius:2px}.addto-watch-later-button-error,.addto-watch-later-button-success,.addto-watch-later-button-remove{border:none}.addto-watch-later-button:before,.addto-watch-later-button-sign-in:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -239px -48px;background-size:auto;width:13px;height:13px}.addto-watch-later-button-sign-in .yt-uix-button-arrow{display:none}.addto-watch-later-button-loading:before{height:20px;width:19px;background:url(//s.ytimg.com/yts/img/loader-vflff1Mjj.gif) no-repeat}.yt-uix-button.addto-watch-later-button-success{background-image:-moz-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-ms-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-o-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:-webkit-linear-gradient(top,#74a446 0,#4d7730 100%);background-image:linear-gradient(to bottom,#74a446 0,#4d7730 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#74a446,EndColorStr=#4d7730)}.addto-watch-later-button-success:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -56px -342px;background-size:auto;width:19px;height:20px}.yt-uix-button.addto-watch-later-button-remove,.yt-uix-button.addto-watch-later-button-error{background-image:-moz-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-ms-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-o-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-webkit-linear-gradient(top,#c95145 0,#913d37 100%);background-image:linear-gradient(to bottom,#c95145 0,#913d37 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#c95145,EndColorStr=#913d37)}.addto-watch-later-button-remove:before,.addto-watch-later-button-error:before{width:22px;height:22px;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -242px -687px}#shared-addto-watch-later-login{padding:7px}.addto-watch-queue-button,.addto-watch-queue-button-loading,.addto-watch-queue-button-success,.addto-watch-queue-button-error,body .addto-tv-queue-button{width:22px;height:22px;padding:0;border-radius:2px}.addto-watch-queue-button:before,.addto-tv-queue-button:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) 0 -190px;background-size:auto;width:20px;height:20px}.yt-uix-button.addto-watch-queue-button-loading:before{height:20px;background:url(//s.ytimg.com/yts/img/loader-vflff1Mjj.gif) no-repeat}.yt-uix-button.addto-watch-queue-button-success,.yt-uix-button.addto-watch-queue-button-error{color:#fff;border:none}.yt-uix-button.addto-watch-queue-button-success{background:#167ac6}.addto-watch-queue-button-success:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -56px -342px;background-size:auto;width:19px;height:20px}.yt-uix-button.addto-watch-queue-button-error{background-image:-moz-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-ms-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-o-linear-gradient(top,#c95145 0,#913d37 100%);background-image:-webkit-linear-gradient(top,#c95145 0,#913d37 100%);background-image:linear-gradient(to bottom,#c95145 0,#913d37 100%);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#c95145,EndColorStr=#913d37)}.addto-watch-queue-button-error:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -242px -687px;background-size:auto;width:20px;height:20px}body .addto-tv-queue-button,.remote-connected .addto-watch-queue-button{display:none}.remote-connected .addto-tv-queue-button{display:inline-block}.remote-connected .addto-watch-later-button,.remote-connected .addto-watch-later-button-sign-in{display:none}.thumb-menu.dark-overflow-action-menu{display:none;position:absolute;top:2px;right:0}.remote-connected .thumb-menu.dark-overflow-action-menu{display:block}.watch-queue-thumb-menu{list-style-type:none}.thumb-menu .yt-uix-button-dark-overflow-action-menu,.thumb-menu .yt-uix-button-dark-overflow-action-menu:focus,.thumb-menu .yt-uix-button-dark-overflow-action-menu:focus:hover{border:none;box-shadow:none}.thumb-menu.dark-overflow-action-menu .yt-uix-button{padding:0 5px 0 10px}.addto-watch-queue-menu-choice:before{content:'';vertical-align:middle;display:inline-block}.yt-uix-button-menu-item.addto-watch-queue-menu-choice{padding-left:10px}.addto-watch-queue-menu-text{vertical-align:middle;margin-left:5px}.addto-watch-queue-play-next:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -198px -882px;background-size:auto;width:16px;height:16px}.addto-watch-queue-play-now:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -123px -122px;background-size:auto;width:16px;height:16px}.addto-watch-queue-play-next:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -148px -376px;background-size:auto;width:16px;height:16px}.addto-watch-queue-play-now:hover:before{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfllYIUv0.png) -173px -542px;background-size:auto;width:16px;height:16px}


.yt-pl-thumb .sidebar{position:absolute;right:0;top:0;height:100%;width:43.75%;background:rgba(0,0,0,.8)}.yt-show-thumb .sidebar{position:absolute;background-color:#000;bottom:0;color:#fff;height:24px;text-align:center;width:100%}.exp-mix-as-radio .yt-pl-thumb.yt-mix-thumb .sidebar{width:100%;background:rgba(0,0,0,.6)}.yt-pl-thumb .yt-pl-sidebar-content{display:block;opacity:.8;filter:alpha(opacity=80);text-align:center}.yt-pl-thumb .formatted-video-count-label{display:block;margin:0 .75em;font-size:10px;line-height:1.25em;word-break:break-word;white-space:normal;text-transform:uppercase}.yt-pl-thumb .formatted-video-count-label b{display:block;font-weight:normal;font-size:18px;line-height:22px}.yt-pl-thumb.is-small .formatted-video-count-label{font-size:8px}.yt-pl-thumb.is-small .formatted-video-count-label b{font-size:14px}.yt-pl-thumb .yt-pl-sidebar-content{height:100%;color:#cfcfcf}.yt-pl-thumb-link{display:block;position:relative;text-align:left}.yt-pl-thumb-link:hover{text-decoration:none}.yt-pl-thumb-link .yt-pl-thumb-overlay{display:none;position:absolute;left:0;right:0;min-width:120px;top:0;bottom:0;background:rgba(0,0,0,.7);background:progid:DXImageTransform.Microsoft.gradient(startColorStr='#B2000000',endColorStr='#B2000000')}.yt-pl-thumb-link:hover .yt-pl-thumb-overlay,.yt-pl-thumb-link:focus .yt-pl-thumb-overlay{display:block}.remote-connected .yt-pl-thumb-link:hover .yt-pl-thumb-overlay{display:none}.yt-pl-thumb-overlay .yt-pl-thumb-overlay-content{position:absolute;text-align:center;top:50%;margin-top:-9px;width:100%;height:18px;font-size:16px;font-weight:500;color:#fff;text-shadow:0 1px 1px rgba(255,255,255,.6);text-transform:uppercase}.is-small .yt-pl-thumb-overlay .yt-pl-thumb-overlay-text{font-size:11px}.yt-pl-thumb-overlay .play-icon{margin-right:3px;vertical-align:middle;background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -389px -74px;background-size:auto;width:9px;height:12px}.yt-pl-thumb-overlay-text{vertical-align:middle;font-weight:normal;font-size:13px}.yt-pl-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -173px 0;background-size:auto;width:24px;height:24px}.is-small .yt-pl-icon{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -206px -46px;background-size:auto;width:18px;height:18px}.yt-pl-icon.yt-pl-icon-mix{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -16px 0;background-size:auto;width:32px;height:32px}.is-small .yt-pl-icon.yt-pl-icon-mix{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -334px -193px;background-size:auto;width:24px;height:24px}.yt-pl-icon.yt-pl-icon-mix-blue{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -694px 0;background-size:auto;width:39px;height:39px}.yt-pl-icon.yt-pl-icon-mix-white{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -901px -24px;background-size:auto;width:58px;height:58px}.yt-pl-icon.yt-pl-icon-mix-circle{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -775px 0;background-size:auto;width:54px;height:54px}.is-small .yt-pl-icon.yt-pl-icon-mix-circle{background:no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -142px -28px;background-size:auto;width:40px;height:40px}.yt-pl-thumb-link:hover .yt-pl-thumb .sidebar{background:rgba(0,0,0,.85);background:progid:DXImageTransform.Microsoft.gradient(startColorStr='#D8000000',endColorStr='#D8000000')}












/*
---------------------------------------------------
PLAYLIST CSS
---------------------------------------------------
*/































/* ---------------------------------------------------------------------
 * https://www.youtube.com/yts/cssbin/www-core-vflW4fJHd.css
 * ---------------------------------------------------------------------
 */

 body {
  line-height: 1;
  text-align: left;
  text-align: start;
}

 ul {
  list-style: none;
}

 body {
  border: 0;
}

 a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  background: transparent;
}

 button {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

 div {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  background: transparent;
}

 h1,
 h3 {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}

 html,
 img,
 li,
 p,
 span {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  background: transparent;
}

 ul {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  background: transparent;
}

 body {
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  font: 12px "YouTube Noto", Roboto, arial, sans-serif;
}

 button {
  font: 12px "YouTube Noto", Roboto, arial, sans-serif;
}

 a:focus {
  outline: 1px dotted #666;
  border: 0;
}

 button:focus {
  outline: 1px solid #767676;
}

 h1 {
  font-weight: normal;
}

 h3 {
  font-weight: 500;
}

 h1 {
  font-size: 20px;
}

 h3 {
  font-size: 13px;
}

 .clearfix:before {
  content: '.';
  display: block;
  height: 0;
  visibility: hidden;
}

 .clearfix:after {
  content: '.';
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

 html,
 body {
  height: 100%;
}

 body {
  background: #f1f1f1;
}

 body,
 button {
  font-family: "YouTube Noto", Roboto, arial, sans-serif;
  font-size: 13px;
}

 a {
  color: #167ac6;
  cursor: pointer;
  text-decoration: none;
}

 a:hover,
 a:focus {
  text-decoration: underline;
}

 .hid {
  display: none;
}

 .yt-card {
  margin: 0 0 10px;
  border: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

 .yt-card.yt-card-has-padding {
  padding: 15px;
}

 .yt-ui-menu-content:focus {
  outline: none;
}

 .yt-ui-menu-content {
  background: #fff;
  border: 1px solid #d3d3d3;
  outline: none;
  overflow: visible;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
}

 .yt-ui-menu-item {
  position: relative;
  color: #333;
  cursor: pointer;
  display: block;
  font-size: 13px;
  line-height: 25px;
  margin: 0;
  padding: 0 15px;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  width: 100%;
  word-wrap: normal;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

 a.yt-ui-menu-item {
  text-decoration: none;
}

 .yt-ui-menu-item.has-icon:before,
 .yt-ui-menu-item-label {
  display: inline-block;
  vertical-align: middle;
}

 .yt-ui-menu-item.has-icon:before {
  margin-right: 10px;
  content: "";
}

 .yt-ui-menu-item.has-icon:before {
  opacity: .5;
  filter: alpha(opacity=50);
}

 .yt-ui-menu-item.has-icon:hover:before {
  opacity: .6;
  filter: alpha(opacity=60);
}

 .yt-ui-menu-item.has-icon:active:before {
  opacity: .8;
  filter: alpha(opacity=80);
}

 .yt-ui-menu-item.has-icon:hover:active:before {
  opacity: 1;
  filter: alpha(opacity=100);
}

 .yt-ui-menu-item:hover {
  background: #eee;
}

 .yt-ui-menu-item:focus {
  outline: none;
  background: #eee;
}

 .yt-ui-menu-content ul:focus {
  outline: none;
}

 p.yt-spinner {
  text-align: center;
  padding: 1em;
  margin: 0;
  line-height: 20px;
  white-space: nowrap;
}

 .yt-spinner-img {
  background: url(data:image/png;base64,R0lGODlhFAAUAJEDAMzMzLOzs39/f////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAFAAUAAACPJyPqcuNItyCUJoQBo0ANIxpXOctYHaQpYkiHfM2cUrCNT0nqr4uudsz/IC5na/2Mh4Hu+HR6YBaplRDAQAh+QQFCgADACwEAAIADAAGAAACFpwdcYupC8BwSogR46xWZHl0l8ZYQwEAIfkEBQoAAwAsCAACAAoACgAAAhccMKl2uHxGCCvO+eTNmishcCCYjWEZFgAh+QQFCgADACwMAAQABgAMAAACFxwweaebhl4K4VE6r61DiOd5SfiN5VAAACH5BAUKAAMALAgACAAKAAoAAAIYnD8AeKqcHIwwhGntEWLkO3CcB4biNEIFACH5BAUKAAMALAQADAAMAAYAAAIWnDSpAHa4GHgohCHbGdbipnBdSHphAQAh+QQFCgADACwCAAgACgAKAAACF5w0qXa4fF6KUoVQ75UaA7Bs3yeNYAkWACH5BAUKAAMALAIABAAGAAwAAAIXnCU2iMfaRghqTmMp1moAoHyfIYIkWAAAOw==) no-repeat center;
}

 .yt-spinner-img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

 .yt-spinner-message {
  vertical-align: middle;
}

 .yt-sprite {
  display: inline-block;
}

 .yt-thumb {
  overflow: hidden;
  background: #f1f1f1;
  font-size: 0;
  vertical-align: middle;
  display: inline-block;
}

 .yt-thumb .vertical-align {
  height: 100%;
}

 .yt-thumb img {
  font-size: 13px;
  outline: none;
}

 .yt-thumb-clip {
  position: absolute;
  _position: static;
  bottom: -100px;
  top: -100px;
  left: -100px;
  right: -100px;
  text-align: center;
  white-space: nowrap;
  word-break: normal;
}

 .yt-thumb-clip img,
 .yt-thumb-clip .vertical-align {
  display: inline-block;
  vertical-align: middle;
}

 .yt-thumb-square {
  display: block;
  height: auto;
}

 .yt-thumb-square {
  padding-bottom: 100%;
}

 .yt-thumb-48 {
  width: 48px;
}

 .video-thumb {
  position: relative;
}

 .like-button-renderer-like-button:active .yt-uix-button-content,
 .like-button-renderer-like-button.yt-uix-button-toggled .yt-uix-button-content {
  color: #167ac6;
}

 .like-button-renderer-like-button:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -775px -112px;
  background-size: auto;
  width: 20px;
  height: 20px;
}

 .like-button-renderer-dislike-button:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -807px -200px;
  background-size: auto;
  width: 20px;
  height: 20px;
  padding-bottom: 1px;
}

 .like-button-renderer-like-button.yt-uix-button:active:before,
 .like-button-renderer-like-button.yt-uix-button.yt-uix-button-toggled:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -162px -164px;
  background-size: auto;
  width: 20px;
  height: 20px;
}

 .yt-uix-button {
  display: inline-block;
  height: 28px;
  border: solid 1px transparent;
  padding: 0 10px;
  outline: 0;
  font-weight: 500;
  font-size: 11px;
  text-decoration: none;
  white-space: nowrap;
  word-wrap: normal;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  *overflow: visible;
  border-radius: 2px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}

 .yt-uix-button:hover {
  text-decoration: none;
}

 .yt-uix-button:focus,
 .yt-uix-button:focus:hover {
  box-shadow: 0 0 0 2px rgba(27, 127, 204, 0.4);
}

 .yt-uix-button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

 .yt-uix-button-has-icon.no-icon-markup .yt-uix-button-content {
  vertical-align: middle;
}

 .yt-uix-button .yt-uix-button-icon {
  display: inline-block;
  vertical-align: middle;
}

 .yt-uix-button-icon-wrapper {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
}

 .yt-uix-button-has-icon:before {
  content: '';
  display: inline-block;
  vertical-align: middle;
}

 a.yt-uix-button:after {
  content: '';
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

 .yt-uix-button-icon-wrapper,
 .yt-uix-button-has-icon.no-icon-markup:before {
  margin-right: 6px;
}

 .yt-uix-button-empty .yt-uix-button-icon-wrapper {
  margin-right: 0;
}

 .yt-uix-button-empty .yt-uix-button-icon-wrapper {
  max-height: none;
  max-width: none;
}

 .yt-uix-button.hid {
  display: none;
}

 .yt-uix-button-default:hover {
  border-color: #c6c6c6;
  background: #f0f0f0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.10);
}

 .yt-uix-button-default:active {
  border-color: #c6c6c6;
  background: #e9e9e9;
  box-shadow: inset 0 1px 0 #ddd;
}

 .yt-uix-button-default {
  border-color: #d3d3d3;
  background: #f8f8f8;
  color: #333;
}

 .yt-uix-button-default:before,
 .yt-uix-button-default .yt-uix-button-icon {
  opacity: .5;
  filter: alpha(opacity=50);
}

 .yt-uix-button-default:hover .yt-uix-button-icon,
 .yt-uix-button-default:hover:before {
  opacity: .6;
  filter: alpha(opacity=60);
}

 .yt-uix-button-default:active .yt-uix-button-icon,
 .yt-uix-button-default:active:before {
  opacity: .8;
  filter: alpha(opacity=80);
}

 .yt-uix-button-default:active:hover .yt-uix-button-icon,
 .yt-uix-button-default:active:hover:before {
  opacity: 1;
  filter: alpha(opacity=100);
}

 .yt-uix-button-opacity,
 .yt-uix-button-opacity:hover {
  box-shadow: none;
}

 .yt-uix-button-opacity {
  opacity: .5;
  filter: alpha(opacity=50);
}

 .yt-uix-button-opacity:hover {
  opacity: .6;
  filter: alpha(opacity=60);
}

 .yt-uix-button-opacity:active,
 .yt-uix-button-opacity.yt-uix-button-toggled {
  opacity: .8;
  filter: alpha(opacity=80);
}

 .yt-uix-button-opacity:active:hover,
 .yt-uix-button-opacity.yt-uix-button-toggled:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}

 .yt-uix-button-primary {
  border-color: #167ac6;
  background: #167ac6;
  color: #fff;
}

 .yt-uix-button-primary:hover {
  background: #126db3;
}

 .yt-uix-button-primary:active {
  background: #095b99;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.5);
}

 a.yt-uix-button {
  text-decoration: none;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

 .yt-uix-button-group {
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
}

 .yt-uix-button-group .yt-uix-button {
  margin-right: -1px;
  border-radius: 0;
}

 .yt-uix-button-group .yt-uix-button:hover {
  position: relative;
  z-index: 2147483645;
}

 .yt-uix-button-subscription-container {
  max-width: 100%;
  white-space: nowrap;
  display: inline-block;
}

 .yt-uix-button.yt-uix-button-subscribe-branded {
  max-width: 100%;
}

 .yt-uix-button.yt-uix-button-subscribe-branded {
  padding: 0 8px 0 5.5px;
  height: 24px;
}

 .yt-uix-button-subscribe-branded {
  color: #fefefe;
  background-color: #e62117;
}

 .yt-uix-button-subscribe-branded:hover {
  background-color: #cc181e;
}

 .yt-uix-button-subscribe-branded:active {
  background-color: #b31217;
}

 .yt-uix-button-subscribe-branded .yt-uix-button-content {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

 .yt-uix-button-subscribe-branded .yt-uix-button-content {
  font-size: 12px;
  font-weight: normal;
}

 .subscribe-label,
 .subscribed-label,
 .unsubscribe-label {
  display: none;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

 .yt-uix-button-subscribe-branded .subscribe-label {
  display: inline;
}



 .yt-uix-button-subscribe-branded:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -721px -88px;
  background-size: auto;
  width: 16px;
  height: 12px;
}

 .yt-uix-subscription-preferences-button {
  display: none;
  margin-left: -2px;
  padding: 0 4px;
  height: 24px;
  border-radius: 0 2px 2px 0;
}

 .yt-uix-subscription-preferences-button .yt-uix-button-icon-wrapper {
  height: 13px;
}

 .yt-uix-subscription-preferences-button:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -823px -176px;
  background-size: auto;
  width: 18px;
  height: 18px;
}

 .yt-subscription-button-subscriber-count-branded-horizontal {
  display: none;
  margin-left: -2px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  vertical-align: middle;
  border-radius: 0 2px 2px 0;
}

 .yt-uix-button-subscribe-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal {
  display: inline-block;
}

 .yt-subscription-button-subscriber-count-branded-horizontal {
  padding: 0 6px;
  color: #737373;
  font-size: 11px;
  text-align: center;
}

 .yt-subscription-button-subscriber-count-branded-horizontal {
  height: 22px;
  line-height: 24px;
}

 .yt-uix-button-subscribe-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal {
  border-left: none;
  padding-left: 7px;
}

 .yt-uix-clickcard-target {
  cursor: pointer;
}

 .yt-uix-menu {
  display: inline-block;
  position: relative;
}

 .yt-uix-menu-content {
  position: absolute;
  z-index: 2000000100;
}

 .yt-uix-menu-trigger {
  width: 100%;
}

 .yt-uix-menu-content-hidden {
  display: none;
}

 .yt-uix-menu .yt-uix-menu-content {
  left: 100%;
  top: 0;
}

 .yt-dialog-base {
  position: fixed;
  _position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 2000000004;
  overflow: auto;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

 .yt-dialog-fg {
  position: relative;
  background: #fff;
  border: 1px solid #e2e2e2;
  outline: 0;
  text-align: left;
  z-index: 2000000003;
  box-shadow: 0 0 15px rgba(0, 0, 0, .18);
  display: inline-block;
  -moz-user-select: text;
  -ms-user-select: text;
  -webkit-user-select: text;
}

 .yt-dialog-fg:focus {
  box-shadow: 0 0 0 2px rgba(27, 127, 204, 0.4);
}

 .yt-dialog-align,
 .yt-dialog-fg {
  vertical-align: middle;
  display: inline-block;
}

 .yt-dialog-align {
  height: 100%;
}

 .yt-dialog-focus-trap {
  height: 0;
}

 .yt-dialog-fg-content {
  overflow: hidden;
  padding: 0 20px 20px;
  color: #333;
}

 .yt-uix-overlay-actions {
  margin: 20px -20px -20px;
  padding: 15px 20px;
  text-align: right;
  background: #f1f1f1;
}

 .yt-uix-overlay-actions button {
  margin: 0 3px;
}

 .yt-dialog-loading,
 .yt-dialog-working {
  display: none;
}


 .yt-dialog-waiting-content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
}

 .yt-dialog-loading .yt-dialog-waiting-content {
  margin-top: -20px;
  font-size: 14px;
  text-align: center;
}

 .yt-dialog-working-bubble .yt-dialog-waiting-content {
  margin-top: -25px;
}

 .yt-dialog-working-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: -1px;
  left: -1px;
  border: 1px solid #fff;
  background-color: #fff;
  opacity: .7;
  filter: alpha(opacity=70);
}

 .yt-dialog-working-bubble {
  position: absolute;
  height: 100px;
  width: 200px;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -100px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 6px;
}

 .yt-uix-tooltip {
  display: inline-block;
}

 .yt-uix-tooltip.hid {
  display: none;
}
 .signin-clickcard-header {
  margin-bottom: 15px;
  font-size: 15px;
}

 .signin-clickcard-message {
  margin-bottom: 10px;
  font-size: 13px;
  line-height: 1.3em;
}

 .signin-button.yt-uix-button {
  padding: 0 40px;
  font-size: 15px;
  height: 35px;
}
 #watch-header {
  min-height: 150px;
  padding-bottom: 5px;
  position: relative;
}

 #watch8-action-buttons {
  position: relative;
  padding-top: 5px;
  border-top: 1px solid #e2e2e2;
}

 #watch8-sentiment-actions {
  float: right;
}

 #watch8-secondary-actions {
  position: absolute;
  left: -10px;
}

 #watch8-sentiment-actions .like-button-renderer .yt-uix-button {
  margin-right: 0;
  padding-right: 0;
}

 #watch8-action-buttons .yt-uix-button,
 #watch8-action-buttons .yt-uix-button:hover {
  background: none;
  border: none;
}

 .action-panel-trigger-stats:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -228px 0;
  background-size: auto;
  width: 16px;
  height: 16px;
}

 .addto-button:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -813px -232px;
  background-size: auto;
  width: 20px;
  height: 20px;
}

 .action-panel-trigger-share:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -822px -88px;
  background-size: auto;
  width: 20px;
  height: 20px;
}

 #action-panel-overflow-button:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -675px -148px;
  background-size: auto;
  width: 20px;
  height: 20px;
}

 .action-panel-trigger-report:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -186px -52px;
  background-size: auto;
  width: 16px;
  height: 16px;
}

 .action-panel-trigger-translate:before {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -66px -193px;
  background-size: auto;
  width: 16px;
  height: 16px;
}

 .watch-title-container {
  vertical-align: top;
  display: inline-block;
  width: 75%;
}

@media screen and (max-width:656px) {
   #watch8-secondary-actions .yt-uix-button-content {
    display: none;
  }

   #watch8-secondary-actions {
    left: 0;
  }

   #watch8-secondary-actions .yt-uix-button {
    padding: 0;
  }
}

 .video-extras-sparkbars {
  height: 2px;
  overflow: hidden;
}

 .video-extras-sparkbar-likes {
  float: left;
  height: 2px;
  background: #167ac6;
}

 .video-extras-sparkbar-dislikes {
  float: left;
  height: 2px;
  background: #ccc;
}

 #watch7-user-header {
  position: relative;
  padding-bottom: 10px;
  padding-top: 10px;
  overflow: hidden;
}

 #watch7-headline h1 {
  line-height: normal;
  word-wrap: break-word;
}

 #watch7-views-info {
  position: absolute;
  bottom: 33px;
  right: 0;
  min-width: 160px;
}

 .watch-view-count {
  line-height: 24px;
  max-height: 24px;
  text-align: right;
  font-size: 19px;
  color: #666;
  white-space: nowrap;
  margin-bottom: 2px;
}

 #watch-header .yt-user-photo {
  float: left;
}

 #watch-header .yt-user-info {
  margin-left: 58px;
  white-space: nowrap;
  width: 380px;
}

 #watch-header .yt-user-info a {
  display: inline-block;
  height: 22px;
  color: #333;
  font-weight: 500;
  max-width: 315px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

 #watch7-subscription-container {
  margin-left: 10px;
}

 #watch-header .yt-dialog-content {
  padding-top: 18px;
}

 body:-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen),
 body :-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen) {
  display: none!important;
}

 .yt-channel-title-icon-verified {
  vertical-align: middle;
  margin-bottom: 2px;
  *margin-right: 6px;
  -webkit-user-drag: none;
  display: inline-block;
}

 .yt-channel-title-icon-verified {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) 0 0;
  background-size: auto;
  width: 12px;
  height: 9px;
}

 .yt-channel-title-icon-verified:hover {
  background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -158px -210px;
  background-size: auto;
  width: 12px;
  height: 9px;
}


/* another fix */

/* ---------------------------------------------------------------------
 * https://www.youtube.com/yts/cssbin/www-core-vflW4fJHd.css
 * ---------------------------------------------------------------------
 */

body {
    line-height: 1;
    text-align: left;
    text-align: start;
}

body {
    border: 0;
}

a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    background: transparent;
}

button {
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
}

div {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    background: transparent;
}

html,
img,
p,
span {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    background: transparent;
}

body {
    word-wrap: break-word;
    margin: 0;
    padding: 0;
    font: 12px "YouTube Noto", Roboto, arial, sans-serif;
}

button {
    font: 12px "YouTube Noto", Roboto, arial, sans-serif;
}

a:focus {
    outline: 1px dotted #666;
    border: 0;
}

button:focus {
    outline: 1px solid #767676;
}

html,
body {
    height: 100%;
}

body {
    background: #f1f1f1;
}

body,
button {
    font-family: "YouTube Noto", Roboto, arial, sans-serif;
    font-size: 13px;
}

a {
    color: #167ac6;
    cursor: pointer;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}

.hid {
    display: none;
}

p.yt-spinner {
    text-align: center;
    padding: 1em;
    margin: 0;
    line-height: 20px;
    white-space: nowrap;
}

.yt-spinner-img {
    background: url(data:image/png;base64,R0lGODlhFAAUAJEDAMzMzLOzs39/f////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAFAAUAAACPJyPqcuNItyCUJoQBo0ANIxpXOctYHaQpYkiHfM2cUrCNT0nqr4uudsz/IC5na/2Mh4Hu+HR6YBaplRDAQAh+QQFCgADACwEAAIADAAGAAACFpwdcYupC8BwSogR46xWZHl0l8ZYQwEAIfkEBQoAAwAsCAACAAoACgAAAhccMKl2uHxGCCvO+eTNmishcCCYjWEZFgAh+QQFCgADACwMAAQABgAMAAACFxwweaebhl4K4VE6r61DiOd5SfiN5VAAACH5BAUKAAMALAgACAAKAAoAAAIYnD8AeKqcHIwwhGntEWLkO3CcB4biNEIFACH5BAUKAAMALAQADAAMAAYAAAIWnDSpAHa4GHgohCHbGdbipnBdSHphAQAh+QQFCgADACwCAAgACgAKAAACF5w0qXa4fF6KUoVQ75UaA7Bs3yeNYAkWACH5BAUKAAMALAIABAAGAAwAAAIXnCU2iMfaRghqTmMp1moAoHyfIYIkWAAAOw==) no-repeat center;
}

.yt-spinner-img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

.yt-spinner-message {
    vertical-align: middle;
}

.yt-sprite {
    display: inline-block;
}

.yt-thumb {
    overflow: hidden;
    background: #f1f1f1;
    font-size: 0;
    vertical-align: middle;
    display: inline-block;
}

.yt-thumb .vertical-align {
    height: 100%;
}

.yt-thumb img {
    font-size: 13px;
    outline: none;
}

.yt-thumb-clip {
    position: absolute;
    _position: static;
    bottom: -100px;
    top: -100px;
    left: -100px;
    right: -100px;
    text-align: center;
    white-space: nowrap;
    word-break: normal;
}

.yt-thumb-clip img,
.yt-thumb-clip .vertical-align {
    display: inline-block;
    vertical-align: middle;
}

.yt-thumb-square {
    display: block;
    height: auto;
}

.yt-thumb-square {
    padding-bottom: 100%;
}

.yt-thumb-48 {
    width: 48px;
}

.video-thumb {
    position: relative;
}

.yt-uix-button {
    display: inline-block;
    height: 28px;
    border: solid 1px transparent;
    padding: 0 10px;
    outline: 0;
    font-weight: 500;
    font-size: 11px;
    text-decoration: none;
    white-space: nowrap;
    word-wrap: normal;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    *overflow: visible;
    border-radius: 2px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
}

.yt-uix-button:hover {
    text-decoration: none;
}

.yt-uix-button:focus,
.yt-uix-button:focus:hover {
    box-shadow: 0 0 0 2px rgba(27, 127, 204, 0.4);
}

.yt-uix-button::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.yt-uix-button-has-icon.no-icon-markup .yt-uix-button-content {
    vertical-align: middle;
}

.yt-uix-button .yt-uix-button-icon {
    display: inline-block;
    vertical-align: middle;
}

.yt-uix-button-icon-wrapper {
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
}

.yt-uix-button-has-icon:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
}

.yt-uix-button-icon-wrapper,
.yt-uix-button-has-icon.no-icon-markup:before {
    margin-right: 6px;
}

.yt-uix-button-empty .yt-uix-button-icon-wrapper {
    margin-right: 0;
}

.yt-uix-button-empty .yt-uix-button-icon-wrapper {
    max-height: none;
    max-width: none;
}

.yt-uix-button-default:hover {
    border-color: #c6c6c6;
    background: #f0f0f0;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.10);
}

.yt-uix-button-default:active {
    border-color: #c6c6c6;
    background: #e9e9e9;
    box-shadow: inset 0 1px 0 #ddd;
}

.yt-uix-button-default {
    border-color: #d3d3d3;
    background: #f8f8f8;
    color: #333;
}

.yt-uix-button-default:before,
.yt-uix-button-default .yt-uix-button-icon {
    opacity: .5;
    filter: alpha(opacity=50);
}

.yt-uix-button-default:hover .yt-uix-button-icon,
.yt-uix-button-default:hover:before {
    opacity: .6;
    filter: alpha(opacity=60);
}

.yt-uix-button-default:active .yt-uix-button-icon,
.yt-uix-button-default:active:before {
    opacity: .8;
    filter: alpha(opacity=80);
}

.yt-uix-button-default:active:hover .yt-uix-button-icon,
.yt-uix-button-default:active:hover:before {
    opacity: 1;
    filter: alpha(opacity=100);
}

.yt-uix-button-primary {
    border-color: #167ac6;
    background: #167ac6;
    color: #fff;
}

.yt-uix-button-primary:hover {
    background: #126db3;
}

.yt-uix-button-primary:active {
    background: #095b99;
    box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.5);
}

.yt-uix-button-subscription-container {
    max-width: 100%;
    white-space: nowrap;
    display: inline-block;
}

.yt-uix-button.yt-uix-button-subscribed-branded {
    max-width: 100%;
}

.yt-uix-button.yt-uix-button-subscribed-branded {
    padding: 0 8px 0 5.5px;
    height: 24px;
}

.yt-uix-button-subscribed-branded {
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    color: #666;
}

.yt-uix-button-subscribed-branded:active {
    background-color: #ededed;
}

.yt-uix-button-subscribed-branded .yt-uix-button-content {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}

.yt-uix-button-subscribed-branded .yt-uix-button-content {
    font-size: 12px;
    font-weight: normal;
}

.subscribe-label,
.subscribed-label,
.unsubscribe-label {
    display: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.yt-uix-button-subscribed-branded .subscribed-label {
    display: inline;
}


.yt-uix-button-subscribed-branded:before {
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -898px -128px;
    background-size: auto;
    width: 16px;
    height: 12px;
}

.yt-uix-subscription-preferences-button {
    display: none;
    margin-left: -2px;
    padding: 0 4px;
    height: 24px;
    border-radius: 0 2px 2px 0;
}

.yt-uix-button-subscribed-branded+.yt-uix-subscription-preferences-button {
    display: inline-block;
}

.yt-uix-subscription-preferences-button .yt-uix-button-icon-wrapper {
    height: 13px;
}

.yt-uix-subscription-preferences-button:before {
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -823px -176px;
    background-size: auto;
    width: 18px;
    height: 18px;
}

.yt-subscription-button-subscriber-count-branded-horizontal {
    margin-left: -2px;
    border: 1px solid #ccc;
    background-color: #fafafa;
    vertical-align: middle;
    border-radius: 0 2px 2px 0;
}

.yt-subscription-button-subscriber-count-branded-horizontal {
    padding: 0 6px;
    color: #737373;
    font-size: 11px;
    text-align: center;
}

.yt-subscription-button-subscriber-count-branded-horizontal {
    height: 22px;
    line-height: 24px;
}

.yt-dialog-base {
    position: fixed;
    _position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 2000000004;
    overflow: auto;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.yt-dialog-fg {
    position: relative;
    background: #fff;
    border: 1px solid #e2e2e2;
    outline: 0;
    text-align: left;
    z-index: 2000000003;
    box-shadow: 0 0 15px rgba(0, 0, 0, .18);
    display: inline-block;
    -moz-user-select: text;
    -ms-user-select: text;
    -webkit-user-select: text;
}

.yt-dialog-fg:focus {
    box-shadow: 0 0 0 2px rgba(27, 127, 204, 0.4);
}

.yt-dialog-align,
.yt-dialog-fg {
    vertical-align: middle;
    display: inline-block;
}

.yt-dialog-align {
    height: 100%;
}

.yt-dialog-focus-trap {
    height: 0;
}

.yt-dialog-fg-content {
    overflow: hidden;
    padding: 0 20px 20px;
    color: #333;
}

.yt-uix-overlay-actions {
    margin: 20px -20px -20px;
    padding: 15px 20px;
    text-align: right;
    background: #f1f1f1;
}

.yt-uix-overlay-actions button {
    margin: 0 3px;
}

.yt-dialog-loading,
.yt-dialog-working {
    display: none;
}



.yt-dialog-waiting-content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
}

.yt-dialog-loading .yt-dialog-waiting-content {
    margin-top: -20px;
    font-size: 14px;
    text-align: center;
}

.yt-dialog-working-bubble .yt-dialog-waiting-content {
    margin-top: -25px;
}

.yt-dialog-working-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: -1px;
    left: -1px;
    border: 1px solid #fff;
    background-color: #fff;
    opacity: .7;
    filter: alpha(opacity=70);
}

.yt-dialog-working-bubble {
    position: absolute;
    height: 100px;
    width: 200px;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -100px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 6px;
}

.yt-uix-tooltip {
    display: inline-block;
}

#watch7-user-header {
    position: relative;
    padding-bottom: 10px;
    padding-top: 10px;
    overflow: hidden;
}

#watch7-subscription-container {
    margin-left: 10px;
}

body:-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen),
body :-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen) {
    display: none!important;
}

.yt-channel-title-icon-verified {
    vertical-align: middle;
    margin-bottom: 2px;
    *margin-right: 6px;
    -webkit-user-drag: none;
    display: inline-block;
}

.yt-channel-title-icon-verified {
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) 0 0;
    background-size: auto;
    width: 12px;
    height: 9px;
}

.yt-channel-title-icon-verified:hover {
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -158px -210px;
    background-size: auto;
    width: 12px;
    height: 9px;
}
          @media only screen and (min-width:850px) {
 .exp-responsive #content .yt-uix-button-subscription-container .yt-short-subscriber-count {
  display:none
 }
 .exp-responsive #content .yt-uix-button-subscription-container .yt-subscriber-count {
  display:inline-block;
 }
}
.yt-uix-button-subscribe-branded+.yt-subscription-button-subscriber-count-branded-horizontal,
.yt-uix-button-subscribe-unbranded+.yt-subscription-button-subscriber-count-unbranded-horizontal,
.yt-uix-button-subscribe-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal,
.yt-uix-button-subscribed-branded+.yt-subscription-button-subscriber-count-branded-horizontal.subscribed,
.yt-uix-button-subscribed-unbranded+.yt-subscription-button-subscriber-count-unbranded-horizontal.subscribed,
.yt-uix-button-subscribed-branded+.yt-uix-subscription-preferences-button+.yt-subscription-button-subscriber-count-branded-horizontal.subscribed {
 display:inline-block
}
html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#watch-header.yt-card.yt-card-has-padding div#watch7-user-header.spf-link span#watch7-subscription-container span.yt-uix-button-subscription-container span.yt-subscription-button-subscriber-count-branded-horizontal.yt-subscriber-count {
    display: inherit;
}
/* action box */
.yt-uix-expander .yt-uix-expander-collapsed-body,
.yt-uix-expander-collapsed .yt-uix-expander-body {
    display: none;
}

.yt-uix-expander-collapsed .yt-uix-expander-collapsed-body {
    display: block;
}
.yt-uix-expander-head {
    cursor: pointer;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

#action-panel-details a {
    color: #333;
}

#action-panel-details:hover a {
    color: #167ac6;
}

#watch-description {
    color: #333;
    line-height: 14px;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.watch-time-text {
    vertical-align: middle;
}

#watch-description-extras {
    margin-top: 8px;
}

.watch-extras-section .title,
.watch-extras-section .content {
    font-size: 11px;
    line-height: 11px;
    margin-bottom: 5px;
}

.watch-extras-section .title {
    float: left;
    font-weight: 500;
    width: 100px;
    margin-right: 10px;
}

.watch-meta-item {
    clear: both;
}

.yt-uix-expander-collapsed #watch-description-text {
    max-height: 42px;
    overflow: hidden;
    padding-top: 4px;
}

.watch-info-tag-list a {
    white-space: nowrap;
}

.watch-meta-item .watch-info-tag-list li {
    display: inline;
}

.watch-meta-item .watch-info-tag-list li:after {
    content: normal;
}

.watch-meta-item .watch-info-tag-list li:last-child:after {
    content: normal;
}
.yt-uix-expander .yt-uix-expander-collapsed-body,
.yt-uix-expander-collapsed .yt-uix-expander-body {
    display: none;
}

.yt-uix-expander-collapsed .yt-uix-expander-collapsed-body {
    display: block;
}
.yt-card .yt-uix-button-expander:hover {
    color: #222;
}

.yt-card.yt-uix-expander .yt-uix-button-expander {
    margin: 10px 0 -15px;
}
.yt-card {
    margin: 0 0 10px;
    border: 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.yt-card.yt-card-has-padding {
    padding: 15px;
}

.yt-card .yt-uix-button-expander {
    display: block;
    width: 100%;
    text-transform: uppercase;
    color: #767676;
    border-top: 1px solid #e2e2e2;
    box-shadow: none;
}

strong {
    font-weight: 500;
}
strong {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    background: transparent;
}
.yt-uix-expander .yt-uix-expander-collapsed-body,
.yt-uix-expander-collapsed .yt-uix-expander-body {
 display:none;
}
.yt-uix-expander-collapsed .yt-uix-expander-collapsed-body {
 display:block
}
.yt-uix-simple-thumb-wrap {
    position: relative;
    overflow: hidden;
    display: inline-block;
}

.yt-uix-simple-thumb-related {
    height: 94px;
}

.yt-uix-simple-thumb-related>img {
    position: relative;
    top: 0;
}

.video-list-item .yt-uix-simple-thumb-wrap {
    float: left;
    margin: 0 8px 0 0;
}

a:hover .yt-uix-simple-thumb-wrap .video-time {
    display: none;
}

.yt-sprite {
    display: inline-block;
}

.video-time {
    position: absolute;
    right: 2px;
    bottom: 2px;
}

.video-time {
    margin-top: 0;
    margin-right: 0;
    padding: 0 4px;
    font-weight: 500;
    font-size: 11px;
    background-color: #000;
    color: #fff!important;
    height: 14px;
    line-height: 14px;
    opacity: .75;
    filter: alpha(opacity=75);
    display: -moz-inline-stack;
    vertical-align: top;
    display: inline-block;
}

.yt-uix-button-opacity,
.yt-uix-button-opacity:hover {
    box-shadow: none;
}

.yt-uix-button-opacity {
    opacity: .5;
    filter: alpha(opacity=50);
}

.yt-uix-button-opacity:hover {
    opacity: .6;
    filter: alpha(opacity=60);
}

.yt-uix-button-opacity:active {
    opacity: .8;
    filter: alpha(opacity=80);
}

.yt-uix-button-opacity:active:hover {
    opacity: 1;
    filter: alpha(opacity=100);
}

.yt-uix-hovercard-content {
    display: none;
}

.yt-uix-hovercard-target {
    cursor: pointer;
}

.yt-uix-checkbox-on-off {
    position: relative;
    display: inline-block;
    width: 35px;
    height: 15px;
    padding-right: 2px;
    overflow: hidden;
    vertical-align: middle;
    cursor: pointer;
}

.yt-uix-checkbox-on-off input[type=checkbox] {
    position: absolute;
    margin: 0;
    width: 37px;
    height: 15px;
    opacity: 0;
}

.yt-uix-checkbox-on-off label {
    display: inline-block;
    border: 1px solid transparent;
    height: 13px;
    width: 100%;
    background: #b8b8b8;
    border-radius: 20px;
}

.yt-uix-checkbox-on-off input[type=checkbox]:checked+label {
    background-color: #167ac6;
}

.yt-uix-checkbox-on-off label>* {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    -moz-transition: width .1s;
    -webkit-transition: width .1s;
    transition: width .1s;
}

.yt-uix-checkbox-on-off .checked {
    text-align: center;
    line-height: 13px;
}

.yt-uix-checkbox-on-off .checked:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -86px -193px;
    background-size: auto;
    width: 10px;
    height: 7px;
}

.yt-uix-checkbox-on-off .toggle {
    background: #fbfbfb;
    width: 13px;
    border-radius: 13px;
}

.yt-uix-checkbox-on-off .checked,
.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .unchecked {
    width: 0;
}

.yt-uix-checkbox-on-off .unchecked,
.yt-uix-checkbox-on-off input[type=checkbox]:checked+label .checked {
    width: 22px;
}

.yt-uix-checkbox-on-off input[type=checkbox]:disabled+label {
    opacity: .5;
}
.video-list-item a {
    position: relative;
    padding: 0 5px;
    display: block;
    overflow: hidden;
    color: #333;
}

.video-list-item .content-wrapper a {
    padding: 0;
}

.video-list-item a:hover {
    background: #fff;
    text-decoration: none;
}

.video-list-item a:visited .title {
    color: #408;
}

.video-list-item a:hover .title {
    text-decoration: underline;
}

.video-list-item .title {
    display: block;
    font-size: 1.1666em;
    font-weight: normal;
    line-height: 1.2;
    color: #03c;
    max-height: 3.6em;
    margin-bottom: 2px;
    overflow: hidden;
    cursor: pointer;
    cursor: hand;
}

.video-list-item .stat {
    display: block;
    font-size: .9166em;
    color: #666;
    line-height: 1.4em;
    height: 1.4em;
    white-space: nowrap;
}

.video-list .video-list-item .title {
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.video-list .video-list-item .title:hover {
    text-decoration: underline;
}

.video-list .video-list-item .title:visited {
    color: #036;
}

.video-list .video-list-item .stat {
    color: #767676;
    font-size: 11px;
}

.related-list-item .content-wrapper {
    margin-left: 181px;
}

.related-list-item .content-link {
    display: block;
    min-height: 94px;
    text-decoration: none;
}

.related-list-item .thumb-wrapper {
    position: absolute;
    top: 0;
    margin: 0 5px;
    width: 168px;
    height: 94px;
    overflow: hidden;
}

.related-list-item .thumb-wrapper a {
    padding: 0;
}

.related-list-item .video-time {
    right: 2px;
}

.related-list-item:hover .video-time {
    right: -60px;
}

.related-list-item.show-video-time:hover .video-time {
    right: 2px;
}

body:-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen),
body :-webkit-full-screen-ancestor>:not(:-webkit-full-screen-ancestor):not(:-webkit-full-screen) {
    display: none!important;
}

.video-list-item {
    position: relative;
    margin-bottom: 15px;
}

.autoplay-bar .autoplay-info-icon {
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: -1px;
    background: no-repeat url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -565px -88px;
    background-size: auto;
    width: 16px;
    height: 16px;
}

.autoplay-bar .checkbox-on-off {
    position: absolute;
    right: 0;
    vertical-align: top;
    font-size: 13px;
    font-weight: 500;
    color: #767676;
}

.autoplay-hovercard {
    display: inline-block;
    vertical-align: middle;
}

h4 {
    font-weight: 500;
}

h4 {
    font-size: 13px;
}

h4 {
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
}`, 'w8rstyledata');