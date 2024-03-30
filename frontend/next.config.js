// next.config.js
require('dotenv').config();

module.exports = {
    env: {
        BASE_URL_API: process.env.BASE_URL_API,
        ENV:process.env.ENV,
    },
};
