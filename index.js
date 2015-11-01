// Node.js
var app  = require('express')(); // the express app that handles callbacks for http request
var http = require('http').Server(app); // the http server instance

// Socket IO
var io   = require('socket.io')(http); // socket server instance instance that mounts on node.js http server

// callback for http get request
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// on connection callback
io.on('connection', function(socket){
  // console.log('a user connected');

  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });

  // Call back when receiving a chat message
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // Emit the message to everyone
    io.emit('chat message', msg);
  });
});

// server to listen on port 3000
http.listen(3000, function() {
	console.log('listening on *:3000');
});
