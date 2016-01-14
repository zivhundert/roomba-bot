'use strict';

class RepeatText {
    constructor(message) {
        this.message = message;
        this.run();
    }

    run() {
        if (null === this.message.to) return;

        yowsup.doSay(this.message.to, this.message.text);
    }
}

module.exports = RepeatText;