'use strict';

let Trigger = require('./trigger'),
    Help = require('./triggers/help'),
    PostIL = require('./triggers/postil'),
    URLtoImage = require('./triggers/url_to_image'),
    GoogleImages = require('./triggers/google_images'),
    PingPong = require('./triggers/ping_pong'),
    Ebay = require('./triggers/ebay');
    

class Router {
    constructor(yowsup) {
        this.yowsup = yowsup;

        this.triggers = [];
        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/@help/i, Help), // Help
            new Trigger(/@ping/i, PingPong), // ping pong, check bot up.
            new Trigger(/@i (.*)/i, GoogleImages), // search images.
            new Trigger(/.*([A-Za-z]{2})([0-9]{9})([A-Za-z]{2}).*/i, PostIL), // PostIL checker
            new Trigger(/(https?:\/\/[^\s]+)/gi, URLtoImage), // image downloader
            new Trigger(/@w (.*)/i, Weather) //show current weather
        );

        return this;
    }


    dispatch(message) {
        let matchText;

        console.log(['MSG IN ', message]);

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
                    this.yowsup.say(to, text);
                });

                break;


            case 'IMAGE':
                triggeredActionInstance.execute((path, url) => {
                    this.yowsup.image(to, path, url);
                });

                break;
        }

    }

}

module.exports = Router;
