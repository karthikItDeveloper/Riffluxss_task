const mongoose = require('mongoose');
const { dbConn } = require('../../db/mongo');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true,
    },
    display_name: String,
    first_name: String,
    last_name: String,
    user_type: Number,//1.admin 2.vendor 3.User
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: Number,
    password: String,
    status: {
        type: Number,
        default: 1,
    }, // { 0: Inactive, 1: Active }
}, {
    timestamps: true,
});

const getModel = async() => {
    return dbConn.model('user', userSchema);
};

module.exports = {
    getModel,
};