'use strict';

let config = require('./config'),
    Logger = require('./utils/logger'),
    Router = require('./router'),
    YowJS = require('yowjs');


class Roomba {
    constructor() {
        console.log('Roomba is Running');
        this.yowsup = new YowJS(Logger);
    }


    bootstrap() {
        let route = new Router(this.yowsup);

        this.yowsup.initialize(
            config.yowsup.countryCode,
            config.yowsup.phoneNumber,
            config.yowsup.password
        )
        .on('ON_MESSAGE', (message) => {
            route.dispatch(message);
        }).on('LINK_DEAD', () => {
            console.log('LINK_DEAD');
        })
        .connect();

        return this;
    }
}

module.exports = new Roomba().bootstrap();