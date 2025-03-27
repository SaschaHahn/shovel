chrome.runtime.onMessage.addListener(function(request) {
    if (request.action == "getSource") {
        let found = "";
        if (found.length == 0) {
            document.getElementById("found").innerHTML = 'No Match';
        }

        chrome.storage.sync.get(['key'], function(object) {
            if (object.key) {
                const search_words = (object.key.replace(/\r\n/g,"\n").split("\n"));
                search_words.forEach(function(item) {
                    if (item && RegExp(item,'gi').test(request.source)) {
                        found += item + '<br>';
                        document.getElementById("found").innerHTML = found;
                    }
                }); 
            }
        }); 
    }
});
 
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length === 0) return;
    const tab = tabs[0];
    const protocol = new URL(tab.url).protocol;

    if (protocol === "http:" || protocol === "https:") {
        chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            files: ["parse-html.js"]
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
        });
    }
});