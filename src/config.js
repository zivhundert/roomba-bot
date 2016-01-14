var config = {
    delay: 1000,
    yowsup: {
        countryCode: process.env.COUNTRY || null,
        phoneNumber: process.env.PHONE || null,
        password: process.env.PASS || null
    }
};

module.exports = config;