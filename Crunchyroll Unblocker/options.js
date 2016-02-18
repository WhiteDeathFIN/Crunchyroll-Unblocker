/**
 * Created by Santeri Hetekivi on 2/18/16.
 * https://github.com/WhiteDeathFIN
 */

// Default page for first time
var DEFAULT_PAGE = "videos/anime";
//Status strings
var STATUS_SAVED = "Options saved.";
var STATUS_SAVING = "Saving options...";
//Status string colors
var COLOR_GREEN = "green";
var COLOR_RED   = "red";


// Saving options to browser's storage
function save_options() {
    var status = document.getElementById('status');
    var startPage = document.getElementById("startPage").value;
    status.textContent = STATUS_SAVING;
    status.style.color = COLOR_RED;
    chrome.storage.sync.set({
        startPage: DEFAULT_PAGE
    }, function() {
        // Update status to let user know options were saved.
        status.textContent = STATUS_SAVED;
        status.style.color = COLOR_GREEN;
    });
}

// Restoring options from browser's storage
function restore_options() {
    chrome.storage.sync.get({
        startPage: DEFAULT_PAGE
    }, function(items) {
        document.getElementById('startPage').value = items.startPage;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
//When user has pressed something when startPage input field is selected save it
document.getElementById("startPage").addEventListener("keyup", save_options);