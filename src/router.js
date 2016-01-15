'use strict';

let Trigger = require('./trigger'),
    PingPong = require('./triggers/ping_pong');

class Router {
    constructor(yowsup) {
        this.yowsup = yowsup;

        this.triggers = [];
        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/\/ping/, PingPong) // repeat all words
        );

        return this;
    }


    dispatch(message) {
        let matchText;

        this.triggers.forEach(trigger => {
            matchText = trigger.match(message);

            if (null !== matchText)
                this.run(trigger, message, matchText);
        });
    }



    run(trigger, message, matchText) {
        let to = (null === message.to) ? message.from : message.to,
            triggeredActionInstance = trigger.getInstance(matchText);

        switch(triggeredActionInstance.action) {
            case 'SAY':
                triggeredActionInstance.execute(text => {
                    this.yowsup.doSay(to, text);
                });

                break;
        }

    }

}

module.exports = Router;