'use strict';

let spawn = require('child_process').spawn,
    EventEmitter = require('events').EventEmitter,
    onError = () => {},
    emitter = new EventEmitter().on('error', onError);

let args = ['-u', '-v'],
    options = {cwd: __dirname},
    cmd;

cmd = spawn('python', args, options);
cmd.stdin.setEncoding('utf-8');

cmd.stdout.on('data', input => {
    input = input.toString().trim();
    console.log(input);

    emitter.emit('process', input);
});

cmd.on('close', function() {
    console.log('CLOSED APP');
});


console.log('EOF');