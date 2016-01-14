'use strict';

let config = require('./config'),
    Yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;

let api = new Yowsup(
    config.yowsup.countryCode,
    config.yowsup.phoneNumber,
    config.yowsup.password
);

console.log('EOF');