'use strict';

require('dotenv').config();
const uuid = require('uuid').v4;
const IO = require('socket.io')(process.env.PORT);
const CAPS = IO.of('/caps');
let timeStamp = new Date();

const queue = {
  message: {}
}

//CAPS NAMESPACES
CAPS.on('connection', (socket) => {
  //FLOWER ROOM
  socket.on('joinFlowers', room => {
    console.log(`${room} JOINED`);
    socket.join(room);
  })
  //WIDGET ROOM
  socket.on('joinWidgets', room => {
    console.log(`${room} JOINED`);
    socket.join(room);
  })

  socket.on('pickup', (order) => {
    //QUE MESSAGE FROM RETAILER THAT PACKAGE IS READY
    const messageID = uuid();
    queue.message[messageID] = `PICKUP CONFIRMATION:${order.storeName}`;

    console.log('PICKUP', queue);
    //NOTIFY DRIVER FOR PICKUP
    CAPS.emit('pickup-ready', order);
    //NOTIFY RETAILER PICKUP CONFIRMED
    CAPS.to(order.storeName).emit('pickup-confirmed', { MESSAGE: { EVENT: 'DRIVER CONFIRMED PICKUP', timeStamp, order, messageID } });
  })
  socket.on('in-transit', (order) => {
    const messageID = uuid();
    queue.message[messageID] = messageID, order;
    CAPS.to(order.storeName).emit('otw', { MESSAGE: { EVENT: 'OUT FOR DELIVERY', timeStamp, order, messageID } });
  })
  socket.on('delivered', (order) => {
    const messageID = uuid();
    queue.message[messageID] = messageID, order;
    CAPS.to(order.storeName).emit('successful-delivery', { MESSAGE: { EVENT: 'PACKAGE DELIVERED', timeStamp, order, messageID } });
  })

  socket.on('received', message => {
    console.log('REMOVE FROM QUEUE:', message);
    delete queue.message[message];
    // console.log('REMOVED', queue);

  })
})