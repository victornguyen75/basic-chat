const APP = require('express')();
const HTTP = require('http').createServer(APP);
const IO = require('socket.io')(HTTP);
const PORT = process.env.PORT || 3000;

APP.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

IO.on('connection', socket => {
  IO.emit('user connected', socket.id.substr(0,3));

  socket.on('chat message', msg => {
    if (msg === "") return;
    IO.emit('chat message', socket.id.substr(0,3), msg);
  });

  socket.on('disconnect', () => {
    IO.emit('user disconnected', socket.id.substr(0,3));
  });
});

HTTP.listen(3000, () => {
  console.log(`Listening on *: ${PORT}`);
});