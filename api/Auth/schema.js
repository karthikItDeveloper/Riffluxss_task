const joi = require('celebrate').Joi;

module.exports.createUser = {
    body: joi.object().keys({
        display_name: joi.string().required(),
        user_type: joi.number().required(),
        password: joi.string().required(),
        email: joi.string().required(),
        phone_number: joi.number().required(),
        first_name: joi.string().optional(),
        last_name: joi.string().optional(),
    }),
};

module.exports.userLogin = {
    body: joi.object().keys({
        email: joi.string().required(),
        password: joi.required(),
    }),
};