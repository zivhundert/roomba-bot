var config = {
    delay: 1000,
    yowsup: {
        imei: 353271072005549,
        countryCode: process.env.COUNTRY || null,
        phoneNumber: process.env.PHONE || null,
        password: process.env.PASS || null
    },
    tmp: {
        dir: __dirname + '/../_TMP'
    }
};

module.exports = config;