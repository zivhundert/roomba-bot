'use strict';

class Trigger {
    constructor(pattern, handlerClass) {
        this.pattern = pattern;
        this.handlerClass = handlerClass;
    }


    getPattern() {
        return this.pattern;
    }


    match(message) {
        let matchedText = this.matchPattern(message.text);

        if (null === matchedText) return matchedText; // nothing found.

        new this['handlerClass'](message);
    }


    matchPattern(text) {
        let match = text.match(this.pattern);

        if (null !== match)
            match.shift();

        return match;
    }

}

module.exports = Trigger;