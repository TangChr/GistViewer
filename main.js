'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        height: 490,
        resizable: true,
        width: 640
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});

ipc.on('close-main-window', function () {
    app.quit();
});