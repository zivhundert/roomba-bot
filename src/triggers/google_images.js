'use strict';

let config = require('../config');
const googleImagesSearch = require('google-images');

let fs = require('fs'),
    wget = require('wget-improved'),
    url = require('url'),
    path = require('path');

class GoogleImages {
    constructor(message) {
        this.action = 'IMAGE';
        this.type = 'all';
        this.message = message[1];
    }

    googleSearch(callback) {
        let google = googleImagesSearch(config.google.CSE, config.google.apiKey);

        google.search(this.message)
            .then(images => {
                images = this.shuffle(images);
                let image = images[0].url;

                if (image)
                    this.getImage(image, callback);
            });
    }

    getImage(image, callback) {
        let tmp = config.tmp.dir,
            fileName = path.basename(url.parse(image).pathname);

        console.log('Downloading image... ' + image);

        this.download(image, tmp +'/'+ fileName, () => {
        	    console.log('Downloaded image... ' + image + ' Sending back '+ fileName);

        	    setTimeout(() => {
        	        callback(tmp +'/'+ fileName);
        	    }, 500);
          });
    }


    execute(callback) {
        return this.googleSearch(callback);
    }


    download(uri, filename, callback) {
        console.log([uri, filename, callback]);

        let dl = wget.download(uri, filename, {});

        dl.on('error', err => {
            callback(err);
        });

        dl.on('end', output => {
            callback(output);
        });

        dl.on('progress', progress => {
        });
    }


    shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

        return o;
    }
}

module.exports = GoogleImages;