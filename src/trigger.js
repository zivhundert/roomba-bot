'use strict';

class Trigger {
    constructor(pattern, handlerClass) {
        this.pattern = pattern;
        this.handlerClass = handlerClass;
    }


    getPattern() {
        return this.pattern;
    }


    getInstance(matchedText) {
        return new this['handlerClass'](matchedText);
    }


    match(message) {
        return this.matchPattern(message.text);
    }


    matchPattern(text) {
        let match = text.match(this.pattern);

        if (null !== match)
            match.shift();

        return match;
    }

}

module.exports = Trigger;