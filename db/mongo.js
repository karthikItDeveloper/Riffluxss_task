const mongoose = require('mongoose');

if (process.env.MONGO_CONN_STRING && process.env.DB_NAME) {
    dbConn = mongoose.createConnection(
        `${process.env.MONGO_CONN_STRING}${process.env.DB_NAME}`, {
            useNewUrlParser: true,
        }
    );
} else {
    console.log('ERROR: DB CONNECTION NOT INITIALISED');
}


function closeDbConn() {
    dbConn.close(() => {
        console.log('Closing mongo connection and exiting process');
        process.exit(0);
    });
}

module.exports = {
    dbConn,
    closeDbConn
};