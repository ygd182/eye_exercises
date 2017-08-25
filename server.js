var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var port = process.env.PORT || 8080; 

app.use(express.static('public'));

server.listen(port, function() {  
    console.log('Server running on http://localhost:' + port);
});
/*

app.get('/messages', function(req, res) {
  res.status(200).send(messages);
});

app.get('/users', function(req, res) {
  res.status(200).send(users);
});*/
