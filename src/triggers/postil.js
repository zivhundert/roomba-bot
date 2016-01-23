'use strict';

const PostILStatus = require('postil-status');

class PostIL {
    constructor(trackingID) {
        this.action = 'SAY';
        this.type = 'all';
        this.trackingID = trackingID[0];
    }


    execute(callback) {
        console.log(this.trackingID);


        let postil = new PostILStatus({language: 'HE'});
        postil.getStatus(this.trackingID).then(packageModel => {
            callback(packageModel.getDescription());
        });
    }
}

module.exports = PostIL;