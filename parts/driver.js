'use strict';

let pickup = require('./vendor');
let events = require('../events');


function inTransit(order) {
  return order;
};
function delivered(order) {
  // console.log('hitting delivered', order.deliver);
  return order;
};

events.on('pickup', (pickup) => {
  console.log(pickup);
  setTimeout(() => {
    console.log(`DRIVER: Picked up ${pickup.orderID}`)
    events.emit('in-transit', inTransit(pickup));
  }, 1000);
});

events.on('pickup', (pickup) => {
  setTimeout(() => {
    console.log(`DRIVER: Driver delivered ${pickup.orderID}`)
    events.emit('delivered', delivered(pickup));
  }, 3000);
})
module.exports = { inTransit, delivered }, events.on;