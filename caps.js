'use strict';

// const events = require('./events'); //access global event pool
require('dotenv').config();

const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const IO = require('socket.io')(PORT);

let timeStamp = new Date();

//GUTS
const CAPS = IO.of('/caps');
// const VENDORONLY = IO.of('./vendor');

console.log('CAPS WORKING');

//communicate with driver and vendor from CAPS system

//PICKUP CAN GO TO ALL SOCKET CLIENTS
IO.on('connection', (socket) => {

})

CAPS.on('connection', (socket) => {
  console.log('CONNECTED TO VENDOR AND DRIVER');

  socket.on('join', room => {
    console.log(`joining ${room}`);
    socket.join(room);
  })

  socket.on('pickup', (order) => {
    console.log({ EVENT: { event: 'package ready for pickup', timeStamp, order } });
    IO.emit('pickup-ready', order);
  })
  // only the right vendor should hear
  socket.on('in-transit', (order) => {
    CAPS.to(order.storeID).emit('otw', order);
    console.log({ EVENT: { event: 'package in transit', timeStamp, order } });
  })
  // only the right vendor should hear
  socket.on('success', (order) => {
    CAPS.to(order.storeID).emit('thank-you', order);
    console.log({ EVENT: { event: 'package delivered', timeStamp, order } });
  })
})