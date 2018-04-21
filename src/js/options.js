var defaultSite = '.*?.decipherinc.com';

var browser = browser || chrome;

function save_options() {
  var sites = document.getElementById('sites').value.split(/\s+|\n+|[,]+/);
  var special = document.getElementById('special').checked;
  var showModal = document.getElementById('show-modal').checked;

  if ( sites.indexOf( defaultSite ) == -1 ){
    sites.push( defaultSite );
  }

  browser.storage.sync.set({
    sites: sites,
    special: special,
    showModal: showModal,
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
    sites: [ defaultSite ],
    special: true,
    showModal: false
  }, 
  function(items) {

    if ( items.sites.indexOf( defaultSite ) == -1 ){
      items.sites.push( defaultSite );
    }

    document.getElementById('sites').value = items.sites.join('\n');
    document.getElementById('special').checked = items.special;
    document.getElementById('show-modal').checked = items.showModal;
  });
}



document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);