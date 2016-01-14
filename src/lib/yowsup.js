'use strict';

let cmd,
    spawn = require('child_process').spawn,
    EventEmitter = require('events').EventEmitter,
    onError = () => {},
    emitter = new EventEmitter().on('error', onError),

    EVENT = {
        ON_YOWSUP_RECEIVE: Symbol(),
        STATE_CHANGE: Symbol(),
        CHAT_MESSAGE: Symbol(),
        PAYLOAD: Symbol()
    },
    RESPONSE = {
        OFFLINE: '[offline]:',
        AUTH_OK: 'Auth: Logged in!',
        AUTH_ERROR: 'Auth Error, reason not-authorized'
    },
    STATE = {
        ONLINE: Symbol(),
        OFFLINE: Symbol(),
        AUTH_ERROR: Symbol()
    };

class Yowsup  {
    /**
     *
     */
    constructor(countryCode, phoneNumber, password) {
        this.prefix = '/';
        this.countryCode = countryCode;
        this.phoneNumber = phoneNumber;
        this.password = password;

        this.subscribe();
        this.runYowsup();
    }


    /**
     *
     */
    getCMDWithArgs() {
        return [
            '-u',
            '/usr/local/bin/yowsup-cli',
            'demos',
            '-d',
            '-y',
            '-l',
            this.getCredentials()
        ];
    }


    /**
     *
     */
    getCredentials() {
        return [
            this.countryCode,
            this.phoneNumber,
            ':',
            this.password
        ].join('');
    }


    getPrefix() {
        return this.prefix;
    }


    send(arg) {
        cmd.stdin.write([
            this.getPrefix(),
            arg,
            '\n'
        ].join(''));
    }


    /**
     *
     */
    payloadMatch(payload) {
        let patterns = {
                message: /^\[(\d+)@.*\((.*)\).*\]:\[(.*)\]\t (.*)/,             // [0000000000000@s.whatsapp.net(01-01-2016 01:01)]:[ABCDEF1234567890000]    Hi
                group: /^\[(\d+)\/(\d+)-(\d+)@.*\((.*)\).*\]:\[(.*)\]\t (.*)/   // [0000000000000/0000000000000-1234567890@g.us(01-01-2016 01:01)]:[ABCDEF1234567890000]     Hi
            },
            matchedPayload = null;

        Object.keys(patterns).forEach((idx) => {
            let match = payload.match(patterns[idx]);

            if (null !== match) {
                match.shift(); // removes the first field, the whole match
                matchedPayload = match;
            }
        });

        return matchedPayload;
    }


    payloadNormalizer(payload) {
        payload = this.payloadMatch(payload);

        let message = {
                type: 'message',
                id: null,
                from: null,
                to: null,
                date: null,
                text: null
            };

        if (null === payload) return;

        message.text = payload.pop();
        message.id = payload.pop();
        message.date = payload.pop();
        message.from = payload.shift();

        // date fix
        message.date = this.getDateObject(message.date);

        if (0 < payload.length) {
            message.type = 'group';
            message.to = payload.shift() +'-'+ payload.shift();
        }

        return message;
    }


    /**
     * Converts date string into proper Date object.
     *
     * @return {Date}
     */
    getDateObject(stringDate) {
        let pattern = /^([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)$/; // 01-01-2016 01:01
        let date = stringDate.match(pattern);
        date.shift(); // removes first match

        let year = date[2],
            month = parseInt(date[1])-1,
            day = date[0],
            hour = date[3],
            minute = date[4],
            seconds = 0,
            miliseconds = 0;

        return new Date(year, month, day, hour, minute, seconds, miliseconds);
    }


    isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }


    /**
     *
     */
    runYowsup() {
        let args = this.getCMDWithArgs(),
            options = {cwd: __dirname};

        cmd = spawn('python', args, options);
        cmd.stdin.setEncoding('utf-8');

        cmd.stdout.on('data', message => {
            emitter.emit(EVENT.ON_YOWSUP_RECEIVE, message.toString().trim());
        });

        cmd.on('close', () => {
            this.onClose();
        });
    }


    onClose() {
        console.log('CLOSED APP');
    }


    onReceive(payload) {
        // if it's disconnected
        if (RESPONSE.OFFLINE === payload) {
            this.send('L'); // sends login command
        }

        // after login 1 time!
        if (RESPONSE.AUTH_OK === payload) {
            emitter.emit(EVENT.STATE_CHANGE, STATE.ONLINE);
        }

        // Login failed
        if (RESPONSE.AUTH_ERROR === payload) {
            emitter.emit(EVENT.STATE_CHANGE, STATE.AUTH_ERROR);
        }

        let chatMsg = this.payloadNormalizer(payload);
        if (chatMsg) {
            emitter.emit(EVENT.CHAT_MESSAGE, chatMsg);
        } else {
            emitter.emit(EVENT.PAYLOAD, payload);
        }
    }

    subscribe() {
        emitter.on(EVENT.ON_YOWSUP_RECEIVE, payload => {
            this.onReceive(payload);
        });

        emitter.on(EVENT.STATE_CHANGE, state => {
            console.log(state);
        });
    }

}

module.exports = Yowsup;