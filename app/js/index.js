var electron    = require('electron');
var ipcRenderer = electron.ipcRenderer;
var jhub        = require('jhub');

var load 	 = document.querySelector('#load');
var close 	 = document.querySelector('#close');
var gistList = document.querySelector('#gist-list');

function openGist(gistId) {
    var gist = jhub.gist(gistId);
    gist.get(function(info) {
        var files = 'Files: ';
        var langs = 'Languages: ';
        for(var f = 0; f < info.files.length; f++) {
            files += info.files[f].name+', ';
            langs += info.files[f].language+', ';
        }
        alert(info.description + '\n' + files.substr(0, files.length-2) + '\n' + langs.substr(0, langs.length-2));
    });
}

function prepareGistLink(gistLink, gistId) {
    gistLink.addEventListener('click', function() {
openGist(gistId);
});
}

load.addEventListener('click', function () {
    jhub.init('TangChr');
    jhub.gists(function(gists) {
        var gistItems = '';
        for (var g in gists) {
            gistItems += '<li><a class="gist-link" id="'+gists[g].id+'">'+gists[g].description+'</a></li>';
        }
        gistList.innerHTML = gistItems;
        var gistLinks = document.querySelectorAll('.gist-link');
        for(var l = 0; l < gistLinks.length; l++) {
            var link = gistLinks[l];
            var id = link.attributes.id;
            prepareGistLink(link, id);
        }
    });
});

close.addEventListener('click', function () {
    ipcRenderer.sendSync('close-main-window');
});