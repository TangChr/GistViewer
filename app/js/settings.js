'use strict';

const ipc = require('ipc');

var close = document.querySelector('#close');

close.addEventListener('click', function () {
    ipc.send('close-settings-window');
});