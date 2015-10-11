'use strict';

var _ = require('lodash');
var app = require('app');
var path = require('path');
var ipc = require('ipc');
var spawn = require('child_process').spawn;
var child;
var BrowserWindow = require('browser-window');
var express = require('express');
var expressApp = express();

expressApp.use('/dist', express.static(__dirname + '/dist'));
expressApp.use('/', express.static(__dirname + '/views'));

expressApp.use(express.static(__dirname));

var server = expressApp.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Cloudbrain listening at http://%s:%s', host, port);
});


// ####################################################
// ####################################################

// Report crashes to our server.
require('crash-reporter').start();

// Developer Tools / Inspector
require('electron-debug')();

var mainWindow = null;
var options = {
	"debug": true,
	"version": "1.0.0",
	"views_dir": "views",
	"root_view": "index.html"
};

options = _.extend({
	// ADDITIONAL CUSTOM SETTINGS
}, options);

// ############################################################################################
// ############################################################################################

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if(process.platform !== 'darwin') { app.quit(); }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 450, frame: false});
	// mainWindow.loadUrl(path.join('file://', __dirname, options.views_dir, options.root_view));
  mainWindow.loadUrl('http://localhost:3000');
  if(options.debug) { mainWindow.openDevTools(); }
  mainWindow.on('closed', function() { mainWindow = null; });

	ipc.on('publish-device', function (event, device) {
	  var cmd = 'cloudbrain';
		var args = 'publish --mock -n ' + device.type + ' -i ' + device.id;
		console.log('Starting child process:', cmd + ' ' + args);
	  child = spawn(cmd, args.split(' '), {stdio: 'pipe'});
		console.log('PID: ', child.pid);
		child.stdout.on('close', function(){
			console.log('Child process closed. PID: ', child.pid);
		});
	});
});

// ############################################################################################
// ############################################################################################
