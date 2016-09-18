'use strict';

const app           = require('app');
const BrowserWindow = require('browser-window');
const ipc           = require('ipc');

var mainWindow     = null;
var aboutWindow = null;

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

ipc.on('open-about-window', function () {
    if (aboutWindow) {
        return;
    }

    aboutWindow = new BrowserWindow({
        frame: false,
        height: 300,
        resizable: false,
        width: 400
    });

    aboutWindow.loadUrl('file://' + __dirname + '/app/about.html');

    aboutWindow.on('closed', function () {
        aboutWindow = null;
    });
});

ipc.on('close-about-window', function () {
    if (aboutWindow) {
        aboutWindow.close();
    }
});