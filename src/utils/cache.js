'use strict';

const NodeCache = require('node-cache');

module.exports = new NodeCache({stdTTL: 60*60*24*7});