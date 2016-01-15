'use strict';

class RepeatText {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.message = message[1];
    }

    execute(callback) {
        return callback(this.message);
    }
}

module.exports = RepeatText;