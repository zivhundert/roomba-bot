'use strict';

let config = require('../config');
const googleImagesSearch = require('google-images');

let fs = require('fs'),
    md5 = require('MD5'),
    wget = require('wget-improved'),
    cache = require('../utils/cache');

class GoogleImages {
    constructor(message) {
        this.cachePrefix = 'IMAGES_';
        this.action = 'IMAGE';
        this.type = 'all';
        this.message = message[1];
    }


    getFirstShuffle(list) {
        let shuffledList = this.shuffle(list.splice(0, 10));
        return shuffledList[0];
    }


    getKey() {
        return this.cachePrefix + this.message;
    }


    handleImages(images, callback) {
        let image = this.getFirstShuffle(images).url;

        if (image)
            this.getImage(image, callback);
    }


    search(callback) {
        let google = googleImagesSearch(config.google.CSE, config.google.apiKey),
            getCachedQuery = cache.get(this.getKey());

        if (undefined !== getCachedQuery) {
            this.handleImages(getCachedQuery, callback);

            return;
        }

        google.search(this.message).then(images => {
            cache.set(this.getKey(), images, () => {
                this.handleImages(images, callback);
            });
        });
    }

    getImage(image, callback) {
        let tmp = config.tmp.dir,
            fileMD5 = md5(image),
            suffix = image.match(/\.(png|jpg|jpeg|gif|bmp)/),
            fileName = fileMD5 + suffix[0];

        console.log('Downloading image... ' + image +'to: '+ fileName);

        this.download(image, tmp +'/'+ fileName, () => {
            console.log('Downloaded image... ' + image + ' Sending back '+ fileName);

            setTimeout(() => {
                callback(tmp +'/'+ fileName);
            }, 500);
          });
    }


    execute(callback) {
        return this.search(callback);
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