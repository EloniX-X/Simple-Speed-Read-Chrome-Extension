chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Read this REALLY fast",
        contexts: ["selection"],
        id: "contextSelection"
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "contextSelection" && info.selectionText) {
        chrome.storage.local.set({ selectedText: info.selectionText }, function() {
            chrome.windows.getCurrent({populate: true}, function(window) {
                const screenWidth = window.width;
                const screenHeight = window.height;
                const width = 500;  // Window width
                const height = 300; // Window height
                const left = (screenWidth / 2) - (width / 2);
                const top = (screenHeight / 2) - (height / 2);

                chrome.windows.create({
                    url: chrome.runtime.getURL("displayText.html"),
                    type: "popup",
                    width: width,
                    height: height,
                    left: Math.round(left),
                    top: Math.round(top)
                });
            });
        });
    }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateInterval") {
        chrome.storage.local.set({ interval: message.interval });
    }
});
