function save_options() {
    var name = document.getElementById('name').value;
    var team = document.getElementById('team').value;

    chrome.storage.sync.set({
        name: name,
        team: team
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 5000);
    });
}

function restore_options() {

    chrome.storage.sync.get({
        name: '',
        team: ''
    }, function(items) {
        document.getElementById('name').value = items.name;
        document.getElementById('team').value = items.team;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);