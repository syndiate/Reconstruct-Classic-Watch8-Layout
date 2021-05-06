// ==UserScript==
// @name        Reconstruct Classic Watch7 YouTube Layout
// @version 0.1.0
// @description  A simple script that seeks to reconstruct the classic watch7 layout on YouTube.
// @author theundeadwolf0
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
// @license MIT
// ==/UserScript==


function reconstruct() {
// Define watch template (we inject information into this later):
let watchTemplate = [ `<div id="watch-header" class="yt-card yt-card-has-padding">
      <div id="watch7-headline" class="clearfix">
    <div id="watch-headline-title">
      <h1 class="watch-title-container">



  <span id="eow-title" class="watch-title" dir="ltr" title="videotitleplaceholder">videotitleplaceholder</span>

      </h1>
    </div>
  </div>

    <div id="watch7-user-header" class=" spf-link ">  <a class="yt-user-photo g-hovercard yt-uix-sessionlink      spf-link " data-ytid="UC38IQsAvIsxxjztdMZQtwHA" data-sessionlink="itct=CDQQ4TkiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0" href="channellinkplaceholder">
      <span class="video-thumb  yt-thumb yt-thumb-48 g-hovercard" data-ytid="UC38IQsAvIsxxjztdMZQtwHA">
    <span class="yt-thumb-square">
      <span class="yt-thumb-clip">

  <img data-ytimg="1" onload=";window.__ytRIL &amp;&amp; __ytRIL(this)" data-thumb="channeliconplaceholder" alt="channelnameplaceholder" src="https://www.youtube.com/yts/img/pixel-vfl3z5WfW.gif" width="48" height="48">

        <span class="vertical-align"></span>
      </span>
    </span>
  </span>

  </a>
  <div class="yt-user-info">
    <a class="g-hovercard yt-uix-sessionlink       spf-link " data-ytid="UC38IQsAvIsxxjztdMZQtwHA" data-sessionlink="itct=CDQQ4TkiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0" href="channellinkplaceholder">channelnameplaceholder</a>

      <span aria-label="Verified" class="yt-channel-title-icon-verified yt-uix-tooltip yt-sprite" data-tooltip-text="Verified"></span>
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
        Unsubscribe from RickAstleyVEVO?
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

</span><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-subscribe-branded yt-uix-button-has-icon no-icon-markup yt-uix-subscription-button yt-can-buffer" type="button" onclick=";return false;" aria-busy="false" aria-live="polite" data-subscribed-timestamp="0" data-show-unsub-confirm-dialog="true" data-clicktracking="itct=CDUQmysiEwjbqYnt7c_TAhWE1X4KHRV5BiEo-B0yBXdhdGNo" data-href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Fcontinue_action%3DQUFFLUhqbTA2MXc1eFBLdTE2Z1dSTWROMzJOQW5wQXB2Z3xBQ3Jtc0ttWEdOOEx0QWc0QkZPcjQ4SzRRNVRkMjBKNXo3OXBaNnVkY0YtZUR1SlI0U1BuaFZQQXdmdVN4ZmRuV3BqTHhEUTR6bzdNalF3bDNYRlZxOU9kdHVicTkzb2hELXZrTUVPVGhYd1FKYzFwVkpxWWU3ZzRTOFl3MWVQVENELXdQOUxGX2w4aHA0U3JpcjB2RmwyUDRON3BaempkUTN6Y05feGZ6ZS1IbGtUXzc2Y1NUdi1NS3FSTE51SERaNFBpTlRnaDF4N0dZUXRvaThYc1pCcnAxenRHd19UUXN3%26feature%3Dsubscribe%26app%3Ddesktop%26next%3D%252Fchannel%252FUC38IQsAvIsxxjztdMZQtwHA%26hl%3Den%26action_handle_signin%3Dtrue" data-channel-external-id="UC38IQsAvIsxxjztdMZQtwHA" data-show-unsub-confirm-time-frame="always" data-style-type="branded"><span class="yt-uix-button-content"><span class="subscribe-label" aria-label="Subscribe">Subscribe</span><span class="subscribed-label" aria-label="Unsubscribe">Subscribed</span><span class="unsubscribe-label" aria-label="Unsubscribe">Unsubscribe</span></span></button><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-uix-button-empty yt-uix-button-has-icon yt-uix-subscription-preferences-button" type="button" onclick=";return false;" aria-role="button" aria-busy="false" aria-label="Subscription preferences" aria-live="polite" data-channel-external-id="UC38IQsAvIsxxjztdMZQtwHA"><span class="yt-uix-button-icon-wrapper"><span class="yt-uix-button-icon yt-uix-button-icon-subscription-preferences yt-sprite"></span></span></button><span class="yt-subscription-button-subscriber-count-branded-horizontal yt-subscriber-count" tabindex="0" title="subscribecountplaceholder" aria-label="subscribecountplaceholder">subscribecountplaceholder</span><span class="yt-subscription-button-subscriber-count-branded-horizontal yt-short-subscriber-count" tabindex="0" title="subscribecountplaceholder" aria-label="subscribecountplaceholder">subscribecountplaceholder</span>  <span class="subscription-preferences-overlay-container">

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
    <div id="watch8-action-buttons" class="watch-action-buttons clearfix"><div id="watch8-secondary-actions" class="watch-secondary-actions yt-uix-button-group" data-button-toggle-group="optional">    <span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup yt-uix-clickcard-target addto-button pause-resume-autoplay yt-uix-tooltip" type="button" onclick=";return false;" title="Add to" data-position="bottomleft" data-orientation="vertical"><span class="yt-uix-button-content">Add to</span></button>
        <div class="signin-clickcard yt-uix-clickcard-content">
    <h3 class="signin-clickcard-header">Want to watch this again later?</h3>
    <div class="signin-clickcard-message">
      Sign in to add this video to a playlist.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip" type="button" onclick=";return false;" title="Share
" data-trigger-for="action-panel-share" data-button-toggle="true"><span class="yt-uix-button-content">Share
</span></button>
<div class="yt-uix-menu ">  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay yt-uix-menu-trigger yt-uix-tooltip" type="button" onclick=";return false;" role="button" aria-pressed="false" aria-label="Action menu." title="More actions" id="action-panel-overflow-button" aria-haspopup="true"><span class="yt-uix-button-content">More</span></button>
<div class="yt-uix-menu-content yt-ui-menu-content yt-uix-menu-content-hidden" role="menu"><ul id="action-panel-overflow-menu">  <li>
      <span class="yt-uix-clickcard" data-card-class="report-card">
          <button type="button" class="yt-ui-menu-item has-icon action-panel-trigger action-panel-trigger-report report-button yt-uix-clickcard-target" data-position="topright" data-orientation="horizontal">
    <span class="yt-ui-menu-item-label">Report</span>
  </button>

          <div class="signin-clickcard yt-uix-clickcard-content">
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
</ul></div></div></div><div id="watch8-sentiment-actions"><div id="watch7-views-info"><div class="watch-view-count">viewcountplaceholder</div>
  <div class="video-extras-sparkbars">
    <div class="video-extras-sparkbar-likes" style="width: 0%"></div>
    <div class="video-extras-sparkbar-dislikes" style="width: 100%"></div>
  </div>
</div>




  <span class="like-button-renderer " data-button-toggle-group="optional">
    <span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-unclicked yt-uix-clickcard-target   yt-uix-tooltip" type="button" onclick=";return false;" aria-label="like this video along with 1,924,213 other people" title="I like this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">likecountplaceholder</span></button>
          <div class="signin-clickcard yt-uix-clickcard-content">
    <h3 class="signin-clickcard-header">Like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>
    <span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-like-button like-button-renderer-like-button-clicked yt-uix-button-toggled  hid yt-uix-tooltip" type="button" onclick=";return false;" aria-label="like this video along with 1,924,213 other people" title="Unlike" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">1,924,214</span></button>
    </span>
    <span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-unclicked yt-uix-clickcard-target   yt-uix-tooltip" type="button" onclick=";return false;" aria-label="dislike this video along with 92,738 other people" title="I dislike this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">dislikecountplaceholder</span></button>
          <div class="signin-clickcard yt-uix-clickcard-content">
    <h3 class="signin-clickcard-header">Don't like this video?</h3>
    <div class="signin-clickcard-message">
      Sign in to make your opinion count.
    </div>
    <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;hl=en&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3D__FEATURE__%26app%3Ddesktop%26hl%3Den%26next%3D%252Fwatch%253Fv%253DdQw4w9WgXcQ" class="yt-uix-button  signin-button yt-uix-sessionlink yt-uix-button-primary yt-uix-button-size-default" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg"><span class="yt-uix-button-content">Sign in</span></a>
  </div>

    </span>
    <span class="yt-uix-clickcard">
      <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup like-button-renderer-dislike-button like-button-renderer-dislike-button-clicked yt-uix-button-toggled  hid yt-uix-tooltip" type="button" onclick=";return false;" aria-label="dislike this video along with 92,738 other people" title="I dislike this" data-position="bottomright" data-force-position="true" data-orientation="vertical"><span class="yt-uix-button-content">92,739</span></button>
    </span>
  </span>
</div></div>
  </div>`, /* --------DESCRIPTION BOX------- */
 `<div id="action-panel-details" class="action-panel-content yt-uix-expander yt-card yt-card-has-padding yt-uix-expander-collapsed"><div id="watch-description" class="yt-uix-button-panel"><div id="watch-description-content"><div id="watch-description-clip"><div id="watch-uploader-info"><strong class="watch-time-text">uploadtype uploaddateplaceholder</strong></div><div id="watch-description-text" class=""><p id="eow-description" class="">descriptionplaceholder</p></div>  <div id="watch-description-extras">
    <ul class="watch-extras-section">
            <li class="watch-meta-item yt-uix-expander-body">
    <h4 class="title">
      Category
    </h4>
    <ul class="content watch-info-tag-list">
        <li><a class="g-hovercard yt-uix-sessionlink      spf-link " data-ytid="UC-9-kyTW8ZkZNDHQJ6FgpwQ" data-sessionlink="ei=CsYHWdv8MISr-wOV8pmIAg" href="categorylinkplaceholder">categorynameplaceholder</a></li>
    </ul>
  </li>

            <li class="watch-meta-item yt-uix-expander-body">
    <h4 class="title">
      License
    </h4>
    <ul class="content watch-info-tag-list">
        <li>licenseplaceholder</li>
    </ul>
  </li>

    </ul>
  </div>
</div></div></div>  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-collapsed-body yt-uix-gen204" type="button" onclick=";return false;" data-gen204="feature=watch-show-more-metadata"><span class="yt-uix-button-content">Show more</span></button>
  <button class="yt-uix-button yt-uix-button-size-default yt-uix-button-expander yt-uix-expander-head yt-uix-expander-body" type="button" onclick=";return false;"><span class="yt-uix-button-content">Show less</span></button>
</div>`];

//Inject template

function injectTemplate() {
    document.getElementById("clarify-box").outerHTML = document.getElementById("clarify-box").outerHTML + watchTemplate[0];
    document.getElementById("watch-header").outerHTML = document.getElementById("watch-header").outerHTML + watchTemplate[1];
    injectInfo();
}

var checkExist = setInterval(function() {
   if (document.getElementById('owner-sub-count')) {
      clearInterval(checkExist);
      injectTemplate();
   }
}, 400);

function injectInfo() {
    // For some reason, this doesn't work correctly if only ran once, hence the loop.
    var i;
    for (i = 0; i < 12; i++) {
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("viewcountplaceholder", document.getElementsByClassName("view-count style-scope yt-view-count-renderer")[0].innerHTML); // viewcount
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("videotitleplaceholder", document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0].children[0].innerHTML); // video name
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("channelnameplaceholder", document.getElementsByClassName("style-scope ytd-channel-name")[0].children[0].innerText); // channel name
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("channellinkplaceholder", document.getElementsByClassName("style-scope ytd-channel-name")[0].children[0].children[0].children[0].href); // channel url
        document.getElementById("watch7-subscription-container").innerHTML = document.getElementById("watch7-subscription-container").innerHTML.replace("subscribecountplaceholder", document.getElementById("owner-sub-count").innerHTML.replace(" subscribers", "")); // subscriber count
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("likecountplaceholder", document.getElementById("top-level-buttons").children[0].children[0].children[1].ariaLabel.replace(" likes", "")); // like count
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("dislikecountplaceholder", document.getElementById("top-level-buttons").children[1].children[0].children[1].ariaLabel.replace(" dislikes", "")); // dislike count
        // minor i18n fixes
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("1 like", "1");
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("1 dislike", "1");
        document.getElementById("watch7-subscription-container").innerHTML = document.getElementById("watch7-subscription-container").innerHTML.replace("1 subscriber", "1"); // subscriber count
        document.getElementById("watch-header").innerHTML = document.getElementById("watch-header").innerHTML.replace("No", "0");
        var uploadType;
        // description box
        if (document.getElementById("date").children[1].innerHTML.search("Premiered ") != "-1") {
            uploadType = "2";
        } else {
            uploadType = "0";
        }
        if (uploadType == "2") {
            document.getElementById("action-panel-details").innerHTML = document.getElementById("action-panel-details").innerHTML.replace("uploaddateplaceholder", document.getElementById("date").children[1].innerHTML.replace("Premiered ", "")); // upload date
            document.getElementById("action-panel-details").innerHTML = document.getElementById("action-panel-details").innerHTML.replace("uploadtype", "Premiered on "); // upload type
        }
        if (uploadType == "0") {
            document.getElementById("action-panel-details").innerHTML = document.getElementById("action-panel-details").innerHTML.replace("uploaddateplaceholder", document.getElementById("date").children[1].innerHTML); // upload date
            document.getElementById("action-panel-details").innerHTML = document.getElementById("action-panel-details").innerHTML.replace("uploadtype", "Published on "); // upload type
        }
       document.getElementById("action-panel-details").innerHTML = document.getElementById("action-panel-details").innerHTML.replace("descriptionplaceholder", document.getElementsByClassName("content style-scope ytd-video-secondary-info-renderer")[0].innerHTML);
       document.getElementById("eow-description").innerHTML = document.getElementById("eow-description").innerHTML.replace(new RegExp('\r?\n','g'), '<br />');
    }
    // Remove verification icon if the channel isn't verified
    if (document.getElementsByClassName("style-scope ytd-video-owner-renderer")[3].children[1].getAttribute("hidden") == "") {
        document.getElementsByClassName("yt-user-info")[0].children[1].outerHTML = "";
    }
    // Calculate likebar ratio
    document.getElementsByClassName("video-extras-sparkbar-likes")[0].setAttribute("style", document.getElementById("like-bar").getAttribute("style"));
    document.getElementsByClassName("video-extras-sparkbar-dislikes")[0].setAttribute("style", ("width: " + (100 - document.getElementById("like-bar").getAttribute("style").replace("width: ", "").replace("%;", "")) + "%;"));
    // For some reason, the channel icon fails to load unless it is first loaded on the new layout; wait for that
    var ceci = setInterval(function() {
        if (document.getElementsByClassName("yt-simple-endpoint style-scope ytd-video-owner-renderer")[0].children[0].children[0].getAttribute("src")) {
            clearInterval(ceci);
            loadChannelIcon();
        }
    }, 100);
    function loadChannelIcon() {
        document.getElementsByClassName("yt-thumb-clip")[0].children[0].setAttribute("src", document.getElementsByClassName("yt-simple-endpoint style-scope ytd-video-owner-renderer")[0].children[0].children[0].src); // channel icon
    }
    function getLikeButtonStatus() {
       if (document.getElementById("top-level-buttons").children[0].getAttribute("class").search("style-default-active") == -1) {
            document.getElementsByClassName("like-button-renderer-like-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-like-button")[0].getAttribute("class").replace("yt-uix-button-toggled", "")))
       } else {
            document.getElementsByClassName("like-button-renderer-like-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-like-button")[0].getAttribute("class") + " yt-uix-button-toggled"))
       }
       if (document.getElementById("top-level-buttons").children[1].getAttribute("class").search("style-default-active") == -1) {
            document.getElementsByClassName("like-button-renderer-dislike-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-dislike-button")[0].getAttribute("class").replace("yt-uix-button-toggled", "")))
       } else {
            document.getElementsByClassName("like-button-renderer-dislike-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-dislike-button")[0].getAttribute("class") + " yt-uix-button-toggled"))
       }
       if (document.getElementById("top-level-buttons").children[0].getAttribute("class").search("style-text") > 0) {
            document.getElementsByClassName("like-button-renderer-like-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-like-button")[0].getAttribute("class").replace("yt-uix-button-toggled", "")))
       }
       if (document.getElementById("top-level-buttons").children[1].getAttribute("class").search("style-text") > 0) {
            document.getElementsByClassName("like-button-renderer-dislike-button")[0].setAttribute("class", (document.getElementsByClassName("like-button-renderer-dislike-button")[0].getAttribute("class").replace("yt-uix-button-toggled", "")))
       }
    }
    // Get subscribe status
    function getButtonStatus() {
        // subscribe button
        if (document.getElementsByClassName("style-scope ytd-subscribe-button-renderer")[0].getAttribute("subscribed") == "") {
            document.getElementsByClassName("yt-uix-button-subscription-container")[0].children[1].setAttribute("class", document.getElementsByClassName("yt-uix-button-subscription-container")[0].children[1].getAttribute("class").replace("yt-uix-button-subscribe-branded", "yt-uix-button-subscribed-branded"));
        }
        if (document.getElementsByClassName("style-scope ytd-subscribe-button-renderer")[0].children[0].innerText.toLowerCase() == "subscribe") {
            document.getElementsByClassName("yt-uix-button-subscription-container")[0].children[1].setAttribute("class", document.getElementsByClassName("yt-uix-button-subscription-container")[0].children[1].getAttribute("class").replace("yt-uix-button-subscribed-branded", "yt-uix-button-subscribe-branded"));
       }
       // like buttons
       getLikeButtonStatus();
    }
    getButtonStatus();
    window.setInterval(function() {
        getButtonStatus();
     }, 30);

    // Working buttons
    document.getElementsByClassName("yt-uix-subscription-button")[0].onclick = function() {
        document.getElementsByClassName("yt-uix-subscription-button")[0].blur();
        document.getElementsByClassName("ytd-subscribe-button-renderer")[0].click();
    }
    document.getElementsByClassName("like-button-renderer-like-button")[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer-like-button")[0].blur();
        document.getElementById("top-level-buttons").children[0].click();
    }
    document.getElementsByClassName("like-button-renderer-dislike-button")[0].onclick = function() {
        document.getElementsByClassName("like-button-renderer-dislike-button")[0].blur();
        document.getElementById("top-level-buttons").children[1].click();
        getLikeButtonStatus();
    }
    document.getElementsByClassName("addto-button")[0].onclick = function() {
        document.getElementsByClassName("addto-button")[0].blur();
        document.getElementById("top-level-buttons").children[3].click();
        getLikeButtonStatus();
    }
    document.getElementsByClassName("action-panel-trigger-share")[0].onclick = function() {
        document.getElementsByClassName("action-panel-trigger-share")[0].blur();
        document.getElementById("top-level-buttons").children[2].click();
        getLikeButtonStatus();
    }
    document.getElementById("action-panel-overflow-button").onclick = function() {
        document.getElementById("action-panel-overflow-button").blur();
        document.getElementById("top-level-buttons").children[4].click();
        getLikeButtonStatus();
    }
    // - description "show more"
    document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].onclick = function() {
        document.getElementsByClassName("yt-uix-expander-collapsed-body")[0].blur();
        document.getElementById("action-panel-details").setAttribute("class", document.getElementById("action-panel-details").getAttribute("class").replace("yt-uix-expander-collapsed", ""))
    }
    document.getElementsByClassName("yt-uix-expander-body")[2].onclick = function() {
        document.getElementsByClassName("yt-uix-expander-body")[2].blur();
        document.getElementById("action-panel-details").setAttribute("class", document.getElementById("action-panel-details").getAttribute("class") + " yt-uix-expander-collapsed")
    }
}
}
reconstruct();

function resetWatch7() {
    document.getElementById("watch-header").outerHTML = "";
    document.getElementById("action-panel-details").outerHTML = "";
    reconstruct();
}
// check if URL changes; reset if so.
window.addEventListener('load', function () {
    console.log('load');
});

window.addEventListener('yt-page-data-updated', function () {
    resetWatch7();
});

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

addStyle(`.title.ytd-video-primary-info-renderer {
    font-size: 20px;
    font-weight: normal;
}
span.yt-view-count-renderer {
    line-height: 24px;
    max-height: 24px;
    text-align: right;
    font-size: 19px;
    color: #666;
    white-space: nowrap;
    margin-bottom: 2px;
}
#dot.ytd-video-primary-info-renderer {
    display: none;
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
html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#action-panel-details.action-panel-content.yt-uix-expander.yt-card.yt-card-has-padding div#watch-description.yt-uix-button-panel div#watch-description-content div#watch-description-clip div#watch-description-extras {
    display: none !important;
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
  background: url(https://s.ytimg.com/yts/img/icn_loading_animated-vflff1Mjj.gif) no-repeat center;
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

 .yt-uix-button-subscription-container .unsubscribe-confirmation-overlay-container {
  display: none;
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

 .yt-uix-clickcard-content {
  display: none;
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

 .yt-dialog-content {
  visibility: hidden;
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
    background: url(https://s.ytimg.com/yts/img/icn_loading_animated-vflff1Mjj.gif) no-repeat center;
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

.yt-uix-button-subscription-container .unsubscribe-confirmation-overlay-container {
    display: none;
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

.yt-dialog-content {
    visibility: hidden;
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
    content: ",";
}

.watch-meta-item .watch-info-tag-list li:last-child:after {
    content: "";
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
}`);
