const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const validationErrorHandler = require('celebrate').errors;

const corsCheck = {
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    methods: 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    origin: '*',
};

const jwtCheck = async(req, res, next) => {
    try {
        if (!req.headers) {
            return next(boom.badRequest('Headers are required.'));
        }
        const { authorization } = req.headers;
        jwt.verify(authorization, '!@#$1234');
        const decoded = jwt.decode(authorization, {
            complete: true,
        });
        if (!decoded || !decoded.payload || decoded.payload === '') {
            return next(boom.forbidden('Access Denied.'));
        }
        const userMetaData = {
            user_id: decoded.payload.user_id,
            email: decoded.payload.email,
            user_type: decoded.payload.user_type,
        };
        req.userMetaData = userMetaData;
        next();
    } catch (err) {
        console.log('======err=====>', err);
        res.send(err);
    }
};

const allErrorHandler = (err, req, res, next) => {
    console.log('======err=====>', err);
    if (err.output) {
        return res.status(err.output.statusCode).json(err.output.payload);
    }
    return res.status(500).json('Internal Server Error');
}

const authorize = (grant = []) => {
    return async (req, res, next) => {
        try {
            if (!req.userMetaData.user_type) {
                next(boom.unauthorized('Invalid req user role'));
            } else if (grant.length > 0 && grant.indexOf(req.userMetaData.user_type) === -1) {
                next(boom.unauthorized('Role is unauthorized to access resource'));
            }
            next();
        } catch (err) {
            console.log(err);
            next(boom.internal('Something went wrong.'));
        }

    }
}

module.exports = {
    corsCheck,
    jwtCheck,
    allErrorHandler,
    validation: validationErrorHandler(),
    authorize,
};