'use strict';

const PostILStatus = require('postil-status'),
      Logger = require('./../utils/logger');

class PostIL {
    constructor(trackingID) {
        this.action = 'SAY';
        this.type = 'all';
        this.trackingID = trackingID[0];
    }


    execute(callback) {
        console.log(this.trackingID);


        let postil = new PostILStatus({language: 'HE'}, Logger);
        postil.getStatus(this.trackingID).then(packageModel => {
            callback(packageModel.getDescription());
        });
    }
}

module.exports = PostIL;