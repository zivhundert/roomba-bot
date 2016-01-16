'use strict';
let net = require('net'),
    roomba = require('./src/roomba');

var server = net.createServer((socket) => {
  socket.end('goodbye\n');
});

// grab a random port.
server.listen(() => {
  let address = server.address();
  console.log('opened server on %j', address);
});