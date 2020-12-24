'use strict';
require('dotenv').config();
const IO = require('socket.io-client');
const CAPS = IO.connect(`${process.env.HOST}/caps`);

CAPS.on('pickup-ready', timer);

function timer(order) {
  setTimeout(() => {
    CAPS.emit('in-transit', order);
  }, 1000);
  setTimeout(() => {
    CAPS.emit('delivered', order);
  }, 3000);
};
module.exports = timer;