'use strict';

let config = require('./config'),
    Router = require('./router'),
    YowsupAPI = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter,
    yowsup = new YowsupAPI();

class Roomba {
    constructor() {
        console.log('Roomba is Running');
    }


    bootstrap() {
        let route = new Router(yowsup);

        yowsup.initialize(
            config.yowsup.countryCode,
            config.yowsup.phoneNumber,
            config.yowsup.password
        )
        .on('CHAT_RECEIVE', (message) => {
            route.dispatch(message);
        })
        .connect();

        return this;
    }
}

module.exports = new Roomba().bootstrap();