
function save_options() {
  var sites = document.getElementById('sites').value.split(/\s+|\n+|[,]+/);

  chrome.storage.sync.set({
    sites: sites,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });

}


function restore_options(){
  chrome.storage.sync.get({
    sites: ['decipherinc.com', 'focusvision.com']
  }, function(items) {
    document.getElementById('sites').value = items.sites.join('\n');
  });
}



document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);