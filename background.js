chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith("http://") || tab.url.startsWith("https://")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["parse-html.js"]
        }).catch((err) => console.log(err));
    }
});