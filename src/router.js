'use strict';

let Trigger = require('./trigger'),
    RepeatText = require('./triggers/repeat_text');

class Router {
    constructor(yowsup) {
        this.yowsup = yowsup;

        this.triggers = [];
        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/(.*)/, RepeatText) // repeat all words
        );

        return this;
    }


    dispatch(message) {
        this.triggers.forEach(trigger => {
            var res = trigger.match(message);
        });

        console.log(message);
    }
}

module.exports = Router;