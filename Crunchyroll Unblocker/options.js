/**
 * Created by Santeri Hetekivi on 2/18/16.
 */

//Saving options to browser's storage
function save_options() {
    var startPage = document.getElementById("startPage").value;
    chrome.storage.sync.set({
        startPage: startPage
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restoring options from browser's storage
function restore_options() {
    chrome.storage.sync.get({
        startPage: "home/queue"
    }, function(items) {
        document.getElementById('startPage').value = items.startPage;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);