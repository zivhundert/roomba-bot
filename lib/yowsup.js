'use strict';

let config = require('../config');

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