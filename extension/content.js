/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command == "change_title")) {
        var biz = $('.page-header-title').text() + ' ' + $( "ul.profile-header-meta-items  li:nth-child(2)" ).text();
        $("#reviews-summary h3").append(" from Yelp");

        var http = new XMLHttpRequest();
        var url = "http://127.0.0.1:8080/api/restaurant/"+biz;
        http.open("GET", url, true);

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                $("#reviews").html(http.responseText);
                sendResponse("Loading reviews");
            }
        }
        http.send();
    }
});