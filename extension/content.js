/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command == "LoadReviews")) {
        var biz = $('.page-header-title').text();
        var area = $( "ul.profile-header-meta-items  li:nth-child(2)" ).text();

        var http = new XMLHttpRequest();
        var url = "http://127.0.0.1:8080/api/restaurant/"+biz+"/"+area;
        http.open("GET", url, true);

        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                var reviewsTitle = $('.page-header-title').text() + ' Ratings and Reviews from Yelp';
                $("#reviews-summary h3").text(reviewsTitle);
                var res = JSON.parse(http.responseText);
                $("#reviews-results").html(res);

                $("#reviews-toolbar").remove();
                $("#review-pagination").remove();
                sendResponse("Loading reviews");
            }
        }
        http.send();
    }
});
