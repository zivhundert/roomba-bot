'use strict';

let config = require('./config'),
    yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;
    
    
let api = new yowsup(
    config.yowsup.countryCode,
    config.yowsup.phoneNumber,
    config.yowsup.password
);

api.login(function() {
    console.log('IN');
});

console.log('EOF');