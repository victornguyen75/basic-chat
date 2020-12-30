const APP = require('express')();
const HTTP = require('http').createServer(APP);
const IO = require('socket.io')(HTTP);
const PORT = process.env.PORT || 3000;

APP.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

IO.on('connection', socket => {
  IO.emit('user connected');

  socket.on('chat message', msg => {
    IO.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    IO.emit('user disconnected');
  });
});

HTTP.listen(3000, () => {
  console.log(`Listening on *: ${PORT}`);
});