'use strict';

let config = require('./config'),
    Yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;


config.yowsup.countryCode=972;
config.yowsup.phoneNumber=542094491;
config.yowsup.password='CBr28znggUHqbaSpLk/XvJV9dAE=';

let api = new Yowsup(
    config.yowsup.countryCode,
    config.yowsup.phoneNumber,
    config.yowsup.password
);

console.log('EOF');