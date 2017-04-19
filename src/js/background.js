
chrome.runtime.onMessage.addListener(function(msg, sender, handler) {
    if (msg.type === 'bookmarks'){
        chrome.bookmarks.getTree(function(bookmarks_tree){
            handler({ folders: bookmarks_tree })
        });
    }
    return true;
});