/*var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var port = process.env.PORT || 8080; 

app.use(express.static('public'));

server.listen(port, function() {  
    console.log('Server running on http://localhost:' + port);
});*/



//var config = require('config');
var db = require('mongoose');
var app = require('./app');


// Mongo connection setup
//db.connect(config);
db.connect(app.get('dbUrl'));

var dbConnection = db.connection; 
dbConnection.on( 'error' , console.error.bind(console, 'connection error:' )); 
dbConnection.once( 'open' , function () { 
  // we're connected!
  console.log('connected to database'); 
  startServer();
});

function startServer() {
  // Start Express
  var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
  });

}
