'use strict';
require('dotenv').config();
//connect to CAPS as client
const IO = require('socket.io-client');
const HOST = process.env.HOST;
const CAPS = IO.connect(`${HOST}/caps`);
const CONN = IO.connect(HOST);

let store = 'RIKO GREENS'
let order = {
  storeID: '12345', storeName: `${store}`, orderID: '8934752934-8943719875275', customerName: 'Bob Ross', address: "38947 Seattle"
}

CAPS.emit('join', process.env.storeID);

setInterval(() => {
  CAPS.emit('pickup', order);
}, 5000)

CONN.on('otw', onTheWay)
function onTheWay(order) {
  console.log(`DRIVER: Picked up ${order.orderID}`)
}

CAPS.on('thank-you', deliveredPackage)
function deliveredPackage(order) {
  console.log(`Thank you ${order.customerName}, your order ${order.orderID} has been delivered`);
}

module.exports = { onTheWay, deliveredPackage };
