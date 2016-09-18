'use strict';

const ipc = require('ipc');
const jhub = require('jhub');
const shell = require('shell');

var close = document.querySelector('#close');
var jhubVersion = document.querySelector('#jhub-version');
var tangchr = document.querySelector('#TangChr-link');

close.addEventListener('click', function () {
    ipc.send('close-about-window');
});

tangchr.addEventListener('click', function(event) {
    shell.openExternal('https://github.com/TangChr');
});

jhubVersion.innerHTML = jhub.VERSION;