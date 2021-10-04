const index = require('./index');

const addHotelService = async(params) => {
    const hotelModel = await index.getModel();
    const newHotel = new hotelModel(params);
    const saveHotel = await newHotel.save();
    return saveHotel;
}; 

const updateHotelService = async(pathParams, params) => {
    const option = {
        new: true,
    };
    const hotelModel = await index.getModel();
    const result = await hotelModel.findOneAndUpdate(pathParams, params, option);
    return result;
};

const getHotelDetailService = async(params) => {
    const hotelModel = await index.getModel();
    const result = await hotelModel.findOne(params);
    return result;
};

const listHotelService = async() => {
    const hotelModel = await index.getModel();
    const result = await hotelModel.find();
    return result;
};

module.exports = {
    addHotelService,
    updateHotelService,
    getHotelDetailService,
    listHotelService,

};