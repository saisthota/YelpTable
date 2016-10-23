/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command == "change_title")) {
        var biz = $('.page-header-title').text();

        var http = new XMLHttpRequest();
        var url = "http://127.0.0.1:8080/api/restaurant/"+biz;
        http.open("GET", url, true);

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {


                $("#reservation").html(msg.title);
                sendResponse("the page title's changed: '" + src + "' -> '" + dst + "'");
            }
        }
        http.send();
    }
});