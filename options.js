document.getElementById('save').onclick = setFunc;

function setFunc() {
    let words = document.getElementById('searchList').value;
    words = words.replace(/[\r\n]*\s*$/gm, '');
    words = words.replace(/^\s*/gm, '');
    chrome.storage.sync.set({key: words});
}

chrome.storage.sync.get(['key'], function(object) {
    if (object.key) {
        document.getElementById('searchList').innerHTML = object.key;
    }
});