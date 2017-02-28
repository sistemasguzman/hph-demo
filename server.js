// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express

var port = process.env.PORT || 1812; 				// set the port

app.use('/app', express.static(__dirname + '/app'));		// set the static files location /public/img will be /img for users

// routes ======================================================================
require('./app/routes.js')(app, __dirname);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);