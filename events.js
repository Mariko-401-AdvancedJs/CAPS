'use strict';

const Events = require('events'); //events is a built in tool, no need to install
const events = new Events();//a new instance of an event

module.exports = events;//so other code can require and trigger a new event
