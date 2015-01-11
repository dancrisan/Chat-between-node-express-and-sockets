var app = require('express')(); //a function handler that you can supply to an HTTP server
var http = require('http').Server(app); //http server that enapsulates our app
var io = require('socket.io')(http); //we init an instance of socket.io
//the socket server is mounted on the http server


// app.get('/', function(req, res){ //route handler that gets called when we hit our website home
//   res.send('<h1>MERRY MERRY</h1>');
// });

//we won't put our entire app there...
//we'll serve an html page! 

app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'HTML'});
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){
  console.log("user connected")
  socket.on('chat message', function(msg){
    io.emit('chat message', msg); //emit the message to everyone, including the sender
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});