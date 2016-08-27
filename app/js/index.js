'use strict';

var ipc = require('ipc');
var jhub = require('jhub');

var btnLoad = document.querySelector('#btn_load');
var btnClose = document.querySelector('#btn_close');
var gistList = document.querySelector('#gist_list');

btnLoad.addEventListener('click', function () {
		jhub.init('TangChr');
    jhub.userGists(function(gists) {
			var gList = '';
			for (var g in gists) {
				gList += '<li><a class="gist-link" id="'+gists[g].id+'">'+gists[g].description+'</a></li>';
			}
			gistList.innerHTML = gList;
			var gistLinks = document.querySelectorAll('.gist-link');
			for(var l = 0; l < gistLinks.length; l++) {
				var link = gistLinks[l];
				var id = link.attributes['id'].value;
				prepareGistLink(link, id);
			}
		});
});

btnClose.addEventListener('click', function () {
    ipc.send('close-main-window');
});

function prepareGistLink(gistLink, gistId) {
	gistLink.addEventListener('click', function() {
		var gist = jhub.gist(gistId);
		gist.get(function(info) {
			var files = '';
			for(var f = 0; f < info.files.length; f++) {
				files += info.files[f].name+', ';
			}
			alert(info.description + '\n' + files.substr(0, files.length-2));
		});
	});
}