var config = {
    env: process.env.NODE_ENV || 'development',
    
    environments: {
        development: {
            delay: 1000,
            yowsup: {
                id: "phoneid",
                password: "key"
            }
        }
    }
};

process.env.NODE_ENV = config.env;
module.exports = config.environments[process.env.NODE_ENV];