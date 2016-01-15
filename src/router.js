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
        let matchText;

        this.triggers.forEach(trigger => {
            matchText = trigger.match(message);

            if (null !== matchText)
                this.run(trigger, message, matchText);
        });
    }



    run(trigger, message, matchText) {
        let to = (null === message.to) ? message.from : message.to,
            instance = trigger.getInstance(matchText);
console.log(instance);
        switch(instance.action) {
            case 'SAY':
                this.yowsup.doSay(to, matchText.join(' '));

                break;
        }

    }

}

module.exports = Router;