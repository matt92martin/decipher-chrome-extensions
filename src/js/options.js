var defaultSite = 'v2.decipherinc.com';

function save_options() {
  var sites = document.getElementById('sites').value.split(/\s+|\n+|[,]+/);
  if ( sites.indexOf( defaultSite ) == -1 ){
    sites.push( defaultSite );
  }

  chrome.storage.sync.set({
    sites: sites,
  }, 
  function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

}


function restore_options(){

  chrome.storage.sync.get({
    sites: [ defaultSite ]
  }, 
  function(items) {

    if ( items.sites.indexOf( defaultSite ) == -1 ){
      items.sites.push( defaultSite );
    }

    document.getElementById('sites').value = items.sites.join('\n');
  });
}



document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);