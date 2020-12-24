'use strict';
require('dotenv').config();
const IO = require('socket.io-client');
const CAPS = IO.connect(`${process.env.HOST}/caps`);

let store = '206 FLOWERS'
let order = {
  storeName: `${store}`, orderID: '2934-8943719875275', customerName: 'Bob Ross', address: "38947 Seattle"
}

CAPS.emit('joinFlowers', store);

setInterval(() => {
  CAPS.emit('pickup', order);
}, 5000)

CAPS.on('pickup-confirmed', confirmPickup)
function confirmPickup(message) {
  console.log(message);
  received(message);
}
CAPS.on('otw', outForDelivery)
function outForDelivery(message) {
  console.log(message);
  received(message);
}
CAPS.on('successful-delivery', deliveredPackage)
function deliveredPackage(message) {
  console.log(`ORDER:${message.MESSAGE.order.orderID} HAS BEEN DELIVERED TO CUSTOMER`);
  received(message);
}


function received(message) {
  console.log('206 FLOWERS RECEIVED MESSAGE:', message.MESSAGE.messageID);
  CAPS.emit('received', message.MESSAGE.messageID);
}

module.exports = { confirmPickup, outForDelivery, deliveredPackage, received };
