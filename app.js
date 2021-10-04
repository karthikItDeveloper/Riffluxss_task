const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000; // port number
const useragent = require('express-useragent');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const boom = require('@hapi/boom');
require('dotenv').config({path: `./local.env`});

// custom middlewares
const { corsCheck, jwtCheck, allErrorHandler, validation} = require('./middleware/middleware-config');

app.get('/connection-check', (req, res) => {
    res.send({
        status: 'success',
        message: 'Connected Successfully',
    });
});
app.use(cors(corsCheck));
app.use(helmet());
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));

// routes
const authRoute = require('./api/Auth/route');
const hotelRoute = require('./api/hotelCollection/route');

app.use('/api/auth', authRoute);

app.use(jwtCheck);

app.use('/api/hotel', hotelRoute);
app.get('/test', (req, res) => { res.send('Hello World!'); });
app.use((req, res, next) => {
    throw boom.notFound('Endpoint Not Found');
});

app.use(validation);
app.use(allErrorHandler);

app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
  });
  