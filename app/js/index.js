'use strict';

const ipc = require('ipc');
const jhub = require('jhub');

var load = document.querySelector('#load');
var settings = document.querySelector('#settings');
var close = document.querySelector('#close');
var list = document.querySelector('#gist-list');

load.addEventListener('click', function () {
		jhub.init('TangChr');
    jhub.userGists(function(gists) {
			var gList = '';
			for (var g in gists) {
				gList += '<li><a class="gist-link" id="'+gists[g].id+'">'+gists[g].description+'</a></li>';
			}
			list.innerHTML = gList;
			var gistLinks = document.querySelectorAll('.gist-link');
			for(var l = 0; l < gistLinks.length; l++) {
				var link = gistLinks[l];
				var id = link.attributes['id'].value;
				prepareGistLink(link, id);
			}
		});
});

function prepareGistLink(gistLink, gistId) {
	gistLink.addEventListener('click', function() {
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
	});
}

settings.addEventListener('click', function() {
	ipc.send('open-settings-window');
});

close.addEventListener('click', function () {
    ipc.send('close-main-window');
});