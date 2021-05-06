// shorthand definitions

var d = document;
var db = document.body;
var $ = function(id) { return document.querySelector(id); };
var $a = function(id) { return document.querySelectorAll(id); };

/* Customisable HTML templates below.
// These are implemented to be easily modified, and thus patched.
// But feel free to modify them as you wish.
// ---------------------------------------------------------------
// These are defined in a function so the large HTML blocks can be
// easily minimised in most code editors.
*/

var isLoaded = false;

function i18n(string)
{
	
	// Get language from another source (todo)
	/* TEMP */ var lang = 0; 
	
	var i18nstrings = 
	[
	        /*--ENGLISH--*/
	        [
	         /* header */
	         "Comments", 
			 /* sort */
	         "Top comments", "Newest first", 
			 /* simplebox sample text */
			 "Add a public comment...", "Add a public reply...", "Commenting publicly as ",
			 /* no channel disclaimer */
			 "By completing this action you are creating a ", "channel", " and agree to ", "YouTube's Terms of Service", ".", 0,
			 /* simplebox post button */
	         "Cancel", "Comment", "Reply", 
			 /* comment actions */
			 "Reply", "❤ by ", "Love", "Unlove", "Read more", "Show less",
			 /* time */
			 " second ago", " seconds ago", " minute ago", " minutes ago", 
			 " hour ago", " hours ago", " day ago", " days ago", " week ago", 
			 " weeks ago", " month ago", " months ago", " year ago", 
			 " years ago", 0,
			 /* edited */
			 " (edited)", 
			 /* comment headers */
			 "Highlighted comment", "Pinned by ",
			 /* dropdown actions */
			 "Report", "Edit", "Delete",
			 /* creator dropdown actions */
			 "Pin", "Hide user from channel", "Remove",
			 /* reply strings */
			 "View ", "Hide", "View reply", "Hide reply", " replies", 0,
			 /* user verified */
			 "Verified",
			 /* load more comments */
			 "Show more",
			 /* general load text */
			 "Loading..."
			],
			
	        /*--JAPANESE--*/
	        [
	         /* header */
	         "コメント", 
			 /* sort */
	         "評価順", "新しい順", 
			 /* simplebox sample text */
			 "公開コメントを入力...", "公開の返信を追加...", " としてコメントを公開する",
			 /* no channel disclaimer */
			 "この操作を完了すると", "チャンネル", "が作成され、", "YouTube の利用規約", "に同意したことになります。", 0,
			 /* simplebox post button */
	         "キャンセル", "コメント", "返信", 
			 /* comment actions */
			 "返信", " さんが ❤ をつけました", "ハートを付ける", "ハートをはずす", "続きを読む", "一部を表示",
			 /* time */
			 " 秒前", " 秒前", " 分前", " 分前", 
			 " 時間前", " 時間前", " 日前", " 日前", " 週間前", 
			 " 週間前", " か月前", " か月前", " 年前", 
			 " 年前", 0,
			 /* edited */
			 "（編集済み）", 
			 /* comment headers */
			 "注目のコメント", " さんによって固定されています",
			 /* dropdown actions */
			 "報告", "編集", "削除",
			 /* creator dropdown actions */
			 "固定", "ユーザーをチャンネルに表示しない", "削除",
			 /* reply strings */
			 "表示", "非表示", "返信を表示", "返信を非表示", " 件の返信を", 1,
			 /* user verified */
			 "確認済み",
			 /* load more comments */
			 "显示更多内容",
			 /* general load text */
			 "読み込んでいます..."
			]
	];
	
	if (string = "loading")
	{
		
		return i18nstrings[lang][53];
		
	}
	
}

function getCommentTemplate(template)
{
	
	switch(template)
	{
		
		case "cMainLoading":
			return (
`<div id="watch-discussion" class="branded-page-box yt-card">
          <div class="action-panel-loading">
        <p class="yt-spinner ">
        <span class="yt-spinner-img  yt-sprite" title=""></span>

    <span class="yt-spinner-message">
` + i18n("loading") + `
    </span>
  </p>

    </div>

  </div>`
				);
		break;
		
		case "cMainHead":
		break;
		
		case "cMainSort":
		break;
		
		case "cCommentHead":
		break;
		
		case "cCommentBody":
		break;
		
		case "cCommentActions":
		break;
		
		case "cCommentActionReply":
		break;
		
		case "cCommentActionLike":
		break;
		
		case "cCommentActionDislike":
		break;
		
		case "cCommentActionHeart":
		break;
		
		case "cCommentReplyContainer":
		break;
		
		case "cCommentReplyLoadButton":
		break;
		
		case "cCommentRepliesLoading":
		break;
		
		case "cMainLoadMore":
		break;
		
	}
	
}

function waitForElementLoad(selector, callback, checkFrequency, timeout)
{
	// uses ms 
	// from https://stackoverflow.com/a/29754070
	
	var startTime = Date.now();
	(function loopSearch()
	{
		
		if ($(selector) != null) 
		{
			
			callback();
			return;
			
		}
		else
		{
			
			setTimeout(function()
			{
				
				if (timeout && Date.now() - startTime > timeout)
				{
					return;
				}
				
				loopSearch();
				
			}, checkFrequency);
			
		}
	}
	
	)();
	
}

async function getComments(data = {})
{
	
	videoId = (function()
	{

		return window.location.search.split(/\?|\&|\=/g)[2];
	
	})();
	
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


function mainloader()
{
	
	/* Function loads the new comments upon the initial page visit
	// or upon a page change event. This is actually harder than
	// it may seem and we have to get hacky at times.
	*/
	
	// Evaluate page type and load/unload comments based on this:
	isWatch() ? reloadCheck() : commentsModuleUnload();
	
	function reloadCheck()
	{
		
		isLoaded ? commentsModuleUnload("reload") : commentsModuleLoad();
		
	}
	
	function commentsModuleLoad()
	{
		
		isLoaded = true;
		
		
		// Wait for w8r and load the elements
		
		waitForElementLoad("#action-panel-details", function()
		{
			
			/*var cMain = document.createElement("div");
			cMain.setAttribute("id", "commentModuleTemp_cMain");
			$("#action-panel-details").parentNode.insertBefore(cMain, $("action-panel-details").nextSibling);
			$("#commentModuleTemp_cMain").outerHTML = getCommentTemplate("cMainLoading");*/
			
			$("#action-panel-details").insertAdjacentHTML("afterend", getCommentTemplate("cMainLoading"));
			
		}, 5, 15000);
		
	}
	
	function commentsModuleUnload(arg0)
	{
		
		// Clean up garbage left over from a previous watch page:
		
		isLoaded = false;
		
		$("#watch-discussion").outerHTML = "";
		
		if (arg0 == "reload")
		{
			
			commentsModuleLoad();
			
		}
		
	}
	
}

function isWatch()
{
	
	return (window.location.pathname == "/watch" ? true : false);
	
}

window.addEventListener("yt-page-data-updated", function(event){console.log("Event yt-page-data-updated");mainloader();});