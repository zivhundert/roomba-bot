'use strict';

const Logger = require('winston');
Logger.level = 'debug';

Logger.add(Logger.transports.File, {
    filename: 'roomba.log'
});

//Logger.remove(Logger.transports.Console);

module.exports = Logger;