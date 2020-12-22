'use strict';

const events = require('./events'); //access global event pool
let timeStamp = new Date();

require('./parts/driver');
require('./parts/vendor');
//communicate with driver and vendor from CAPS system

events.on('pickup-ready', (order) => {
  events.emit('pickup', order);
  console.log({ EVENT: { event: 'package ready for pickup', timeStamp, order } });
});

events.on('in-transit', (order) => {
  events.emit('delivering', order);
  console.log({ EVENT: { event: 'package in transit', timeStamp, order } });
})

events.on('delivered', (order) => {
  events.emit('just delivered', order);
  console.log({ EVENT: { event: 'package delivered', timeStamp, order } });
  console.log(`Thank you ${order.customerName}, your order ${order.orderID} has been delivered`);
})