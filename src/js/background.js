
chrome.runtime.onMessage.addListener(function(msg, sender, handler) {

    if (msg.type === 'bookmarks'){

        chrome.bookmarks.getTree(function(bookmarks_tree){
            handler({ folders: bookmarks_tree })
        });

    } else if ( msg.type === 'sites' ){

        chrome.storage.sync.get({
            sites: ['decipherinc.com', 'focusvision.com']
        }, function(items) {
            handler( { type: 'sites', payload: items })  
        });
        
    }
    return true;
});


chrome.commands.onCommand.addListener(function(command){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {type: command}, function(response) { });  
    });
    
});

