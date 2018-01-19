const logger = new (require('../logger'))();
const mongoose = require('mongoose');

// библиотека Обещаний (Promise), вместо той, которая идет в поставку с mongoose (mpromise)
mongoose.Promise = require('bluebird');

const config = require('../config');

mongoose.connect(config.db.mongoUri, {
    server: {
        poolSize: config.db.poolSize, // количество подключений в пуле
        reconnectTries: config.db.reconnectTimes,
    }
});

const db = mongoose.connection; // инстанс БД

db.on('error', (err) => {
    logger.error("Database Connection Error: " + err);
    process.exit(2);
});

db.on('connected', () => {
    logger.info("Succesfully connected to MongoDB Database");
});

db.once('open', () => {
    // logger.info("Connected to DB!");
});