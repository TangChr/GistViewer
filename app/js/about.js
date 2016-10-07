'use strict';

const ipc = require('ipc');
const shell = require('shell');

var close = document.querySelector('#close');
var tangchr = document.querySelector('#TangChr-link');

close.addEventListener('click', function () {
    ipc.send('close-about-window');
});

tangchr.addEventListener('click', function(event) {
    shell.openExternal('https://github.com/TangChr');
});