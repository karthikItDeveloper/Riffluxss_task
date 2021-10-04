const mongoose = require('mongoose');
const { dbConn } = require('../../db/mongo');
const { Schema } = mongoose;

const hotelSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    name: String,
    address: String,
    describtion: String,
    contact_name: String,
    contact_no: Number,
    status: {
        type: Number,
        default: 1,
    }, // { 0: Inactive, 1: Active }
}, {
    timestamps: true,
});

const getModel = async() => {
    return dbConn.model('hotel', hotelSchema);
};

module.exports = {
    getModel,
};