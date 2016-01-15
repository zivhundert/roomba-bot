'use strict';

let Trigger = require('./trigger'),
    URLtoImage = require('./triggers/url_to_image'),
    GoogleImages = require('./triggers/google_images'),
    PingPong = require('./triggers/ping_pong');

class Router {
    constructor(yowsup) {
        this.yowsup = yowsup;

        this.triggers = [];
        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/\/ping/, PingPong), // ping pong, check bot up.
            new Trigger(/\/i (.*)/, GoogleImages), // search images.
            new Trigger(/https?:\/\/(.*)/, URLtoImage) // image downloader
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


            case 'IMAGE':
                triggeredActionInstance.execute((path, url) => {
                    this.yowsup.doImage(to, path, url);
                });

                break;
        }

    }

}

module.exports = Router;