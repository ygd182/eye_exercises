
//var config = require('config');
var db = require('mongoose');
var app = require('./app');


// Mongo connection setup

function onSucess() {
  // we're connected!
  console.log('connected to database'); 
  startServer();
}

function onError(error) {
  console.log('connection error:', error); 
}

db.connect(app.get('dbUrl')).then(onSucess, onError);

function startServer() {
  // Start Express
  var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
  });

}
