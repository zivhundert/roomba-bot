'use strict';

let config = require('./config'),
    yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;
    
    
let api = new yowsup(config.yowsup.id, config.yowsup.password);
