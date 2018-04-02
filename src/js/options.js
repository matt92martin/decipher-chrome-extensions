var defaultSite = '.*?.decipherinc.com';

var browser = browser || chrome;

function save_options() {
  var sites = document.getElementById('sites').value.split(/\s+|\n+|[,]+/);
  if ( sites.indexOf( defaultSite ) == -1 ){
    sites.push( defaultSite );
  }

  browser.storage.sync.set({
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

  browser.storage.sync.get({
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