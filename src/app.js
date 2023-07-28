const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT ?? 3000;

app.use(express.static('public'));

let userCount = 0;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}public/index.html`);
});

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  userCount += 1;
  io.emit('user.count.change', userCount);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userCount -= 1;
    io.emit('user.count.change', userCount);
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`); // eslint-disable-line
});
