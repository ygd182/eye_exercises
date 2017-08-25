var express = require('express');  
var app = express();  
var server = require('http').Server(app);  


app.use(express.static('public'));

server.listen(8080, function() {  
    console.log('Server running on http://localhost:8080');
});
/*

app.get('/messages', function(req, res) {
  res.status(200).send(messages);
});

app.get('/users', function(req, res) {
  res.status(200).send(users);
});*/
