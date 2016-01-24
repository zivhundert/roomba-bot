'use strict';

const PostILStatus = require('postil-status');

class PostIL {
    constructor(trackingID) {
        this.action = 'SAY';
        this.type = 'all';
        this.trackingID = [
                trackingID[1], // XX
                trackingID[2], // 123456789
                trackingID[3]  // XX
            ].join('');
    }


    execute(callback) {
        console.log(this.trackingID);


        let postil = new PostILStatus({language: 'HE'}, {log: () => {}});
        postil.getStatus(this.trackingID).then(packageModel => {
            callback(packageModel.getDescription());
        });
    }
}

module.exports = PostIL;