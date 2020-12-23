'use strict';
require('dotenv').config();
//connect to CAPS as client
const IO = require('socket.io-client');
const HOST = process.env.HOST;
const CAPS = IO.connect(`${HOST}/caps`);
const CONN = IO.connect(HOST);

CONN.on('pickup-ready', timer);

function timer() {
  setTimeout(() => {
    CAPS.emit('in-transit', order);
  }, 1000);
  setTimeout(() => {
    CAPS.emit('success', order);
  }, 3000);
};
module.exports = timer;