'use strict';

let spawn = require('child_process').spawn,
    EventEmitter = require('events').EventEmitter,
    onError = () => {},
    emitter = new EventEmitter().on('error', onError);

let MSJ_IN = /^\[(\d+)@.*(\(.*\)).*\](.*)/;


class yowsup  {
    /**
     * 
     */
    constructor(countryCode, phoneNumber, password) {
        this.countryCode = countryCode;
        this.phoneNumber = phoneNumber;
        this.password = password;
        
        this.subscribe();
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
            this.countryCode +':'+ this.password
        ];
    }
    
    
    /**
     * 
     */
    login(callback) {
        let args = this.getCMDWithArgs(),
            options = {cwd: __dirname},
            cmd;
        
        cmd = spawn('python', args, options);
        cmd.stdin.setEncoding('utf-8');
        
        cmd.stdout.on('data', input => {
            input = input.toString().trim();
            console.log(input);
            
            emitter.emit('process', input);
        });
        
        emitter.on('online', online => {
            console.log(online);
            emitter.emit('control', online);
            
            return callback(online);
        });
    }
    
    
    subscribe() {
        console.log('subscribed');
        
        emitter.on('process', function(inMsj) {
            console.log(inMsj);
            
            // if it's disconnected
            if ('[offline]:' === inMsj) {
                emitter.emit('control', 'offline... try to connect...')
                cmd.stdin.write('/L\n'); // Send login signal
            }
            
            // after login 1 time!
            if ('Auth: Logged in!' === inMsj){
                emitter.emit('online', inMsj);
            }
            
            // Login failed
            if ('Auth Error, reason not-authorized' === inMsj){
                emitter.emit('online', inMsj);
            }
            
            // Message in
            let msj = inMsj.match(MSJ_IN);
            
            if (msj) {
              let fecha = msj[2].replace(' ', '-')
                  .replace('(', '')
                  .replace(')', '')
                  .replace(':', '-')
                  .split('-');
              
              emitter.emit('inbox',{
                  date: new Date(fecha[2], parseInt(fecha[1])-1, fecha[0], fecha[3], fecha[4]),
                  data: msj[3].replace('\t',''),
                  from: msj[1],
                  type: 'txt'
              });
            }
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