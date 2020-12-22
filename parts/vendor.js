'use strict';

// require('dotenv');
let events = require('../events');
// let STORE = process.env.STORE;
let store = 'RIKO GREENS'

function pickup() {
  let order = {
    storeName: `${store}`, orderID: '8934752934-8943719875275', customerName: 'Bob Ross', address: "38947 Seattle"
  };
  return order;
}

setTimeout(() => {

  events.emit('pickup-ready', pickup())
}, 5000);

module.exports = pickup;