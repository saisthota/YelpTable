chrome.browserAction.onClicked.addListener(function(tab) {

            chrome.tabs.sendMessage(tab.id, {
                    command: "LoadReviews"
                },
                function(msg) {
                    console.log("Response", msg);
                });

});

