'use strict';

let config = require('./config'),
    Yowsup = require('./lib/yowsup'),
    EventEmitter = require('events').EventEmitter;


class RepeatText {
    constructor() {

    }
}

class Trigger() {
    constructor(pattern, handlerClass) {
        this.parent = pattern;
        this.handlerClass = handlerClass;
    }


    getPattern() {
        return this.pattern;
    }
}

class Router {
    costructor() {
        this.triggers = [];

        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/(.*)/, RepeatText) // repeat all words
        );

        return this;
    }


    match(pattern, text) {
        return text.match(pattern);
    }


    dispatch(message) {
        this.triggers.forEach(trigger => {

        });
        console.log(message);
    }
}

let api = new Yowsup(
        config.yowsup.countryCode,
        config.yowsup.phoneNumber,
        config.yowsup.password
    )
    .on('CHAT_RECEIVE', (message) => {
        console.log(message);
    })
    .connect();


console.log('EOF');