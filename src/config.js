var config = {
    delay: 1000,
    yowsup: {
        imei: 353271072005549,
        countryCode: process.env.COUNTRY || null,
        phoneNumber: process.env.PHONE || null,
        password: process.env.PASS || null
    }
};

module.exports = config;