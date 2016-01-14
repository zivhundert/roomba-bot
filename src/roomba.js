'use strict';

let config = require('./config'),
    Yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;


config.yowsup.countryCode=0;
config.yowsup.phoneNumber=0;
config.yowsup.password='0';

let api = new Yowsup(
    config.yowsup.countryCode,
    config.yowsup.phoneNumber,
    config.yowsup.password
);

console.log('EOF');