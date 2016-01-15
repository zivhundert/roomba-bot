'use strict';

let config = require('../config');
const Pageres = require('pageres');

class URLtoImage {
    constructor(message) {
        this.action = 'IMAGE';
        this.type = 'all';
        this.url = message[0];
    }

    execute(callback) {
        let tmp = config.tmp.dir,
            url = this.url;

        console.log('Downloading url... ' + url);

        let pageres = new Pageres({delay: 2})
        	.src(url, ['750x1334'])

        	.dest(tmp)
        	.run()
        	.then((stream) => {
        	    let fileName = stream[0].filename;
        	    console.log('Downloading complete... ' + url + ' Sending back '+ fileName);

        	    callback(tmp +'/'+ fileName, url);
        	});
    }
}

module.exports = URLtoImage;