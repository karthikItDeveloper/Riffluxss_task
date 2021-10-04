const joi = require('celebrate').Joi;

module.exports.addHotel = {
    body: joi.object().keys({
        name: joi.string().required(),
        address: joi.string().required(),
        describtion: joi.string().optional(),
        contact_name: joi.string().required(),
        contact_no: joi.number().required(),
    }),
};

module.exports.updateHotel = {
    body: joi.object().keys({ 
        contact_name: joi.string().required(),
        contact_no: joi.string().required(),
    }),
    params: {
        hotel_id: joi.string().required(),
    },
};

module.exports.getHotelDetails = {
    params: {
        hotel_id: joi.string().required(),
    },
};

module.exports.listHotel = {
    params: {
        // hotel_id: joi.string().required(),
    },
};
