function DOMtoString() {
    return document.documentElement.outerHTML;
}
chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});