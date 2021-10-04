const boom = require('@hapi/boom');
const service = require('./service');

const addHotel = async(params) => {
    const addHotel = await service.addHotelService(params);
    if (!addHotel._id) {
        throw boom.badRequest('Something went wrong. Please try again.');
    }
    result = {
        status: 200,
        message: 'Hotel added Successfully',
        details: addHotel,
    };
    return result;
};

const updateHotel = async(pathParams, params) => {
    if (Object.keys(params).length <= 0) {
        throw boom.badRequest('Insufficient update params.');
    }
    const updatePathParams = {
        _id: pathParams.hotel_id,
    };
    const hotel = await service.updateHotelService(updatePathParams, params);
    if (!hotel._id) {
        throw boom.badRequest('Something went wrong. Please try again.');
    }
    const result = {
        status: 200,
        message: 'Hotel Updated Successfully',
        detail: hotel,
    };
    return result;
};

const getHotelDetails = async(params) => {
    if (Object.keys(params).length <= 0) {
        throw boom.badRequest('Insufficient update params.');
    }
    const getParams = {
        _id: params.hotel_id,
    };
    const hotel = await service.getHotelDetailService(getParams);
    if (!hotel._id) {
        throw boom.badRequest('Something went wrong. Please try again.');
    }
    const result = {
        status: 200,
        message: 'Hotel Details',
        detail: hotel,
    };
    return result;
};

const listHotel = async() => {
    const List = await service.listHotelService();
    if (List.length <=0) {
        throw boom.badRequest('No Hotels Found');
    }
    const result = {
        status: 200,
        message: 'Hotel List',
        detail: List,
    };
    return result;
};

module.exports = {
    addHotel,
    updateHotel,
    getHotelDetails,
    listHotel,
};