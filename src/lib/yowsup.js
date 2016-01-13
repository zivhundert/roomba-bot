'use strict';

let spawn = require('child_process').spawn,
    EventEmitter = require('events').EventEmitter,
    onError = () => {},
    emitter = new EventEmitter().on('error', onError);


class yowsup  {
    /**
     * 
     */
    constructor(phoneNumber, password) {
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
    
    
    /**
     * 
     */
    getCMDWithArgs() {
        return [
            '-u',
            'yowsup-cli',
            'demos',
            '-d',
            '-y',
            this.phoneNumber +':'+ this.password
        ];
    }
    
    
    login(callback) {
        let args = this.getCMDWithArgs(),
            options = {cwd: __dirname},
            cmd;
        
        cmd = spawn('python', args, options);
        cmd.stdin.setEncoding('utf-8');
        
        cmd.stdout.on('data', input => {
            input = input.toString().trim();
            
            emitter.emit('process', input);
        });

        emitter.on('online', online => {
            emitter.emit('control', online);
            return callback(online);
        });
    }
}


/*
let util = require('util'),
    exec = require('child_process').exec,
    cmd = (function() {
        let id = config.yowsup.id,
            password = config.yowsup.password;
        
        let cmd = 'yowsup-cli demos -l ' + id + ':' + password + ' -s';
        
        return (to, message) => {
            return cmd + to + ' "+ message +"';
        }
    }());

let yowsup = () => {
    return (to, message, done) => {
        exec(cmd(to, message), (err, stdout, stderr) => {
            if (err) {
                console.error(err);
            }
            
            if (stderr) {
                util.puts(stderr);
            }
            
            util.puts(stdout);
            done();
        });
    }
};
*/

module.exports = yowsup;