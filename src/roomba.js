'use strict';

let config = require('./config'),
    Router = require('./router'),
    YowsupAPI = require('./lib/yowsup');


class Roomba {
    constructor() {
        console.log('Roomba is Running');
        this.yowsup = new YowsupAPI();
    }


    bootstrap() {
        let route = new Router(this.yowsup);

        this.yowsup.initialize(
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