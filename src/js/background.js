var defaultSite = 'v2.decipherinc.com';

browser.runtime.onMessage.addListener(function(msg, sender, handler) {
    
    if (msg.type === 'bookmarks'){

        browser.bookmarks.getTree(function(bookmarks_tree){
            handler({ folders: bookmarks_tree })
        });

    } else if ( msg.type === 'sites' ){

        let getSites = browser.storage.sync.get({
            sites: [defaultSite]
        }); 

        getSites.then( function( items ) {

            if ( items.sites.indexOf( defaultSite ) == -1 ){
                items.sites.push( defaultSite );
            }

            handler( { type: 'sites', payload: items } );  
        });
        
    }
    return true;
});


browser.commands.onCommand.addListener( function( command ){

    browser.tabs.query({ active: true, currentWindow: true }, function( tabs ){
        browser.tabs.sendMessage( tabs[0].id, { type: command }, function( response ) { });  
    });
    
});

