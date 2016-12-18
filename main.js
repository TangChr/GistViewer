var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
                             width: 640,
                             height: 490,
                             frame: false,
                             resizable: true
                            });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipcMain.on('close-main-window', function() {
    app.quit();
});